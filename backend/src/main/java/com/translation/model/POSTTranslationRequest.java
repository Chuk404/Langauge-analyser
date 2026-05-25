package com.translation.model;

public class POSTTranslationRequest {
    String text;
    String targetLanguage;

    public String getText() {
        return text;
    }

    public String getTargetLanguage() {
        return targetLanguage;
    }

    public String target_lang() {
        return targetLanguage;
    }
}