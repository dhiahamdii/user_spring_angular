package com.supportportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.supportportal.domain.Produit;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {

}
