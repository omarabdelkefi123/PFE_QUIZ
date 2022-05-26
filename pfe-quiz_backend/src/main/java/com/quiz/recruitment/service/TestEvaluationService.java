package com.quiz.recruitment.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quiz.recruitment.dao.TestEvaluationDao;
import com.quiz.recruitment.entities.TestEvaluation;

@Service
public class TestEvaluationService {
	@Autowired
	TestEvaluationDao TestEvaluationRepository;

	public TestEvaluation save(TestEvaluation TestEvaluation) {
		return TestEvaluationRepository.save(TestEvaluation);
	}

	public TestEvaluation update(TestEvaluation TestEvaluation) {
		return TestEvaluationRepository.save(TestEvaluation);
	}

	public Optional<TestEvaluation> find(Long id) {
		return TestEvaluationRepository.findById(id);
	}

	public List<TestEvaluation> getTestEvaluations() {
		return TestEvaluationRepository.findAll();
	}

	public boolean delete(Long id) {
		TestEvaluationRepository.deleteById(id);
		return true;
	}
}
