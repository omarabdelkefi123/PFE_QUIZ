package com.quiz.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quiz.user.entities.Administrator;

public interface AdministratorDao extends JpaRepository<Administrator, Long> {

}
