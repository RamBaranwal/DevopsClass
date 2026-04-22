const express = require('express');
const app = express();

const PORT = 3000

app.get('/', async(req , res)=>{
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Snake Game</title>
    <style>
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #2c3e50;
            color: white;
            font-family: Arial, sans-serif;
            margin-top: 50px;
        }
        canvas {
            background-color: #34495e;
            border: 2px solid #ecf0f1;
            box-shadow: 0 0 20px rgba(0,0,0,0.5);
        }
        #score {
            font-size: 24px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <h1>Snake & Fruit Game</h1>
    <div id="score">Score: 0</div>
    <canvas id="gameCanvas" width="400" height="400"></canvas>
    <script>
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        
        const gridSize = 20;
        const tileCount = canvas.width / gridSize;
        
        let snake = [{x: 10, y: 10}];
        let food = {x: 15, y: 15};
        let dx = 0;
        let dy = 0;
        let score = 0;
        
        document.addEventListener("keydown", changeDirection);
        
        function main() {
            if (hasGameEnded()) {
                ctx.fillStyle = "white";
                ctx.font = "30px Arial";
                ctx.textAlign = "center";
                ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
                return;
            }
            
            setTimeout(function onTick() {
                clearCanvas();
                drawFood();
                advanceSnake();
                drawSnake();
                main();
            }, 100);
        }
        
        function clearCanvas() {
            ctx.fillStyle = "#34495e";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        function drawFood() {
            ctx.fillStyle = "#e74c3c";
            ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
        }
        
        function drawSnake() {
            snake.forEach((part, index) => {
                ctx.fillStyle = index === 0 ? "#2ecc71" : "#27ae60";
                ctx.strokeStyle = "#2c3e50";
                ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
                ctx.strokeRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
            });
        }
        
        function advanceSnake() {
            if (dx === 0 && dy === 0) return; // Wait for first key press
            
            const head = {x: snake[0].x + dx, y: snake[0].y + dy};
            snake.unshift(head);
            
            const didEatFood = head.x === food.x && head.y === food.y;
            if (didEatFood) {
                score += 10;
                document.getElementById('score').innerText = 'Score: ' + score;
                generateFood();
            } else {
                snake.pop();
            }
        }
        
        function generateFood() {
            food.x = Math.floor(Math.random() * tileCount);
            food.y = Math.floor(Math.random() * tileCount);
            snake.forEach(function has_snake_eaten_food(part) {
                if (part.x === food.x && part.y === food.y) generateFood();
            });
        }
        
        function changeDirection(event) {
            const LEFT_KEY = 37;
            const RIGHT_KEY = 39;
            const UP_KEY = 38;
            const DOWN_KEY = 40;
            
            const keyPressed = event.keyCode;
            const goingUp = dy === -1;
            const goingDown = dy === 1;
            const goingRight = dx === 1;
            const goingLeft = dx === -1;
            
            if (keyPressed === LEFT_KEY && !goingRight) { dx = -1; dy = 0; }
            if (keyPressed === UP_KEY && !goingDown) { dx = 0; dy = -1; }
            if (keyPressed === RIGHT_KEY && !goingLeft) { dx = 1; dy = 0; }
            if (keyPressed === DOWN_KEY && !goingUp) { dx = 0; dy = 1; }
        }
        
        function hasGameEnded() {
            for (let i = 4; i < snake.length; i++) {
                if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
            }
            return snake[0].x < 0 || snake[0].x >= tileCount || snake[0].y < 0 || snake[0].y >= tileCount;
        }
        
        generateFood();
        main();
    </script>
</body>
</html>
    `);
})

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})