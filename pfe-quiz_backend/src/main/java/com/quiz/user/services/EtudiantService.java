package com.quiz.user.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.quiz.user.dao.EtudiantDao;
import com.quiz.user.entities.Etudiant;

@Service
public class EtudiantService {
	@Autowired
	EtudiantDao EtudiantDao;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	public Etudiant save(Etudiant Etudiant) {
		Etudiant.setPassword(bcryptEncoder.encode(Etudiant.getPassword()));
		Etudiant.setType("Etudiant");
		return EtudiantDao.save(Etudiant);
	}

	public Etudiant update(Etudiant Etudiant) {
		Optional<Etudiant> em = EtudiantDao.findById(Etudiant.getId());
		Etudiant.setPassword(em.get().getPassword());
		return EtudiantDao.save(Etudiant);

	}

	public Optional<Etudiant> find(Long id) {
		return EtudiantDao.findById(id);
	}

	public List<Etudiant> getEtudiants() {
		return EtudiantDao.findAll();
	}

	public boolean delete(Long id) {
		EtudiantDao.deleteById(id);
		return true;
	}

}
