package com.quiz.user.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.quiz.user.dao.AdministratorDao;
import com.quiz.user.dao.UserDao;
import com.quiz.user.entities.Administrator;
import com.quiz.user.entities.User;

@Service
public class UserService {
	@Autowired
	private PasswordEncoder bcryptEncoder;
	@Autowired
	UserDao userdao;

	@Autowired
	AdministratorDao administratordao;

	public User save(User User) {
		User.setPassword(bcryptEncoder.encode(User.getPassword()));
		User.setType("user");
		return userdao.save(User);
	}

	public void update(User user) {

	}

	public Optional<User> find(Long id) {
		return userdao.findById(id);
	}

	public List<User> getUsers() {
		return userdao.findAll();
	}

	public boolean delete(Long id) {
		userdao.deleteById(id);
		return true;
	}

}
