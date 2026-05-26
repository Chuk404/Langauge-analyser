package com.translation.model;

public class POSTTranslationRequest {
    String text;
    String sourceLanguage;
    String targetLanguage;

    public String getText() {
        return text;
    }

    public String getSourceLanguage() {
        return sourceLanguage;
    }

    public String getTargetLanguage() {
        return targetLanguage;
    }

    public String target_lang() {
        return targetLanguage;
    }
}