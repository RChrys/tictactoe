import React from 'react';
export default (props) => {

  const handleClick = () =>{
    props.handleClick(props.id)
  }
  

  return (
    <div className="square" onClick={handleClick} id={props.id}>{props.value}</div>
  );
}
