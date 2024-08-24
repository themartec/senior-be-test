package com.canva.canvaapi.controller.canva;

import com.canva.canvaapi.model.Constant;
import com.canva.canvaapi.model.entity.UserEntity;
import com.canva.canvaapi.model.entity.UserMetadata;
import com.canva.canvaapi.repo.UserMetadataRepo;
import com.canva.canvaapi.repo.UserCanvaRepo;
import com.canva.canvaapi.utils.JWTUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@RequestMapping("/canva/plugin/")
public class CanvaAppAuthController {
    private final UserMetadataRepo userMetadataRepo;

    private final AuthenticationManager authenticationManager;

    @Autowired
    UserCanvaRepo userCanvaRepo;

    @GetMapping(value = "/configuration/validate")
    public ModelAndView index(@RequestParam(required = false) String state,
                              @RequestParam() String nonce,
                              @RequestParam(name = "canva_user_token") String canvaUserToken,
                              @CookieValue(name = "nonceWithExpiry", required = false) String nonceWithExpiry,
                              Model model) {
        model.addAttribute("state", state);
        model.addAttribute("nonce", nonce);
        model.addAttribute("canvaUserToken", canvaUserToken);
        model.addAttribute("nonceWithExpiry", nonceWithExpiry);
        return new ModelAndView("canva-plugin-login");
    }

    @GetMapping("/configuration/start")
    public void startConnectUser(@RequestParam(required = false) String state,
                                 HttpServletResponse response) {
        long NONCE_EXPIRY_MS = 300000;
        // Generate a nonce
        String nonce = UUID.randomUUID().toString();

        long nonceExpiry = System.currentTimeMillis() + NONCE_EXPIRY_MS;

        String nonceWithExpiry = nonce + ":" + nonceExpiry;
        Cookie cookie = new Cookie("nonceWithExpiry", nonceWithExpiry);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge((int) (NONCE_EXPIRY_MS / 1000));
        cookie.setPath("/");

        String url = String
                .format("https://www.canva.com/apps/configure/link?nonce=%s&state=%s",
                        URLEncoder.encode(nonceWithExpiry, StandardCharsets.UTF_8),
                        URLEncoder.encode(state, StandardCharsets.UTF_8)
                );

        response.addCookie(cookie);
        response.setHeader("Location", url);
        response.setStatus(302);
    }

    @PostMapping("/login")
    public void submitLoginForm(@RequestParam String username,
                                  @RequestParam String password,
                                  @RequestParam String nonce,
                                  @RequestParam String canvaUserToken,
                                  @RequestParam String nonceWithExpiry,
                                  @RequestParam String state,
                                  HttpServletResponse response) throws Exception {

        //perform auth
        try{
            Authentication authenticationRequest =
                    UsernamePasswordAuthenticationToken.unauthenticated(username, password);
            this.authenticationManager.authenticate(authenticationRequest);
        }catch (AuthenticationException exception){
            // Construct the redirect URL with all parameters
            String url = String.format("/canva/plugin/configuration/validate?state=%s&nonce=%s&canva_user_token=%s&nonceWithExpiry=%s&errors=%s",
                    URLEncoder.encode(state, StandardCharsets.UTF_8),
                    URLEncoder.encode(nonce, StandardCharsets.UTF_8),
                    URLEncoder.encode(canvaUserToken, StandardCharsets.UTF_8),
                    URLEncoder.encode(nonceWithExpiry, StandardCharsets.UTF_8),
                    URLEncoder.encode(exception.getMessage(), StandardCharsets.UTF_8)
            );
            response.sendRedirect(url);
            return;
        }

        clearCookie(response, "nonceWithExpiry");
        //link the id to account if auth sucess
        UserEntity user = userCanvaRepo.findByUserName(username);
        var jwtData = JWTUtils.decodeJWT(canvaUserToken);

        userMetadataRepo.save(UserMetadata.builder()
                        .user(user)
                        .metadataKey(Constant.UserMetadataKey.CANVA_APP_UID.name())
                        .metadataValue((String) jwtData.get("userId"))
                .build());

        String url = String.format("https://www.canva.com/apps/configured?success=%s&state=%s&errors=%s",
                URLEncoder.encode("false", StandardCharsets.UTF_8),
                URLEncoder.encode(state, StandardCharsets.UTF_8),
                URLEncoder.encode("cant_authenticate", StandardCharsets.UTF_8)
        );

        if (nonceWithExpiry.equals(nonce)) {
            url = String.format("https://www.canva.com/apps/configured?success=%s&state=%s",
                    URLEncoder.encode("true", StandardCharsets.UTF_8),
                    URLEncoder.encode(state, StandardCharsets.UTF_8)
            );
        }

        response.sendRedirect(url);
    }



    private void clearCookie(HttpServletResponse response, String key) {
        Cookie cookie = new Cookie(key, null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);
    }
}