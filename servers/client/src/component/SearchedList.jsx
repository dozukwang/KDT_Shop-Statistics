import React from 'react';
import { Table} from 'reactstrap'
import ItemList from './ItemList';

const SearchedList = (props) => {
  const { searchResult, keyword } = props

  return (
    <div>
      <div>{keyword? `${keyword} 목록` : '상품 목록'}</div>
      <br/>
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
          {searchResult !== undefined && searchResult.total > 0
          ? searchResult.items.map((item, index) => (<ItemList key={item.productId} item={item} index={index} />))
          : null}
        </tbody>
      </Table>
    </div>
  );
};

export default SearchedList;
