package com.supportportal.repository;

 import com.supportportal.domain.Regle;
 import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegleRepository extends JpaRepository<Regle, Long> {}
