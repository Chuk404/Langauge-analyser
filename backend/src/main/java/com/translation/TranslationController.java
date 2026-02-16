package com.translation;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TranslationController {

	@GetMapping("translation")
	public String translation()
	{
		return "Testing";
	}
}
