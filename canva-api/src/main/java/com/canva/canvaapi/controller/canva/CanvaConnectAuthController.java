package com.canva.canvaapi.controller.canva;

import com.canva.canvaapi.model.Constant;
import com.canva.canvaapi.model.entity.UserEntity;
import com.canva.canvaapi.model.entity.UserMetadata;
import com.canva.canvaapi.model.request.CanvaFolderDTO;
import com.canva.canvaapi.model.request.CanvaTokenRes;
import com.canva.canvaapi.model.response.AppUserDetails;
import com.canva.canvaapi.repo.UserMetadataRepo;
import com.canva.canvaapi.repo.UserCanvaRepo;
import com.canva.canvaapi.utils.JWTUtils;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@RestController
@RequestMapping("/canva/oauth")
public class CanvaConnectAuthController {

    private final String appCallbackUrl;
    private final String appCanvaCredentials;
    private final UserMetadataRepo userMetadataRepo;
    private final UserCanvaRepo userCanvaRepo;


    public CanvaConnectAuthController(@Value("${app.url}") String appCallbackUrl, @Value("${app.canva.credentials}") String appCanvaCredentials, UserMetadataRepo userMetadataRepo, UserCanvaRepo userCanvaRepo) {
        this.appCallbackUrl = appCallbackUrl;
        this.appCanvaCredentials = appCanvaCredentials;
        this.userMetadataRepo = userMetadataRepo;
        this.userCanvaRepo = userCanvaRepo;
    }

    @GetMapping("/callback")
    public void callBack(@RequestParam(required = false) String state, @RequestParam String code, HttpServletResponse httpServletResponse) throws Exception {

        String encodedCredentials = Base64.getEncoder().encodeToString(appCanvaCredentials.getBytes());

        UserEntity user = userCanvaRepo.findByUserName(state);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set(HttpHeaders.AUTHORIZATION, "Basic " + encodedCredentials);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("code_verifier", user.getChallengeCode());
        body.add("code", code);
        body.add("redirect_uri", appCallbackUrl + "/canva/oauth/callback");

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        CanvaTokenRes response = restTemplate.exchange("https://api.canva.com/rest/v1/oauth/token", HttpMethod.POST, entity, CanvaTokenRes.class).getBody();

        HttpHeaders createFolderHeaders = new HttpHeaders();
        createFolderHeaders.setContentType(MediaType.APPLICATION_JSON);
        createFolderHeaders.setBearerAuth(response.getAccessToken());

        CanvaFolderDTO folderRequest = new CanvaFolderDTO();
        folderRequest.setName("Martec");
        folderRequest.setParentFolderId("root");

        HttpEntity<CanvaFolderDTO> request = new HttpEntity<>(folderRequest, createFolderHeaders);
        CanvaFolderDTO responseFolder = restTemplate.exchange("https://api.canva.com/rest/v1/folders", HttpMethod.POST, request, CanvaFolderDTO.class).getBody();
        Map<String, Object> claims = JWTUtils.decodeJWT(response.getAccessToken());
        String canvaUid = (String) claims.get("sub");


        UserMetadata accessTokenMetadata = UserMetadata
                .builder()
                .metadataKey(Constant.UserMetadataKey.CANVA_ACCESS_TOKEN.name())
                .metadataValue(response.getAccessToken())
                .user(user)
                .build();
        UserMetadata refreshTokenMetadata = UserMetadata
                .builder()
                .metadataKey(Constant.UserMetadataKey.CANVA_REFRESH_TOKEN.name())
                .metadataValue(response.getRefreshToken())
                .user(user)
                .build();
        UserMetadata folderMetadata = UserMetadata
                .builder()
                .metadataKey(Constant.UserMetadataKey.CANVA_CONNECT_FOLDER.name())
                .metadataValue(responseFolder.getFolder().getId())
                .user(user)
                .build();
        UserMetadata canvaUserIdMetadata = UserMetadata
                .builder()
                .metadataKey(Constant.UserMetadataKey.CANVA_CONNECT_UID.name())
                .metadataValue(canvaUid)
                .user(user)
                .build();
        UserMetadata connectTokenExpiredMetadata = UserMetadata
                .builder()
                .metadataKey(Constant.UserMetadataKey.CANVA_TOKEN_EXPIRED_AT.name())
                .metadataValue(String.valueOf(new Date().getTime() + response.getExpiresIn()))
                .user(user)
                .build();

        userMetadataRepo.saveAll(List.of(accessTokenMetadata, refreshTokenMetadata, folderMetadata, canvaUserIdMetadata, connectTokenExpiredMetadata));

        httpServletResponse.sendRedirect("/assets");
    }


    @GetMapping("/connect")
    public void method(HttpServletResponse httpServletResponse,
            @AuthenticationPrincipal AppUserDetails appUserDetails
    ) throws NoSuchAlgorithmException {
        List<String> scopes = Arrays.asList(
                "asset:read",
                "asset:write",
                "brandtemplate:content:read",
                "brandtemplate:meta:read",
                "design:content:read",
                "design:content:write",
                "design:meta:read",
                "profile:read",
                "folder:write",
                "folder:read"
        );
        String scopeString = String.join(" ", scopes);
        String challengeCode = RandomStringUtils.randomAlphabetic(44);
        String hashCodeChallenge = generateCodeChallenge(challengeCode);
        String clientId = "OC-AZENDvxngWMy";
        String state = appUserDetails.getUsername();
        String redirectUri = appCallbackUrl + "/canva/oauth/callback";


        String url = String
                .format("https://www.canva.com/api/oauth/authorize?code_challenge=%s&code_challenge_method=S256&scope=%s&response_type=code&client_id=%s&redirect_uri=%s&state=%s",
                        URLEncoder.encode(hashCodeChallenge, StandardCharsets.UTF_8),
                        URLEncoder.encode(scopeString, StandardCharsets.UTF_8),
                        URLEncoder.encode(clientId, StandardCharsets.UTF_8),
                        URLEncoder.encode(redirectUri, StandardCharsets.UTF_8),
                        URLEncoder.encode(state, StandardCharsets.UTF_8)
                );

        UserEntity user = userCanvaRepo.findByUserName(state);
        user.setChallengeCode(challengeCode);
        userCanvaRepo.save(user);

        httpServletResponse.setHeader("Location", url);
        httpServletResponse.setStatus(302);
    }

    private static String generateCodeChallenge(String codeVerifier) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(codeVerifier.getBytes(StandardCharsets.UTF_8));
        return Base64.getUrlEncoder().withoutPadding().encodeToString(hash);
    }


}