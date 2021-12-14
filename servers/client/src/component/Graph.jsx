import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Graph = (props) => {
  const { getCategoryName, setTotalAmount, totalAmount } = props
  const [ items, setItems ] = useState([])
  
  useEffect(()=>{
    getPurchaseList()
  }, [])
  
  useEffect(()=>{
    setItems([])
    if(totalAmount.length > 0){
      totalAmount.forEach((each, index)=>{
        setItems(prevState => ([
          ...prevState,
          {
            category: each.category1,
            '합계': each.buyCount
          }
        ]))
      })
    }
  }, [totalAmount])

  const getPurchaseList = () => {
    axios
    .post("http://localhost:5001/purchase?type=totalamount")
    .then((response) => {
      setTotalAmount(response.data.json)
      console.log(response.data.json)
    })
    .catch((err) => console.log(err))
  }

  //클릭한 카테고리명 출력되는거 확인 -> 카테고리명으로 검색할 수 있게
  const getCategoryList = (event) => {
    getCategoryName(event.category)
  }
  return (
    <>
      {/* <ResponsiveContainer width="100%" height="100%"> */}
        <BarChart
          width={800}
          height={300}
          data={items}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis /> 
          <Tooltip />
          <Bar onClick={getCategoryList} dataKey="합계" barSize={30} fill="#8884d8" stroke="#8884d8" />
        </BarChart>
      {/* </ResponsiveContainer> */}
    </>
  );
};

export default Graph;
