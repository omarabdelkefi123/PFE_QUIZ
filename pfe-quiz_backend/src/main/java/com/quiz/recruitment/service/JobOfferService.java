package com.quiz.recruitment.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quiz.recruitment.dao.JobOfferDao;
import com.quiz.recruitment.entities.JobOffer;

@Service
public class JobOfferService {
	@Autowired
	JobOfferDao jobOfferRepository;

	public JobOffer save(JobOffer JobOffer) {
		return jobOfferRepository.save(JobOffer);
	}

	public JobOffer update(JobOffer JobOffer) {
		return jobOfferRepository.save(JobOffer);
	}

	public Optional<JobOffer> find(Long id) {
		return jobOfferRepository.findById(id);
	}

	public List<JobOffer> getJobOffers() {
		return jobOfferRepository.findAll();
	}

	public boolean delete(Long id) {
		jobOfferRepository.deleteById(id);
		return true;
	}
}
