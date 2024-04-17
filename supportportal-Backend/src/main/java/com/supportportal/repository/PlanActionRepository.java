package com.supportportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.supportportal.domain.PlanAction;

@Repository
public interface PlanActionRepository  extends JpaRepository<PlanAction, Long> {

}
