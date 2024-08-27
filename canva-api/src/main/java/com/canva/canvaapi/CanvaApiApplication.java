package com.canva.canvaapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Properties;

@SpringBootApplication
public class CanvaApiApplication {

    public static void main(String[] args) throws InterruptedException {
        Thread.sleep(2000);
        SpringApplication.run(CanvaApiApplication.class, args);
    }

}

@RestController
@RequestMapping("/public/heath")
class HeathController {

    @GetMapping
    public ResponseEntity<Properties> getAllEnv() {
        return ResponseEntity.ok(System.getProperties());
    }

}
