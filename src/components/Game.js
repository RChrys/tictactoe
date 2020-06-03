import React from 'react';
import Board from './Board';
import usePlayer from './Player'

export default (props) => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}
