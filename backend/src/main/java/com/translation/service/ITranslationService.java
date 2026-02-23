package com.translation.service;

import com.translation.model.POSTTranslationRequest;
import com.translation.model.POSTTranslationResponse;

// Interface for Dependency Injection of Translation Services
public interface ITranslationService {
	public POSTTranslationResponse translate(POSTTranslationRequest request);
}
