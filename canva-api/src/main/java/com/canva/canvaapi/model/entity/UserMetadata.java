package com.canva.canvaapi.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(UserMetadataCompositeKey.class)
public class UserMetadata {
    @Id
    @Column(name = "metadata_key")
    String metadataKey;
    @Id
    @ManyToOne
    @JoinColumn(name="user_id")
    UserEntity user;

    @Column(name = "metadata_value", length = 3000)
    String metadataValue;

    @Column(name = "data_type")
    String dataType;


}
