package com.quiz.recruitment.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quiz.recruitment.dao.QuestionDao;
import com.quiz.recruitment.entities.Question;

@Service
public class QuestionService {

	@Autowired
	QuestionDao QuestionRepository;

	public Question save(Question Question) {
		return QuestionRepository.save(Question);
	}

	public Question update(Question Question) {
		return QuestionRepository.save(Question);
	}

	public Optional<Question> find(Long id) {
		return QuestionRepository.findById(id);
	}

	public List<Question> getQuestions() {
		return QuestionRepository.findAll();
	}

	public boolean delete(Long id) {
		QuestionRepository.deleteById(id);
		return true;
	}
}
