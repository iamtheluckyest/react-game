import React from 'react';

const Card = props => (
      <div className="col s12 m4 l3 xl3">
        <div className="card">
            <img src={props.img} alt={props.name} data-clicked={props.clicked} onClick={() => props.pickImg(props.index)} />
        </div>
      </div>
  )

export default Card;