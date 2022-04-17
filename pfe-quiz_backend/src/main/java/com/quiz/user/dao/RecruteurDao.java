package com.quiz.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quiz.user.entities.Recruteur;

public interface RecruteurDao extends JpaRepository<Recruteur, Long> {

}
