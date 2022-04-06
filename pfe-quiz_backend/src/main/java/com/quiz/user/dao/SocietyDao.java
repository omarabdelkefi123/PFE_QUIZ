package com.quiz.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.quiz.user.entities.Society;

public interface SocietyDao extends JpaRepository<Society, Long> {

}
