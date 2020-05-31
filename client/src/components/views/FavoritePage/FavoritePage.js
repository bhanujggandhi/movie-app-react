import React, { useEffect, useState } from "react";
import "./favorite.css";
import Axios from "axios";
import { Button, Popover } from "antd";
import { IMAGE_URL } from "../../Config";

function FavoritePage() {
  const variable = { userFrom: localStorage.getItem("userId") };
  const [FavoritedMovies, setFavoritedMovies] = useState([]);

  useEffect(() => {
    fetchFavoriteMovies();
  });

  const fetchFavoriteMovies = () => {
    Axios.post("api/favorite/getFavoritedMovie", variable).then((response) => {
      if (response.data.success) {
        setFavoritedMovies(response.data.favorites);
      } else {
        alert("Failed to get favorited movies");
      }
    });
  };

  const removeClick = (movieId) => {
    const variable = {
      movieId,
      userFrom: localStorage.getItem("userId"),
    };

    Axios.post("/api/favorite/removeFromFavorite", variable).then(
      (response) => {
        if (response.data.success) {
          fetchFavoriteMovies();
        } else {
          alert("Failed to Remove From Favorite");
        }
      }
    );
  };

  const renderTableBody = FavoritedMovies.map((movie, index) => {
    const content = (
      <div>
        {movie.moviePost ? (
          <img src={`${IMAGE_URL}w500${movie.moviePost}`} alt="MoviePost" />
        ) : (
          "Oops! No Image"
        )}
      </div>
    );

    return (
      <tr key={index}>
        <Popover content={content} title={`${movie.movieTitle}`}>
          <td>{movie.movieTitle}</td>
        </Popover>
        <td>{movie.movieRunTime}</td>
        <td>
          <Button onClick={() => removeClick(movie.movieId)}>
            Remove from Favorites
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h3>My Favorite Movies</h3>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Runtime</th>
            <th>Remove from Favorites</th>
          </tr>
        </thead>
        <tbody>{renderTableBody}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
