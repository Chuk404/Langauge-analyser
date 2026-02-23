package com.translation.model;

import java.util.ArrayList;

public class POSTTranslationResponse {
	boolean error;
	String translation;
	ArrayList<Slang> slangs;
	
	public boolean getError() {
		return error;
	}
}
