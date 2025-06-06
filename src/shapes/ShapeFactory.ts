//создает экземпляры фигур определенного типа

import type {IShape} from "./interfaces/IShape.ts";
import {Rectangle} from "./Rectangle.ts";
import {Ellipse} from "./Ellipse.ts";
import {Line} from "./Line.ts";

export type ShapeType = "rectangle" | "ellipse" | "line";

export function createShape(
    type: ShapeType,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string,
    lineWidth: number
): IShape {
    switch (type) {
        case "rectangle":
            return new Rectangle(x1, y1, x2, y2, color, lineWidth);
        case "ellipse":
            return new Ellipse(x1, y1, x2, y2, color, lineWidth);
        case "line":
            return new Line(x1, y1, x2, y2, color, lineWidth);
        default:
            throw new Error(`Неизвестный тип фигуры: ${type}`);
    }
}

