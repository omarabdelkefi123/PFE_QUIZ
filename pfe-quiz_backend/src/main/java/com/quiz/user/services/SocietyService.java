package com.quiz.user.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quiz.user.dao.SocietyDao;
import com.quiz.user.entities.Society;

@Service
public class SocietyService {
	@Autowired
	SocietyDao societyDao;

	public Society save(Society Society) {
		return societyDao.save(Society);
	}

	public Society update(Society Society) {
		return societyDao.save(Society);
	}

	public Optional<Society> find(Long id) {
		return societyDao.findById(id);
	}

	public List<Society> getSocietys() {
		return societyDao.findAll();
	}

	public boolean delete(Long id) {
		societyDao.deleteById(id);
		return true;
	}

}
