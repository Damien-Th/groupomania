import React from 'react';


const Button  = (props) => {

  const post_id = props.post_id ? `post-${ props.post_id }` : '';

    return (
      <div className={`button-wrapper btn ${ props.class } ${post_id}`}>
        <button>{props.icon ? props.icon : false} { props.content }</button>
      </div>
    )
  
}

export default Button;