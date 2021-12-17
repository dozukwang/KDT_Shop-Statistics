import React, { useEffect, useState } from 'react';
import axios from 'axios'
import SearchBar from './SearchBar';
import SearchedList from './SearchedList';
import Pages from './Pages';

const Home = () => {

  const [keyword, setKeyword] = useState("")
  const [searchResult, setSearchResult] = useState({})
  const [autoSearchKeyword, setAutoSearchKeyword] = useState([])

  //페이징 관련
  const [total, setTotal] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  
  const limit = 20 // 페이지 당 보여줄 게시글 수

  useEffect(() => {
    if (total > 0){
      setPageCount(Math.ceil(total / limit))
    }
  },[total])

  // 검색어 저장
  const changeKeyword = (item) => {
    setKeyword(item)
  }

  // 검색 정보 가져오기
  const handleGetData = (value, pageNumber = 0) => {
    axios
    .get(
      `http://localhost:5001/search?query=${value? value : keyword}&start=${pageNumber * 20 + 1 }&display=${limit}`)
    .then((response) => {
        console.log('응답데이터: gethandledata', response.data)
        setSearchResult(response.data)
        if (total !== response.data.total) {
          setTotal(response.data.total)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // 페이지 이동 시 새로운 검색 정보 가져오기
  const pageMove = (pageNumber) => {
    console.log('pageMove 실행됨', pageNumber)
    handleGetData(false, pageNumber)
    setCurrentPage(pageNumber)
  }


  // 자동검색어 요청
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
      <br/>
      <Pages 
      currentPage={currentPage}
      pageCount={pageCount}
      pageMove={pageMove}/>
    </div>
  );
};

export default Home;
