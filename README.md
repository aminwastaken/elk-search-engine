- Create the "movies" index with explicit mapping

Make a PUT request at "http://localhost:9200/movies" with the following body
```
{
  "mappings": {
    "properties": {
      "id":    { "type": "text" },  
      "title":  { "type": "text"  }, 
      "poster":   { "type": "text"  },   
      "overview":   { "type": "text"  }, 
      "release_date":   { "type": "date","format":"epoch_second"  }, 
      "genres":   { "type": "text"  } 
    }
  }
}
```

- Then upload the JSON file into Elastic Search with the following command :

```
curl -XPOST http://localhost:9200/movies/_bulk -H "Content-Type: application/json" --data-binary @movies-es-bulk.json
```