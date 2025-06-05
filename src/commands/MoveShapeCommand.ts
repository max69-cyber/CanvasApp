//команда отвечающая за создание фигуры

import type {ICommand} from "./ICommand.ts";
import type {Shape} from "../shapes/Shape.ts";

export class MoveShapeCommand implements ICommand {
    //инкапсулируем свойства класса
    constructor(
        private shape: Shape,
        private dx: number,
        private dy: number
    ) {}

    execute() {
    }

    //перемещение обратно
    undo(): void {
        this.shape.move(-this.dx, -this.dy);
    }
}