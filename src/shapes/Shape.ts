import type { IShape } from "./interfaces/IShape.ts";

// абстрактный класс с реализацией общих методов для всех фигур
export abstract class Shape implements IShape {
constructor(
    protected x1: number,
    protected y1: number,
    protected x2: number,
    protected y2: number,
    protected color: string,
    protected lineWidth: number
  ) {}

  getX1(): number {
    return this.x1;
  }
  getY1(): number {
    return this.y1;
  }

  setX2(x: number): void {
   if(x > 0) {
     this.x2 = x;
   } else {
     throw new Error("Невалидные координаты для x2");
   }
  }
  setY2(y: number): void {
    if(y > 0) {
      this.y2 = y;
    } else {
      throw new Error("Невалидные координаты для y2");
    }
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract contains(x: number, y: number): boolean;

  move(dx: number, dy: number): void {
    this.x1 += dx;
    this.y1 += dy;
    this.x2 += dx;
    this.y2 += dy;
  }
}