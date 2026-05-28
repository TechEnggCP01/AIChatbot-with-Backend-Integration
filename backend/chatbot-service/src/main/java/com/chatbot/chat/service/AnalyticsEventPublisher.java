package com.chatbot.chat.service;

import com.chatbot.chat.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AnalyticsEventPublisher {

    private final RabbitTemplate rabbitTemplate;

    public AnalyticsEventPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishMessageEvent(Long conversationId, Long messageId, String role) {
        Map<String, Object> event = new HashMap<>();
        event.put("eventType", "MESSAGE_CREATED");
        event.put("conversationId", conversationId);
        event.put("messageId", messageId);
        event.put("role", role);
        event.put("timestamp", System.currentTimeMillis());

        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY, event);
    }
}
