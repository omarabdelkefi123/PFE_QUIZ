package com.quiz.recruitment.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quiz.recruitment.entities.Question;

public interface QuestionDao extends JpaRepository<Question, Long> {

}
