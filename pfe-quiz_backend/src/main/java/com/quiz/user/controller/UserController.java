package com.quiz.user.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.quiz.user.entities.User;
import com.quiz.user.services.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserService userservice;

	// Get All Users

	@GetMapping("/user/liste")
	public List<User> getUsers() {
		return userservice.getUsers();
	}

	// find by id
	@GetMapping("/user/{id}")
	public Optional<User> getUser(@PathVariable Long id) {
		return userservice.find(id);

	}

	// Delete User
	@DeleteMapping("/user/delete/{id}")
	public boolean deleteUser(@PathVariable long id) {
		userservice.delete(id);

		return true;
	}

	// add new user
	@PostMapping("/user/create")
	public User createUser(@RequestBody User User) {
		return userservice.save(User);

	}

	// update User images
	@PutMapping("/user/update")
	public void updateUser(@RequestBody User user) {

		userservice.update(user);

	}

}
