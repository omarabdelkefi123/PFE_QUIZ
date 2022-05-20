package com.quiz.user.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.quiz.exception.ServiceExeption;
import com.quiz.user.dao.UserDao;
import com.quiz.user.entities.User;

@Service
public class UserService {
	@Autowired
	UserDao Userdao;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	public User save(User User) throws ServiceExeption {
		User.setPassword(bcryptEncoder.encode(User.getPassword()));
		User.setType("admin");
		try {

		} catch (Exception e) {
			throw new ServiceExeption("error in database");
		}
		return Userdao.save(User);

	}

	public User update(User User) {
		Optional<User> adm = Userdao.findById(User.getId());
		User.setPassword(adm.get().getPassword());
		return Userdao.save(User);

	}

	public Optional<User> find(Long id) {
		return Userdao.findById(id);
	}

	public List<User> getUsers() {
		return Userdao.findAll();
	}

	public boolean delete(Long id) {
		Userdao.deleteById(id);
		return true;
	}

}
