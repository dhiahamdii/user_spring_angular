package com.supportportal.repository;

import com.supportportal.domain.Documentation;
import com.supportportal.domain.Loi;
import com.supportportal.domain.Regle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface loiRepository extends JpaRepository<Loi, Long> {
    @Query("SELECT r FROM Regle r WHERE r.Nom = :nom AND r.loi = :loi")
    List<Regle> findByNomAndLoi(@Param("nom") String nom, @Param("loi") Loi loi);
    @Query("SELECT l FROM Loi l WHERE l.name = :name")
    Loi findByName(String name);
    @Query("SELECT d FROM Documentation d ORDER BY d.id DESC")
    Documentation findFirstByOrderByCreatedAtDesc();
}
