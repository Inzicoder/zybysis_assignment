import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CharacterGrid from "../components/CharacterGrid";
import { Header } from "../components/Header";
import { filteredItemsByUser } from "../redux/filteredItemsSlice";
import Filter from "./Filter";
import WachList from "./WachList";

export const HomeScreen = () => {
  const [searchInput, setSearchInput] = useState("");
  const [apiData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [watchList, showWatchList] = React.useState(false);

  const filteredItems = useSelector(filteredItemsByUser);

  React.useEffect(() => {
    const fetchItems = async () => {
      await axios
        .get(`https://api.jikan.moe/v4/anime`)
        .then((response) => {
          setAPIData(response.data.data);
          // response.data.data.map((item, index) => console.log(item.genres[index].name));
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchItems();
  }, []);

  const onChange = (q) => {
    setSearchInput(q);
    if (searchInput !== "") {
      const filteredData = apiData.filter((item) => {
        return Object.values(item?.title)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(apiData);
    }
  };

  const [filterOption, showFilterOption] = React.useState(false);

  const filterBtnHandler = () => {
    showFilterOption(!filterOption);
  };

  const watchListHandler = () => {
    showWatchList(!watchList);
  };

  return (
    <div className="main-container">
      <div className="filter-container">
        <button className="filter-btn" onClick={filterBtnHandler}>
          Filter
        </button>
        {filterOption && <Filter items={apiData} />}
      </div>

      <section className="search">
        <Header data={apiData} />
        <form>
          <input
            type="text"
            className="form-control"
            placeholder="Search characters"
            value={searchInput}
            onChange={(e) => onChange(e.target.value)}
            autoFocus
          />
        </form>
        {filteredItems.length === 0 ? (
          searchInput.length > 1 ? (
            <CharacterGrid items={filteredResults} isLoading={isLoading} />
          ) : (
            <CharacterGrid items={apiData} isLoading={isLoading} />
          )
        ) : (
          <CharacterGrid items={filteredItems} isLoading={isLoading} />
        )}
      </section>

      <div className="watchList_container">
        <button className="watchList-btn" onClick={watchListHandler}>
          WachList
        </button>
        <WachList />
      </div>
    </div>
  );
};
