// интерфейс для контроля за методами, которые реализует фигура
import type {ResizePointType} from "../../types/ResizePointType.ts";

export interface IShape {
    draw(ctx: CanvasRenderingContext2D): void;
    move(dx: number, dy: number): void;
    contains(x: number, y: number): boolean;
    resize(dx: number, dy: number, resizePoint: ResizePointType): void;
}