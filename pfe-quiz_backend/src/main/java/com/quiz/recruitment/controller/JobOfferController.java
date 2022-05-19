package com.quiz.recruitment.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quiz.recruitment.entities.JobOffer;
import com.quiz.recruitment.service.JobOfferService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class JobOfferController {
	// Application Api
	@Autowired
	private JobOfferService JobOfferservice;

	// ************************************Api
	// JobOffer********************************************************//
	// add new JobOffer
	@PostMapping("/jobOffer/add")
	public JobOffer createJobOffer(@RequestBody JobOffer JobOffer) {
		return JobOfferservice.save(JobOffer);
	}

	// Get All JobOffers
	@GetMapping("/jobOffer/liste")
	public List<JobOffer> getJobOffers() {
		return JobOfferservice.getJobOffers();
	}

	// find by id
	@GetMapping("/jobOffer/{id}")
	public Optional<JobOffer> getJobOffer(@PathVariable Long id) {
		return JobOfferservice.find(id);

	}

	// Delete JobOffer
	@DeleteMapping("/jobOffer/delete/{id}")
	public boolean deleteJobOffer(@PathVariable long id) {
		JobOfferservice.delete(id);

		return true;
	}

	// update JobOffer
	@PutMapping("/jobOffer/update")
	public JobOffer updateJobOffer(@RequestBody JobOffer JobOffer) {
		return JobOfferservice.save(JobOffer);

	}
}
