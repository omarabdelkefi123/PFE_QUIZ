package com.quiz.user.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.quiz.user.entities.Enseignant;

public interface EnseignantDao extends JpaRepository<Enseignant, Long> {

}
