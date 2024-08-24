package com.canva.canvaapi.repo;

import com.canva.canvaapi.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCanvaRepo extends JpaRepository<UserEntity, Long> {
    @Query("select count(u) > 0 from UserEntity u join UserMetadata um on u = um.user where um.metadataKey = 'CANVA_APP_UID' and um.metadataValue = :canvaAppId")
    boolean isCanvaAppConnected(String canvaAppId);

    @Query("select count(u) > 0 from UserEntity u join UserMetadata um on u = um.user where um.metadataKey = 'CANVA_CONNECT_UID' and um.metadataValue = :canvaConnectId")
    boolean isCanvaConnectConnected(String canvaConnectId);

    @Query("select u from UserEntity u join UserMetadata um on u = um.user where um.metadataKey = 'CANVA_APP_UID' and um.metadataValue = :canvaAppId")
    UserEntity findUserByCanvaId(String canvaAppId);

    @Query("select u from UserEntity u where u.userName = :username")
    UserEntity findByUserName(String username);

    @Query("select count(u) > 0 from UserEntity u where u.userName = :username")
    boolean usernameExist(String username);

}
