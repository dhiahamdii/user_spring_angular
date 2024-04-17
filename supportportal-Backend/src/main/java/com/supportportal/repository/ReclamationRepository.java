package com.supportportal.repository;

import com.supportportal.domain.Reclamation;
import com.supportportal.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.supportportal.domain.Produit;

@Repository
public interface ReclamationRepository extends JpaRepository<Reclamation, Long> {

    Reclamation findRecByEmail(String email);

    @Override
    long count();
}
