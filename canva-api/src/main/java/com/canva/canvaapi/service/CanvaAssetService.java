package com.canva.canvaapi.service;

import com.canva.canvaapi.model.entity.Assets;
import com.canva.canvaapi.model.entity.UserEntity;
import com.canva.canvaapi.model.entity.UserMetadata;
import com.canva.canvaapi.model.request.CanvaExport;
import com.canva.canvaapi.model.request.CanvaExportBlob;
import com.canva.canvaapi.model.request.CanvaFileAttribute;
import com.canva.canvaapi.model.response.*;
import com.canva.canvaapi.repo.AssetRepository;
import com.canva.canvaapi.repo.UserCanvaRepo;
import com.canva.canvaapi.repo.UserMetadataRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.tika.mime.MimeTypeException;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.io.InputStream;
import java.net.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.canva.canvaapi.model.Constant.UserMetadataKey.CANVA_ACCESS_TOKEN;
import static com.canva.canvaapi.utils.Constant.FILE_DATE_FORMAT;
import static com.canva.canvaapi.utils.Constant.getMimeType;

@Service
@Slf4j
public class CanvaAssetService {
    private final AssetRepository assetRepository;
    private final UserCanvaRepo userCanvaRepo;
    private final UserMetadataRepo userMetadataRepo;
    private final FileStorageService fileStorageService;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public CanvaAssetService(AssetRepository assetRepository, UserCanvaRepo userCanvaRepo, UserMetadataRepo userMetadataRepo, FileStorageService fileStorageService, RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.assetRepository = assetRepository;
        this.userCanvaRepo = userCanvaRepo;
        this.userMetadataRepo = userMetadataRepo;
        this.fileStorageService = fileStorageService;
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public CanvaDesignRes openInCanva(Long internalAssetId, AppUserDetails currentUser) throws IOException, InterruptedException {
        Assets assets = assetRepository.findById(internalAssetId).orElseThrow();
        UserMetadata accessToken = userMetadataRepo.findByUsernameAndMetadataKey(currentUser.getUsername(), CANVA_ACCESS_TOKEN.name()).orElseThrow();
        CanvaJobRes canvaJobRes = createUploadAssetJob(assets.getUrl(), accessToken.getMetadataValue());
        pollingStatusJob(canvaJobRes.getJobId(), accessToken.getMetadataValue(), canvaJobRes);
        if (canvaJobRes.getCanvaAssetId() != null) {
            return createCanvaDesign(canvaJobRes.getCanvaAssetId(), assets.getTitle(), accessToken.getMetadataValue());
        }
        return null;
    }

    public CanvaJobRes createUploadAssetJob(String internalAssetUrl, String accessToken) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.set("Asset-Upload-Metadata", "{ \"name_base64\": \"TXkgQXdlc29tZSBVcGxvYWQg8J+agA==\" }");

        Resource resource = fileStorageService.loadFileAsResource(internalAssetUrl);

        HttpEntity<InputStreamResource> requestEntity = new HttpEntity<>(new InputStreamResource(resource.getInputStream()), headers);


        ResponseEntity<String> response = restTemplate.exchange(
                "https://api.canva.com/rest/v1/asset-uploads",
                HttpMethod.POST,
                requestEntity,
                String.class
        );
        JsonNode rootNode = objectMapper.readTree(response.getBody());
        JsonNode jobNode = rootNode.path("job");
        String id = jobNode.path("id").asText();
        String status = jobNode.path("status").asText();
        return CanvaJobRes.builder().jobStatus(status).jobId(id).build();
    }

    public void pollingStatusJob(String jobId, String accessToken, CanvaJobRes canvaJobRes) throws InterruptedException, JsonProcessingException {
        long startTime = System.currentTimeMillis();
        while (System.currentTimeMillis() - startTime < 10000) {
            CanvaJobRes jobRes = getCanvaJobStatus(jobId, accessToken);
            if ("success".equalsIgnoreCase(jobRes.getJobStatus())) {
                log.info("Job succeeded: {}", jobRes);
                canvaJobRes.setCanvaAssetId(jobRes.getCanvaAssetId());
                return;
            }
            Thread.sleep(100);
        }
        log.info("Polling timeout reached. Job did not complete successfully.");
    }

