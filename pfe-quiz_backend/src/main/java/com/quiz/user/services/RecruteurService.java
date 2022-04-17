package com.quiz.user.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.quiz.user.dao.RecruteurDao;
import com.quiz.user.entities.Recruteur;

@Service
public class RecruteurService {
	@Autowired
	RecruteurDao RecruteurDao;
	@Autowired
	private PasswordEncoder bcryptEncoder;

	public Recruteur save(Recruteur Recruteur) {
		Recruteur.setPassword(bcryptEncoder.encode(Recruteur.getPassword()));
		Recruteur.setType("Recruteur");
		return RecruteurDao.save(Recruteur);
	}

	public Recruteur update(Recruteur Recruteur) {
		System.out.print("update Recruteur service");
		Optional<Recruteur> cl = RecruteurDao.findById(Recruteur.getId());
		Recruteur.setPassword(cl.get().getPassword());
		return RecruteurDao.save(Recruteur);

	}

	public Optional<Recruteur> find(Long id) {
		return RecruteurDao.findById(id);
	}

	public List<Recruteur> getRecruteurs() {
		return RecruteurDao.findAll();
	}

	public boolean delete(Long id) {
		RecruteurDao.deleteById(id);
		return true;
	}
}
