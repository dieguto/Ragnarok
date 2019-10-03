import AnuncioLista from './AnuncioPreview';
import React from 'react';

const AnuncioList = props => {
  if (!props.anuncio) {
    return (
      <div className="article-preview">Loading...</div>
    );
  }

  if (props.anuncio.length === 0) {
    return (
      <div className="article-preview">
        No articles are here... yet.
      </div>
    );
  }

  return (
    <div>
      {
        props.anuncio.map(anuncio => {
          return (
            <AnuncioLista anuncio={anuncio} key={anuncio.slug}></AnuncioLista>
          );
        })
      }
    </div>
  );
};

export default AnuncioList;