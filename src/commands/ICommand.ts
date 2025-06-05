// интерфейс для контроля за методами, которые реализуют различные команды

export interface ICommand {
    execute(): void;
    undo(): void;
}