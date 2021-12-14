import React from 'react';
import ItemList from './ItemList';
import { Table } from 'reactstrap'

const PurchasedList = (props) => {
  const { category, categorySearchResult, isDelete, filterCategoryItemList, filterCategoryBuyCount } = props

  return (
    <>
      <div>{category? `${category} 구매목록` : ''}</div>
      <Table hover>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>상품명</th>
            <th>가격</th>
            {isDelete ? <th>구매수량</th> : null}
            <th colSpan="2">판매처</th>
            <th>구매하기</th>
          </tr>
        </thead>
        <tbody>
          {categorySearchResult !== undefined && categorySearchResult.length > 0
          ? categorySearchResult.map((item, index) => (<ItemList key={item.productId}
            item={item}
            index={index}
            filterCategoryItemList={filterCategoryItemList} 
            isDelete={isDelete}
            filterCategoryBuyCount={filterCategoryBuyCount}/>))
          : null}
        </tbody>
      </Table>
    </>
  );
};

export default PurchasedList;
