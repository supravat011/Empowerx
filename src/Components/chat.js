import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [savedConversations, setSavedConversations] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const [showReplies, setShowReplies] = useState({});
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([...messages, { 
          text: input, 
          sender: 'user', 
          replies: [],
          timestamp: new Date().toLocaleTimeString()
        }]);
        setInput('');
        setReplyTo(null);
        setIsTyping(false);
      }, 500);
    }
  };

  const handleSaveConversation = () => {
    if (messages.length > 0) {
      const newConversation = {
        id: Date.now(),
        messages,
        date: new Date().toLocaleDateString(),
        preview: messages[messages.length - 1].text
      };
      setSavedConversations([...savedConversations, newConversation]);
      setMessages([]);
    }
  };

  const handleReplayConversation = (conversation) => {
    setMessages(conversation.messages);
  };

  const handleReply = (messageIndex) => {
    setReplyTo(messageIndex);
    setInput('');
  };

  const handleSendReply = () => {
    if (replyTo !== null && input.trim()) {
      const updatedMessages = [...messages];
      updatedMessages[replyTo].replies.push({ 
        text: input, 
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      });
      setMessages(updatedMessages);
      setInput('');
      setReplyTo(null);
    }
  };

  const toggleReplies = (index) => {
    setShowReplies((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleDeleteMessage = (messageIndex) => {
    setMessages(messages.filter((_, index) => index !== messageIndex));
  };

  const handleDeleteReply = (messageIndex, replyIndex) => {
    const updatedMessages = [...messages];
    updatedMessages[messageIndex].replies = updatedMessages[messageIndex].replies.filter(
      (_, index) => index !== replyIndex
    );
    setMessages(updatedMessages);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="chat-container"
    >
      <div className="chat-main">
        <motion.div 
          className="messages-container"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="message-card"
              >
                <div className="message-header">
                  <div className="message-info">
                    <span className="sender">{message.sender}</span>
                    <span className="timestamp">{message.timestamp}</span>
                  </div>
                  <div className="message-actions">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleReplies(index)}
                      className="action-button toggle-button"
                    >
                      {showReplies[index] ? 'Hide Replies' : 'Show Replies'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleReply(index)}
                      className="action-button reply-button"
                    >
                      Reply
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteMessage(index)}
                      className="action-button delete-button"
                    >
                      Delete
                    </motion.button>
                  </div>
                </div>
                <div className="message-content">{message.text}</div>
                <AnimatePresence>
                  {showReplies[index] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="replies-container"
                    >
                      {message.replies.map((reply, replyIndex) => (
                        <motion.div
                          key={replyIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="reply"
                        >
                          <div className="reply-content">
                            <span className="reply-sender">{reply.sender}</span>
                            <span className="reply-text">{reply.text}</span>
                            <span className="reply-timestamp">{reply.timestamp}</span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteReply(index, replyIndex)}
                            className="delete-reply-button"
                          >
                            Delete
                          </motion.button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="typing-indicator"
            >
              <span></span>
              <span></span>
              <span></span>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </motion.div>

        <motion.div 
          className="input-container"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="message-input"
            placeholder={replyTo !== null ? 'Type your reply...' : 'Type a message...'}
            onKeyPress={(e) => e.key === 'Enter' && (replyTo !== null ? handleSendReply() : handleSend())}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={replyTo !== null ? handleSendReply : handleSend}
            className="send-button"
          >
            {replyTo !== null ? 'Send Reply' : 'Send'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSaveConversation}
            className="save-button"
          >
            Save Chat
          </motion.button>
        </motion.div>
      </div>

      <motion.div 
        className="saved-conversations"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <h2>Saved Conversations</h2>
        <div className="saved-conversations-list">
          {savedConversations.map((conversation) => (
            <motion.div
              key={conversation.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleReplayConversation(conversation)}
              className="saved-conversation-card"
            >
              <div className="conversation-date">{conversation.date}</div>
              <div className="conversation-preview">{conversation.preview}</div>
              <div className="conversation-stats">
                {conversation.messages.length} messages
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Chat;
