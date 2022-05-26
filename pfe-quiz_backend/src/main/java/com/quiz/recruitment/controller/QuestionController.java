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

import com.quiz.recruitment.entities.Question;
import com.quiz.recruitment.service.QuestionService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class QuestionController {

	// Application Api
	@Autowired
	private QuestionService Questionservice;

	// ************************************Api
	// Question********************************************************//
	// add new Question
	@PostMapping("/question/add")
	public Question createQuestion(@RequestBody Question Question) {
		Question.setFilter(true);
		return Questionservice.save(Question);
	}

	// Get All Questions
	@GetMapping("/question/liste")
	public List<Question> getQuestions() {
		return Questionservice.getQuestions();
	}

	// find by id
	@GetMapping("/question/{id}")
	public Optional<Question> getQuestion(@PathVariable Long id) {
		return Questionservice.find(id);

	}

	// Delete Question
	@DeleteMapping("/question/delete/{id}")
	public boolean deleteQuestion(@PathVariable long id) {
		Questionservice.delete(id);

		return true;
	}

	// update Question
	@PutMapping("/question/update")
	public Question updateQuestion(@RequestBody Question Question) {
		return Questionservice.save(Question);

	}
}
