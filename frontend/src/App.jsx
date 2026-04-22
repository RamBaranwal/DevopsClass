import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

const GRID_SIZE = 20;
const TILE_COUNT = 20;

function App() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [dir, setDir] = useState({ dx: 0, dy: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const canvasRef = useRef(null);
  
  const stateRef = useRef({ snake, food, dir, gameOver, score });
  
  useEffect(() => {
    stateRef.current = { snake, food, dir, gameOver, score };
  }, [snake, food, dir, gameOver, score]);

  const generateFood = useCallback((currentSnake) => {
    let newFood = { x: 15, y: 15 };
    while (true) {
      newFood.x = Math.floor(Math.random() * TILE_COUNT);
      newFood.y = Math.floor(Math.random() * TILE_COUNT);
      let collision = currentSnake.some(part => part.x === newFood.x && part.y === newFood.y);
      if (!collision) break;
    }
    return newFood;
  }, []);

  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDir({ dx: 0, dy: 0 });
    setScore(0);
    setGameOver(false);
    setFood(generateFood([{ x: 10, y: 10 }]));
  };

  const handleDirection = useCallback((newDir) => {
    const { dx, dy } = stateRef.current.dir;
    const isUp = dy === -1;
    const isDown = dy === 1;
    const isLeft = dx === -1;
    const isRight = dx === 1;

    if (newDir === 'UP' && !isDown) setDir({ dx: 0, dy: -1 });
    if (newDir === 'DOWN' && !isUp) setDir({ dx: 0, dy: 1 });
    if (newDir === 'LEFT' && !isRight) setDir({ dx: -1, dy: 0 });
    if (newDir === 'RIGHT' && !isLeft) setDir({ dx: 1, dy: 0 });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const go = stateRef.current.gameOver;
      
      if (e.keyCode === 32) { // Space
        if (go) restartGame();
        e.preventDefault();
        return;
      }
      
      if ([37, 38, 39, 40].includes(e.keyCode)) {
        e.preventDefault(); // Prevent page scroll
      }

      if (e.keyCode === 37) handleDirection('LEFT');
      if (e.keyCode === 38) handleDirection('UP');
      if (e.keyCode === 39) handleDirection('RIGHT');
      if (e.keyCode === 40) handleDirection('DOWN');
    };
    
    document.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleDirection]);

  useEffect(() => {
    const loop = setInterval(() => {
      const { snake, food, dir, gameOver, score } = stateRef.current;
      
      if (gameOver) return;
      if (dir.dx === 0 && dir.dy === 0) return;
      
      const head = { x: snake[0].x + dir.dx, y: snake[0].y + dir.dy };
      
      const hitWall = head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT;
      const hitSelf = snake.some((part, i) => i !== 0 && part.x === head.x && part.y === head.y);
      
      if (hitWall || hitSelf) {
        setGameOver(true);
        return;
      }
      
      const newSnake = [head, ...snake];
      let newScore = score;
      let newFood = food;
      
      if (head.x === food.x && head.y === food.y) {
        newScore += 10;
        newFood = generateFood(newSnake);
      } else {
        newSnake.pop();
      }
      
      setSnake(newSnake);
      setFood(newFood);
      setScore(newScore);
    }, 150);
    
    return () => clearInterval(loop);
  }, [generateFood]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#34495e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🍎", food.x * GRID_SIZE + GRID_SIZE/2, food.y * GRID_SIZE + GRID_SIZE/2);
    
    snake.forEach((part, index) => {
      if (index === 0) {
        ctx.font = "18px Arial";
        ctx.fillText("🐍", part.x * GRID_SIZE + GRID_SIZE/2, part.y * GRID_SIZE + GRID_SIZE/2);
      } else {
        ctx.fillStyle = "#2ecc71";
        ctx.beginPath();
        ctx.arc(part.x * GRID_SIZE + GRID_SIZE/2, part.y * GRID_SIZE + GRID_SIZE/2, GRID_SIZE/2 - 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = "#27ae60";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });
    
    if (gameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.font = "30px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2 - 15);
      ctx.font = "20px Arial";
      ctx.fillText("Tap Restart", canvas.width / 2, canvas.height / 2 + 25);
    }
  }, [snake, food, gameOver]);

  return (
    <div className="game-container">
      <h1>Snake & Fruit Game</h1>
      <div className="score">Score: {score}</div>
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={400} 
        className="game-canvas"
      />
      {gameOver && (
        <button className="restart-btn" onClick={restartGame}>Restart Game</button>
      )}
      <div className="controls">
        <div className="control-row">
          <button className="control-btn" onPointerDown={(e) => { e.preventDefault(); handleDirection('UP'); }}>⬆️</button>
        </div>
        <div className="control-row">
          <button className="control-btn" onPointerDown={(e) => { e.preventDefault(); handleDirection('LEFT'); }}>⬅️</button>
          <button className="control-btn" onPointerDown={(e) => { e.preventDefault(); handleDirection('DOWN'); }}>⬇️</button>
          <button className="control-btn" onPointerDown={(e) => { e.preventDefault(); handleDirection('RIGHT'); }}>➡️</button>
        </div>
      </div>
    </div>
  );
}

export default App;
