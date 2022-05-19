package com.quiz.recruitment.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quiz.recruitment.entities.Test;

public interface TestDao extends JpaRepository<Test, Long> {

}
