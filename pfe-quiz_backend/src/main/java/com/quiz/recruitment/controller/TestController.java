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

import com.quiz.recruitment.entities.Test;
import com.quiz.recruitment.service.TestService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class TestController {
	// Application Api
	@Autowired
	private TestService Testservice;

	// ************************************Api
	// Test********************************************************//
	// add new Test
	@PostMapping("/Test/add")
	public Test createTest(@RequestBody Test Test) {
		return Testservice.save(Test);
	}

	// Get All Tests
	@GetMapping("/Test/liste")
	public List<Test> getTests() {
		return Testservice.getTests();
	}

	// find by id
	@GetMapping("/Test/{id}")
	public Optional<Test> getTest(@PathVariable Long id) {
		return Testservice.find(id);

	}

	// Delete Test
	@DeleteMapping("/Test/delete/{id}")
	public boolean deleteTest(@PathVariable long id) {
		Testservice.delete(id);

		return true;
	}

	// update Test
	@PutMapping("/Test/update")
	public Test updateTest(@RequestBody Test Test) {
		return Testservice.save(Test);

	}
}
