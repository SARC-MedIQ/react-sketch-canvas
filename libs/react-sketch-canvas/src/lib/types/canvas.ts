export type ExportImageType = "jpeg" | "png";

export interface Point {
  readonly x: number;
  readonly y: number;
}

export enum CanvasMode {
  none,
  pen,
  text,
  eraser,
}

export interface CanvasPath {
  readonly paths: Point[];
  readonly strokeWidth: number;
  readonly strokeColor: string;
  readonly drawMode: CanvasMode;
  readonly startTimestamp?: number;
  readonly endTimestamp?: number;
}

export interface CanvasText {
  readonly id: number;
  readonly text: string;
  readonly position: Point;
}
