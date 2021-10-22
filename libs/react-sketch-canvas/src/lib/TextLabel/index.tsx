import { useEffect, useRef, useState } from 'react';
import * as React from 'react';


export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: Event) => void
) {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(`mousedown`, listener);
    document.addEventListener(`touchstart`, listener);

    return () => {
      document.removeEventListener(`mousedown`, listener);
      document.removeEventListener(`touchstart`, listener);
    };

    // Reload only if ref or handler changes
  }, [ref, handler]);
}

export interface TextLabelProps {
  text?: string;
  className?: string;
  inputClassName?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}

export const TextLabel = ({
                            text,
                            className,
                            inputClassName,
                            style,
                            inputStyle
                          }: TextLabelProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);
  const [oldText, setOldText] = useState(text);

  const inputRef = useRef(null);
  useOnClickOutside(inputRef, () => {
    if (isEditing) {
      rollbackChanges();
    }
  });

  const commitChanges = () => {
    setIsEditing(false);
    setOldText(currentText);
  };

  const rollbackChanges = () => {
    setIsEditing(false);
    setCurrentText(oldText);
  };

  if (isEditing) {
    return <input type='text'
                  ref={inputRef}
                  autoFocus={true}
                  className={inputClassName}
                  style={inputStyle}
                  value={currentText}
                  onInput={(e) => setCurrentText(e.currentTarget.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      commitChanges();
                      return;
                    }
                    if (e.key === 'Escape') {
                      rollbackChanges();
                      return;
                    }
                  }
                  }
    />;
  }
  return <div
    className={className}
    style={style}
    onClick={() => setIsEditing(true)}
  >
    {currentText}
  </div>;
};
