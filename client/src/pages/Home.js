import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import elasticSearch from "../utils/elasticSearch";
import GenresList from "./components/GenresList";

const Home = () => {
  const [hits, setHits] = useState([]);
  const [total, setTotal] = useState(0);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const movieListQuery = {
    sort: [
      {
        release_date: {
          order: "desc",
        },
      },
    ],
  };

  const categoriesQuery = {
    aggs: {
      all_genres: {
        terms: {
          field: "genres",
        },
      },
    },
  };

  const genreFilterQuery = {
    query: {
      bool: {
        must: [
          {
            match: {
              genres: "Action",
            },
          },
          {
            match: {
              genres: "Adventure",
            },
          },
        ],
      },
    },
  };

  useEffect(() => {
    elasticSearch(movieListQuery).then((res) => {
      setHits(res.hits.hits);
      setTotal(res.hits.total.value);
    });

    elasticSearch(categoriesQuery).then((res) => {
      setGenres(res.aggregations.all_genres.buckets);
      console.log(res.aggregations.all_genres.buckets);
    });
  }, []);
  return (
    <div>
      HomePage
      <SearchBar />
      <GenresList
        genres={genres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
      <MovieList hits={hits} total={total} />
    </div>
  );
};

export default Home;
