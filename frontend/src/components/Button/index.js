import React from 'react';


const Button  = (props) => {

    return (
      <div className={`button-wrapper btn ${ props.class }`}>
        <button>{props.icon ? props.icon : false} { props.content }</button>
      </div>
    )
  
}

export default Button;