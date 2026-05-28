import React, { useState, useRef, useEffect } from 'react';
import { Send, Menu } from './Icons';
import ChatMessage from './ChatMessage';

const ChatArea = ({ setMobileOpen }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    // Mock API response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: `This is a mock response to: **${userMsg}**\n\nHere is some \`code\`:\n\`\`\`javascript\nconsole.log('Hello from assistant');\n\`\`\`` }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-chat-dark relative">
      {/* Header (Mobile) */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-chat-dark">
        <button onClick={() => setMobileOpen(true)} className="p-2 -ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <Menu size={24} />
        </button>
        <div className="font-semibold text-gray-800 dark:text-gray-100">New Chat</div>
        <div className="w-8"></div> {/* Spacer for centering */}
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto pb-32">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
            <h1 className="text-4xl font-bold mb-4">ChatGPT Clone</h1>
            <p className="max-w-md text-center">Ask me anything to get started.</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))}
            {isTyping && (
              <div className="py-6 w-full bg-gray-50 dark:bg-[#444654]">
                <div className="max-w-3xl mx-auto px-4 flex gap-4 md:gap-6">
                  <div className="w-8 h-8 rounded-sm bg-[#10a37f] flex items-center justify-center text-white shrink-0 mt-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path></svg>
                  </div>
                  <div className="flex items-center gap-1.5 h-8">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full typing-dot"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full typing-dot"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full typing-dot"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} className="h-4" />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white to-transparent dark:from-chat-dark dark:via-chat-dark dark:to-transparent pt-6 pb-6 px-4 md:px-8">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative flex items-center">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            className="w-full bg-white dark:bg-[#40414f] border border-gray-300 dark:border-gray-600 rounded-xl py-3 pl-4 pr-12 text-gray-900 dark:text-gray-100 shadow-md focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500 resize-none max-h-48 overflow-y-auto"
            rows="1"
            style={{ minHeight: '52px' }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-3 p-1.5 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
        <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">
          Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts.
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
