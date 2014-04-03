var ExternalApi = function(gameManager) {
    this.gameManager = gameManager;
}

ExternalApi.prototype.move = function(direction) {
    // 0: up, 1: right, 2: down, 3: left
    this.gameManager.move(direction);
}

ExternalApi.prototype.getGrid = function() {
    var cells = this.gameManager.grid.cells;
    var result = [];
    for (var i=0;i<cells.length;i++) {
        var line = cells[i];
        var newLine = [];
        result.push(newLine);
        for (var j=0;j<line.length;j++) {
            var cell = line[j];
            newLine.push(cell ? cell.value : 0);
        }
    }
    return result;
}

ExternalApi.prototype.simulateMove = function(direction) {
    console.log("simulate "+direction);
}


