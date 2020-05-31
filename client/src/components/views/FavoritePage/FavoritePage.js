import React, { useEffect, useState } from "react";
import "./favorite.css";
import Axios from "axios";

function FavoritePage() {
  const variable = { userFrom: localStorage.getItem("userId") };
  const [FavoritedMovies, setFavoritedMovies] = useState([]);

  useEffect(() => {
    Axios.post("api/favorite/getFavoritedMovie", variable).then((response) => {
      if (response.data.success) {
        setFavoritedMovies(response.data.favorites);
      } else {
        alert("Failed to get favorited movies");
      }
    });
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
      </table>
    </div>
  );
}

export default FavoritePage;
