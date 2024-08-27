package com.canva.canvaapi.service;

import com.canva.canvaapi.model.entity.Assets;
import com.canva.canvaapi.model.entity.UserEntity;
import com.canva.canvaapi.model.response.AssetResponseDTO;
import com.canva.canvaapi.repo.AssetRepository;
import com.canva.canvaapi.repo.UserCanvaRepo;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.canva.canvaapi.utils.Constant.FILE_DATE_FORMAT;

@Service
public class AssetService {

    private final AssetRepository assetRepositoryService;
    private final UserCanvaRepo userRepository;
    private final FileStorageService fileStorageService;

    public AssetService(AssetRepository assetRepositoryService, UserCanvaRepo userRepository, FileStorageService fileStorageService) {
        this.assetRepositoryService = assetRepositoryService;
        this.userRepository = userRepository;
        this.fileStorageService = fileStorageService;
    }

    public List<AssetResponseDTO> getAllAssets(String username) {
        return assetRepositoryService.findByUsername(username).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public AssetResponseDTO getAssetById(Long id) {
        return assetRepositoryService.findById(id)
                .map(this::toDto).orElseThrow();
    }

    public AssetResponseDTO createAsset(MultipartFile file, AssetResponseDTO requestDTO, String username) {
        // Store the file on the server
        LocalDateTime createdAt = LocalDateTime.now();
        String fileNameEncoded = URLEncoder.encode(file.getOriginalFilename(), StandardCharsets.UTF_8);
        String fileName = createdAt.format(FILE_DATE_FORMAT) + "_" + StringUtils.cleanPath(fileNameEncoded);
        fileStorageService.storeFile(file, fileName);

        UserEntity user = userRepository.findByUserName(username);
        // Save the asset information to the database
        Assets assetEntity = new Assets();
        assetEntity.setTitle(requestDTO.getTitle());
        assetEntity.setUrl(fileName);
        assetEntity.setMimeType(file.getContentType());
        assetEntity.setCreatedAt(createdAt);
        assetEntity.setUser(user);

        return toDto(assetRepositoryService.save(assetEntity));
    }

    public AssetResponseDTO updateAsset(Long id, MultipartFile file, AssetResponseDTO dto, String username) {
        Assets existingAsset = assetRepositoryService.findById(id).orElseThrow();

        fileStorageService.storeFile(file, existingAsset.getUrl());
        UserEntity user = userRepository.findByUserName(username);

        existingAsset.setUser(user);
        existingAsset.setUpdatedAt(LocalDateTime.now());
        existingAsset.setTitle(dto.getTitle());
        existingAsset.setMimeType(file.getContentType());
        return toDto(assetRepositoryService.save(existingAsset));

    }

    public void deleteAsset(Long id) {
        assetRepositoryService.deleteById(id);
    }

    public List<AssetResponseDTO> getAssetsByMimeType(String mimeType) {
        return assetRepositoryService.findByMimeType(mimeType).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<AssetResponseDTO> getAssetsByUserId(Long userId) {
        return assetRepositoryService.findByUserId(userId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public AssetResponseDTO toDto(Assets asset) {
        AssetResponseDTO dto = new AssetResponseDTO();
        dto.setId(asset.getId());
        dto.setMimeType(asset.getMimeType());
        dto.setUrl(asset.getUrl());
        dto.setTitle(asset.getTitle());
        dto.setUserId(asset.getUser().getId());
        dto.setCreatedAt(asset.getCreatedAt());
        return dto;
    }
}
