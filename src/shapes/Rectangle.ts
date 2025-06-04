import { Shape } from "./Shape";

//класс прямоугольника с реализацией отрисовки через strokeRect
export class Rectangle extends Shape {
    draw(ctx: CanvasRenderingContext2D) {
        //получаем верхний левый угол для вставки в strokeRect (пригодится если пользователь стал рисовать фигуру снизу вверх)
        const x = Math.min(this.x1, this.x2);
        const y = Math.min(this.y1, this.y2);

        // вычисление ширины с обработкой случая с первой нижней точкой
        const width = Math.abs(this.x1 - this.x2);
        const height = Math.abs(this.y1 - this.y2);

        // устанавливаем цвет линии и рисуем прямоугольник по его верхнему левому углу и длинам сторон
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeRect(x, y, width, height);
    }
}