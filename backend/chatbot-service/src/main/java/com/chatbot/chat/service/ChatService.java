package com.chatbot.chat.service;

import com.chatbot.chat.entity.Conversation;
import com.chatbot.chat.entity.Message;
import com.chatbot.chat.repository.ConversationRepository;
import com.chatbot.chat.repository.MessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ChatService {

    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final ClaudeAiService claudeAiService;
    private final AnalyticsEventPublisher eventPublisher;

    public ChatService(ConversationRepository conversationRepository, 
                       MessageRepository messageRepository, 
                       ClaudeAiService claudeAiService,
                       AnalyticsEventPublisher eventPublisher) {
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
        this.claudeAiService = claudeAiService;
        this.eventPublisher = eventPublisher;
    }

    @Transactional
    public Conversation createConversation(Long userId, String title) {
        Conversation conversation = new Conversation();
        conversation.setUserId(userId);
        conversation.setTitle(title);
        return conversationRepository.save(conversation);
    }

    public List<Conversation> getConversationsForUser(Long userId) {
        return conversationRepository.findByUserIdOrderByUpdatedAtDesc(userId);
    }

    public List<Message> getMessagesForConversation(Long conversationId) {
        return messageRepository.findByConversationIdOrderByTimestampAsc(conversationId);
    }

    @Transactional
    public Message processUserMessage(Long conversationId, String content) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));
        
        // Save user message
        Message userMsg = new Message();
        userMsg.setConversation(conversation);
        userMsg.setSenderRole("USER");
        userMsg.setContent(content);
        messageRepository.save(userMsg);
        
        // Get response from AI
        String aiResponse = claudeAiService.generateResponse(content);
        
        // Save AI message
        Message aiMsg = new Message();
        aiMsg.setConversation(conversation);
        aiMsg.setSenderRole("ASSISTANT");
        aiMsg.setContent(aiResponse);
        messageRepository.save(aiMsg);
        
        // Update conversation timestamp
        conversationRepository.save(conversation);
        
        // Publish event for analytics
        eventPublisher.publishMessageEvent(conversationId, userMsg.getId(), "USER");
        eventPublisher.publishMessageEvent(conversationId, aiMsg.getId(), "ASSISTANT");

        return aiMsg;
    }
}
