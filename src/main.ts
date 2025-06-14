import type { Shape } from "./shapes/Shape";
import {createShape} from "./shapes/ShapeFactory.ts";
import {CommandManager} from "./commands/CommandManager.ts";
import {AddShapeCommand} from "./commands/AddShapeCommand.ts";
import {MoveShapeCommand} from "./commands/MoveShapeCommand.ts";
import {CanvasManager} from "./CanvasManager.ts";
import {Toolbar} from "./Toolbar.ts";
import {SelectionBox} from "./shapes/SelectionBox.ts";

// массив всего что на канвасе
const shapes: Shape[] = [];
// инициализация менеджера команд
const commandManager: CommandManager = new CommandManager();

const canvasManager = new CanvasManager("canvas", shapes);
const toolbar = new Toolbar();

const canvas: HTMLCanvasElement = canvasManager.getCanvas();
const ctx: CanvasRenderingContext2D = canvasManager.getContext();

let selectionBox: SelectionBox | null = null;

// логика создания и перемещения фигуры

//точки начала рисования
let startX: number = 0;
let startY: number = 0;
//состояние рисования - чтобы понять когда пользователь создает фигуру при движении курсора
let isDrawing: boolean = false;
//переменная для хранения текущей фигуры
let currentShape: Shape | null = null;
//переменная для хранения перемещаемой фигуры
let draggedShape: Shape | null = null;
//хранят смещение от угла фигуры для более удобного перемещения
let offsetX: number = 0;
let offsetY: number = 0;

//начало создания, ивент на нажатие по канвасу
canvas.addEventListener("mousedown", (e: MouseEvent): void => {
  isDrawing = true;
  //getBoundingClientRect позволяет получить позицию канваса, чтобы работать с координатами внутри него
  const canvasRect: DOMRect = canvas.getBoundingClientRect();

  //вычисляем координаты первой точки, используя canvasRect
  startX = e.clientX - canvasRect.left;
  startY = e.clientY - canvasRect.top;

  //проходимся по массиву фигур чтобы проверить хочет ли пользователь переместить фигуру или создать
  if(toolbar.isMoveMode) {
    for (let i = shapes.length - 1; i >= 0; i--) {
      if (shapes[i].contains(startX, startY)) {
        draggedShape = shapes[i];
        offsetX = startX - draggedShape.getX1();
        offsetY = startY - draggedShape.getY1();

        selectionBox = new SelectionBox(draggedShape);
        isDrawing = false;
        return;
      }
    }
  }

  selectionBox = null;

  //создаем экземпляр фигуры в одной точке
  currentShape = createShape(toolbar.currentShapeType, startX, startY, startX, startY, toolbar.currentColor, toolbar.currentLineWidth);
});

//регулировка размера, ивент на движение курсора
canvas.addEventListener("mousemove", (e: MouseEvent): void => {
  const rect: DOMRect = canvas.getBoundingClientRect();
  const x: number = e.clientX - rect.left;
  const y: number = e.clientY - rect.top;

  // проверка на перетаскивание
  if (draggedShape) {
    const dx: number = x - draggedShape.getX1() - offsetX;
    const dy: number = y - draggedShape.getY1() - offsetY;

    draggedShape.move(dx, dy);
    canvasManager.drawAll(selectionBox);
    return;
  }

  if(isDrawing && currentShape){
    //устанавливаем вторую точку фигуры
    currentShape.setX2(x);
    currentShape.setY2(y);

    canvasManager.drawAll(selectionBox);
    //отрисовываем для просмотра
    currentShape.draw(ctx);
  }
});

// конец создания фигуры, ивент на отжатие кнопки мыши
canvas.addEventListener("mouseup", (e) => {
  // добавляем в массив всех фигур готовую (через функцию класса commandManager) и сбрасываем выделение
  if (currentShape) {
    const command: AddShapeCommand = new AddShapeCommand(shapes, currentShape);
    commandManager.executeCommand(command);
    currentShape = null;
    isDrawing = false;
  }

  if(draggedShape){
    //вычисляем насколько сдвинулась фигура
    const canvasRect: DOMRect = canvas.getBoundingClientRect();
    const dx: number = e.clientX - canvasRect.left - startX;
    const dy: number = e.clientY - canvasRect.top - startY;
    // ? тут на самом деле костыль получается, я должен вернуть фигуру на начальную позицию, потому что хочу чтобы пользователь видел
    // ? в реальном времени перемещение, но чтобы выполнить команду надо совершить MoveShapeCommand, для того чтобы его можно было сделать redo
    draggedShape.move(-dx, -dy);
    //создаем новую команду перемещения
    const command: MoveShapeCommand = new MoveShapeCommand(draggedShape, dx, dy);
    commandManager.executeCommand(command);
    draggedShape = null;
  }
  canvasManager.drawAll(selectionBox);
});

//обработка нажатий на кнопки отмены и отмены отмены
const undoButton: HTMLButtonElement | undefined = document.getElementById("undoButton") as HTMLButtonElement;
const redoButton: HTMLButtonElement | undefined = document.getElementById("redoButton") as HTMLButtonElement;
undoButton.addEventListener("click", (): void => {
  commandManager.undo();
  canvasManager.drawAll(selectionBox);
});
redoButton.addEventListener("click", (): void => {
  commandManager.redo();
  canvasManager.drawAll(selectionBox);
});