package com.canva.canvaapi.config;

import com.canva.canvaapi.model.entity.UserMetadata;
import com.canva.canvaapi.model.response.AppUserDetails;
import com.canva.canvaapi.repo.UserMetadataRepo;
import com.canva.canvaapi.service.CanvaTokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static com.canva.canvaapi.model.Constant.UserMetadataKey.CANVA_TOKEN_EXPIRED_AT;

@Component
public class CanvaTokenFilter extends OncePerRequestFilter {

    private final CanvaTokenService tokenService;
    private final UserMetadataRepo userMetadataRepo;

    public CanvaTokenFilter(CanvaTokenService tokenService, UserMetadataRepo userMetadataRepo) {
        this.tokenService = tokenService;
        this.userMetadataRepo = userMetadataRepo;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        if (session == null) {
            filterChain.doFilter(request, response);
            return;
        }

        SecurityContextImpl sci = (SecurityContextImpl) session.getAttribute("SPRING_SECURITY_CONTEXT");
        if (sci != null) {
            AppUserDetails currentUser = (AppUserDetails) sci.getAuthentication().getPrincipal();
            UserMetadata tokenExpriedAt = userMetadataRepo.findByUsernameAndMetadataKey(currentUser.getUsername(), CANVA_TOKEN_EXPIRED_AT.name()).orElse(null);

            if (tokenExpriedAt == null) {
                filterChain.doFilter(request, response);
                return;
            } else {
                long expiredAt = Long.parseLong(tokenExpriedAt.getMetadataValue());
                if (expiredAt < System.currentTimeMillis() - (1000 * 60 * 15)) {
                    tokenService.refreshToken(currentUser.getUsername());
                }
            }

        }
        filterChain.doFilter(request, response);
    }
}
