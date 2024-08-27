package com.canva.canvaapi.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CanvaAppAssets {
    private String mimeType;
    private String author;
    private String title;
    private String assetUrl;
}
