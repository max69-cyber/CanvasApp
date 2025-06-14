// класс эллипса с реализацией отрисовки через lineTo

import {Shape} from "./Shape.ts";
import type {ResizePointType} from "../types/ResizePointType.ts";

export class Line extends Shape {
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;

        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
    }

    //определяем находится ли точка в пределах фигуры с учетом расширением области попадания для отрезка
    contains(x: number, y: number): boolean {
        //расстояние, которое считается частью линии вокруг нее
        const threshold = 5;

        //вектор направления от А до В
        const dx: number = this.x2 - this.x1;
        const dy: number = this.y2 - this.y1;

        //проекция P на отрезок AB
        const t: number = ((x - this.x1) * dx + (y - this.y1) * dy) / (dx * dx + dy * dy);

        // проверка находится ли проекция внутри отрезка
        if (t < 0 || t > 1) return false;

        //ближайшая точка на отрезке
        const closestX: number = this.x1 + t * dx;
        const closestY: number = this.y1 + t * dy;

        //расстояние до ближайшей точки
        const dist: number = Math.hypot(x - closestX, y - closestY);

        return dist <= threshold;
    }

    resize(dx: number, dy: number, resizePoint: ResizePointType): void {
        switch (resizePoint) {
            case "start":
                this.x1 += dx;
                this.y1 += dy;
                break;
            case "end":
                this.x2 += dx;
                this.y2 += dy;
                break;
            default:
                throw new Error("Невалидный тип точки изменения размеров!");
        }
    }
}