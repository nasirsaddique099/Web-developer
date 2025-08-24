// Blog Chatbot Integration Script
// This script adds a chatbot to the blog website

(function() {
  // Create chatbot HTML structure
  function createChatbotHTML() {
    const chatbotHTML = `
      <button id="chat-button" class="chat-button">
        <i class="fas fa-comment"></i>
      </button>
      <div class="chat-container">
        <div class="chat-header">
          <h3>Blog Assistant</h3>
          <button id="chat-toggle">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div id="chat-messages" class="chat-messages">
          <div class="message bot-message">
            <div class="message-content">
              <p>Hello! Welcome to our blog. How can I help you today?</p>
            </div>
          </div>
        </div>
        <div class="chat-input">
          <input type="text" id="user-input" placeholder="Type your message...">
          <button id="send-btn">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    `;
    
    // Create container for chatbot
    const chatbotContainer = document.createElement('div');
    chatbotContainer.classList.add('blog-chatbot');
    chatbotContainer.innerHTML = chatbotHTML;
    
    // Append to body
    document.body.appendChild(chatbotContainer);
  }
  
  // Add chatbot styles
  function addChatbotStyles() {
    const chatbotStyles = `
      /* Chatbot Styles */
      .blog-chatbot {
        --primary-color: #4a6fa5;
        --secondary-color: #e9f0f9;
        --accent-color: #3498db;
        --text-color: #333;
        --light-text: #777;
        --bot-message-bg: #f0f4f8;
        --user-message-bg: #3498db;
        --user-message-text: white;
        --shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        font-family: 'Arial', sans-serif;
      }
      
      /* Chat Button */
      .chat-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        box-shadow: var(--shadow);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        z-index: 1000;
        transition: all 0.3s ease;
      }
      
      .chat-button:hover {
        transform: scale(1.05);
        background-color: #3a5a8c;
      }
      
      /* Chat Container */
      .chat-container {
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 350px;
        height: 500px;
        background-color: white;
        border-radius: 10px;
        box-shadow: var(--shadow);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        z-index: 1000;
        opacity: 0;
        transform: translateY(20px);
        pointer-events: none;
        transition: all 0.3s ease;
      }
      
      .chat-container.active {
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
      }
      
      /* Chat Header */
      .chat-header {
        background-color: var(--primary-color);
        color: white;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .chat-header h3 {
        margin: 0;
        font-size: 16px;
      }
      
      .chat-header button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 16px;
      }
      
      /* Chat Messages */
      .chat-messages {
        flex: 1;
        padding: 15px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      
      .message {
        display: flex;
        flex-direction: column;
        max-width: 80%;
      }
      
      .bot-message {
        align-self: flex-start;
      }
      
      .user-message {
        align-self: flex-end;
      }
      
      .message-content {
        padding: 10px 15px;
        border-radius: 18px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      }
      
      .bot-message .message-content {
        background-color: var(--bot-message-bg);
        color: var(--text-color);
        border-bottom-left-radius: 5px;
      }
      
      .user-message .message-content {
        background-color: var(--user-message-bg);
        color: var(--user-message-text);
        border-bottom-right-radius: 5px;
      }
      
      .message-content p {
        margin: 0;
        line-height: 1.4;
      }
      
      /* Chat Input */
      .chat-input {
        display: flex;
        padding: 15px;
        border-top: 1px solid #eee;
      }
      
      .chat-input input {
        flex: 1;
        padding: 10px 15px;
        border: 1px solid #ddd;
        border-radius: 20px;
        outline: none;
        font-size: 14px;
      }
      
      .chat-input input:focus {
        border-color: var(--accent-color);
      }
      
      .chat-input button {
        width: 40px;
        height: 40px;
        margin-left: 10px;
        background-color: var(--accent-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s ease;
      }
      
      .chat-input button:hover {
        background-color: #2980b9;
      }
      
      /* Typing Indicator */
      .typing-indicator {
        display: flex;
        align-items: center;
        gap: 5px;
      }
      
      .typing-indicator span {
        width: 8px;
        height: 8px;
        background-color: var(--light-text);
        border-radius: 50%;
        display: inline-block;
        animation: typing 1.5s infinite ease-in-out;
      }
      
      .typing-indicator span:nth-child(1) {
        animation-delay: 0s;
      }
      
      .typing-indicator span:nth-child(2) {
        animation-delay: 0.3s;
      }
      
      .typing-indicator span:nth-child(3) {
        animation-delay: 0.6s;
      }
      
      @keyframes typing {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-5px);
        }
      }
      
      /* Responsive Design */
      @media (max-width: 480px) {
        .chat-container {
          width: 100%;
          height: 100%;
          bottom: 0;
          right: 0;
          border-radius: 0;
        }
      }
    `;
    
    // Create style element
    const styleElement = document.createElement('style');
    styleElement.textContent = chatbotStyles;
    
    // Append to head
    document.head.appendChild(styleElement);
  }
  
  // Initialize chatbot functionality
  function initChatbot() {
    // Wait a short time to ensure elements are loaded
    setTimeout(function() {
      // DOM Elements
      const chatButton = document.getElementById('chat-button');
      const chatContainer = document.querySelector('.chat-container');
      const chatToggle = document.getElementById('chat-toggle');
      const chatMessages = document.getElementById('chat-messages');
      const userInput = document.getElementById('user-input');
      const sendButton = document.getElementById('send-btn');
      
      if (!chatButton || !chatContainer || !chatToggle || !chatMessages || !userInput || !sendButton) {
        console.error('Chatbot elements not found:', {
          chatButton, chatContainer, chatToggle, chatMessages, userInput, sendButton
        });
        return;
      }

      // Chat toggle functionality
      chatButton.addEventListener('click', function() {
        chatContainer.classList.add('active');
        chatButton.style.display = 'none';
        // Scroll to the bottom of the chat
        scrollToBottom();
      });

      chatToggle.addEventListener('click', function() {
        chatContainer.classList.remove('active');
        chatButton.style.display = 'flex';
      });

      // Send message functionality
      sendButton.addEventListener('click', sendMessage);
      userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          sendMessage();
        }
      });

      function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // Add user message to chat
        addMessage(message, 'user');
        userInput.value = '';

        // Show typing indicator
        showTypingIndicator();

        // Process the message and get a response (with a delay to simulate thinking)
        setTimeout(() => {
          const response = processMessage(message);
          removeTypingIndicator();
          addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
      }

      function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        
        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = message;
        
        messageContent.appendChild(messageParagraph);
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to the bottom
        scrollToBottom();
      }

      function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'bot-message', 'typing-message');
        typingDiv.innerHTML = `
          <div class="message-content">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        `;
        chatMessages.appendChild(typingDiv);
        scrollToBottom();
      }

      function removeTypingIndicator() {
        const typingMessage = document.querySelector('.typing-message');
        if (typingMessage) {
          typingMessage.remove();
        }
      }

      function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }

      // Simple message processing function
      function processMessage(message) {
        message = message.toLowerCase();
        
        // Blog-specific responses based on keywords
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
          return 'Hello! How can I help you with our blog today?';
        } else if (message.includes('how are you')) {
          return 'I\'m just a bot, but I\'m functioning well! How can I assist you with our blog?';
        } else if (message.includes('bye') || message.includes('goodbye')) {
          return 'Goodbye! Feel free to come back if you have more questions about our blog.';
        } else if (message.includes('thank')) {
          return 'You\'re welcome! Is there anything else I can help with regarding our blog?';
        } else if (message.includes('help')) {
          return 'I can help answer questions about our blog posts, categories, or how to navigate the site. What would you like to know?';
        } else if (message.includes('contact') || message.includes('support')) {
          return 'You can contact the blog author through the Contact page or by emailing support@example.com.';
        } else if (message.includes('latest') || message.includes('new') || message.includes('recent')) {
          return 'Our latest blog posts can be found on the home page. We update our content regularly!';
        } else if (message.includes('category') || message.includes('categories')) {
          return 'You can browse blog posts by category using the Categories link in the navigation menu.';
        } else if (message.includes('subscribe') || message.includes('newsletter')) {
          return 'You can subscribe to our blog updates by entering your email in the subscription box in the sidebar.';
        } else if (message.includes('comment') || message.includes('feedback')) {
          return 'We welcome comments on all our blog posts! Just scroll to the bottom of any post to leave your thoughts.';
        } else if (message.includes('author') || message.includes('about')) {
          return 'You can learn more about the blog author on the About page, accessible from the main navigation.';
        } else if (message.includes('search')) {
          return 'You can search for specific topics using the search box in the sidebar of our blog.';
        } else if (message.includes('share') || message.includes('social')) {
          return 'You can share our blog posts on social media using the share buttons at the bottom of each post.';
        } else {
          // Default responses (randomly selected)
          const defaultResponses = [
            'I\'m not sure I understand. Could you please rephrase that?',
            'That\'s an interesting question about our blog. Let me think about how to help you best.',
            'I don\'t have specific information about that yet. Is there something else about our blog I can help with?',
            'I\'m still learning! Could you try asking in a different way?',
            'I\'m not programmed to answer that specific question yet. Is there something else about our blog you\'d like to know?'
          ];
          return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        }
      }
    }, 500); // Wait 500ms for DOM to be fully ready
  }
  
  // Initialize the chatbot
  function init() {
    addChatbotStyles();
    createChatbotHTML();
    initChatbot();
  }
  
  // Run initialization
  init();
})();