var ExternalApi = function (gameManager) {
    this.gameManager = gameManager;
}

ExternalApi.prototype.move = function (direction) {
    // 0: up, 1: right, 2: down, 3: left
    this.gameManager.move(direction);
}

ExternalApi.prototype.getGrid = function () {
    var cells = this.gameManager.grid.cells;
    var result = [];
    for (var i = 0; i < cells.length; i++) {
        var line = cells[i];
        var newLine = [];
        result.push(newLine);
        for (var j = 0; j < line.length; j++) {
            var cell = line[j];
            newLine.push(cell ? cell.value : 0);
        }
    }
    return result;
}

var printGrid = function (grid) {
    console.log(JSON.stringify(grid));
}

var copyData = function (object) {
    return JSON.parse(JSON.stringify(object));
}

var immutableReverse = function (tab) {
    var result = copyData(tab);
    result.reverse();
    return result;
}

var reverseMatrix = function (matrix, horizontal) {
    if (horizontal) {
        return immutableReverse(matrix);
    } else {
        var result = [];
        for (var i = 0; i < matrix.length; i++) {
            result.push(immutableReverse(matrix[i]));
        }
        return result;
    }
}

var transposeMatrix = function (matrix) {
    var result = [];
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (!result[j]) {
                result[j] = [];
            }
            result[j].push(matrix[i][j])
        }
    }
    return result;
}

var objectEquals = function(objet1, objet2) {
    return JSON.stringify(objet1) == JSON.stringify(objet2);
}

ExternalApi.prototype.simulateMove = function (direction) {
    // 0: up, 1: right, 2: down, 3: left
    console.log("simulate " + direction);
    var grid = this.getGrid();
    printGrid(grid);
    var newGrid;
    // "up"
    if (direction == 0) {
        newGrid = transposeMatrix(grid);
        // "right"
    } else if (direction == 1) {
        newGrid = reverseMatrix(grid, true);
        // "down"
    } else if (direction == 2) {
        newGrid = reverseMatrix(transposeMatrix(grid), false);
        // "left"
    } else if (direction == 3) {
        newGrid = copyData(grid);
    }

    for (var i = 1; i < newGrid.length; i++) {
        for (var j = 0; j < newGrid[i].length; j++) {
            var value = newGrid[i][j];
            var farTile = {
                x: i - 1,
                y: j,
                value: function () {
                    return newGrid[this.x][this.y];
                },
                setValue: function (value) {
                    newGrid[this.x][this.y] = value;
                }
            };
            while (!farTile.value() && farTile.x >= 1) {
                farTile.x -= 1;
            }
            var closeValue = farTile.value();
            newGrid[i][j] = 0;
            if (!closeValue) {
                farTile.setValue(value);
            } else if (closeValue == value) {
                farTile.setValue(value * 2);
            } else {
                farTile.x += 1;
                farTile.setValue(value);
            }
        }
    }

    printGrid(newGrid);
    // "up"
    if (direction == 0) {
        newGrid = transposeMatrix(newGrid);
        // "right"
    } else if (direction == 1) {
        newGrid = reverseMatrix(newGrid, true);
        // "down"
    } else if (direction == 2) {
        newGrid = transposeMatrix(reverseMatrix(newGrid, false));
        // "left"
    } else if (direction == 3) {
        //newGrid = newGrid;
    }
    if (objectEquals(grid, newGrid)) {
        return false;
    }
    return newGrid;
}


