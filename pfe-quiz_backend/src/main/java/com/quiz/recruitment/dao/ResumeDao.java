package com.quiz.recruitment.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quiz.recruitment.entities.Resume;

public interface ResumeDao extends JpaRepository<Resume, Long> {

}
