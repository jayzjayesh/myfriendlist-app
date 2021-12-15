import React, { useState, useEffect } from "react";
import { MdSearch, MdOutlineSort } from "react-icons/md";
import PageContainer from "../components/PageContainer";
import Tooltip from "../components/Tooltip";

const MainApp = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [cacheFriendList, setCacheFriendList] = useState([]);

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addFriend = (e) => {
    const { key, code, keyCode } = e;
    if (key === "Enter" || code === "Enter" || keyCode === 13) {
      if (inputValue && inputValue.length > 0) {
        const timeStamp = Date.now();

        setFriendList([
          ...friendList,
          {
            name: inputValue,
            code: `${inputValue}_${timeStamp}`,
            isFavourite: false
          }
        ]);
        setCacheFriendList([
          ...friendList,
          {
            name: inputValue,
            code: `${inputValue}_${timeStamp}`,
            isFavourite: false
          }
        ]);
        setInputValue("");
      }
    }
  };

  const handleFriendDelete = (currentFriend) => {
    const newFriendList = friendList.filter(
      (item) => item.code !== currentFriend.code
    );
    setFriendList([...newFriendList]);
    if (isSearching) {
      const tempFriendList = cacheFriendList.filter(
        (item) => item.code !== currentFriend.code
      );
      setCacheFriendList([...tempFriendList]);
    } else {
      setCacheFriendList([...newFriendList]);
    }
  };

  const handleFavouriteChange = (currentFriend) => {
    if (friendList && friendList.length > 0) {
      const currentFriendList = [...friendList];
      currentFriendList.forEach((item, index) => {
        if (item.code === currentFriend.code) {
          currentFriendList.slice(index, 1);
          currentFriendList[index] = {
            ...item,
            isFavourite: !currentFriend.isFavourite
          };
        }
        return item;
      });
      setFriendList([...currentFriendList]);
      if (isSearching) {
        const tempFriendList = [...cacheFriendList];
        tempFriendList.forEach((item, index) => {
          if (item.code === currentFriend.code) {
            tempFriendList.slice(index, 1);
            tempFriendList[index] = {
              ...item,
              isFavourite: !currentFriend.isFavourite
            };
          }
          return item;
        });
        setCacheFriendList([...tempFriendList]);
      } else {
        setCacheFriendList([...currentFriendList]);
      }
    }
  };

  const searchOnClick = () => {
    if (isSearching) {
      setFriendList(cacheFriendList);
      setSearchValue("");
    }
    setShowSearch(!showSearch);
    setIsSearching(false);
  };

  const onSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleFriendSearch = (e) => {
    const { key, code, keyCode } = e;

    if (key === "Enter" || code === "Enter" || keyCode === 13) {
      if (searchValue.length === 0) {
        setFriendList(cacheFriendList);
        setIsSearching(false);
      }
      if (searchValue.length > 0 && cacheFriendList.length > 0) {
        setIsSearching(true);
        const searchedFriendList = cacheFriendList.filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFriendList([...searchedFriendList]);
      }
    }
  };

  const handleFavFriendSort = () => {
    if (friendList && friendList.length > 0) {
      const favFriendList = [];
      const nonFavFriendList = [];

      friendList.forEach((item) => {
        if (item.isFavourite) {
          favFriendList.push(item);
        } else {
          nonFavFriendList.push(item);
        }
      });
      setFriendList([...favFriendList, ...nonFavFriendList]);
    }
  };

  return (
    <div className="main-app">
      <div className="input-container">
        <input
          placeholder="Add Friends"
          value={inputValue}
          onKeyDown={addFriend}
          onChange={onInputChange}
          disabled={showSearch}
          className="add-input"
        />
        <Tooltip text="Search Friends">
          <MdSearch onClick={searchOnClick} className="search-item" />
        </Tooltip>
        {!showSearch && (
          <Tooltip text="Sort Friends">
            <MdOutlineSort
              onClick={handleFavFriendSort}
              className="sort-item"
            />
          </Tooltip>
        )}
      </div>
      {showSearch && (
        <input
          placeholder="Search Friends"
          value={searchValue}
          onKeyDown={handleFriendSearch}
          onChange={onSearchChange}
          className="search-input"
        />
      )}

      {cacheFriendList.length === 0 && (
        <p className="no-result-text">You have no friends added currently.</p>
      )}
      {friendList.length === 0 && isSearching && (
        <p className="no-result-text">
          No result found for given search value.
        </p>
      )}
      {friendList && friendList.length > 0 && (
        <PageContainer
          list={friendList}
          handleFavouriteChange={handleFavouriteChange}
          handleFriendDelete={handleFriendDelete}
        />
      )}
    </div>
  );
};

export default MainApp;
