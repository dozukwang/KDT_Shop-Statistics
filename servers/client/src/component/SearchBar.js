import React, { useEffect, useState } from 'react';
import { Container, Form } from 'reactstrap'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const SearchBar = (props) => {
  const { changeKeyword, autoSearchKeyword, getAutoKeyword, handleGetData } = props

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
    }
  }, [autoSearchKeyword])

  const handleOnSearch = (string, results) => {
    console.log(string) //input value 내용과 같음
    //Search value를 자동완성어 API로 보냄
    getAutoKeyword(string)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }
  
  const handleOnSelect = (item) => {
    // the item selected
    changeKeyword(item.name)
    handleGetData(item.name)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const handleOnSubmit = (event) => {
    event.preventDefault()
    changeKeyword(event.target[0].value)
    handleGetData(event.target[0].value)
  }
  
  return (
    <>
      <Container>
        <Form onSubmit={handleOnSubmit}>
          <ReactSearchAutocomplete
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          onChange={changeKeyword}
          items={items}
          />
        </Form>
      </Container>
    </>
  );
};

export default SearchBar;
