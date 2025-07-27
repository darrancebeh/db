import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  loop?: boolean;
}

interface UseTypewriterReturn {
  displayText: string;
  currentWordIndex: number;
  isDeleting: boolean;
  isComplete: boolean;
}

export const useTypewriter = ({
  words,
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 2000,
  loop = true,
}: UseTypewriterOptions): UseTypewriterReturn => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let timeout: NodeJS.Timeout;
    let delayTimeout: NodeJS.Timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => {
            const nextIndex = prev + 1;
            if (nextIndex >= words.length) {
              if (loop) {
                return 0;
              } else {
                setIsComplete(true);
                return prev;
              }
            }
            return nextIndex;
          });
        }
      }, deleteSpeed);
    } else {
      if (currentText !== currentWord) {
        timeout = setTimeout(() => {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        }, typeSpeed);
      } else {
        // Only set deleting after delayBetweenWords, and only if not already deleting
        if (!isDeleting) {
          delayTimeout = setTimeout(() => {
            setIsDeleting(true);
          }, delayBetweenWords);
        }
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
      if (delayTimeout) clearTimeout(delayTimeout);
    };
  }, [currentText, currentWordIndex, isDeleting, words, typeSpeed, deleteSpeed, delayBetweenWords, loop]);

  return {
    displayText: currentText,
    currentWordIndex,
    isDeleting,
    isComplete,
  };
};