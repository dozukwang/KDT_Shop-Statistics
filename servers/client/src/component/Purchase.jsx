import React from 'react';
import Graph from './Graph';
import PurchasedList from './PurchasedList';

const Purchase = () => {

  // purchasedList에 넘길 data는 여기서 해야함
  return (
    <>
    <h1>구매내역 확인하기</h1>
      <Graph/>
      <PurchasedList />
    </>
  );
};

export default Purchase;
