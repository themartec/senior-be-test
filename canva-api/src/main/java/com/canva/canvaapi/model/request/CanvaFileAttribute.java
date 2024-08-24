package com.canva.canvaapi.model.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CanvaFileAttribute {
    private String mimeType;
    private String extension;
}
