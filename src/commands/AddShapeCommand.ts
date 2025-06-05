//команда отвечающая за создание фигуры

import type {ICommand} from "./ICommand.ts";
import type {Shape} from "../shapes/Shape.ts";

export class AddShapeCommand implements ICommand {
    //инкапсулируем свойства класса
    constructor(
        private shapes: Shape[],
        private newShape: Shape
    ) {}

    //добавление фигуры
    execute(): void {
        this.shapes.push(this.newShape);
    }

    //удаление фигуры (через redo)
    undo(): void {
        this.shapes.pop();
    }
}