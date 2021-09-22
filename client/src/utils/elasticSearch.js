import axios from "axios";

const elasticSearch = async (query) => {
  let result = await axios.get("http://0.0.0.0:9200/movies/_search", {
    params: {
      source: JSON.stringify(query),
      source_content_type: "application/json",
    },
  });
  return result.data;
};

export default elasticSearch;
