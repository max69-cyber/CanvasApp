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

    //определяем находится ли точка в пределах фигуры с помощью вычисления расстояния от центра
    contains(x: number, y: number): boolean {
        const centerX: number = (this.x1 + this.x2) / 2;
        const centerY: number = (this.y1 + this.y2) / 2;
        const radiusX: number = Math.abs(this.x2 - this.x1) / 2;
        const radiusY: number = Math.abs(this.y2 - this.y1) / 2;

        const normX: number = (x - centerX) / radiusX;
        const normY: number = (y - centerY) / radiusY;

        return normX * normX + normY * normY <= 1;
    }
}