//менеджер, который управляет командами и хранит их

import type {ICommand} from "./interfaces/ICommand.ts";

export class CommandManager {
    // здесь хранятся все команды которые могут быть отменены, либо уже отменены
    private undoStack: ICommand[] = [];
    private redoStack: ICommand[] = [];

    //выполнение команды, добавление в массив возможных отмен и очистка массива отмен отмен
    executeCommand(command: ICommand): void {
        command.execute();
        this.undoStack.push(command);
        this.redoStack = [];
    }

    //отмена действия, получаем последнюю команду, проверяем есть ли она и откатываем действие, добавляя его в массив отмен отмен
    undo(): void {
        const command: ICommand | undefined = this.undoStack.pop();
        if(command) {
            command.undo();
            this.redoStack.push(command);
        }
    }

    //отмена отмены, работает как undo, но с поменянными массивами
    redo(): void {
        const command: ICommand | undefined = this.redoStack.pop();
        if(command) {
            command.execute();
            this.undoStack.push(command);
        }
    }
}