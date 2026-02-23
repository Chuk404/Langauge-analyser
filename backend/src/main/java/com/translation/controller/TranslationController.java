package com.translation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.translation.model.POSTTranslationRequest;
import com.translation.model.POSTTranslationResponse;
import com.translation.service.ITranslationService;

@RestController
public class TranslationController {
	
	@Autowired
	@Qualifier("MockService")
	ITranslationService service;

	@GetMapping("translation")
	public POSTTranslationResponse translation(@RequestBody POSTTranslationRequest request)
	{	
		// Call Translate service
		var response = service.translate(request);
		
		// Check error code if any
		if (response.getError())
		{
			// Return adequate response if error			
		}
		
		return response;
	}
}
