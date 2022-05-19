package com.quiz.recruitment.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quiz.recruitment.dao.ResumeDao;
import com.quiz.recruitment.entities.Resume;

@Service
public class ResumeService {
	@Autowired
	ResumeDao ResumeRepository;

	public Resume save(Resume Resume) {
		return ResumeRepository.save(Resume);
	}

	public Resume update(Resume Resume) {
		return ResumeRepository.save(Resume);
	}

	public Optional<Resume> find(Long id) {
		return ResumeRepository.findById(id);
	}

	public List<Resume> getResumes() {
		return ResumeRepository.findAll();
	}

	public boolean delete(Long id) {
		ResumeRepository.deleteById(id);
		return true;
	}
}
