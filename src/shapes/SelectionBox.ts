import type {Shape} from "./Shape.ts";
import {Line} from "./Line.ts";
import {ResizePoint} from "./ResizePoint.ts";
import type {ResizePointType} from "../types/ResizePointType.ts";

export class SelectionBox {
    private readonly shape: Shape;
    private resizePoints: ResizePoint[] = [];
    constructor(selectedShape: Shape) {
        this.shape = selectedShape;
        this.initResizePoints();
    }

    draw(ctx: CanvasRenderingContext2D): void {
        if(this.shape instanceof Line) {
            this.resizePoints.forEach(p => p.draw(ctx));
            return;
        }
        const x: number = Math.min(this.shape.getX1(), this.shape.getX2());
        const y: number = Math.min(this.shape.getY1(), this.shape.getY2());

        const width: number = Math.abs(this.shape.getX1() - this.shape.getX2());
        const height: number = Math.abs(this.shape.getY1() - this.shape.getY2());

        ctx.strokeStyle = "#0060fb";
        ctx.lineWidth = 10;
        ctx.strokeRect(x, y, width, height);

        this.resizePoints.forEach(p => p.draw(ctx));
    }

    initResizePoints(): void {
        this.resizePoints = [];

        if (this.shape instanceof Line) {
            this.resizePoints.push(new ResizePoint(this.shape.getX1(), this.shape.getY1(), "start"));
            this.resizePoints.push(new ResizePoint(this.shape.getX2(), this.shape.getY2(), "end"));
            return;
        }

        const { x, y, width, height } = this.getBoundingBox();
        const cx: number = x + width / 2;
        const cy: number = y + height / 2;
        const x1: number = this.shape.getX1();
        const x2: number = this.shape.getX2();
        const y1: number = this.shape.getY1();
        const y2: number = this.shape.getY2();

        const handleDefs: { x: number; y: number; type: ResizePointType }[] = [
            { x: cx,  y: y1, type: "top" },
            { x: x2,  y: y1, type: "top-right" },
            { x: x2,  y: cy, type: "right" },
            { x: x2,  y: y2, type: "bottom-right" },
            { x: cx,  y: y2, type: "bottom" },
            { x: x1,  y: y2, type: "bottom-left" },
            { x: x1,  y: cy, type: "left" },
            { x: x1,  y: y1, type: "top-left" },
        ];

        this.resizePoints = handleDefs.map(
            ({ x, y, type }): ResizePoint => new ResizePoint(x, y, type)
        );
    }

    getBoundingBox(): { x: number; y: number; width: number; height: number } {
        const x: number = Math.min(this.shape.getX1(), this.shape.getX2());
        const y: number = Math.min(this.shape.getY1(), this.shape.getY2());
        const width: number = Math.abs(this.shape.getX2() - this.shape.getX1());
        const height: number = Math.abs(this.shape.getY2() - this.shape.getY1());
        return { x, y, width, height };
    }
}