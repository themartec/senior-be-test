package com.canva.canvaapi.model.entity;


import jakarta.persistence.*;
import lombok.Data;
import org.springframework.boot.autoconfigure.security.SecurityProperties;

import java.util.List;
import java.util.Map;

@Entity
@Data
public class UserEntity extends SecurityProperties.User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;
    private String password;

    private String challengeCode;

    @OneToMany(mappedBy="user")
    @MapKey(name = "metadataKey")
    Map<String, UserMetadata> metadata;

    @OneToMany(mappedBy = "user")
    List<Assets> assetsList;
}
