import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/ChatWidget.module.css';
import MessageBubble, { Message } from './MessageBubble';
import SuggestionChips from './SuggestionChips';
import config from '../data/bot-config.json';
import Image from 'next/image';

interface ChatWindowProps {
    onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial welcome message
    useEffect(() => {
        // Only add if empty (strict mode double invocation protection)
        if (messages.length === 0) {
            setTimeout(() => {
                addBotMessage(config.welcomeMessage);
            }, 500);
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const addBotMessage = (text: string, link?: string, linkText?: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            text,
            sender: 'bot',
            link,
            linkText,
        };
        setMessages((prev) => [...prev, newMessage]);
        setIsTyping(false);
    };

    const addUserMessage = (text: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
        };
        setMessages((prev) => [...prev, newMessage]);
    };

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        addUserMessage(text);
        setInput('');
        setIsTyping(true);

        // Process logic
        const lowerText = text.toLowerCase();
        let matchKey: string | null = null;

        // Find keyword match
        for (const key of Object.keys(config.keywords)) {
            if (lowerText.includes(key)) {
                matchKey = key;
                break;
            }
        }

        // Simulate delay
        setTimeout(() => {
            if (matchKey) {
                const response = config.keywords[matchKey as keyof typeof config.keywords];
                addBotMessage(response.text, response.link, response.linkText);
            } else {
                addBotMessage(config.fallbackMessage);
            }
        }, 800);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend(input);
        }
    };

    return (
        <div className={styles.chatWindow}>
            {/* Header */}
            <div className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00c6ff' }}></div>
                    <h3 className={styles.title}>{config.botName}</h3>
                </div>
                <button onClick={onClose} className={styles.closeButton}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            {/* Messages */}
            <div className={styles.messagesArea}>
                {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                ))}
                {isTyping && (
                    <div className={styles.typing}>
                        <span>Typing...</span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <SuggestionChips
                suggestions={config.suggestions}
                onSelect={(keyword) => handleSend(keyword)}
            />

            {/* Input */}
            <div className={styles.inputArea}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className={styles.sendButton}
                    onClick={() => handleSend(input)}
                    disabled={!input.trim()}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
