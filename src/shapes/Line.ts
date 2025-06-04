// класс эллипса с реализацией отрисовки через lineTo

import {Shape} from "./Shape.ts";

export class Line extends Shape {
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;

        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
    }
}