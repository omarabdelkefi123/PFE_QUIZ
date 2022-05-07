package com.quiz.user.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.quiz.exception.ServiceExeption;
import com.quiz.user.entities.Etudiant;
import com.quiz.user.entities.Document;
import com.quiz.user.entities.Notifications;
import com.quiz.user.services.EtudiantService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api")
public class EtudiantController {

	@Autowired
	private EtudiantService EtudiantService;

	private Notifications notifications = new Notifications(0);

	// Get All Etudiants
	@GetMapping("/etudiant/liste")
	public List<Etudiant> getEtudiants() {
		System.out.print("id= " + notifications.getId());
		System.out.print("count= " + notifications.getCount());

		return EtudiantService.getEtudiants();
	}

	// find by id
	@GetMapping("/etudiant/{id}")
	public Optional<Etudiant> getEtudiant(@PathVariable Long id) {
		return EtudiantService.find(id);

	}

	// Delete Etudiant
	@DeleteMapping("/etudiant/delete/{id}")
	public boolean deleteEtudiant(@PathVariable long id) {
		EtudiantService.delete(id);

		return true;
	}

	// add new Etudiant
	@PostMapping(value = "/etudiant/create", consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.MULTIPART_FORM_DATA_VALUE })
	public void fileUpload(@RequestPart("files") List<MultipartFile> files, @RequestPart("Etudiant") String admin)
			throws ServiceExeption, JsonMappingException, JsonProcessingException {

		List<Document> documents = new ArrayList<>();
		// convert string to administrator
		ObjectMapper mapper = new ObjectMapper();
		JsonNode node = mapper.readTree(admin);
		Etudiant Etudiant = mapper.convertValue(node, Etudiant.class);
		if (!CollectionUtils.isEmpty(files)) {
			files.stream().forEach(file -> {
				try {
					Document filemode = new Document(file.getOriginalFilename(), file.getContentType(),
							file.getBytes());
					documents.add(filemode);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			});

		}
		if (!documents.isEmpty()) {
			System.out.print("Add documents");
			Etudiant.setDocuments(documents);
		}
		EtudiantService.save(Etudiant);

	}

	// update Etudiant
	@PutMapping("/etudiant/update")
	public Etudiant updateEtudiant(@RequestBody Etudiant Etudiant) {
		System.out.print("update Etudiant controller");
		return EtudiantService.update(Etudiant);

	}

}
