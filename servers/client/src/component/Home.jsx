import React, { useState } from 'react';
import axios from 'axios'
import SearchBar from './SearchBar';
import SearchedList from './SearchedList';

const Home = () => {

  const [keyword, setKeyword] = useState("")
  const [searchResult, setSearchResult] = useState({})
  const [autoSearchKeyword, setAutoSearchKeyword] = useState([])

  const handleGetData = (value) => {
    axios
    .get(`http://localhost:5001/search?query=${value? value : keyword}`)
    .then((response) => {
        var data = response.data
        console.log('응답데이터:', response.data)
        setSearchResult(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const changeKeyword = (item) => {
    setKeyword(item)
  }

  const getAutoKeyword = (value) => {
    axios
    .get(`http://localhost:5001/autoKeyword?keyword=${value? value : keyword}`)
    .then((response) => {
      var data = response.data
      setAutoSearchKeyword(data)
      console.log('응답데이터', data) //query, items
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
      <h1 className="search">상품 검색하기</h1>
      <SearchBar
      changeKeyword={changeKeyword}
      autoSearchKeyword={autoSearchKeyword}
      getAutoKeyword={getAutoKeyword}
      handleGetData={handleGetData}
      keyword={keyword}/>
      <br/>
      <SearchedList
      searchResult={searchResult}/>
    </div>
  );
};

export default Home;
