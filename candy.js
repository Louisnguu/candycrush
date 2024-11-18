
var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board = [];
var rows = 15;
var columns = 15;
var score = 0;

var currTile;
var otherTile;


window.onload = function() {
    startGame();
    window.setInterval(function(){
        crushCandy();
        slideCandy();
        generateCandy();
    }, 100);
    // Khi tạo bảng sẽ có thể tạo thành các hàng kẹo 3/4/5 
    // Hàm gán score = 0 sau khi radom kẹo
    setTimeout( () => {
        score = 0;
        document.getElementById("score").innerText = score;
    },1500);
}

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)]; //0 - 5.99
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // <img id="0-0" src="./images/Red.png">
            // tạo tọa độ 
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            // radom kẹo 
            tile.src = "./images/" + randomCandy() + ".png";

            //Hàm kéo thả kẹo
            tile.addEventListener("dragstart", dragStart); //Bấm vào kẹo , bắt đầu quá trình kéo thả kẹo
            tile.addEventListener("dragover", dragOver);  //Bấm vào kẹo , di chuyển chuột để di chuyển kẹo
            tile.addEventListener("dragenter", dragEnter); //Kéo kẹo này lên kẹo khác
            tile.addEventListener("dragleave", dragLeave); //Kéo kẹo chồng lên kẹo khác
            tile.addEventListener("drop", dragDrop); //Thả kẹo lên kẹo khác
            tile.addEventListener("dragend", dragEnd); //sau khi kéo thả kẹo xog, đổi vị trí kẹo

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board);
}

function dragStart() {
    // Gán giá trị cho cục kẹo được bấm
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    // Gán giá trị cho cục kẹo được thả lên
    otherTile = this;
}

function dragEnd() {
    if (currTile.src.includes("blank") || otherTile.src.includes("blank") ) {
        return;
    }

    let currCoords = currTile.id.split("-"); // id="0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;

    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;
    
    
    // Xét vị trí kẹo sau khi kéo thả có hợp lệ hay k 
    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if (!validMove) {
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;    
        }
    }
}

function crushCandy() {

    crushFive();
    crushFour();
    crushThree();
    document.getElementById("score").innerText = score;

}


function crushFive() {
    // Check Hàng
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-4; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            let candy4 = board[r][c+3];
            let candy5 = board[r][c+4];
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && candy4.src == candy5.src && !candy1.src.includes("blank") && !candy2.src.includes("blank") && !candy3.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                candy5.src = "./images/blank.png";
                score += 50;
            }
        }
    }

    //Check cột
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-4; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            let candy4 = board[r+3][c];
            let candy5 = board[r+4][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && candy4.src == candy5.src && !candy1.src.includes("blank") && !candy2.src.includes("blank") && !candy3.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";  
                candy4.src = "./images/blank.png";
                candy5.src = "./images/blank.png";
                score += 50;
            }
        }
    }
}


function crushFour() {
    // Check Hàng
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-3; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            let candy4 = board[r][c+3];
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank") && !candy2.src.includes("blank") ) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                score += 40;
            }
        }
    }

    //Check cột
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-3 ; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            let candy4 = board[r+3][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank") && !candy2.src.includes("blank") ) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                score += 40;
            }
        }
    }
}

function crushThree() {
    // Check Hàng
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }

    //Check cột
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }
}

// Hàm xét ô kẹo sau khi kéo thả có được hay không
// Nếu sau khi kéo kẹo có thể tạo thành 3/4/5 viên thẳng hàng hoặc thẳng cột trả về giá trị true
// Nếu không có thì trả về false
function checkValid() {
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank") && !candy2.src.includes("blank")) {
                return true;
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank") && !candy2.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}


function slideCandy() {
    // Hàm hạ kẹo 
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = columns-1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) { 
                board[ind][c].src = board[r][c].src;  
                ind -= 1;
            }
        }

        for (let r = ind; r >= 0; r--) { 
            board[r][c].src = "./images/blank.png"; // sau khi hạ kẹo xuống những ô bị hạ kẹo sẽ bị trống
        }
    }
}

function generateCandy() {
    // Tạo kẹo cho những ô trống sau khi hạ kẹo
    for (let c = 0; c < columns;  c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./images/" + randomCandy() + ".png";
        }
    }
}
