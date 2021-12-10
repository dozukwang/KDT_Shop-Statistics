import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './component/Home';
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import Purchase from './component/Purchase';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ul>
        <li>
          <NavLink to='/'>검색하기</NavLink>
        </li>
        <li>
          <NavLink to='/purchase'>구매내역</NavLink>
        </li>
      </ul>
        <Routes>
          <Route path='/' element={<Home/>}/>  
          <Route path='/purchase' element={<Purchase/>}/>  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
