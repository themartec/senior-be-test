package com.canva.canvaapi.model.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CanvaDesignRes {
    private String editUrl;
    private String viewUrl;
}
