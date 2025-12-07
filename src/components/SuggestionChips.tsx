import React from 'react';
import styles from '../styles/ChatWidget.module.css';

type Suggestion = {
    label: string;
    keyword: string;
};

interface SuggestionChipsProps {
    suggestions: Suggestion[];
    onSelect: (keyword: string) => void;
}

const SuggestionChips: React.FC<SuggestionChipsProps> = ({ suggestions, onSelect }) => {
    return (
        <div className={styles.suggestionsScroll}>
            {suggestions.map((s) => (
                <button
                    key={s.keyword}
                    className={styles.suggestionChip}
                    onClick={() => onSelect(s.keyword)}
                >
                    {s.label}
                </button>
            ))}
        </div>
    );
};

export default SuggestionChips;
