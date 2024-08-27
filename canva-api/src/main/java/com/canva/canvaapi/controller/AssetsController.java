package com.canva.canvaapi.controller;

import com.canva.canvaapi.model.entity.UserMetadata;
import com.canva.canvaapi.model.response.AppUserDetails;
import com.canva.canvaapi.model.response.AssetResponseDTO;
import com.canva.canvaapi.repo.UserMetadataRepo;
import com.canva.canvaapi.service.AssetService;
import com.canva.canvaapi.service.FileStorageService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

import static com.canva.canvaapi.model.Constant.UserMetadataKey.CANVA_ACCESS_TOKEN;


@Controller
@RequestMapping("/assets")
public class AssetsController {
    private final AssetService assetService;
    private final UserMetadataRepo userMetadataRepo;
    private final FileStorageService fileStorageService;


    public AssetsController(AssetService assetService, UserMetadataRepo userMetadataRepo, FileStorageService fileStorageService) {
        this.assetService = assetService;
        this.userMetadataRepo = userMetadataRepo;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping
    public String listAssets(Model model,
                             @AuthenticationPrincipal AppUserDetails appUserDetails) {
        model.addAttribute("assets", assetService.getAllAssets(appUserDetails.getUsername()));
        Optional<UserMetadata> metadata= userMetadataRepo.findByUsernameAndMetadataKey(appUserDetails.getUsername(), CANVA_ACCESS_TOKEN.name());
        model.addAttribute("isCanvaConnected", metadata.isPresent());
        return "assets/list";
    }

    @GetMapping("/new")
    public String createAssetForm(Model model) {
        model.addAttribute("asset", new AssetResponseDTO());
        return "assets/new";
    }

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file,
                             @RequestParam("title") String title,
                             @AuthenticationPrincipal AppUserDetails appUserDetails) {

        AssetResponseDTO reqDto = new AssetResponseDTO();
        reqDto.setTitle(title);
        assetService.createAsset(file, reqDto, appUserDetails.getUsername());
        return "redirect:/assets";
    }

    @GetMapping("/edit/{id}")
    public String editAssetForm(@PathVariable Long id, Model model) {
        model.addAttribute("asset", assetService.getAssetById(id));
        return "assets/edit";
    }

    @PostMapping("/update/{id}")
    public String updateAsset(@PathVariable long id,
                              @RequestParam("file") MultipartFile file,
                              @RequestParam("title") String title,
                              @AuthenticationPrincipal AppUserDetails appUserDetails) {


        AssetResponseDTO assetResponseDTO = new AssetResponseDTO();
        assetResponseDTO.setTitle(title);
        assetResponseDTO.setMimeType(file.getContentType());

        assetService.updateAsset(id, file, assetResponseDTO, appUserDetails.getUsername());
        return "redirect:/assets";
    }

    @GetMapping("/delete/{id}")
    public String deleteAsset(@PathVariable Long id) {
        assetService.deleteAsset(id);
        return "redirect:/assets";
    }

    @GetMapping("/public/files/{fileName:.+}")
    @ResponseBody
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            ex.printStackTrace();
        }

        // Fallback to the default content type if type could not be determined
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }

}


