//команда отвечающая за перемещение фигуры

import type {ICommand} from "./interfaces/ICommand.ts";
import type {Shape} from "../shapes/Shape.ts";

export class MoveShapeCommand implements ICommand {
    //инкапсулируем свойства класса
    constructor(
        private shape: Shape,
        private dx: number,
        private dy: number
    ) {}

    execute(): void {
        this.shape.move(this.dx, this.dy);
    }

    //перемещение обратно
    undo(): void {
        this.shape.move(-this.dx, -this.dy);
    }
}