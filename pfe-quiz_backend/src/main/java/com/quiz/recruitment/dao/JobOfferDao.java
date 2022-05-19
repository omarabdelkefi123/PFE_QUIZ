package com.quiz.recruitment.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quiz.recruitment.entities.JobOffer;

public interface JobOfferDao extends JpaRepository<JobOffer, Long> {

}
