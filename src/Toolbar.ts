// enum для типов фигур
export enum ShapeType {
    Rectangle = "rectangle",
    Ellipse = "ellipse",
    Line = "line"
}

export class Toolbar {
    // переменная хранит текущий тип фигуры, по дефолту - прямоугольник
    currentShapeType: ShapeType = ShapeType.Rectangle;
    //переключатель перемещения
    isMoveMode: boolean = false;
    currentColor = "#000000";
    currentLineWidth = 5;

    constructor() {
        this.initShapeButtons();
        this.initMoveToggle();
        this.initColorInput();
        this.initLineWidthInput();
        window.addEventListener("load", () => {
            this.setDefaults();
        });
    }

    // выбор фигуры, выбираем кнопки с toolbar, для каждой пишем ивент, который при нажатии берет ее тип фигуры и устанавливает как активный для рисования
    private initShapeButtons(): void {
        document.querySelectorAll<HTMLButtonElement>('#toolbar button[data-shape]').forEach(button => {
            button.addEventListener('click', (): void => {
                const shape: string | undefined = button.dataset.shape;
                if (shape && Object.values(ShapeType).includes(shape as ShapeType)) {
                    this.currentShapeType = shape as ShapeType;
                }

                document.querySelectorAll('#toolbar button[data-shape]').forEach(b => b.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    // событие на вкл/выкл перемещения фигур
    private initMoveToggle(): void {
        const moveToggleBtn = document.getElementById("move-toggle") as HTMLButtonElement;
        moveToggleBtn.addEventListener("click", () => {
            this.isMoveMode = !this.isMoveMode;
            if (this.isMoveMode) {
                moveToggleBtn.classList.add("active");
            } else {
                moveToggleBtn.classList.remove("active");
            }
        });
    }

    private initColorInput() {
        const colorInput = document.getElementById("color-picker") as HTMLInputElement;
        colorInput.addEventListener("input", () => {
            this.currentColor = colorInput.value;
        });
    }

    private initLineWidthInput() {
        const lineWidthInput = document.getElementById("line-width") as HTMLInputElement;
        lineWidthInput.addEventListener("input", () => {
            const parsed = parseInt(lineWidthInput.value);
            if (parsed >= 1 && parsed <= 100 && !isNaN(parsed)) {
                this.currentLineWidth = parsed;
            }
        });
    }

    private setDefaults(): void {
        const colorInput = document.getElementById("color-picker") as HTMLInputElement;
        const lineWidthInput = document.getElementById("line-width") as HTMLInputElement;
        colorInput.value = this.currentColor;
        lineWidthInput.value = this.currentLineWidth.toString();
    }
}
