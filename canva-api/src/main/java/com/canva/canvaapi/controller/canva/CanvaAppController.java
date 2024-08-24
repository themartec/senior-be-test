package com.canva.canvaapi.controller.canva;

import com.canva.canvaapi.model.entity.UserEntity;
import com.canva.canvaapi.model.request.CanvaExport;
import com.canva.canvaapi.model.response.CanvaAppAssets;
import com.canva.canvaapi.repo.UserCanvaRepo;
import com.canva.canvaapi.service.CanvaAssetService;
import com.canva.canvaapi.utils.JWTUtils;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/public/canva")
public class CanvaAppController {
    @Autowired
    UserCanvaRepo userCanvaRepo;
    @Autowired
    CanvaAssetService canvaAssetService;

    @PostMapping("/status")
    public Map<String, Object> getAuthenticationStatus(@RequestHeader("Authorization") String bearer) throws Exception {
        String token = bearer.substring(7);
        String userId = (String) JWTUtils.decodeJWT(token).get("userId");
        boolean isAuthenticated = userCanvaRepo.isCanvaAppConnected(userId);
        return Map.of("isAuthenticated", isAuthenticated, "canvaUserId", userId);
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
