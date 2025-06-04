// класс эллипса с реализацией отрисовки через ellipse

import {Shape} from "./Shape.ts";

export class Ellipse extends Shape {
    draw(ctx: CanvasRenderingContext2D) {
        //получаем центр фигуры
        const centerX = (this.x1 + this.x2) / 2;
        const centerY = (this.y1 + this.y2) / 2;
        //радиусы
        const radiusX = Math.abs(this.x1 - this.x2) / 2;
        const radiusY = Math.abs(this.y1 - this.y2) / 2;

        //отрисовка эллипса
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.stroke();
    }
}