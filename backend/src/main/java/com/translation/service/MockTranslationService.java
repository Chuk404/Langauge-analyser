package com.translation.service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.translation.model.POSTTranslationRequest;
import com.translation.model.POSTTranslationResponse;

@Service
@Qualifier("MockService")
// Used for testing the API
public class MockTranslationService implements ITranslationService {

	@Override
	public POSTTranslationResponse translate(POSTTranslationRequest request) {
		
		boolean error = false;
		String translation = "Hallo";
		
		// Returning with no slang
		return new POSTTranslationResponse(error, translation, null);
	}
	
}
