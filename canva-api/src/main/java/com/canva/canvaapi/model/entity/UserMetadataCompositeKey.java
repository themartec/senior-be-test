package com.canva.canvaapi.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.io.Serializable;

@Data
public class UserMetadataCompositeKey implements Serializable {
    String metadataKey;
    UserEntity user;
}
