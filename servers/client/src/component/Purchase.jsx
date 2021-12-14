import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Graph from './Graph';
import PurchasedList from './PurchasedList';

const Purchase = () => {
  const [ category, setCategory ] = useState("")
  const [ categorySearchResult, setCategorySearchResult ] = useState({})

  useEffect(() => {
    if (category !== "") {
      getCategoryItemList()
    }
  }, [category])

  const getCategoryName = (value) => {
    setCategory(value)
  }
  
  const getCategoryItemList = () => {
    axios
    .post("http://localhost:5001/purchase?type=categoryItem", {'category': category} )
    .then((response) => {
      console.log('응답2',response.data.json)
      setCategorySearchResult(response.data.json)
    })
    .catch((err) => console.log(err))
  }


  // purchasedList에 넘길 data는 여기서 해야함
  return (
    <>
    <h1>구매내역 확인하기</h1>
      <Graph getCategoryName={getCategoryName}
      />
      <PurchasedList category={category} categorySearchResult={categorySearchResult}/>
    </>
  );
};

export default Purchase;
