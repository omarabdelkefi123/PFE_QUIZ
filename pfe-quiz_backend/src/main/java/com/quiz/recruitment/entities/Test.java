package com.quiz.recruitment.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table
public class Test implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private static final long serialVersionUID = 1L;

	@ManyToMany
	@JoinTable(name = "test_question", joinColumns = { @JoinColumn(name = "test_id") }, inverseJoinColumns = {
			@JoinColumn(name = "question_id") })
	private List<Question> questions;

	private String name;

	private String scoreResult;
	public Test() {
		super();
		// TODO Auto-generated constructor stub
	}

	

	public Test(long id, List<Question> questions, String name, String scoreResult) {
		super();
		this.id = id;
		this.questions = questions;
		this.name = name;
		this.scoreResult = scoreResult;
	}



	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public List<Question> getQuestions() {
		return questions;
	}

	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}



	public String getScoreResult() {
		return scoreResult;
	}



	public void setScoreResult(String scoreResult) {
		this.scoreResult = scoreResult;
	}

}
