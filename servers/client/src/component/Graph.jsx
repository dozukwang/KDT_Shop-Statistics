import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Graph = () => {
  const [totalAmount, setTotalAmount] = useState([])
  const [items, setItems] = useState([])
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
    })
    .catch((err) => console.log(err))
  }

  const getCategoryList = () => {
    console.log('하이')
  }
  return (
    <>
    <h1 onClick={getCategoryList}>하이</h1>
      {/* <ResponsiveContainer width="100%" height="100%"> */}
        <LineChart
          width={500}
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
          <Legend />
          <Line type="monotone" dataKey="합계" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      {/* </ResponsiveContainer> */}
    </>
  );
};

export default Graph;
