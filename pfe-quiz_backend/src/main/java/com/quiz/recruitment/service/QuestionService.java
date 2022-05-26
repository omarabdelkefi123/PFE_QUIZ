package com.quiz.recruitment.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
		List<Question> questions = QuestionRepository.findAll().stream().filter(que -> que.isFilter() == true)
				.collect(Collectors.toList());
		return questions;
	}

	public boolean delete(Long id) {
		QuestionRepository.deleteById(id);
		return true;
	}
}
