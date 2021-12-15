import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";

const PageContainer = ({ list, handleFavouriteChange, handleFriendDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(4);

  const lastItemIndex = currentPage * itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  const currentFriendList = list.slice(firstItemIndex, lastItemIndex);

  useEffect(() => {
    if (currentFriendList.length === 0) {
      setCurrentPage(Number(currentPage) - 1);
    }
  }, [currentFriendList]);

  const ListItems = () => {
    return currentFriendList.map((item) => {
      return (
        <ListItem
          item={item}
          handleFavouriteChange={handleFavouriteChange}
          handleFriendDelete={handleFriendDelete}
        />
      );
    });
  };

  const handlePageChange = (e) => {
    setCurrentPage(e.target.id);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(list.length / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  const CurrentPages = ({ currentActive }) => {
    return pageNumbers.map((pageNumber) => {
      return (
        <li
          id={pageNumber}
          key={`${currentActive}${pageNumber}`}
          onClick={handlePageChange}
          className={`page-number-item ${
            Number(pageNumber) === Number(currentActive)
              ? "page-number-active"
              : null
          }`}
        >
          {pageNumber}
        </li>
      );
    });
  };

  return (
    <div className="page-container">
      <ul className="list-items">
        <ListItems />
      </ul>
      <ul className="current-pages">
        <CurrentPages key={currentPage} currentActive={currentPage} />
      </ul>
    </div>
  );
};

export default PageContainer;
