package com.quiz.recruitment.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import com.quiz.user.entities.*;

@Entity
@Table
public class TestEvaluation implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@ManyToOne
	private Test test;

	@OneToMany(cascade = CascadeType.ALL)
	private List<Suggestion> suggestionsAnswered;

	@OneToMany(cascade = CascadeType.ALL)
	private List<Question> questionsAnswered;

	@ManyToOne
	private User user;

	private String score;

	public TestEvaluation(long id, Test test, List<Suggestion> suggestionsAnswered, List<Question> questionsAnswered,
			User user, String score) {
		super();
		this.id = id;
		this.test = test;
		this.suggestionsAnswered = suggestionsAnswered;
		this.questionsAnswered = questionsAnswered;
		this.user = user;
		this.score = score;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Test getTest() {
		return test;
	}

	public void setTest(Test test) {
		this.test = test;
	}

	public List<Suggestion> getSuggestionsAnswered() {
		return suggestionsAnswered;
	}

	public void setSuggestionsAnswered(List<Suggestion> suggestionsAnswered) {
		this.suggestionsAnswered = suggestionsAnswered;
	}

	public String getScore() {
		return score;
	}

	public void setScore(String score) {
		this.score = score;
	}

	public TestEvaluation() {
		super();
		// TODO Auto-generated constructor stub
	}

	public List<Question> getQuestionsAnswered() {
		return questionsAnswered;
	}

	public void setQuestionsAnswered(List<Question> questionsAnswered) {
		this.questionsAnswered = questionsAnswered;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
