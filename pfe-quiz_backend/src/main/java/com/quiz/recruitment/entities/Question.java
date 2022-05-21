package com.quiz.recruitment.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.quiz.recruitment.enums.TypeQuestionEnum;

/*
 * 
 */

@Entity
@Table
public class Question implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private static final long serialVersionUID = 1L;

	private TypeQuestionEnum typeQuestion;

	private String question;

	@OneToMany(cascade = CascadeType.ALL)
	private List<Suggestion> suggestions;

	public Question() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Question(long id, TypeQuestionEnum typeQuestion, String question, List<Suggestion> suggestions) {
		super();
		this.id = id;
		this.typeQuestion = typeQuestion;
		this.question = question;
		this.suggestions = suggestions;
	}

	public TypeQuestionEnum getTypeQuestion() {
		return typeQuestion;
	}

	public void setTypeQuestion(TypeQuestionEnum typeQuestion) {
		this.typeQuestion = typeQuestion;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public List<Suggestion> getSuggestions() {
		return suggestions;
	}

	public void setSuggestions(List<Suggestion> suggestions) {
		this.suggestions = suggestions;
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

}
