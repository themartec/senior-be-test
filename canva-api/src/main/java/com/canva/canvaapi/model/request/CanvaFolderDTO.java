package com.canva.canvaapi.model.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties
public class CanvaFolderDTO {
    @JsonProperty("name")
    private String name;
    @JsonProperty("parent_folder_id")
    private String parentFolderId;
    @JsonProperty("folder")
    private CanvaFolder folder;
}