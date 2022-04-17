package com.quiz.user.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Recruteur extends User implements Serializable {
	private static final long serialVersionUID = 1L;

	public Recruteur() {
		super();
	}

	@Transient
	@Override
	@JsonIgnore
	public String getNickName() {
		return "Recruteur";
	}

}
