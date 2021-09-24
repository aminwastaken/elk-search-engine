import Movie from "./Movie";

const MovieList = ({ hits, total }) => {
  return (
    <div className="my-2">
      <p className="text-3xl font-extrabold">Results</p>
      <div>
        {hits.map((hit, index) => {
          return (
            <Movie
              key={index}
              title={hit._source.title}
              poster={hit._source.poster}
              overview={hit._source.overview}
              genres={hit._source.genres}
              releaseDate={hit._source.release_date}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MovieList;
