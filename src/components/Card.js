import React, { useState, useEffect } from 'react';

const Card = (props) => {
  // const [pokeIndex, setPokeIndex] = useState(props.index);
  let [imgSrc, setImgSrc] = useState('');
  let [name, setName] = useState('');

  useEffect(() => {
    let isCancelled = false;
    async function fetchImage() {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${props.pokeIndex}/`);
      let data = await response.json();
      if (isCancelled === false) {
        setImgSrc(data.sprites.front_default);
        let name = data.pokemon.name;
        let first = name[0].toUpperCase();
        name = first + name.slice(1);
        setName(name);
      }
    }
    fetchImage();
    return () => {
      isCancelled = true;
    };
  }, [props]);

  return (
    <div className="card-div" onClick={props.handlerClicked} data-index={props.pokeIndex}>
      <img className="card-img" src={imgSrc} alt="Pokemon Sprite" />
      <h3 className="card-name">{name}</h3>
    </div>
  );
};

export default Card;
