import * as React from 'react';
import { CanvasText } from '../types/canvas';
import SVGTextEditable from './SVGTextEditable';


interface SVGTextsProps {
  texts: CanvasText[];
  onChange?: (oldText: CanvasText, newText: CanvasText) => void;
}

export const SVGTexts = ({ texts, onChange }: SVGTextsProps) => {
  return <>{
    texts.map((text, id) => {
      return <SVGTextEditable text={text} key={id.toString()} onChange={onChange}/>;
    })
  }</>;
};
