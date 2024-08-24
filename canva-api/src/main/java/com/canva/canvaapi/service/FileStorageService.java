package com.canva.canvaapi.service;

import com.canva.canvaapi.model.request.CanvaFileAttribute;
import org.apache.tika.Tika;
import org.apache.tika.mime.MimeType;
import org.apache.tika.mime.MimeTypeException;
import org.apache.tika.mime.MimeTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;
    private final Tika tika;

    @Autowired
    public FileStorageService(@Value("${file.upload-dir}") String uploadDir, Tika tika) {
        this.fileStorageLocation = Paths.get(uploadDir)
                .toAbsolutePath().normalize();
        this.tika = tika;

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public void storeFile(MultipartFile file, String fileName) {
        try {
            if (fileName.contains("..")) {
                throw new RuntimeException("Sorry! Filename contains invalid path sequence " + fileName);
            }
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public void storeFile(InputStream file, String fileName) {
        try {
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file, targetLocation, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }
    public void storeFile(String fileUrl, String fileName) {
        try {
            InputStream in = new URL(fileUrl).openStream();
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(in, targetLocation, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public CanvaFileAttribute getMimeTypeFromStream(InputStream inputStream) throws IOException, MimeTypeException {
        String mimeType = tika.detect(inputStream);
        MimeType mimeTypeObj = MimeTypes.getDefaultMimeTypes().forName(mimeType);
        return CanvaFileAttribute.builder().mimeType(mimeType).extension(mimeTypeObj.getExtension()).build();
    }

    public InputStream downloadFile(String fileUrl) {
        try {
            return new URL(fileUrl).openStream();
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileUrl + ". Please try again!", ex);
        }
    }

    public List<InputStream> unzipToInputStreams(InputStream zipFileStream) throws IOException {
        List<InputStream> inputStreams = new ArrayList<>();
        ZipInputStream zipInputStream = new ZipInputStream(zipFileStream);
        ZipEntry entry;

        while ((entry = zipInputStream.getNextEntry()) != null) {
            if (!entry.isDirectory()) {
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                byte[] buffer = new byte[1024];
                int len;
                while ((len = zipInputStream.read(buffer)) > 0) {
                    outputStream.write(buffer, 0, len);
                }
                inputStreams.add(new ByteArrayInputStream(outputStream.toByteArray()));
                outputStream.close();
            }
        }
        zipInputStream.close();
        return inputStreams;
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new RuntimeException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new RuntimeException("File not found " + fileName, ex);
        }
    }

}
