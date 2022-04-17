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
import com.quiz.user.entities.Recruteur;
import com.quiz.user.entities.Document;
import com.quiz.user.entities.Notifications;
import com.quiz.user.services.RecruteurService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api")
public class RecruteurController {

	@Autowired
	private RecruteurService RecruteurService;

	@Autowired
	private SimpMessagingTemplate template;

	private Notifications notifications = new Notifications(0);

	// Get All Recruteurs
	@GetMapping("/recruteur/liste")
	public List<Recruteur> getRecruteurs() {
		System.out.print("id= " + notifications.getId());
		System.out.print("count= " + notifications.getCount());
		template.convertAndSend("/topic/notification", notifications);

		return RecruteurService.getRecruteurs();
	}

	// find by id
	@GetMapping("/recruteur/{id}")
	public Optional<Recruteur> getRecruteur(@PathVariable Long id) {
		return RecruteurService.find(id);

	}

	// Delete Recruteur
	@DeleteMapping("/recruteur/delete/{id}")
	public boolean deleteRecruteur(@PathVariable long id) {
		RecruteurService.delete(id);

		return true;
	}

	// add new Recruteur
	@PostMapping(value = "/recruteur/create", consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.MULTIPART_FORM_DATA_VALUE })
	public void fileUpload(@RequestPart("files") List<MultipartFile> files, @RequestPart("Recruteur") String admin)
			throws ServiceExeption, JsonMappingException, JsonProcessingException {

		List<Document> documents = new ArrayList<>();
		// convert string to administrator
		ObjectMapper mapper = new ObjectMapper();
		JsonNode node = mapper.readTree(admin);
		Recruteur Recruteur = mapper.convertValue(node, Recruteur.class);
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
			Recruteur.setDocuments(documents);
		}
		RecruteurService.save(Recruteur);

	}

	// update Recruteur
	@PutMapping("/Recruteur/update")
	public Recruteur updateRecruteur(@RequestBody Recruteur Recruteur) {
		System.out.print("update Recruteur controller");
		return RecruteurService.update(Recruteur);

	}

}
