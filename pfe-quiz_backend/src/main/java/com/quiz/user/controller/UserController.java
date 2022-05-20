package com.quiz.user.controller;

import java.io.IOException;
import java.net.FileNameMap;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.quiz.exception.ServiceExeption;
import com.quiz.user.entities.User;
import com.quiz.user.entities.Document;
import com.quiz.user.services.UserService;
import com.quiz.user.services.DocumentService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api")
public class UserController {
	@Autowired
	private UserService UserService;
	@Autowired
	private DocumentService documentService;

	// Get All Users
	@GetMapping("/user/liste")
	public List<User> getUsers() {
		return UserService.getUsers();
	}

	// find by id
	@GetMapping("/user/{id}")
	public Optional<User> getUser(@PathVariable Long id) {
		return UserService.find(id);

	}

	// Delete User
	@DeleteMapping("/user/delete/{id}")
	public boolean deleteUser(@PathVariable long id) {
		UserService.delete(id);

		return true;
	}

	// update User
	@PutMapping(value = "/user/update", consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.MULTIPART_FORM_DATA_VALUE })
	public void updateUser(@RequestPart(required = false, value = "files") List<MultipartFile> files,
			@RequestPart("admin") String admin)
			throws ServiceExeption, JsonMappingException, JsonProcessingException {
		
		
		System.out.println("hello");
		List<Document> documents = new ArrayList<>();
		// convert string to User
		ObjectMapper mapper = new ObjectMapper();
		JsonNode node = mapper.readTree(admin);
		User adminstrator = mapper.convertValue(node, User.class);
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
			adminstrator.setDocuments(documents);
		}
		
		UserService.update(adminstrator);

	}

	// add new User
	@PostMapping(value = "/user/create", consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.MULTIPART_FORM_DATA_VALUE })
	public void createUser(@RequestPart(required = false, value = "files") List<MultipartFile> files,
			@RequestPart("admin") String admin, @RequestPart(required = false, value = "image") MultipartFile image)
			throws ServiceExeption, JsonMappingException, JsonProcessingException {

		System.out.println("hello");
		List<Document> documents = new ArrayList<>();
		// convert string to User
		ObjectMapper mapper = new ObjectMapper();
		JsonNode node = mapper.readTree(admin);
		User adminstrator = mapper.convertValue(node, User.class);
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
			adminstrator.setDocuments(documents);
		}
		if (image != null) {
			try {
				Document filemode = new Document(image.getOriginalFilename(), image.getContentType(), image.getBytes());
				adminstrator.setImageprofile(filemode);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		UserService.save(adminstrator);

	}

	// display file
	@GetMapping("/user/displayfile/{id}")
	public ResponseEntity<byte[]> displayFile(@PathVariable Long id) {

		Optional<Document> fileOptional = documentService.findById(id);
		if (fileOptional.isPresent()) {

			Document file = fileOptional.get();
			FileNameMap fileNameMap = URLConnection.getFileNameMap();
			// for power point and word file can't know the type
			String mimeType = fileNameMap.getContentTypeFor(file.getName());
			System.out.print(mimeType);
			HttpHeaders headers = new HttpHeaders();
			if (mimeType == null) {
				headers.setContentType(MediaType.parseMediaType("application/octet-stream"));
			} else {
				headers.setContentType(MediaType.parseMediaType(mimeType));
			}

			headers.add("Content-Disposition", "inline;filename=\"" + file.getName() + "\"");

			headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
			ResponseEntity<byte[]> response = new ResponseEntity<byte[]>(file.getBytes(), headers, HttpStatus.OK);

			return response;
		}

		return ResponseEntity.status(404).body(null);
	}

	// download file
	@GetMapping("/user/downloadfile/{id}")
	public ResponseEntity<byte[]> downloadFile(@PathVariable Long id) {

		Optional<Document> fileOptional = documentService.findById(id);
		if (fileOptional.isPresent()) {

			Document file = fileOptional.get();
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
					.body(file.getBytes());
		}

		return ResponseEntity.status(404).body(null);
	}

}
