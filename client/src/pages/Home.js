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
  const [order, setOrder] = useState("desc");
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

  const generateQuery = () => {
    let query = {
      query: {
        bool: {
          must: genres
            .filter((genre) => {
              return genre.selected === true;
            })
            .map((genre) => ({
              match: {
                genres: genre.key,
              },
            })),
        },
      },

      sort: [
        {
          release_date: {
            order: order,
          },
        },
      ],
    };
    console.log("query");
    console.log(query);

    return query;
  };
  useEffect(() => {
    elasticSearch(generateQuery()).then((res) => {
      setHits(res.hits.hits);
      console.log("res.hits.hits");

      console.log(res.hits.hits);
      setTotal(res.hits.total.value);
    });
  }, [genres, order]);

  useEffect(() => {
    elasticSearch(categoriesQuery).then((res) => {
      setGenres(
        res.aggregations.all_genres.buckets.map((genre) => ({
          key: genre.key,
          doc_count: genre.doc_count,
          selected: false,
        }))
      );
    });
  }, []);
  return (
    <div>
      HomePage
      {JSON.stringify(genres)}
      <SearchBar />
      <GenresList
        genres={genres}
        setGenres={setGenres}

        // updateQuery={updateQuery}
      />
      <button onClick={() => setOrder(order === "desc" ? "asc" : "desc")}>
        order by date
      </button>
      <MovieList hits={hits} total={total} />
    </div>
  );
};

export default Home;
