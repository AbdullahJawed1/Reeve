import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CELL_SIZE = 20;
const GRID_SIZE = Math.floor(screenWidth / CELL_SIZE);

const snakegame = () => {
  const generateFoodPosition = () => {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    return { x, y };
  };

  const [snake, setSnake] = useState([{ x: GRID_SIZE / 2, y: GRID_SIZE / 2 }]);
  const [food, setFood] = useState(generateFoodPosition());
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(moveSnake, 100);
    return () => clearInterval(intervalId);
  }, [snake]);

  const moveSnake = () => {
    if (gameOver) return;

    const newSnake = [...snake];
    const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };
    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setFood(generateFoodPosition());
    } else {
      newSnake.pop();
    }

    if (isCollision(head) || head.x >= GRID_SIZE || head.x < 0 || head.y >= GRID_SIZE || head.y < 0) {
      setGameOver(true);
    }

    setSnake(newSnake);
  };

  const isCollision = (head) => {
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        return true;
      }
    }
    return false;
  };

  const handlePress = (direction) => {
    setDirection(direction);
  };

  const restartGame = () => {
    setSnake([{ x: GRID_SIZE / 2, y: GRID_SIZE / 2 }]);
    setFood(generateFoodPosition());
    setDirection({ x: 0, y: 0 });
    setGameOver(false);
  };

  const renderGrid = () => {
    const grid = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        let cellType = 'empty';
        if (x === food.x && y === food.y) {
          cellType = 'food';
        } else if (snake.some((segment) => segment.x === x && segment.y === y)) {
          cellType = 'snake';
        }
        grid.push(
          <View
            key={`${x},${y}`}
            style={[
              styles.cell,
              { backgroundColor: cellType === 'food' ? 'red' : cellType === 'snake' ? 'green' : 'white' },
            ]}
          />,
        );
      }
    }
    return grid;
  };

  return (
    <View style={styles.container}>
      {gameOver && <Text style={styles.gameOverText}>Game Over!</Text>}
      <View style={styles.gridContainer}>{renderGrid()}</View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => handlePress({ x: 0, y: -1 })} style={styles.controlButton}>
          <Text>UP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress({ x: 0, y: 1 })} style={styles.controlButton}>
          <Text>DOWN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress({ x: -1, y: 0 })} style={styles.controlButton}>
          <Text>LEFT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress({ x: 1, y: 0 })} style={styles.controlButton}>
          <Text>RIGHT</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={restartGame} style={styles.restartButton}>
        <Text>Restart Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: 'black',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 1,
    borderColor: 'gray',
  },
  controls: {
    flexDirection: 'row',
    marginTop: 20,
  },
  controlButton: {
    padding: 10,
    backgroundColor: 'lightblue',
    marginHorizontal: 5,
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  restartButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightgreen',
  },
});

export default snakegame;
