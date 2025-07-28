// useTypewriter.ts

import { useState, useEffect, useRef } from 'react';

interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayAfterType?: number;  // Renamed for clarity
  delayAfterDelete?: number; // The new parameter
  loop?: boolean;
}

interface UseTypewriterReturn {
  displayText: string;
  currentWordIndex: number;
}

export const useTypewriter = ({
  words,
  typeSpeed = 80,
  deleteSpeed = 40,
  delayAfterType = 1500,     // Default is now a more rhythmic 1.5 seconds
  delayAfterDelete = 300,    // A short, 0.3 second pause after deleting
  loop = true,
}: UseTypewriterOptions): UseTypewriterReturn => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');

  const stateRef = useRef({
    isDeleting: false,
    wordIndex: 0,
    text: '',
  });

  useEffect(() => {
    // This effect now ONLY handles the timeouts between states
    if (stateRef.current.text === words[stateRef.current.wordIndex] && !stateRef.current.isDeleting) {
      // Word is fully typed, wait then start deleting
      const timeoutId = setTimeout(() => {
        stateRef.current.isDeleting = true;
      }, delayAfterType);
      return () => clearTimeout(timeoutId);
    }
    
    if (stateRef.current.text === '' && stateRef.current.isDeleting) {
      // Word is fully deleted, wait then move to next word
      const timeoutId = setTimeout(() => {
        const nextWordIndex = (stateRef.current.wordIndex + 1);
        if (nextWordIndex >= words.length && !loop) {
          // Stop if not looping
          return;
        }
        stateRef.current.wordIndex = loop ? nextWordIndex % words.length : nextWordIndex;
        stateRef.current.isDeleting = false;
        setCurrentWordIndex(stateRef.current.wordIndex);
      }, delayAfterDelete);
      return () => clearTimeout(timeoutId);
    }

  }, [displayText, delayAfterType, delayAfterDelete, words, loop]);

  useEffect(() => {
    // This effect ONLY handles the character-by-character animation
    const handleTyping = () => {
      const currentWord = words[stateRef.current.wordIndex];
      
      // Update the text based on typing or deleting state
      const newText = stateRef.current.isDeleting
        ? currentWord.substring(0, stateRef.current.text.length - 1)
        : currentWord.substring(0, stateRef.current.text.length + 1);

      stateRef.current.text = newText;
      setDisplayText(newText);
    };

    const typingInterval = setInterval(handleTyping, stateRef.current.isDeleting ? deleteSpeed : typeSpeed);

    return () => clearInterval(typingInterval);
  }, [deleteSpeed, typeSpeed, words]);

  return {
    displayText,
    currentWordIndex,
  };
};