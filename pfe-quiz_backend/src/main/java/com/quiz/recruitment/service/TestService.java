package com.quiz.recruitment.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quiz.recruitment.dao.TestDao;
import com.quiz.recruitment.entities.Test;

@Service
public class TestService {
	@Autowired
	TestDao TestRepository;

	public Test save(Test Test) {
		return TestRepository.save(Test);
	}

	public Test update(Test Test) {
		return TestRepository.save(Test);
	}

	public Optional<Test> find(Long id) {
		return TestRepository.findById(id);
	}

	public List<Test> getTests() {
		return TestRepository.findAll();
	}

	public boolean delete(Long id) {
		TestRepository.deleteById(id);
		return true;
	}
}
