import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [savedConversations, setSavedConversations] = useState([]);
  const [replyTo, setReplyTo] = useState(null); // To track message being replied to
  const [showReplies, setShowReplies] = useState({}); // Track which messages have replies shown

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user', replies: [] }]);
      setInput('');
      setReplyTo(null); // Clear the reply state after sending
    }
  };

  const handleSaveConversation = () => {
    if (messages.length > 0) {
      setSavedConversations([...savedConversations, { id: Date.now(), messages }]);
      setMessages([]);
    }
  };

  const handleReplayConversation = (conversation) => {
    setMessages(conversation.messages);
  };

  const handleReply = (messageIndex) => {
    setReplyTo(messageIndex); // Set the message index to reply to
    setInput(''); // Clear input when starting a reply
  };

  const handleSendReply = () => {
    if (replyTo !== null && input.trim()) {
      const updatedMessages = [...messages];
      updatedMessages[replyTo].replies.push({ text: input, sender: 'user' });
      setMessages(updatedMessages);
      setInput('');
      setReplyTo(null); // Clear the reply state after sending
    }
  };

  const toggleReplies = (index) => {
    setShowReplies((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle visibility
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
    <div style={styles.container}>
      <div style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <div key={index} style={styles.messageCard}>
            <div style={styles.cardHeader}>
              <strong>{message.sender}</strong>
              <div>
                <button onClick={() => toggleReplies(index)} style={styles.toggleButton}>
                  {showReplies[index] ? 'Hide Replies' : 'Show Replies'}
                </button>
                <button onClick={() => handleReply(index)} style={styles.replyButton}>
                  Reply
                </button>
                <button onClick={() => handleDeleteMessage(index)} style={styles.deleteButton}>
                  Delete
                </button>
              </div>
            </div>
            <div style={styles.cardBody}>{message.text}</div>
            {showReplies[index] && (
              <div style={styles.repliesContainer}>
                {message.replies.map((reply, replyIndex) => (
                  <div key={replyIndex} style={styles.reply}>
                    <strong>{reply.sender} (Reply): </strong>{reply.text}
                    <button
                      onClick={() => handleDeleteReply(index, replyIndex)}
                      style={styles.deleteReplyButton}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
          placeholder={replyTo !== null ? 'Type your reply...' : 'Type a message...'}
        />
        <button onClick={replyTo !== null ? handleSendReply : handleSend} style={styles.button}>
          {replyTo !== null ? 'Send Reply' : 'Send'}
        </button>
        <button onClick={handleSaveConversation} style={styles.button}>Save Chat</button>
      </div>
      <div style={styles.savedConversationsContainer}>
        <h2>Saved Conversations</h2>
        {savedConversations.map((conversation) => (
          <div key={conversation.id} style={styles.card} onClick={() => handleReplayConversation(conversation)}>
            <div style={styles.cardTitle}>Conversation {conversation.id}</div>
            <div style={styles.cardPreview}>
              {conversation.messages.slice(-1)[0]?.text || 'No messages'}
              <div style={styles.cardRepliesCount}>
                {conversation.messages.reduce((count, msg) => count + msg.replies.length, 0)} replies
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
    width: '80vw',
    margin: '20px auto',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    boxSizing: 'border-box',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  messagesContainer: {
    flex: 1,
    maxHeight: 'calc(80vh - 130px)',
    overflowY: 'auto',
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#fff',
  },
  messageCard: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#e1e1e1',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px',
  },
  cardBody: {
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '5px',
  },
  repliesContainer: {
    marginTop: '10px',
    padding: '5px',
    borderRadius: '5px',
    backgroundColor: '#f1f1f1',
  },
  reply: {
    marginTop: '5px',
    padding: '5px',
    borderRadius: '5px',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    marginLeft: '5px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
  },
  toggleButton: {
    marginLeft: '10px',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#ffc107',
    color: '#fff',
    cursor: 'pointer',
  },
  replyButton: {
    marginLeft: '10px',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer',
  },
  deleteButton: {
    marginLeft: '10px',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#dc3545',
    color: '#fff',
    cursor: 'pointer',
  },
  deleteReplyButton: {
    marginLeft: '10px',
    padding: '3px 6px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#dc3545',
    color: '#fff',
    cursor: 'pointer',
  },
  savedConversationsContainer: {
    marginTop: '20px',
  },
  card: {
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  cardPreview: {
    color: '#555',
  },
  cardRepliesCount: {
    marginTop: '5px',
    color: '#888',
  },
};

export default Chat;
