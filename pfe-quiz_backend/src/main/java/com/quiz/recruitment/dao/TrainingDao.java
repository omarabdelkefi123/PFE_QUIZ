package com.quiz.recruitment.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quiz.recruitment.entities.Training;

public interface TrainingDao extends JpaRepository<Training, Long> {

}