    private CanvaJobRes getCanvaJobStatus(String jobId, String accessToken) throws JsonProcessingException {
        String url = "https://api.canva.com/rest/v1/asset-uploads/" + jobId;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<Void> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
        );
        JsonNode rootNode = objectMapper.readTree(response.getBody());
        JsonNode jobNode = rootNode.path("job");
        JsonNode assetIdNode = jobNode.path("asset");
        String id = jobNode.path("id").asText();
        String status = jobNode.path("status").asText();
        String assetId = assetIdNode == null ? null : assetIdNode.path("id").asText();
        return CanvaJobRes.builder().jobId(id).jobStatus(status).canvaAssetId(assetId).build();
    }

    public CanvaDesignRes createCanvaDesign(String assetId, String title, String accessToken) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.set("Content-Type", "application/json");

        Map<String, String> data = Map.of(
                "asset_id", assetId,
                "title", title
        );
        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(data, headers);

        // Make the POST request
        String url = "https://api.canva.com/rest/v1/designs";
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
        JsonNode rootNode = objectMapper.readTree(response.getBody());
        JsonNode urlsNode = rootNode.path("design").path("urls");
        String editUrl = urlsNode.path("edit_url").asText(null);
        String viewUrl = urlsNode.path("view_url").asText(null);
        return CanvaDesignRes.builder().editUrl(editUrl).viewUrl(viewUrl).build();
    }

    public void saveExportedAssetsFromCanva(CanvaExport canvaExport, UserEntity user) throws URISyntaxException, IOException {
        List<Assets> assetsList = new ArrayList<>();

        LocalDateTime createdAt = LocalDateTime.now();

        for (CanvaExportBlob exportBlob : canvaExport.getExportBlobs()) {

            String url = exportBlob.getUrl();
            URI uri = new URI(url);
            String path = uri.getPath();

            // Extract the file name with extension
            String fileNameWithExtension = path.substring(path.lastIndexOf('/') + 1);
            String fileExtension = fileNameWithExtension.substring(fileNameWithExtension.lastIndexOf('.') + 1);

            if (fileExtension.equals("zip")) {
                InputStream in = fileStorageService.downloadFile(exportBlob.getUrl());
                List<InputStream> extractedFiles = fileStorageService.unzipToInputStreams(in);
                int index = 1;
                for (InputStream file : extractedFiles) {
                    try {
                        CanvaFileAttribute attribute = fileStorageService.getMimeTypeFromStream(file);
                        Assets assetEntity = new Assets();
                        String fileName = createdAt.format(FILE_DATE_FORMAT) + "_" + index + canvaExport.getTitle() + attribute.getExtension();
                        assetEntity.setTitle(canvaExport.getTitle());
                        assetEntity.setUrl(fileName);
                        assetEntity.setMimeType(getMimeType(attribute.getExtension()));
                        assetEntity.setCreatedAt(createdAt);
                        assetEntity.setUser(user);
                        assetsList.add(assetEntity);
                        fileStorageService.storeFile(file, fileName);
                        index++;
                    } catch (MimeTypeException e) {
                        log.error("Can't process file in zip {}", e.getMessage(), e);
                    }
                }

            } else {
                Assets assetEntity = new Assets();
                assetEntity.setTitle(canvaExport.getTitle());
                assetEntity.setUrl(createdAt.format(FILE_DATE_FORMAT) + "_" + fileNameWithExtension);
                assetEntity.setMimeType(getMimeType(fileExtension));
                assetEntity.setCreatedAt(createdAt);
                assetEntity.setUser(user);
                assetsList.add(assetEntity);

                fileStorageService.storeFile(exportBlob.getUrl(), createdAt.format(FILE_DATE_FORMAT) + "_" + fileNameWithExtension);
            }
        }
        assetRepository.saveAll(assetsList);
    }

    public List<CanvaAppAssets> getAllAssets(String canvaUserId) {
        UserEntity user = userCanvaRepo.findUserByCanvaId(canvaUserId);
        return assetRepository.findByUserId(user.getId()).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    public List<CanvaAppAssets> findByKeyword(String canvaUserId, String keyword) {
        UserEntity user = userCanvaRepo.findUserByCanvaId(canvaUserId);
        String formattedKeyword = "%" + keyword + "%";
        return assetRepository.findByKeyword(user.getUserName(), formattedKeyword).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public CanvaAppAssets toDto(Assets asset) {
        CanvaAppAssets dto = new CanvaAppAssets();
        dto.setMimeType(asset.getMimeType());
        dto.setAssetUrl(asset.getUrl());
        dto.setTitle(asset.getTitle());
        dto.setAuthor(asset.getUser().getUserName());
        return dto;
    }
}
