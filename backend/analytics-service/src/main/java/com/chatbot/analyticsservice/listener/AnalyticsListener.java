package com.chatbot.analyticsservice.listener;

import com.chatbot.analyticsservice.model.TokenUsage;
import com.chatbot.analyticsservice.repository.TokenUsageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnalyticsListener {

    private final TokenUsageRepository tokenUsageRepository;

    @RabbitListener(queues = "token.usage.queue")
    public void handleTokenUsageEvent(Map<String, Object> event) {
        log.info("Received token usage event: {}", event);
        try {
            TokenUsage usage = new TokenUsage();
            usage.setUserId(Long.valueOf(event.get("userId").toString()));
            usage.setConversationId(Long.valueOf(event.get("conversationId").toString()));
            usage.setPromptTokens((Integer) event.get("promptTokens"));
            usage.setCompletionTokens((Integer) event.get("completionTokens"));
            usage.setTotalTokens(usage.getPromptTokens() + usage.getCompletionTokens());
            
            tokenUsageRepository.save(usage);
            log.info("Saved token usage to DB.");
        } catch (Exception e) {
            log.error("Error processing token usage event", e);
        }
    }
}
