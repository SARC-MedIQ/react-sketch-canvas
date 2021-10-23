import { ReactSketchCanvasMode } from '../ReactSketchCanvas';


export type ExportImageType = "jpeg" | "png";

export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface CanvasPath {
  readonly paths: Point[];
  readonly strokeWidth: number;
  readonly strokeColor: string;
  readonly drawMode: ReactSketchCanvasMode;
  readonly startTimestamp?: number;
  readonly endTimestamp?: number;
}

export interface CanvasText {
  readonly id: number;
  readonly text: string;
  readonly position: Point;
}
