// интерфейс для контроля за методами, которые реализует фигура
export interface IShape {
    draw(ctx: CanvasRenderingContext2D): void;
    move(dx: number, dy: number): void;
    contains(x: number, y: number): boolean;
}