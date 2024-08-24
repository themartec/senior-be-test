package com.canva.canvaapi.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssetResponseDTO {
    private Long id;
    private String mimeType;
    private String url;
    private String title;
    private Long userId;
    private LocalDateTime createdAt;
}
