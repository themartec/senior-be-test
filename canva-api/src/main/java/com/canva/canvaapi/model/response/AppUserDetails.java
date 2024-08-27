package com.canva.canvaapi.model.response;

import com.canva.canvaapi.model.entity.UserEntity;
import com.canva.canvaapi.model.entity.UserMetadata;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
@Setter
public class AppUserDetails extends User {

    private List<UserMetadata> metadataList;
    private Map<String, UserMetadata> metadataMap;

    public AppUserDetails(UserEntity user, List<UserMetadata> metadata) {
        super(user.getUserName(), user.getPassword(), Collections.EMPTY_LIST);
        metadataList = metadata;
        metadataMap = metadata.stream()
                .collect(Collectors.toMap(UserMetadata::getMetadataKey, item -> item));
    }
}
