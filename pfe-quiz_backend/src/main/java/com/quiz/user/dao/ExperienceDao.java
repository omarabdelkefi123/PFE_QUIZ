package com.quiz.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quiz.user.entities.Experience;

@Repository
public interface ExperienceDao extends JpaRepository<Experience, Long> {

}
