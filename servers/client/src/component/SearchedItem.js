import React from 'react';
import { Table, Button } from 'reactstrap'
import { BsLink } from "react-icons/bs";

const SearchedItem = (props) => {
  const { searchResult, keyword } = props

  const SearchedItemList = (props) => {
    const { item, index } = props
    
    const imgStyle = {
      width: '50px',
      height: '50px'
    }
    return (
        <tr>
          <th>{index + 1}</th>
          <th><img style={imgStyle} src={item.image} alt='상품이미지' /></th>
          <td>{item.title.replace(/<b>|<\/b>/g,'')}</td>
          <td>{item.lprice}</td>
          <td>{item.mallName}</td>
          <td><a href={item.link}><BsLink/></a></td>
          <td><Button>구매</Button></td>
        </tr>
    )
  }

  return (
    <div>
      <h1>{keyword? `${keyword} 목록` : '상품 목록'}</h1>
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
          ? searchResult.items.map((item, index) => (<SearchedItemList key={item.productId} item={item} index={index} />))
          : null}
        </tbody>
      </Table>
    </div>
  );
};

export default SearchedItem;
