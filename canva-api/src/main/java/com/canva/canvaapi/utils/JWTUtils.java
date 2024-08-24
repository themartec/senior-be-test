package com.canva.canvaapi.utils;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Base64;
import java.util.Map;

public class JWTUtils {
    public static Map<String, Object> decodeJWT(String jwt) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        String[] parts = jwt.split("\\.");
        if (parts.length != 3) {
            throw new IllegalArgumentException("Invalid JWT token format");
        }

        String payload = new String(Base64.getUrlDecoder().decode(parts[1]));
        return objectMapper.readValue(payload, Map.class);
    }
}
