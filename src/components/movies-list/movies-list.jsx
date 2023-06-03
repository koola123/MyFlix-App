// src/components/movies-list/movies-list
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from "../movie-card/movie-card";

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <> 
     <Row>
    {/* Searchbar position */}
      <Col md={12} style={{ marginTop: "80px" }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {filteredMovies.map((m) => (
        <Col sm={6} md={3} lg={4} xl={3} xxl={3} key={m._id} className="mb-5">
          <MovieCard movie={m} />
        </Col>
      ))};
      </Row>
    </>
  );
}

export default connect(mapStateToProps)(MoviesList);
