import type {ResizePointType} from "../types/ResizePointType.ts";

export class ResizePoint {
    private x: number;
    private y: number;
    private readonly type: ResizePointType;


    constructor(x: number, y: number, pointType: ResizePointType) {
        this.type = pointType;
        this.x = x;
        this.y = y;
    }

    getX(): number {
        return this.x;
    }
    getY(): number {
        return this.y;
    }

    getType(): ResizePointType {
        return this.type;
    }
    setX(x: number): void {
        if(x > 0) {
            this.x = x;
        } else {
            throw new Error("Невалидные координаты для x");
        }
    }
    setY(y: number): void {
        if(y > 0) {
            this.y = y;
        } else {
            throw new Error("Невалидные координаты для y");
        }
    }


    draw(ctx: CanvasRenderingContext2D): void {
        const size: number = 4;
        const half: number = size / 2;


        ctx.strokeStyle = "#ff0000";
        ctx.lineWidth = 10;
        ctx.strokeRect(this.x - half, this.y - half, size, size);
    }

    contains(px: number, py: number): boolean {
        const size = 8;
        const half: number = size / 2;
        return (
            px >= this.x - half &&
            px <= this.x + half &&
            py >= this.y - half &&
            py <= this.y + half
        );
    }
}