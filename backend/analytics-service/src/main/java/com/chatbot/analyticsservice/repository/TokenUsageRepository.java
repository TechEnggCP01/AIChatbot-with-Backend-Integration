package com.chatbot.analyticsservice.repository;

import com.chatbot.analyticsservice.model.TokenUsage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TokenUsageRepository extends JpaRepository<TokenUsage, Long> {
    List<TokenUsage> findByUserId(Long userId);
    List<TokenUsage> findByConversationId(Long conversationId);
}
