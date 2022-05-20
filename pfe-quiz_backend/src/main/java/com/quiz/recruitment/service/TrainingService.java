package com.quiz.recruitment.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quiz.recruitment.dao.TrainingDao;
import com.quiz.recruitment.entities.Training;
@Service
public class TrainingService {
	@Autowired
	TrainingDao TrainingRepository;

	public Training save(Training Training) {
		return TrainingRepository.save(Training);
	}

	public Training update(Training Training) {
		return TrainingRepository.save(Training);
	}

	public Optional<Training> find(Long id) {
		return TrainingRepository.findById(id);
	}

	public List<Training> getTrainings() {
		return TrainingRepository.findAll();
	}

	public boolean delete(Long id) {
		TrainingRepository.deleteById(id);
		return true;
	}
}
