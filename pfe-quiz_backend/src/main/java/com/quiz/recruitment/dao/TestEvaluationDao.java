package com.quiz.recruitment.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quiz.recruitment.entities.JobOffer;
import com.quiz.recruitment.entities.TestEvaluation;

public interface TestEvaluationDao extends JpaRepository<TestEvaluation, Long> {

}
