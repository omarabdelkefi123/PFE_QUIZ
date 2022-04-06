package com.quiz.user.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Employee extends User {

	private boolean projectmanager;

	
	
	public Employee(boolean projectmanager, Department departments, List<Experience> experiences) {
		super();
		this.projectmanager = projectmanager;
		this.departments = departments;
		this.experiences = experiences;
	}

	@ManyToOne
	private Department departments;

	@Transient
	@Override
	@JsonIgnore
	public String getNickName() {
		return "Employee";
	}

	@OneToMany(cascade = CascadeType.ALL)
	private List<Experience> experiences;

	public Employee() {
		super();
	}

	

	public Department getDepartments() {
		return departments;
	}

	public void setDepartments(Department departments) {
		this.departments = departments;
	}

	public List<Experience> getExperiences() {
		return experiences;
	}

	public void setExperiences(List<Experience> experiences) {
		this.experiences = experiences;
	}

	public boolean isProjectmanager() {
		return projectmanager;
	}

	public void setProjectmanager(boolean projectmanager) {
		this.projectmanager = projectmanager;
	}

}
