package com.canva.canvaapi.repo;

import com.canva.canvaapi.model.entity.UserEntity;
import com.canva.canvaapi.model.entity.UserMetadata;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserMetadataRepo extends JpaRepository<UserMetadata, Long> {

    @Query("select um from UserMetadata um where um.user.userName = :username and um.metadataKey = :metadataKey")
    Optional<UserMetadata> findByUsernameAndMetadataKey(String username, String metadataKey);

    @Query("select u from UserMetadata u where u.user.userName = :username")
    List<UserMetadata> findUserMetadataByUserId(String username);

    @Query("select um from UserMetadata um where um.user.userName = :username and um.metadataKey = :metadataKey")
    Optional<UserMetadata> getMetadataByUserAndKey(String username, String metadataKey);

    @Modifying
    @Transactional
    @Query("delete from UserMetadata mu where mu.user.userName = :username and mu.metadataKey in ('CANVA_ACCESS_TOKEN','CANVA_CONNECT_FOLDER','CANVA_CONNECT_UID','CANVA_REFRESH_TOKEN','CANVA_TOKEN_EXPIRED_AT') ")
    void deleteCanvaMetadata(String username);

    @Modifying
    @Transactional
    @Query("delete from UserMetadata mu where mu.metadataValue = :username and mu.metadataKey in ('CANVA_APP_UID') ")
    void disconnectApp(String username);
}