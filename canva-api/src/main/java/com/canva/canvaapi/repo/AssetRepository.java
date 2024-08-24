package com.canva.canvaapi.repo;

import com.canva.canvaapi.model.entity.Assets;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetRepository extends JpaRepository<Assets, Long> {

    @Query(value = "SELECT * FROM assets WHERE mime_type = :mimeType", nativeQuery = true)
    List<Assets> findByMimeType(String mimeType);

    @Query(value = "SELECT * FROM assets WHERE user_id = :userId order by created_at", nativeQuery = true)
    List<Assets> findByUserId(Long userId);

    @Query(value = "SELECT a FROM Assets a WHERE a.user.userName = :username order by a.createdAt desc ")
    List<Assets> findByUsername(String username);

    @Query(value = "select a from Assets a where a.user.userName = :username and (a.title like :keyword or a.url like :keyword) order by a.createdAt desc ")
    List<Assets> findByKeyword(String username, String keyword);

}
