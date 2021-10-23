import React, { useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useOnClickOutside } from 'react-sketch-canvas';
import { CanvasText } from '../types/canvas';


export interface SVGTextEditableProps {
  text: CanvasText;
  onChange?: (oldText: CanvasText, newText: CanvasText) => void;
}

interface Size {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function SVGTextEditable({
                                          text,
                                          onChange
                                        }: SVGTextEditableProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [wasDragged, setWasDragged] = useState(false);
  const [currentText, setCurrentText] = useState(text.text);
  const [textSize, setTextSize] = useState<Size>({
    height: 0,
    width: 0,
    x: 0,
    y: 0
  });

  const inputRef = useRef<HTMLInputElement>(null);
  useOnClickOutside(inputRef, () => {
    if (isEditing) {
      rollbackChanges();
    }
  });

  const textRef = useRef<SVGTextElement>(null);

  const beginEditing = () => {
    if (wasDragged) {
      setWasDragged(false);
      return;
    }
    setIsEditing(true);
    if (textRef.current) {
      const size = textRef.current.getBBox();
      const mX = 2;
      const mY = 1.2;
      const dx = size.width * mX - size.width;
      const dy = size.height * mY - size.height;
      size.width *= mX;
      size.height *= mY;
      size.x -= dx / 2;
      size.y -= dy / 2;
      setTextSize(size);
    }
  };

  const commitChanges = () => {
    setIsEditing(false);
    if (onChange) {
      onChange(text, {
        ...text,
        text: currentText
      });
    }
  };

  const rollbackChanges = () => {
    setIsEditing(false);
    setCurrentText(text.text);
  };

  const isDragging = () => {
    setWasDragged(true);
  };

  const onDragStop = (e: DraggableEvent, data: DraggableData): void | false => {
    if (!wasDragged) {
      return;
    }
    if (!textRef.current) {
      return;
    }
    const newX = parseFloat(textRef.current.getAttribute('x') || '0') + data.x;
    const newY = parseFloat(textRef.current.getAttribute('y') || '0') + data.y;
    textRef.current.removeAttribute('transform');
    if (onChange) {
      onChange(text, {
        ...text,
        position: {
          x: newX,
          y: newY
        }
      });
    }
  };

  if (isEditing) {
    return <foreignObject
      x={textSize.x}
      y={textSize.y}
      width={textSize.width}
      height={textSize.height}
    >
      <input type='text'
             ref={inputRef}
             style={{
               // border: '1px solid black',
               width: '100%',
               height: '100%',
               textAlign: 'center'
             }}
             autoFocus={true}
             value={currentText}
             onInput={(e) => setCurrentText(e.currentTarget.value)}
             onFocus={(e) => e.currentTarget.select()}
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
      />
    </foreignObject>;
  }

  return <Draggable onDrag={isDragging} onStop={onDragStop}>
    <text
      x={text.position.x}
      y={text.position.y}
      onClick={beginEditing}
      ref={textRef}
    >
      {currentText}
    </text>
  </Draggable>;
}
