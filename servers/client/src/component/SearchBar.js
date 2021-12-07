import React, { useEffect, useState } from 'react';
import { Input, Label, Button, Form } from 'reactstrap'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const SearchBar = (props) => {
  const { keyword, changeKeyword, autoSearchKeyword, getAutoKeyword } = props

  const [items, setItems] = useState([])

  useEffect(()=>{
    console.log('값 바뀜')
    setItems([])
    if (autoSearchKeyword.items !== undefined && autoSearchKeyword.items[0].length > 0) {
      autoSearchKeyword.items[0].forEach((item, index) => {
        console.log(index, item[0])
        setItems(prevState => ([
            ...prevState, 
            {
              id: index,
              name: item[0]
            }
          ]))
      })
      // autoSearchKeyword.items[0].forEach((item, index)=>{
      //   console.log(item)
      //   setItems( ...items, {
      //     id: index,
      //     name: item[0]
      //   })
      // })
    }
  }, [autoSearchKeyword])

  useEffect(()=>{
    console.log('아이템값', items)
  },[items])

  const handleOnSearch = (string) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string) //input value 같은거
    //Search value를 자동완성어 API로 보냄
    getAutoKeyword(string)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }
  
  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }  
  return (
    <Form>
      {/* <Label>
        검색창 컴포넌트 */}
      <ReactSearchAutocomplete
      onSearch={handleOnSearch}
      onHover={handleOnHover}
      onSelect={handleOnSelect}
      onFocus={handleOnFocus}
      onChange={changeKeyword}
      items={items}/>
      {/* <Input type="text" autoComplete="on" value={keyword} onChange={changeKeyword}/> */}
      {/* </Label> */}
      {/* <Button>검색하기</Button> */}
    </Form>
  );
};

export default SearchBar;
