import { useEffect, useRef } from 'react';
import { MazeMachine } from './MazeMachine';


class Maze {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private playInterval: NodeJS.Timer | undefined;
    private machine: MazeMachine;

    private fillScreen = true;
    private playSpeed = 20;
    private cellSize = 20;
    private canvasWidth = this.fillScreen ? Math.floor(window.innerWidth - (window.innerWidth % this.cellSize)) : 800;
    private canvasHeight = this.fillScreen ? Math.floor(window.innerHeight - (window.innerHeight % this.cellSize)) : 800;
    private lineWidth = 2;
    private strokeColor = '#222';
    private cellColor = '#000';
    private visitedCellColor = '#FFF';

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const context = canvas.getContext('2d');

        if (context) {
            this.ctx = context;
        } else {
            throw new Error('Could not get canvas context');
        }

        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;

        this.machine = new MazeMachine();
        this.machine.initCells(Math.floor(this.canvasWidth / this.cellSize), Math.floor(this.canvasHeight / this.cellSize));

        this.redrawGrid();

        this.play();
    }

    play() {
        this.machine.createMaze();
        console.log(this.machine.getCells());
        this.redrawGrid();

        this.playInterval = setInterval(() => {
            if (this.machine.nextStep()) {
                this.redrawGrid();
            } else {
                if (this.playInterval) {
                    clearInterval(this.playInterval);
                    console.log('DONE');
                }
            }
        }, this.playSpeed);
    }

    redrawGrid() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        this.machine.getCells().forEach(cell => {
            const x = (cell.x * this.cellSize);
            const y = (cell.y * this.cellSize);
            const cellSize = this.cellSize;

            this.ctx.fillStyle = cell.visited ? this.visitedCellColor : this.cellColor;
            this.ctx.strokeStyle = this.strokeColor;
            this.ctx.lineWidth = this.lineWidth;

            this.ctx.fillRect(x, y, cellSize, cellSize);

            if (cell.walls.top) {
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                this.ctx.lineTo(x + this.cellSize, y);
                this.ctx.stroke();
            }

            if (cell.walls.right) {
                this.ctx.beginPath();
                this.ctx.moveTo(x + this.cellSize, y);
                this.ctx.lineTo(x + this.cellSize, y + this.cellSize);
                this.ctx.stroke();
            }

            if (cell.walls.bottom) {
                this.ctx.beginPath();
                this.ctx.moveTo(x, y + this.cellSize);
                this.ctx.lineTo(x + this.cellSize, y + this.cellSize);
                this.ctx.stroke();
            }

            if (cell.walls.left) {
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                this.ctx.lineTo(x, y + this.cellSize);
                this.ctx.stroke();
            }
        });

        // this.drawGrid();
        // this.drawCells();

        // this.tick = this.tick + 1;
    }
}

export const MazeComponent = () => {
    const mazeCanvas = useRef(null);

    useEffect(() => {
        if (mazeCanvas.current) {
            new Maze(mazeCanvas.current);
        }
    }, []);

    return (
        <canvas id="maze" ref={mazeCanvas} />
    )
};