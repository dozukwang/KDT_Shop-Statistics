import React from 'react';
import { Button } from 'reactstrap'
import { BsLink } from "react-icons/bs";
import axios from 'axios'

const ItemList = (props) => {
  const { item, index, isDelete, filterCategoryItemList, filterCategoryBuyCount } = props

  const handlePurchase = (item) => {
    if(isDelete === false || isDelete === undefined){
      axios
      .post("http://localhost:5001/purchase?type=buy", {
        item
      })
      .then((response) => {
        try {
          console.log('클라응답response: ', response)
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {console.log(error)});
    } else if (isDelete === true){
      axios
      .post("http://localhost:5001/purchase?type=delete", {
        item
      })
      .then((response) => {
        try {
          console.log('클라응답response: ', response)
          filterCategoryItemList(item.productId)
          filterCategoryBuyCount(item.category1, item.buyCount)
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {console.log(error)});
      }
  }

  const imgStyle = {
    width: '50px',
    height: '50px'
  }
  return (
      <tr>
        <th>{index + 1}</th>
        <th><img style={imgStyle} src={item.image} alt='상품이미지' /></th>
        <td>{item.title.replace(/<b>|<\/b>/g,'')}</td>
        <td>{item.lprice ? item.lprice : '.'}</td>
        {isDelete ? <td>{item.buyCount}</td> : null}
        <td>{item.mallName}</td>
        <td>
          <a href={item.link ? item.link : '.'}><BsLink/></a>
        </td>
        <td><Button onClick={()=>(handlePurchase(item))}>{isDelete ? '구매내역 삭제' : '구매'}</Button></td>
      </tr>
  )
}

export default ItemList;
