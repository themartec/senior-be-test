package com.canva.canvaapi.service;

import com.canva.canvaapi.model.entity.UserMetadata;
import com.canva.canvaapi.model.response.AppUserDetails;
import com.canva.canvaapi.model.entity.UserEntity;
import com.canva.canvaapi.repo.UserCanvaRepo;
import com.canva.canvaapi.repo.UserMetadataRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userDetailService")
public class AppUserDetailService implements UserDetailsService {
    private final UserCanvaRepo userCanvaRepo;
    private final UserMetadataRepo userMetadataRepo;

    public AppUserDetailService(UserCanvaRepo userCanvaRepo, UserMetadataRepo userMetadataRepo) {
        this.userCanvaRepo = userCanvaRepo;
        this.userMetadataRepo = userMetadataRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userCanvaRepo.findByUserName(username);
        List<UserMetadata> userMetadata = userMetadataRepo.findUserMetadataByUserId(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new AppUserDetails(user, userMetadata);

    }
}
