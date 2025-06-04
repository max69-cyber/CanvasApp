import type { Shape } from "./shapes/Shape";
import {createShape} from "./shapes/ShapeFactory.ts";

//получаем canvas и говорим что он точно canvas
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = getCanvasContext(canvas);

//функция для безопасного получения контекста канваса
function getCanvasContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Не удалось получить 2d контекст!");
  }
  return context;
}

//обеспечивает адаптивный размер для canvas
function resizeCanvas() {
  const toolbarMargin: number = 50;
  const borderMargin: number = 10;
  canvas.width = window.innerWidth - borderMargin * 2;
  canvas.height = window.innerHeight - toolbarMargin - borderMargin;
  canvas.style.top = `${toolbarMargin}px`;
  canvas.style.left = `${borderMargin}px`;
}

//при изменении размера окна подстроим canvas
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// логика создания фигуры

//точки начала рисования
let startX = 0;
let startY = 0;
//состояние рисования - чтобы понять когда пользователь создает фигуру при движении курсора
let isDrawing = false;
//редактируемая фигура
let currentShape: Shape | null = null;

// enum для типов фигур
enum ShapeType {
  Rectangle = "rectangle",
  Ellipse = "ellipse",
  Line = "line"
}

// переменная хранит текущий тип фигуры, по дефолту - прямоугольник
let currentShapeType: ShapeType = ShapeType.Rectangle;

// выбор фигуры, выбираем кнопки с toolbar, для каждой пишем ивент, который при нажатии берет ее тип фигуры и устанавливает как активный для рисования
document.querySelectorAll<HTMLButtonElement>("#toolbar button").forEach(button => {
      button.addEventListener("click", () => {
        const shape: string | undefined = button.dataset.shape;
        if (shape && Object.values(ShapeType).includes(shape as ShapeType)) {
          currentShapeType = button.dataset.shape as ShapeType;
        }

        //для выделения активной фигуры
        document.querySelectorAll("#toolbar button").forEach(b => b.classList.remove("active"));
        button.classList.add("active");
      });
    }
);

// массив всего что на канвасе
const shapes: Shape[] = [];

//начало создания, ивент на нажатие по канвасу
canvas.addEventListener("mousedown", (e: MouseEvent) => {
  isDrawing = true;
  //getBoundingClientRect позволяет получить позицию канваса, чтобы работать с координатами внутри него
  const canvasRect = canvas.getBoundingClientRect();

  //вычисляем координаты первой точки, используя canvasRect
  startX = e.clientX - canvasRect.left;
  startY = e.clientY - canvasRect.top;

  //создаем экземпляр фигуры в одной точке
  // TODO: сделать кнопки для выбора фигур
  currentShape = createShape(currentShapeType, startX, startY, startX, startY, "#000000", 7)
});

//регулировка размера, ивент на движение курсора
canvas.addEventListener("mousemove", (e: MouseEvent) => {
  //проверяем редактируется ли фигура
  if(!isDrawing || !currentShape) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  //устанавливаем вторую точку фигуры
  currentShape.x2 = x;
  currentShape.y2 = y;

  drawAll();
  //отрисовываем для просмотра
  currentShape.draw(ctx);
});

// конец создания фигуры, ивент на отжатие кнопки мыши
canvas.addEventListener("mouseup", () => {
  // добавляем в массив всех фигур готовую и сбрасываем выделение
  if (currentShape) {
    shapes.push(currentShape);
    currentShape = null;
  }
  isDrawing = false;

  drawAll();
});

//отрисовка всех существующих фигур
function drawAll(): void {
  //очистка канваса
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //рисуем все фигуры
  for(const shape of shapes) {
    shape.draw(ctx);
  }
}

