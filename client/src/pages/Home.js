import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import elasticSearch from "../utils/elasticSearch";
import GenresList from "./components/GenresList";
import DateRangeSelect from "./components/DateRangeSelect";
import Pagination from "./components/Pagination";

const Home = () => {
  const [hits, setHits] = useState([]);
  const [total, setTotal] = useState({});
  const [genres, setGenres] = useState([]);
  const [order, setOrder] = useState("desc");
  const [orderTriggered, setOrderTriggered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRangeStart, setDateRangeStart] = useState(undefined);
  const [dateRangeEnd, setDateRangeEnd] = useState(undefined);
  const [dateRange, setDateRange] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
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
    <div className="flex">
      <div className="w-1/6 pt-4">
        <GenresList genres={genres} setGenres={setGenres} />
      </div>
      <div className="w-5/6 px-4">
        Movies search engine
        {/* {JSON.stringify(genres)} */}
        <SearchBar setSearchQuery={setSearchQuery} />
        <DateRangeSelect
          dateRange={dateRange}
          setDateRange={setDateRange}
          dateRangeStart={dateRangeStart}
          dateRangeEnd={dateRangeEnd}
          setDateRangeStart={setDateRangeStart}
          setDateRangeEnd={setDateRangeEnd}
        />
        <button
          className="p-1 my-4 border border-black bg-gray-300"
          onClick={() => updateOrder()}
        >
          Order by date
        </button>
        <div>
          Number of pages:{" "}
          {total && elementsSize && Math.ceil(total.value / elementsSize)}{" "}
        </div>
        <div>
          Elements per page :{" "}
          <input
            value={elementsSize}
            type="number"
            onChange={(event) => {
              setElementsSize(
                event.target.value < 0 ? elementsSize : event.target.value
              );
            }}
            className="border border-black px-2 py-1 w-20"
          />
        </div>
        <div className="italic text-gray-600 text-md flex justify-start">
          {/* {JSON.stringify(total)} */}
          Total :{" "}
          {(total && total.relation === "gt") ||
            (total.relation === "gte" && "more than ")}{" "}
          {total.value} results
        </div>
        <MovieList hits={hits} total={total} />
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageCount={Math.ceil(total.value / elementsSize)}
        />
      </div>
    </div>
  );
};

export default Home;
