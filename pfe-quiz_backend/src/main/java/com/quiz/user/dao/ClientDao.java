package com.quiz.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quiz.user.entities.Client;

public interface ClientDao extends JpaRepository<Client, Long> {

}
