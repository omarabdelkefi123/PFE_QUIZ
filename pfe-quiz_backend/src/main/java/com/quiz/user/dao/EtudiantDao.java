package com.quiz.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quiz.user.entities.Etudiant;

public interface EtudiantDao extends JpaRepository<Etudiant, Long> {

}
