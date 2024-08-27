package com.canva.canvaapi.service;

import com.canva.canvaapi.model.Constant;
import com.canva.canvaapi.model.entity.UserEntity;
import com.canva.canvaapi.model.entity.UserMetadata;
import com.canva.canvaapi.model.request.CanvaTokenRes;
import com.canva.canvaapi.repo.UserCanvaRepo;
import com.canva.canvaapi.repo.UserMetadataRepo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.List;

@Service
public class CanvaTokenService {
    private final UserMetadataRepo userMetadataRepo;
    private final UserCanvaRepo userCanvaRepo;
    private final String appCanvaCredentials;
    private final RestTemplate restTemplate;

    public CanvaTokenService(UserMetadataRepo userMetadataRepo, UserCanvaRepo userCanvaRepo, @Value("${app.canva.credentials}") String appCredentials, RestTemplate restTemplate) {
        this.userMetadataRepo = userMetadataRepo;
        this.userCanvaRepo = userCanvaRepo;
        this.appCanvaCredentials = appCredentials;
        this.restTemplate = restTemplate;
    }

    public void refreshToken(String userName) {
        UserMetadata refreshToken = userMetadataRepo.getMetadataByUserAndKey(userName, Constant.UserMetadataKey.CANVA_REFRESH_TOKEN.name()).orElse(null);
        if (refreshToken == null) {
            //refresh fail. delete the token
            userMetadataRepo.deleteCanvaMetadata(userName);
            return;
        }

        String encodedCredentials = Base64.getEncoder().encodeToString(appCanvaCredentials.getBytes());
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set(HttpHeaders.AUTHORIZATION, "Basic " + encodedCredentials);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "refresh_token");
        body.add("refresh_token", refreshToken.getMetadataValue());

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<CanvaTokenRes> response = restTemplate.exchange("https://api.canva.com/rest/v1/oauth/token", HttpMethod.POST, entity, CanvaTokenRes.class);
            if (response.getStatusCode().value() == 200) {
                UserEntity user = userCanvaRepo.findByUserName(userName);
                userMetadataRepo.saveAll(List.of(
                        UserMetadata
                                .builder()
                                .dataType(String.class.toString())
                                .metadataKey(Constant.UserMetadataKey.CANVA_ACCESS_TOKEN.name())
                                .metadataValue(response.getBody().getAccessToken())
                                .user(user)
                                .build(),
                        UserMetadata
                                .builder()
                                .dataType(String.class.toString())
                                .metadataKey(Constant.UserMetadataKey.CANVA_REFRESH_TOKEN.name())
                                .metadataValue(response.getBody().getRefreshToken())
                                .user(user)
                                .build()
                ));
            }
        } catch (Exception ex) {
            //refresh fail. delete the token
            userMetadataRepo.deleteCanvaMetadata(userName);
        }

    }
}
