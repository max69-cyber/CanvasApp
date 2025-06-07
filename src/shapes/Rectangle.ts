import { Shape } from "./Shape";

//класс прямоугольника с реализацией отрисовки через strokeRect
export class Rectangle extends Shape {
    draw(ctx: CanvasRenderingContext2D): void {
        //получаем верхний левый угол для вставки в strokeRect (пригодится если пользователь стал рисовать фигуру снизу вверх)
        const x: number = Math.min(this.x1, this.x2);
        const y: number = Math.min(this.y1, this.y2);

        // вычисление ширины с обработкой случая с первой нижней точкой
        const width: number = Math.abs(this.x1 - this.x2);
        const height: number = Math.abs(this.y1 - this.y2);

        // устанавливаем цвет линии и рисуем прямоугольник по его верхнему левому углу и длинам сторон
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeRect(x, y, width, height);
    }

    //метод определяет кликнули ли мы по фигуре по сторонам прямоугольника
    contains(x: number, y: number): boolean {
        const top: number = Math.min(this.y1, this.y2);
        const right: number = Math.max(this.x1, this.x2);
        const down: number = Math.max(this.y1, this.y2);
        const left: number = Math.min(this.x1, this.x2);

        return x >= left && x <= right && y >= top && y <= down;
    }
}