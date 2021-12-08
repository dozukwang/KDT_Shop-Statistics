import React, { useState } from 'react';
import axios from 'axios'
import SearchBar from './SearchBar';
import SearchedItem from './SearchedItem';

const Home = () => {

  const [keyword, setKeyword] = useState("")
  const [searchResult, setSearchResult] = useState({})
  const [autoSearchKeyword, setAutoSearchKeyword] = useState([])

  const handleGetData = (value) => {
    axios
    .get(`/search?query=${value? value : keyword}`)
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
    .get(`/autoKeyword?keyword=${value? value : keyword}`)
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
      <h1>홈페이지</h1>
      <br/>
      <SearchBar
      changeKeyword={changeKeyword}
      autoSearchKeyword={autoSearchKeyword}
      getAutoKeyword={getAutoKeyword}
      handleGetData={handleGetData}
      keyword={keyword}/>
      <br/>
      <SearchedItem
      searchResult={searchResult}/>
    </div>
  );
};

export default Home;
