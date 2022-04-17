package com.quiz.user.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.quiz.user.dao.EnseignantDao;
import com.quiz.user.entities.Enseignant;

@Service
public class EnseignantService {
	@Autowired
	EnseignantDao EnseignantDao;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	public Enseignant save(Enseignant Enseignant) {
		Enseignant.setPassword(bcryptEncoder.encode(Enseignant.getPassword()));
		Enseignant.setType("Enseignant");
		return EnseignantDao.save(Enseignant);
	}

	public Enseignant update(Enseignant Enseignant) {
		Optional<Enseignant> em = EnseignantDao.findById(Enseignant.getId());
		Enseignant.setPassword(em.get().getPassword());
		return EnseignantDao.save(Enseignant);

	}

	public Optional<Enseignant> find(Long id) {
		return EnseignantDao.findById(id);
	}

	public List<Enseignant> getEnseignants() {
		return EnseignantDao.findAll();
	}

	public boolean delete(Long id) {
		EnseignantDao.deleteById(id);
		return true;
	}

}
