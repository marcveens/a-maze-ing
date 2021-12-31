type Walls = {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
};

class Cell {
    index: number;
    x: number;
    y: number;
    walls: Walls;
    visited: boolean;

    constructor(x: number, y: number, index: number) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.visited = false;
        this.walls = {
            top: true,
            right: true,
            bottom: true,
            left: true
        };
    }
}

export class MazeMachine {
    private cells: Cell[];
    private progressStack: number[] = [];
    private iterations = 0;

    constructor() {
        this.cells = [];
    }

    initCells(xTotal: number, yTotal: number): void {
        let index = 0;

        this.cells = [];
        for (let y = 0; y < yTotal; y++) {
            for (let x = 0; x < xTotal; x++) {
                this.cells.push(new Cell(x, y, index));
                index++;
            }
        }
    }

    getCells(): Cell[] {
        return this.cells;
    }

    createMaze() {
        const currentCell = this.cells[0];
        const nextCell = this.getRandomNeighbour(currentCell);

        if (nextCell) {
            this.removeWall(currentCell, nextCell);

            this.progressStack.push(nextCell.index);
        }
    }

    nextStep(): boolean {
        const lastVisitedCell = this.cells[this.progressStack[this.progressStack.length - 1]];

        const nextCell = this.getRandomNeighbour(lastVisitedCell);

        this.iterations++;

        if (this.cells.filter(c => !c.visited).length === 0) {
            return false;
        }

        if (nextCell) {
            this.removeWall(lastVisitedCell, nextCell);

            this.progressStack.push(nextCell.index);

            return true;
        } else {
            this.progressStack.pop();

            return this.nextStep();
        }
    }

    getRandomNeighbour(cell: Cell): Cell | undefined {
        if (!cell) {
            return undefined;
        }

        const neighbours = [
            this.findCellByPosition(cell.x, cell.y - 1),
            this.findCellByPosition(cell.x + 1, cell.y),
            this.findCellByPosition(cell.x, cell.y + 1),
            this.findCellByPosition(cell.x - 1, cell.y)
        ]
            .filter(c => !!c)
            .filter(c => this.progressStack.indexOf((c as Cell).index) === -1)
            .filter(c => !c?.visited);

        const randomNeighbour = neighbours[Math.floor(Math.random() * neighbours.length)];

        return randomNeighbour;
    }

    removeWall(currentCell: Cell, nextCell: Cell) {
        // Get position of next cell relative to current cell
        const isNeighbourAbove = nextCell.y < currentCell.y;
        const isNeighbourBelow = nextCell.y > currentCell.y;
        const isNeighbourLeft = nextCell.x < currentCell.x;
        const isNeighbourRight = nextCell.x > currentCell.x;

        if (isNeighbourAbove) {
            currentCell.walls.top = false;
            nextCell.walls.bottom = false;
        } else if (isNeighbourBelow) {
            currentCell.walls.bottom = false;
            nextCell.walls.top = false;
        } else if (isNeighbourLeft) {
            currentCell.walls.left = false;
            nextCell.walls.right = false;
        } else if (isNeighbourRight) {
            currentCell.walls.right = false;
            nextCell.walls.left = false;
        }

        currentCell.visited = true;
        nextCell.visited = true;

        this.setCell(currentCell);
        this.setCell(nextCell);
    }

    findCellByPosition(x: number, y: number): Cell | undefined {
        return this.cells.find(cell => cell.x === x && cell.y === y);
    }

    findCellIndexByPosition(x: number, y: number): number | undefined {
        return this.cells.findIndex(cell => cell.x === x && cell.y === y);
    }

    setCell(cell: Cell) {
        const cellIndex = this.findCellIndexByPosition(cell.x, cell.y);

        if (cellIndex) {
            this.cells[cellIndex] = cell;
        }
    }
}