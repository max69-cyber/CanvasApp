//команда отвечающая за создание фигуры

import type {ICommand} from "./interfaces/ICommand.ts";
import type {Shape} from "../shapes/Shape.ts";

export class AddShapeCommand implements ICommand {
    //инкапсулируем свойства класса
    constructor(
        private readonly shapes: Shape[],
        private readonly newShape: Shape
    ) {}

    //добавление фигуры
    execute(): void {
        this.shapes.push(this.newShape);
    }

    //удаление фигуры (через redo)
    undo(): void {
        const index: number = this.shapes.indexOf(this.newShape);
        if (index !== -1) {
            this.shapes.splice(index, 1);
        }
    }
}