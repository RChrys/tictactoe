import React, { useReducer } from 'react';
import Square from "./Square"

export default (props) => {

  const initState = () => ({
    winner : false,
    board : [null,null,null,null,null,null,null,null,null],
    currentPlayer : 'X'
  })

  

  const updateBoard = (state,action) => {

    switch(action.type){

      case 'update' :

        const board = state.board;
        const currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X'
        board[action.payload] = state.currentPlayer
        const win = getWinner(board);
        if(win){
          const winner = true
          const newState = {...state,board, winner}
          return(newState);
        }
        else if(board.every((currentValue) => currentValue != null )){
          state = initState()
          const newState = {...state,currentPlayer}
          return(newState)
        }
        else{
          const newState = {...state,board,currentPlayer}
          return(newState);
        }
        

      case 'reset' :
        state = initState()
        return(state);
      
      default :
        throw new Error();
    }
  }

  const getWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [firstIndex, secondIndex, thirdIndex] = lines[i];
      if (board[firstIndex] && board[firstIndex] === board[secondIndex] && board[firstIndex] === board[thirdIndex]) {
        return true;
      }
    }
    return false;
  }
  

  const play = (id) =>{
    dispatch({
      type:'update',
      payload:id
    })
  }

  const reset = () =>{
    dispatch({
      type:'reset'
    })
  }

  const [state,dispatch] = useReducer(updateBoard, initState())
  
  let id = 0;
  return (
    <div className="gameBoard">
      <header>
  <div className="playerStatus"><span className="playerName">{state.currentPlayer === 'X' ? "Player One" : "Player Two"}</span><span className="symbol mdl-button--fab mdl-button--colored">{state.currentPlayer}</span></div>
      </header>
      <div className="board-squares">
        {
        state.board.map((line,l) => (
          l%3 === 0 && <div key={l} className="board-row">
            {
              state.board.map((square,s)=> s%3 === 0 && <Square value={state.board[id]} id={id++} handleClick={play}  key={s}/>)
            }
          </div>
        ))
        }
      </div>

      <div className={!state.winner ? "winPopin disabled" : "winPopin"}>
        <div className="message">Congratulations {state.currentPlayer === 'X' ? "Player One" : "Player Two"} ! you've won !!</div>
        <button className="mdl-button mdl-button--colored mdl-button--raised mdl-js-button mdl-js-ripple-effect" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
