package com.quiz;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.quiz.user.entities.Administrator;
import com.quiz.user.entities.Role;
import com.quiz.user.services.AdministratorService;
import com.quiz.user.services.RoleService;

@Component
public class CommandLineAppStartupRunner implements CommandLineRunner {

	@Autowired
	private RoleService roleservice;
	@Autowired
	private AdministratorService administratorService;

	@Override
	public void run(String... args) throws Exception {
		/***************************** default role ***************************/
		Role role = new Role();
		role.setId((long) 1);
		role.setName("Administrator");
		role.setDescription("Administrator Role");
		roleservice.save(role);
		role = new Role();
		role.setId((long) 2);
		role.setName("Enseignant");
		role.setDescription("Enseignant Role");
		roleservice.save(role);
		role = new Role();
		role.setId((long) 3);
		role.setName("Etudiant");
		role.setDescription("Etudiant Role");
		roleservice.save(role);
		role = new Role();
		role.setId((long) 4);
		role.setName("Recruteur");
		role.setDescription("Recruteur Role");
		roleservice.save(role);
		Administrator user = new Administrator();
		user.setRole(role);
		user.setFullname("Omar Abdelkefi");
		user.setPassword("123456");
		user.setId((long) 1);
		user.setUsername("testtest130138@gmail.com");
		user.setType("admin");
		administratorService.save(user);

		/*
		 * Phase Phase=new Phase(); Phase.setId( (long) 1); Phase.setName("refused");
		 * Phase.setOrderId((long) 0); Phasedao.saveAndFlush(Phase);
		 */
	}

}