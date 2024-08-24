package com.canva.canvaapi.controller.canva;

import com.canva.canvaapi.model.response.AppUserDetails;
import com.canva.canvaapi.model.response.CanvaDesignRes;
import com.canva.canvaapi.service.CanvaAssetService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/assets")
public class CanvaConnectController {

    private final CanvaAssetService canvaAssetService;

    public CanvaConnectController(CanvaAssetService canvaAssetService) {
        this.canvaAssetService = canvaAssetService;
    }

    @GetMapping("/canva/open/{assetId}")
    public void openAssetInCanva(HttpServletResponse httpServletResponse,
                                 @PathVariable long assetId,
                                 @AuthenticationPrincipal AppUserDetails appUserDetails) throws IOException, InterruptedException {
        CanvaDesignRes url = canvaAssetService.openInCanva(assetId, appUserDetails);
        if (url == null){
            httpServletResponse.sendRedirect("/assets");
        } else {
            httpServletResponse.sendRedirect(url.getEditUrl());
        }

    }
}
