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

import com.quiz.recruitment.entities.Resume;
import com.quiz.recruitment.service.ResumeService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ResumeController {
	// Application Api
	@Autowired
	private ResumeService Resumeservice;

	// ************************************Api
	// Resume********************************************************//
	// add new Resume
	@PostMapping("/resume/add")
	public Resume createResume(@RequestBody Resume Resume) {
		return Resumeservice.save(Resume);
	}

	// Get All Resumes
	@GetMapping("/resume/liste")
	public List<Resume> getResumes() {
		return Resumeservice.getResumes();
	}

	// find by id
	@GetMapping("/resume/{id}")
	public Optional<Resume> getResume(@PathVariable Long id) {
		return Resumeservice.find(id);

	}

	// Delete Resume
	@DeleteMapping("/resume/delete/{id}")
	public boolean deleteResume(@PathVariable long id) {
		Resumeservice.delete(id);

		return true;
	}

	// update Resume
	@PutMapping("/resume/update")
	public Resume updateResume(@RequestBody Resume Resume) {
		return Resumeservice.save(Resume);

	}
}
