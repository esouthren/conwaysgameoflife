async function initBoard(size, cycles, speed, seed) {
    
    var BOARD_SIZE = parseInt(size);
    var CYCLES = parseInt(cycles)+1;
    var SPEED = parseInt(speed);
    var SEED = parseInt(seed);
    
    console.log("new board: " + BOARD_SIZE);
    console.log("cycles: " + CYCLES);
    console.log("speed: " + SPEED);
    console.log("seed: " + SEED);
    cells = [];
    for(var r = 0; r < BOARD_SIZE ; r++) {
        var row = []
        for(var c = 0; c < BOARD_SIZE; c++) {
            row.push(0);
        }
        cells.push(row);
    }
    
    var size = BOARD_SIZE*BOARD_SIZE;
    var seeds = Math.floor(size*(SEED/100));
    console.log("starting seeds: " + seeds);
    
    for(var i = 0; i < seeds; i++) {
        var randomRow = randomInt(0, BOARD_SIZE-1);
        var randomCol = randomInt(0, BOARD_SIZE-1);
        cells[randomRow][randomCol] = 1;
    }

    printBoard(cells, 0);

    for(var i = 0; i < CYCLES; i++) {
        cells = updateCells(cells, i, BOARD_SIZE);
        await sleep(SPEED);
        printBoard(cells, i, BOARD_SIZE);    
    }
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function updateCells(cells, i, BOARD_SIZE) {
    newCells = [];
    for(var r = 0; r < BOARD_SIZE ; r++) {
        var row = []
        for(var c = 0; c < BOARD_SIZE; c++) {
            row.push(cells[r][c]);
        }
        newCells.push(row);
    }
    
    for(var r = 0; r < BOARD_SIZE-1; r++) {
        for(var c = 0; c < BOARD_SIZE-1; c++) {
            var check = [r,c];
            var live = checkNeighbours(cells, check, BOARD_SIZE);
            if(cells[r][c] === 1) {
                if((live < 2) || (live > 3)) {
                    newCells[r][c] = 0;
                } else {
                    newCells[r][c] = 1;
                }
            }
            if(cells[r][c] === 0) {
                if(live===3) {
                    newCells[r][c] = 1;
                } else {
                    newCells[r][c] = 0;
                }
            }
        }
    }
    return newCells;
}

function checkNeighbours(cells, key, BOARD_SIZE) {
    var count = 0;
    //console.log("key: " + key);
    //key = key.split(",");
    var r = key[0];
    var c = key[1];
    var tR = r-1;
    var bR = r+1;
    var lC = c-1;
    var rC = c+1;
	neighbours = [ [bR, c], [bR, rC], [bR, lC],
				   [tR, c], [tR, rC], [tR, lC],
				   [r, lC], [r, rC] ];
    for(var n = 0; n < neighbours.length; n++) {
        var temp = neighbours[n];
        //console.log("temp: "+ temp);
        var tR = temp[0]; 
        var tC = temp[1];
        if((tR >= 0) && (tC <= BOARD_SIZE-1)) {
            if((tC >= 0) && (tC <= BOARD_SIZE-1)) {
                if(cells[tR][tC] === 1) {
                    count+=1;
                }
            } 
        }
    }
    return count;
}

async function printBoard(cellBoard, i, BOARD_SIZE) {
    
    var str = "<table id='boardCells'>";
    for(var r = 0; r < BOARD_SIZE-1; r++) {
        str += "<tr>";
        for(var c = 0; c < BOARD_SIZE-1; c++) {
        
            if(cellBoard[r][c]===1) {
                str += "<td class='liveCell'></td>";
            } else {
                str += "<td class='deadCell'></td>";
                
                }
            }
        str+= "</tr>";
    }
    str += "</table>";
    str += "<h3>Cycle: " + i + "</h3>";
    $("#board").html(str);
}