import React, { useState } from 'react';
import { Bot, User } from './Icons';

// Mock markdown renderer
const renderMarkdown = (text) => {
  if (!text) return null;
  // Convert simple markdown like **bold**, *italic*, `code`, and newlines
  const parts = text.split('\n').map((line, i) => {
    let htmlLine = line
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>');
    return <p key={i} dangerouslySetInnerHTML={{ __html: htmlLine }} className="min-h-[1.5rem]" />;
  });
  return <div className="markdown-body text-sm md:text-base">{parts}</div>;
};

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`py-6 w-full ${isUser ? 'bg-chat-light dark:bg-chat-dark' : 'bg-gray-50 dark:bg-[#444654]'}`}>
      <div className="max-w-3xl mx-auto px-4 flex gap-4 md:gap-6 animate-fade-in">
        <div className="flex-shrink-0 flex items-start justify-center mt-1">
          {isUser ? (
            <div className="w-8 h-8 rounded-sm bg-brand flex items-center justify-center text-white">
              <User size={20} />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-sm bg-[#10a37f] flex items-center justify-center text-white">
              <Bot size={20} />
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2 overflow-hidden">
          <div className="font-semibold text-gray-800 dark:text-gray-100">
            {isUser ? 'You' : 'ChatGPT'}
          </div>
          {renderMarkdown(message.content)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
