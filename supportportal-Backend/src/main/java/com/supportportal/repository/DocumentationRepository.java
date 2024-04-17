package com.supportportal.repository;

 import com.supportportal.domain.Documentation;
 import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentationRepository extends JpaRepository<Documentation,Long> {


}
