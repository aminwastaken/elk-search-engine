import Movie from "./Movie";

const MovieList = ({ hits, total }) => {
  return (
    <div>
      <h1>movie list</h1>
      <div>
        {hits.map((hit, index) => {
          return (
            <Movie
              key={index}
              title={hit._source.title}
              poster={hit._source.poster}
              overview={hit._source.overview}
              releaseDate={hit._source.release_date}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MovieList;
