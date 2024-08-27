package com.canva.canvaapi.utils;

import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

public class Constant {
    public static DateTimeFormatter FILE_DATE_FORMAT = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");

    private static final Map<String, String> mimeTypeMap = new HashMap<>();

    static {
        mimeTypeMap.put("html", "text/html");
        mimeTypeMap.put("htm", "text/html");
        mimeTypeMap.put("jpg", "image/jpeg");
        mimeTypeMap.put("jpeg", "image/jpeg");
        mimeTypeMap.put("png", "image/png");
        mimeTypeMap.put("gif", "image/gif");
        mimeTypeMap.put("pdf", "application/pdf");
        mimeTypeMap.put("txt", "text/plain");
        mimeTypeMap.put("json", "application/json");
        mimeTypeMap.put("xml", "application/xml");
        mimeTypeMap.put("zip", "application/zip");
        mimeTypeMap.put(".mp4", "video/mp4");
        mimeTypeMap.put("mp4", "video/mp4");
    }

    public static String getMimeType(String fileExtension) {
        return mimeTypeMap.getOrDefault(fileExtension.toLowerCase(), "application/octet-stream");
    }

}
