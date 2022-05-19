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

import com.quiz.recruitment.entities.Training;
import com.quiz.recruitment.service.TrainingService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class TrainingController {
	// Application Api
	@Autowired
	private TrainingService Trainingservice;

	// ************************************Api
	// Training********************************************************//
	// add new Training
	@PostMapping("/training/add")
	public Training createTraining(@RequestBody Training Training) {
		return Trainingservice.save(Training);
	}

	// Get All Trainings
	@GetMapping("/training/liste")
	public List<Training> getTrainings() {
		return Trainingservice.getTrainings();
	}

	// find by id
	@GetMapping("/training/{id}")
	public Optional<Training> getTraining(@PathVariable Long id) {
		return Trainingservice.find(id);

	}

	// Delete Training
	@DeleteMapping("/training/delete/{id}")
	public boolean deleteTraining(@PathVariable long id) {
		Trainingservice.delete(id);

		return true;
	}

	// update Training
	@PutMapping("/training/update")
	public Training updateTraining(@RequestBody Training Training) {
		return Trainingservice.save(Training);

	}
}
