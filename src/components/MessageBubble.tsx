import React from 'react';
import styles from '../styles/ChatWidget.module.css';

export type Message = {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    link?: string;
    linkText?: string;
};

interface MessageBubbleProps {
    message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const isBot = message.sender === 'bot';
    return (
        <div className={`${styles.message} ${isBot ? styles.botMessage : styles.userMessage}`}>
            <div>{message.text}</div>
            {message.link && (
                <a
                    href={message.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                >
                    {message.linkText || message.link} &rarr;
                </a>
            )}
        </div>
    );
};

export default MessageBubble;
