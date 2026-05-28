import React from 'react';
import { Plus, MessageSquare, Settings } from './Icons';

const Sidebar = ({ isMobileOpen, setMobileOpen, toggleTheme, isDark, history = [] }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      {/* Sidebar container */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-gray-900 dark:bg-chat-darker text-gray-300
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 flex flex-col h-full
      `}>
        {/* New Chat Button */}
        <div className="p-2">
          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-md border border-gray-700 hover:bg-gray-800 transition-colors text-sm font-medium text-white">
            <Plus size={16} />
            New chat
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
          {history.length === 0 ? (
            <div className="text-xs text-gray-500 font-medium px-3 py-2 uppercase tracking-wider">
              No recent chats
            </div>
          ) : (
            <>
              <div className="text-xs text-gray-500 font-medium px-3 py-2 uppercase tracking-wider">
                Today
              </div>
              {history.map((chat, i) => (
                <button key={i} className="w-full flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-800 transition-colors text-sm text-left truncate group">
                  <MessageSquare size={16} className="shrink-0 text-gray-400 group-hover:text-gray-200" />
                  <span className="truncate">{chat.title}</span>
                </button>
              ))}
            </>
          )}
        </div>

        {/* Footer/Settings */}
        <div className="p-2 border-t border-gray-800/50">
          <button 
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-800 transition-colors text-sm"
          >
            <Settings size={16} className="text-gray-400" />
            {isDark ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
