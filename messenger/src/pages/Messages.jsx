import { useState } from 'react';
import './Messages.css';

const mockConversations = [
  {
    id: 1,
    user: { name: 'Alice Johnson', avatar: '👩‍💼', online: true },
    lastMessage: 'Hey! How are you doing?',
    timestamp: '5m ago',
    unread: 2
  },
  {
    id: 2,
    user: { name: 'Bob Smith', avatar: '👨‍💻', online: false },
    lastMessage: 'The project looks great! 🎉',
    timestamp: '1h ago',
    unread: 0
  },
  {
    id: 3,
    user: { name: 'Carol White', avatar: '👩‍🎤', online: true },
    lastMessage: 'Let\'s meet tomorrow at 3pm',
    timestamp: '3h ago',
    unread: 0
  },
  {
    id: 4,
    user: { name: 'David Brown', avatar: '👨‍🎨', online: false },
    lastMessage: 'Thanks for your help!',
    timestamp: 'Yesterday',
    unread: 0
  }
];

const mockMessages = [
  { id: 1, senderId: 1, content: 'Hey! How are you doing?', timestamp: '10:30 AM' },
  { id: 2, senderId: 'me', content: 'I\'m good, thanks! Working on the new project.', timestamp: '10:32 AM' },
  { id: 3, senderId: 1, content: 'That sounds exciting! Tell me more about it.', timestamp: '10:33 AM' },
  { id: 4, senderId: 'me', content: 'It\'s a social media platform with real-time messaging', timestamp: '10:35 AM' },
  { id: 5, senderId: 1, content: 'Awesome! Can\'t wait to see it! 🚀', timestamp: '10:36 AM' }
];

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [conversations] = useState(mockConversations);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      senderId: 'me',
      content: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="messages-page">
      <div className="messages-container">
        <div className={`conversations-list ${selectedChat ? 'hidden-mobile' : ''}`}>
          <div className="conversations-header">
            <h2>Messages</h2>
          </div>
          
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search messages..."
          />
          
          <div className="conversations">
            {conversations.map(conv => (
              <div 
                key={conv.id} 
                className={`conversation ${selectedChat === conv.id ? 'active' : ''}`}
                onClick={() => setSelectedChat(conv.id)}
              >
                <div className="conversation-avatar">
                  <span>{conv.user.avatar}</span>
                  {conv.user.online && <span className="online-indicator"></span>}
                </div>
                <div className="conversation-info">
                  <div className="conversation-top">
                    <span className="conversation-name">{conv.user.name}</span>
                    <span className="conversation-time">{conv.timestamp}</span>
                  </div>
                  <div className="conversation-bottom">
                    <span className="conversation-preview">{conv.lastMessage}</span>
                    {conv.unread > 0 && (
                      <span className="unread-badge">{conv.unread}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedChat ? (
          <div className={`chat-window ${!selectedChat ? 'hidden-mobile' : ''}`}>
            <div className="chat-header">
              <button className="back-btn" onClick={() => setSelectedChat(null)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
              <div className="chat-user-info">
                <div className="chat-avatar">
                  <span>{conversations.find(c => c.id === selectedChat)?.user.avatar}</span>
                  {conversations.find(c => c.id === selectedChat)?.user.online && (
                    <span className="online-indicator"></span>
                  )}
                </div>
                <div className="chat-user-details">
                  <span className="chat-user-name">
                    {conversations.find(c => c.id === selectedChat)?.user.name}
                  </span>
                  <span className="chat-user-status">
                    {conversations.find(c => c.id === selectedChat)?.user.online ? 'Active now' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>

            <div className="chat-messages">
              {messages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`message ${msg.senderId === 'me' ? 'message-own' : 'message-other'}`}
                >
                  <div className="message-bubble">
                    <p>{msg.content}</p>
                  </div>
                  <span className="message-time">{msg.timestamp}</span>
                </div>
              ))}
            </div>

            <div className="chat-input-area">
              <textarea
                className="message-input"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                rows="1"
              />
              <button className="send-btn" onClick={handleSendMessage}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent-blue)">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="no-chat-selected">
            <div className="no-chat-content">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <h3>Select a conversation</h3>
              <p>Choose from your existing conversations or start a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
