import type { IShape } from "./IShape";

// абстрактный класс с реализацией общих методов для всех фигур
// ! возможно создать сеттеры для валидации данных
export abstract class Shape implements IShape {
constructor(
    public x1: number,
    public y1: number,
    public x2: number,
    public y2: number,
    public color: string,
  ) {}

  abstract draw(ctx: CanvasRenderingContext2D): void;

  move(dx: number, dy: number) {
    this.x1 += dx;
    this.y1 += dy;
    this.x2 += dx;
    this.y2 += dy;
  }
}