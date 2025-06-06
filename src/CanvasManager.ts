import type {Shape} from "./shapes/Shape.ts";

export class CanvasManager {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly shapes: Shape[];
    private toolbarMargin: number = 10;
    private borderMargin: number = 10;

    constructor(canvasId: string, shapes: Shape[]) {
        //получаем canvas и говорим что он точно canvas
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.getCanvasContext(this.canvas);
        this.shapes = shapes;
        this.resizeCanvas();
        window.addEventListener("resize", (): void => this.resizeCanvas());
    }

    getContext() {
        return this.ctx;
    }

    getCanvas() {
        return this.canvas;
    }

    //обеспечивает адаптивный размер для canvas
    private resizeCanvas(): void {
        this.canvas.width = window.innerWidth - this.borderMargin * 2;
        this.canvas.height = window.innerHeight - this.toolbarMargin - this.borderMargin;
        this.canvas.style.top = `${this.toolbarMargin}px`;
        this.canvas.style.left = `${this.borderMargin}px`;
        this.drawAll();
    }

    //отрисовка всех существующих фигур
    drawAll(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const shape of this.shapes) {
            shape.draw(this.ctx);
        }
    }

    //функция для безопасного получения контекста канваса
    private getCanvasContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
        const context = canvas.getContext("2d");
        if (!context) {
            throw new Error("Не удалось получить 2d контекст!");
        }
        return context;
    }
}