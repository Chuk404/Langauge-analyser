package com.translation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.translation.model.POSTTranslationRequest;
import com.translation.model.POSTTranslationResponse;
import com.translation.service.ITranslationService;

@RestController
@CrossOrigin(origins = "*")
public class TranslationController {
	
	@Autowired
	@Qualifier("AIService")
	ITranslationService service;

	@PostMapping("translation")
	public POSTTranslationResponse translation(@RequestBody POSTTranslationRequest request)
	{	
		// Call Translate service
		var response = service.translate(request);
		
		// Check error code if any
		if (response.getError())
		{
			// throw exception
		}
		
		System.out.println(response);
		
		return response;
	}
}
