package com.quiz.user.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonBackReference;

//*********************************************************************************//

@Entity
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "role_name" }) })
public class Role implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	// to insert id
	@Column(name = "id", insertable = true, updatable = true, unique = true, nullable = false)
	private Long id;
	@Column(name = "role_name")
	private String name;

	private String description;

	// bi-directional many-to-one association to User
	@JsonBackReference
	@OneToMany(mappedBy = "role")
	private List<User> persons;

	public Role() {
		super();
	}

	
	
	public Role(Long id, String name, String description, List<User> persons) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.persons = persons;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public List<User> getPersons() {
		return persons;
	}

	public void setPersons(List<User> persons) {
		this.persons = persons;
	}

}
