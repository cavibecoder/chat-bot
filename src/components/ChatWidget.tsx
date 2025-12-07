import React, { useState } from 'react';
import styles from '../styles/ChatWidget.module.css';
import ChatWindow from './ChatWindow';

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle Function
    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    // Notify parent window about state change (for iframe resizing)
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            window.parent.postMessage({ type: 'CHAT_TOGGLE', isOpen }, '*');
        }
    }, [isOpen]);

    return (
        <div className={styles.chatContainer}>
            {isOpen && (
                <ChatWindow onClose={() => setIsOpen(false)} />
            )}

            <button
                className={styles.toggleButton}
                onClick={toggleChat}
                aria-label="Toggle chat"
            >
                {isOpen ? (
                    // Close Icon (Chevron Down)
                    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                ) : (
                    // Chat Icon
                    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                )}
            </button>
        </div>
    );
};

export default ChatWidget;
