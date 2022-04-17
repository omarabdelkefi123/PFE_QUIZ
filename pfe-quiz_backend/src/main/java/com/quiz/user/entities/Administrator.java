package com.quiz.user.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Administrator extends User {

	@OneToMany(cascade = CascadeType.ALL)
	private List<Experience> experiences;

	public Administrator() {
		super();
	}
	

	public Administrator(List<Experience> experiences) {
		super();
		this.experiences = experiences;
	}

	public List<Experience> getExperiences() {
		return experiences;
	}

	public void setExperiences(List<Experience> experiences) {
		this.experiences = experiences;
	}

	@Transient
	@Override
	@JsonIgnore
	public String getNickName() {
		return "Administrator";
	}

}
