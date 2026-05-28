package com.chatbot.chat.controller;

import com.chatbot.chat.entity.Conversation;
import com.chatbot.chat.entity.Message;
import com.chatbot.chat.service.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(ChatService chatService, SimpMessagingTemplate messagingTemplate) {
        this.chatService = chatService;
        this.messagingTemplate = messagingTemplate;
    }

    @PostMapping("/conversations")
    public ResponseEntity<Conversation> createConversation(@RequestParam Long userId, @RequestParam String title) {
        return ResponseEntity.ok(chatService.createConversation(userId, title));
    }

    @GetMapping("/conversations/user/{userId}")
    public ResponseEntity<List<Conversation>> getConversations(@PathVariable Long userId) {
        return ResponseEntity.ok(chatService.getConversationsForUser(userId));
    }

    @GetMapping("/conversations/{conversationId}/messages")
    public ResponseEntity<List<Message>> getMessages(@PathVariable Long conversationId) {
        return ResponseEntity.ok(chatService.getMessagesForConversation(conversationId));
    }

    @MessageMapping("/chat/{conversationId}")
    public void handleChatMessage(@DestinationVariable Long conversationId, @Payload String content) {
        Message aiResponse = chatService.processUserMessage(conversationId, content);
        messagingTemplate.convertAndSend("/topic/conversations/" + conversationId, aiResponse);
    }
}
