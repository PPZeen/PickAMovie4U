import React from "react";

const MovieCard = ({movie}) => {
    return (
        <div className="movie">
          <div>
            <p>{movie.Year}&nbsp;&nbsp;</p>
          </div>

          <div>
            <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} alt={movie.Title}></img>
          </div>

          <div>
            <span>{movie.Type}</span><h5>★&nbsp;{movie.Rate}</h5>
            <h3>{movie.Title}</h3>
            <text>&nbsp;&nbsp;&nbsp;&nbsp;{movie.Synopsis}</text>
          </div>
        </div>
    );
}

export default MovieCard;