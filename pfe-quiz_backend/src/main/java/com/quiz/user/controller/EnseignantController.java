package com.quiz.user.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
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
import com.quiz.user.entities.Document;
import com.quiz.user.entities.Enseignant;
import com.quiz.user.services.EnseignantService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api")
public class EnseignantController {
	@Autowired
	private EnseignantService EnseignantService;

	// Get All Enseignants
	// @PreAuthorize("hasRole('consult Enseignant')")
	@GetMapping("/allenseignants/liste")
	public List<Enseignant> getEnseignants() {
		return EnseignantService.getEnseignants();
	}

	// find by id
	@GetMapping("/enseignant/{id}")
	public Optional<Enseignant> getEnseignant(@PathVariable Long id) {
		return EnseignantService.find(id);

	}

	// Delete Enseignant
	@DeleteMapping("/enseignant/delete/{id}")
	public boolean deleteEnseignant(@PathVariable long id) {
		EnseignantService.delete(id);

		return true;
	}

	// add new Enseignant
	@PostMapping(value = "/enseignant/create", consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.MULTIPART_FORM_DATA_VALUE })
	public void fileUpload(@RequestPart("files") List<MultipartFile> files, @RequestPart("Enseignant") String admin)
			throws ServiceExeption, JsonMappingException, JsonProcessingException {

		List<Document> documents = new ArrayList<>();
		// convert string to administrator
		ObjectMapper mapper = new ObjectMapper();
		JsonNode node = mapper.readTree(admin);
		Enseignant Enseignant = mapper.convertValue(node, Enseignant.class);
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
			Enseignant.setDocuments(documents);
		}

		EnseignantService.save(Enseignant);

	}

	// update Enseignant
	@PutMapping("/enseignant/update")
	public Enseignant updateEnseignant(@RequestBody Enseignant Enseignant) {
		return EnseignantService.update(Enseignant);

	}

}
