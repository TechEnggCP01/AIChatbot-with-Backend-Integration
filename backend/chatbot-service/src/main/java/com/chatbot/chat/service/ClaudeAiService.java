package com.chatbot.chat.service;

import org.springframework.stereotype.Service;

@Service
public class ClaudeAiService {

    public String generateResponse(String userMessage) {
        // Mock API call to Claude AI
        return "This is a mock response from Claude AI for your message: '" + userMessage + "'";
    }
}
