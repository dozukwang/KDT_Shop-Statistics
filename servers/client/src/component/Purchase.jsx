import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Graph from './Graph';
import PurchasedList from './PurchasedList';

const Purchase = () => {
  const [ category, setCategory ] = useState("")
  const [ categorySearchResult, setCategorySearchResult ] = useState([])
  const [ isDelete, setIsDelete ] = useState(false)
  const [ totalAmount, setTotalAmount ] = useState([])

  useEffect(() => {
    setIsDelete(true)
    return(()=>{
      setIsDelete(false)
    })
  },[])

  useEffect(() => {
    if (category !== "") {
      getCategoryItemList()
    }
  }, [category])

  // 그래프에서 클릭한 바의 카테고리 이름 추출하기
  const getCategoryName = (value) => {
    setCategory(value)
  }

  // 그래프에서 클릭한 바의 카테고리에 해당되는 구매상품목록 출력하기
  const getCategoryItemList = () => {
    axios
    .post("http://localhost:5001/purchase?type=categoryItem",
    { 'category': category }
    )
    .then((response) => {
      setCategorySearchResult(response.data.json)
    })
    .catch((err) => console.log(err))
  }

  //구매내역 삭제하면 항목에서 삭제하기
  const filterCategoryItemList = (idToFilter) => {
    setCategorySearchResult(
      categorySearchResult.filter((item) => item.productId !== idToFilter)
    )
  }

  //구매내역 삭제하면 그래프에서 숫자 빼기
  const filterCategoryBuyCount = (categoryToFilter, buyCountToTakeAway ) => {
    console.log(categoryToFilter, buyCountToTakeAway)
    setTotalAmount(totalAmount.map((item) => {
      if (item.category1 === categoryToFilter) {
        item.buyCount = item.buyCount - buyCountToTakeAway
      }
      return item
    }))
  }

  return (
    <>
    <h1>구매내역 확인하기</h1>
      <Graph getCategoryName={getCategoryName}
      totalAmount={totalAmount}
      setTotalAmount={setTotalAmount}
      />
      <PurchasedList category={category}
      categorySearchResult={categorySearchResult}
      filterCategoryItemList={filterCategoryItemList}
      isDelete={isDelete}
      filterCategoryBuyCount={filterCategoryBuyCount}
      />
    </>
  );
};

export default Purchase;
