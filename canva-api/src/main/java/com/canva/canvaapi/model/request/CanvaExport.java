package com.canva.canvaapi.model.request;

import lombok.Data;

import java.util.List;

@Data
public class CanvaExport {
    private List<CanvaExportBlob> exportBlobs;
    private String status;
    private String title;
}