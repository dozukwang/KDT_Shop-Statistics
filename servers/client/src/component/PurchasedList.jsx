import React, { useState } from 'react';
// import ItemList from './ItemList';
import { Table } from 'reactstrap'

const PurchasedList = () => {
  const [ keyword, setKeyword ] = useState("")

  return (
    <>
      <div>{keyword? `${keyword} 구매목록` : '구매상품 목록'}</div>
      <Table hover>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>상품명</th>
            <th>가격</th>
            <th colSpan="2">판매처</th>
            <th>구매하기</th>
          </tr>
        </thead>
        <tbody>
          {/* {searchResult !== undefined && searchResult.total > 0
          ? searchResult.items.map((item, index) => (<ItemList key={item.productId} item={item} index={index} />))
          : null} */}
        </tbody>
      </Table>
    </>
  );
};

export default PurchasedList;
