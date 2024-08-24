package com.canva.canvaapi.model.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;


@Data
@JsonIgnoreProperties
public class CanvaFolder {
    private String id;
    private String name;
}

