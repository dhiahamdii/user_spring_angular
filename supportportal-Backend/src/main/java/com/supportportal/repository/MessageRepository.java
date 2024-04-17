package com.supportportal.repository;

import com.supportportal.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Integer>  {
}
