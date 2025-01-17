import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import { Button, Descriptions, Row } from "antd";
import GridCard from "../LandingPage/Sections/GridCard";
import Favorite from "./Sections/Favorite";

function MovieDetailPage(props) {
  const [Movie, setMovie] = useState([]);
  const [Crews, setCrews] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);
  const movieId = props.match.params.movieId;

  useEffect(() => {
    const endPoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;

    fetch(endPoint)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
        fetch(
          `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
        )
          .then((response) => response.json())
          .then((response) => {
            setCrews(response.cast);
          });
      });
  });

  const handleClick = () => {
    setActorToggle(!ActorToggle);
  };

  return (
    <div>
      {Movie && (
        <MainImage
          image={`${IMAGE_URL}w1280${
            Movie.backdrop_path && Movie.backdrop_path
          }`}
          title={Movie.title}
          text={Movie.overview}
        />
      )}

      {/* Movie Body */}

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "felx-end" }}>
          <Favorite
            userFrom={localStorage.getItem("userId")}
            movieId={movieId}
            movieInfo={Movie}
          />
        </div>

        {/* Movie table */}
        <Descriptions title="Movie Info" bordered>
          <Descriptions.Item label="Title">
            {Movie.original_title}
          </Descriptions.Item>
          <Descriptions.Item label="Released on">
            {Movie.release_date}
          </Descriptions.Item>
          <Descriptions.Item label="Revenue">{Movie.revenue}</Descriptions.Item>
          <Descriptions.Item label="Runtime">{Movie.runtime}</Descriptions.Item>
          <Descriptions.Item label="Vote Average" span={2}>
            {Movie.vote_average}
          </Descriptions.Item>
          <Descriptions.Item label="Vote Count">
            {Movie.vote_count}
          </Descriptions.Item>
          <Descriptions.Item label="Status">{Movie.status}</Descriptions.Item>
          <Descriptions.Item label="Popularity">
            {Movie.popularity}
          </Descriptions.Item>
        </Descriptions>

        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClick}>Toggle Actor View</Button>
        </div>

        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Crews &&
              Crews.map((crew, index) => (
                <React.Fragment key={index}>
                  {crew.profile_path && (
                    <GridCard
                      actor
                      image={
                        crew.profile_path &&
                        `${IMAGE_URL}w500${crew.profile_path}`
                      }
                    />
                  )}
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default MovieDetailPage;
