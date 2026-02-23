package com.translation.model;

import java.util.ArrayList;

public class POSTTranslationResponse {
	boolean error;
	String translation;
	ArrayList<Slang> slangs;
	
	public POSTTranslationResponse(boolean error, String translation, ArrayList<Slang> slangs)
	{
		this.error = error;
		this.translation = translation;
		this.slangs = slangs;
	}
	
	public boolean getError() {
		return error;
	}
	
	public String getTranslation() {
		return translation;
	}
	
	public ArrayList<Slang> getSlangs() {
		return slangs;
	}
	
	@Override
	public String toString() {
		return String.format("error: %b, translation: %s, slangs: %s", error, translation, slangs);
	}
}
