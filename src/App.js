import SearchBar from "./SearchBar";
import "./App.css";
import { useState } from "react";
import AddItem from "./AddItem";
import ItemsDisplay from "./ItemsDisplay";
import Test from "./Class.js";

function App() {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState({ items: [] });

  const updateFilters = (searchParams) => {
    setFilters(searchParams);
  };
  const deleteItem = (item) => {
    const items = data["items"];
    const requestOptions = {
      method: "DELETE",
    };
    fetch(`http://localhost:3000/items/${item.id}`, requestOptions).then(
      (response) => {
        if (response.ok) {
          const idx = items.indexOf(item);
          items.splice(idx, 1);
          setData({ items: items });
        }
      }
    );
  };
  const addItemToData = (item) => {
    let items = data["items"];

    const requestOptions = {
      /* adding items to Database */ method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    };
    fetch("http://localhost:3000/items", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        items.push(data);
        setData({ items: items });
      });
    /*
    get - getting data
    post - creating or sending info to the server e.g. creating username and password
    put - updating info on the server e.g. upating en email
    delete -  delete info from the server
    
     JSON stands for JavaScript Object Notation
    */
  };

  const filterData = (data) => {
    const filteredData = [];
console.log(data)
    if (!filters.name) {
      return data;
    }
    for (const item of data) {
      if (item.name !== "" && item.name !== filters.name) {
        continue;
      }
      if (item.price !== 0 && item.price > filters.price) {
        continue;
      }
      if (item.type !== "" && item.type > filters.type) {
        continue;
      }
      if (item.brand !== "" && item.brand > filters.brand) {
        continue;
      } console.log(item)
      filteredData.push(item);
    }

    return filteredData;
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <ItemsDisplay deleteItem={deleteItem} items={filterData(data.items)} />
      </div>

      <div className="row mt-3">
        <SearchBar updateSearchParams={updateFilters} />
      </div>

      <div className="row mt-3">
        <AddItem addItem={addItemToData} />
      </div>

      {/* <Test />  test file that uses the Class.js to check the lifecycles*/}
    </div>
  );
}

export default App;

/* <p>Name: {"name" in data ?  data["name"] : "No data to display"}</p>
      <p>Max Price: {"price" in data ?  data["price"] : "No data to display"}</p>
      <p>Type: {"type" in data ?  data["type"] : "No data to display"}</p>
      <p>Brand: {"brand" in data ?  data["brand"] : "No data to display"}</p> */
