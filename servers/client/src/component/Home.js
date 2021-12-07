import React, { useState } from 'react';
import axios from 'axios'
import SearchBar from './SearchBar';

const Home = () => {

  const [keyword, setKeyword] = useState("")
  const [searchResult, setSearchResult] = useState({})
  const [autoSearchKeyword, setAutoSearchKeyword] = useState([])

  const handleGetData = () => {
    axios
    .get(`/search?query=${keyword}`)
    .then((response) => {
        var data = response.data
        console.log('응답데이터:', response.data)
        setSearchResult(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const changeKeyword = (event) => {
    setKeyword(event.target.value)
    console.log('input value:', event.target.value)
    getAutoKeyword(event.target.value)
  }

  const getAutoKeyword = (word) => {
    axios
    .get(`/autoKeyword?keyword=${word? word : keyword}`)
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
      <SearchBar keyword={keyword}
      changeKeyword={changeKeyword}
      autoSearchKeyword={autoSearchKeyword}
      getAutoKeyword={getAutoKeyword}/>
      <br/>
      <button onClick={handleGetData}>검색버튼</button>
      <div> 목록 예정 </div>
    </div>
  );
};

export default Home;
