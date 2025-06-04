// интерфейс для контроля за методами, которые реализует фигура
export interface IShape {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    color: string;
    lineWidth: number;

    draw(ctx: CanvasRenderingContext2D): void;
    move(dx: number, dy: number): void;
}