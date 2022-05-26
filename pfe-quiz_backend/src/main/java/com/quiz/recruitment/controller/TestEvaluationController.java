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

import com.quiz.recruitment.entities.TestEvaluation;
import com.quiz.recruitment.service.TestEvaluationService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class TestEvaluationController {
	// Application Api
	@Autowired
	private TestEvaluationService TestEvaluationservice;

	// ************************************Api
	// TestEvaluation********************************************************//
	// add new TestEvaluation
	@PostMapping("/testevaluation/add")
	public TestEvaluation createTestEvaluation(@RequestBody TestEvaluation TestEvaluation) {
		return TestEvaluationservice.save(TestEvaluation);
	}

	// Get All TestEvaluations
	@GetMapping("/testevaluation/liste")
	public List<TestEvaluation> getTestEvaluations() {
		return TestEvaluationservice.getTestEvaluations();
	}

	// find by id
	@GetMapping("/testevaluation/{id}")
	public Optional<TestEvaluation> getTestEvaluation(@PathVariable Long id) {
		return TestEvaluationservice.find(id);

	}

	// Delete TestEvaluation
	@DeleteMapping("/testevaluation/delete/{id}")
	public boolean deleteTestEvaluation(@PathVariable long id) {
		TestEvaluationservice.delete(id);

		return true;
	}

	// update TestEvaluation
	@PutMapping("/testevaluation/update")
	public TestEvaluation updateTestEvaluation(@RequestBody TestEvaluation TestEvaluation) {
		return TestEvaluationservice.save(TestEvaluation);

	}
}
