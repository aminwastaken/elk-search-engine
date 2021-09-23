import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import elasticSearch from "../utils/elasticSearch";
import GenresList from "./components/GenresList";
import DateRangeSelect from "./components/DateRangeSelect";
import { DateRange } from "@appbaseio/reactivesearch";
import Pagination from "./components/Pagination";

const Home = () => {
  const [hits, setHits] = useState([]);
  const [total, setTotal] = useState({});
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [order, setOrder] = useState("desc");
  const [orderTriggered, setOrderTriggered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRangeStart, setDateRangeStart] = useState(undefined);
  const [dateRangeEnd, setDateRangeEnd] = useState(undefined);
  const [dateRange, setDateRange] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(undefined);
  const [elementsSize, setElementsSize] = useState(5);
  // const []

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
            }))
            .concat(
              searchQuery == ""
                ? []
                : [
                    {
                      multi_match: {
                        query: searchQuery,
                        fields: ["title", "overview"],
                        fuzziness: 1,
                      },
                    },
                  ]
            )
            .concat(
              dateRange === false
                ? []
                : [
                    {
                      range: {
                        release_date: {
                          gte: new Date(dateRangeStart) / 1000,
                          lte: new Date(dateRangeEnd) / 1000,
                        },
                      },
                    },
                  ]
            ),
        },
      },

      sort:
        searchQuery == "" || orderTriggered
          ? [
              {
                release_date: {
                  order: order,
                },
              },
            ]
          : undefined,

      from: currentPage * elementsSize,
      size: elementsSize,
    };
    console.log("query");
    console.log(query);

    return query;
  };
  useEffect(() => {
    elasticSearch(generateQuery()).then((res) => {
      setHits(res.hits.hits);
      console.log("res");
      console.log(res);
      setTotal(res.hits.total);
    });
  }, [
    genres,
    order,
    searchQuery,
    dateRangeStart,
    dateRangeEnd,
    dateRange,
    currentPage,
    elementsSize,
  ]);

  useEffect(() => {
    if (searchQuery === "") {
      setOrder("desc");
      setOrderTriggered(false);
    }
  }, [searchQuery]);

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

  const updateOrder = () => {
    setOrder(order === "desc" ? "asc" : "desc");
    setOrderTriggered(true);
  };
  return (
    <div>
      movies app
      {/* {JSON.stringify(genres)} */}
      <SearchBar setSearchQuery={setSearchQuery} />
      <GenresList genres={genres} setGenres={setGenres} />
      <DateRangeSelect
        dateRange={dateRange}
        setDateRange={setDateRange}
        dateRangeStart={dateRangeStart}
        dateRangeEnd={dateRangeEnd}
        setDateRangeStart={setDateRangeStart}
        setDateRangeEnd={setDateRangeEnd}
      />
      <button onClick={() => updateOrder()}>order by date</button>
      <div>
        {/* {JSON.stringify(total)} */}
        total:{" "}
        {(total && total.relation === "gt") ||
          (total.relation === "gte" && "more than ")}{" "}
        {total.value} results
      </div>
      <div>
        number of pages:
        {total && elementsSize && Math.ceil(total.value / elementsSize)}{" "}
      </div>
      <div>
        elements per page{" "}
        <input
          value={elementsSize}
          onChange={(event) => {
            setElementsSize(event.target.value);
          }}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={Math.ceil(total.value / elementsSize)}
      />
      <MovieList hits={hits} total={total} />
    </div>
  );
};

export default Home;
