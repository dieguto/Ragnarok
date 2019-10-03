import React from 'react';

const AnuncioPreview = props => {
    const anuncio = props.anuncio;


    return (
        <div className="article-preview">
      <div className="article-meta">
        <a>
          <img src={anuncio.author.image} />
        </a>

        <div className="info">
          <a className="author">
            {anuncio.author.username}
          </a>
          <span className="date">
            {new Date(anuncio.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button
            className="btn btn-sm btn-outline-primary">
            <i className="ion-heart"></i> {anuncio.favoritesCount}
          </button>
        </div>
      </div>

      <a to={`article/${anuncio.slug}`} className="preview-link">
        <h1>{anuncio.title}</h1>
        <p>{anuncio.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {
            anuncio.tagList.map(tag => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              )
            })
          }
        </ul>
      </a>
    </div>
    )
}

export default AnuncioPreview;