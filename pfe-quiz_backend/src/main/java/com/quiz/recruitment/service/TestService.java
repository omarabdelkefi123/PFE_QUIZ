package com.quiz.recruitment.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quiz.recruitment.dao.TestDao;
import com.quiz.recruitment.entities.Test;
import com.quiz.user.dto.MailRequest;
import com.quiz.user.entities.PasswordResetToken;
import com.quiz.user.entities.User;
import com.quiz.user.services.EmailService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class TestService {
	@Autowired
	TestDao TestRepository;

	@Autowired
	private EmailService emailService;

	@Autowired
	private PasswordEncoder bcryptEncoder;

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

	public Test sendTestToStudent(String str) throws JsonMappingException, JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		JsonNode node = mapper.readTree(str);
		Test test = mapper.convertValue(node.get("test"), Test.class);
		User student = mapper.convertValue(node.get("student"), User.class);
		Date dateExpiration = mapper.convertValue(node.get("dateExpiration"), Date.class);
		sendEmailForTest(test, student, dateExpiration);
		return test;
	}

	public String sendEmailForTest(Test test, User student, Date dateExpiration) {

		// server
		String linkTest = "http://localhost:4200/#/recruitment/pass-test/" + test.getId();

		String Name = student.getFullname();

		MailRequest mailRequest = new MailRequest();

		mailRequest.setFrom("testtest130138@gmail.com");

		mailRequest.setSubject("Technical assessment");
		mailRequest.setTo(student.getUsername());
		mailRequest.setName(student.getFullname());
		// resetUrland logInUrl location and ....==>variables pass to template

		Map<String, Object> model = new HashMap<>();
		model.put("Name", student.getFullname());
		model.put("location", "TUNISIA , tunis ");
		// url3=http://localhost:4200/#/newPassword/:token
		model.put("nameTest", test.getName());
		model.put("linkTest", linkTest);
		DateFormat dateFormat = new SimpleDateFormat("dd MMMM yyyy");  
		String strDate = dateFormat.format(dateExpiration);  
		model.put("expirationPeride", strDate);
		model.put("username", student.getUsername());
		model.put("linkforgetpassword","http://localhost:4200/#/forgetpassword");
		emailService.sendEmailForTest(mailRequest, model);
		return null;
	}
}
