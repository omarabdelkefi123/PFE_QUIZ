package com.quiz.user.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Transient;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Client extends User implements Serializable {
	private static final long serialVersionUID = 1L;

	public Client() {
		super();
	}

	

	@Transient
	@Override
	@JsonIgnore
	public String getNickName() {
		return "Client";
	}

}
