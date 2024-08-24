package com.canva.canvaapi.controller.canva;

import com.canva.canvaapi.model.entity.UserEntity;
import com.canva.canvaapi.model.request.CanvaExport;
import com.canva.canvaapi.model.response.CanvaAppAssets;
import com.canva.canvaapi.repo.UserCanvaRepo;
import com.canva.canvaapi.repo.UserMetadataRepo;
import com.canva.canvaapi.service.CanvaAssetService;
import com.canva.canvaapi.utils.JWTUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/public/canva")
public class CanvaAppController {
    private final UserCanvaRepo userCanvaRepo;
    private final CanvaAssetService canvaAssetService;
    private final UserMetadataRepo userMetadataRepo;

    public CanvaAppController(UserCanvaRepo userCanvaRepo, CanvaAssetService canvaAssetService, UserMetadataRepo userMetadataRepo) {
        this.userCanvaRepo = userCanvaRepo;
        this.canvaAssetService = canvaAssetService;
        this.userMetadataRepo = userMetadataRepo;
    }

    @PostMapping("/status")
    public ResponseEntity<Map<String, Object>> getAuthenticationStatus(@RequestHeader("Authorization") String bearer) throws Exception {
        String token = bearer.substring(7);
        String userId = (String) JWTUtils.decodeJWT(token).get("userId");
        boolean isAuthenticated = userCanvaRepo.isCanvaAppConnected(userId);
        String username = "";
        if (isAuthenticated) username = userCanvaRepo.getUserInfo(userId).getUserName();
        return ResponseEntity.ok(Map.of(
                "isAuthenticated", isAuthenticated,
                "canvaUserId", userId,
                "username", username
        ));
    }

    @PostMapping("/disconnect")
    public ResponseEntity<String> disconnect(@RequestHeader("Authorization") String bearer) throws Exception {
        String token = bearer.substring(7);
        String userId = (String) JWTUtils.decodeJWT(token).get("userId");
        boolean isAuthenticated = userCanvaRepo.isCanvaAppConnected(userId);
        if (isAuthenticated) {
            userMetadataRepo.disconnectApp(userId);
            return ResponseEntity.ok("disconected");
        }
        return ResponseEntity.badRequest().body("Can't disconnected");
    }

    @PostMapping("/story/export")
    public void exportToAsset(
            @RequestHeader("Authorization") String bearer,
            @RequestBody CanvaExport canvaExport) throws Exception {
        String token = bearer.substring(7);
        String userId = (String) JWTUtils.decodeJWT(token).get("userId");
        UserEntity user = userCanvaRepo.findUserByCanvaId(userId);
        canvaAssetService.saveExportedAssetsFromCanva(canvaExport, user);
    }

    @GetMapping("/assets")
    public ResponseEntity<List<CanvaAppAssets>> findAsset(
            @RequestHeader("Authorization") String bearer,
            @RequestParam(required = false) String keyword
    ) throws Exception {
        String token = bearer.substring(7);
        String userId = (String) JWTUtils.decodeJWT(token).get("userId");
        if (keyword == null || keyword.isEmpty()) {
            return ResponseEntity.ok(canvaAssetService.getAllAssets(userId));
        }
        return ResponseEntity.ok(canvaAssetService.findByKeyword(userId, keyword));

    }

}
