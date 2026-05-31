package com.translation.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.translation.model.POSTTranslationRequest;
import com.translation.model.POSTTranslationResponse;

@Service
@Qualifier("AIService")
public class AITranslationService implements ITranslationService {

    @Value("${OPENROUTER_API_KEY}")
    private String apiKey;

    private String getLanguageName(String code) {
        switch (code) {
            case "fr":
                return "French";
            case "it":
                return "Italian";
            case "tr":
                return "Turkish";
            case "de":
                return "German";
            case "es":
                return "Spanish";
            default:
                return "English";
        }
    }

    @Override
    public POSTTranslationResponse translate(POSTTranslationRequest request) {
        try {

            // Build the prompt
            String systemPrompt = String.format(
                    "You are a professional translator. Translate text from %s to %s. "
                    + "Always explain slang meanings in English regardless of the target language"
                    + "Always respond in this exact JSON format: "
                    + "{\"translation\": \"translated text here\", \"slangs\": [{\"word\": \"slang word\", \"meaning\": \"what it means\"}]} "
                    + "If there are no slang words return an empty array for slangs. "
                    + "Never include anything outside the JSON.",
                    getLanguageName(request.getSourceLanguage()),
                    getLanguageName(request.getTargetLanguage())
            );

            // Build the request body
            String requestBody = String.format("""
                {
                    "model": "google/gemini-3.5-flash",
                    "messages": [
                        {"role": "system", "content": "%s"},
                        {"role": "user", "content": "%s"}
                    ]
                }
                """,
                    systemPrompt.replace("\"", "\\\""),
                    request.getText().replace("\"", "\\\"")
            );

            // Send request to OpenRouter
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(URI.create("https://openrouter.ai/api/v1/chat/completions"))
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            HttpResponse<String> response = client.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            System.out.println("OpenRouter response: " + response.body());
            // Parse the response
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.body());
            String content = root.path("choices").get(0).path("message").path("content").asText();

            // Parse the AI's JSON response
            JsonNode result = mapper.readTree(content);
            String translation = result.path("translation").asText();

            ArrayList<com.translation.model.Slang> slangs = new ArrayList<>();
            JsonNode slangArray = result.path("slangs");
            if (slangArray.isArray()) {
                for (JsonNode slangNode : slangArray) {
                    com.translation.model.Slang slang = new com.translation.model.Slang();
                    slang.setWord(slangNode.path("word").asText());
                    slang.setMeaning(slangNode.path("meaning").asText());
                    slangs.add(slang);
                }
            }

            return new POSTTranslationResponse(false, translation, slangs);

        } catch (Exception exception) {
            System.out.println("Translation error: " + exception.getMessage());
            exception.printStackTrace();
            return new POSTTranslationResponse(true, null, null);
        }
    }
}
