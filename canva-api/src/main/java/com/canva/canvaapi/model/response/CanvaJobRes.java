package com.canva.canvaapi.model.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CanvaJobRes {
    private String jobId;
    private String jobStatus;
    private String canvaAssetId;
}
