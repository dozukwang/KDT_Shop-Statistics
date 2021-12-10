import React from 'react';
import { Button } from 'reactstrap'
import { BsLink } from "react-icons/bs";
import axios from 'axios'

const ItemList = (props) => {
  const { item, index } = props
  
  const handlePurchase = (item) => {
    console.log('구매입력 함수 실행됨')
    axios
    .post("http://localhost:5001/purchase?type=buy", {
      item
    })
    .then((response) => {
      try {
        const data = response
        console.log('클라응답response: ', data)
        console.log('클라응답response.data:', data.data)
      } catch (error) {
        console.log(error);
      }
    })
    .catch((error) => {console.log(error)});
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
        <td>{item.lprice}</td>
        <td>{item.mallName}</td>
        <td><a href={item.link}><BsLink/></a></td>
        <td><Button onClick={()=>(handlePurchase(item))}>구매</Button></td>
      </tr>
  )
}

export default ItemList;
