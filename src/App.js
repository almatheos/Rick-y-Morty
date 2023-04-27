import './App.css'
import Cards from './componentes/Cards/Cards';
import Nav from './componentes/Nav/Nav';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Detail from './componentes/Detail/Detail';
import About from './componentes/About/About';
import Form from './componentes/Form/Form';
import Favorites from './componentes/Favorites/Favorites';



function App () {
  let [ characters, setCharacters ] = useState([])

  const [ access, setAccess] = useState(false);
  const EMAIL = 'almatheos@gmail.com';
  const PASSWORD = "almatheos"

  const { pathname } = useLocation();
  const navigate = useNavigate();

 function onSearch(id) {
  axios(`https://rickandmortyapi.com/api/character/${id}`)
  .then( ({ data }) => {
    const char = characters?.find(e => e.id === data.id)
    if (char){
      alert("Already in the list") 
    } 
    else if(data.id !== undefined) {
      setCharacters(characters => [...characters, data]);
    }
  
    else {
      alert('Character not found');
    }
  })
}


const login = (userData) => {
  if(userData.password === PASSWORD && userData.email === EMAIL) {
    setAccess(true)
    navigate('/home')
  }
}

useEffect(()=> {
  !access && navigate('/')
}, [access])

const onClose = (id) => {
  setCharacters(
    characters.filter((character) => character.id !== Number(id))
  )
}
  return (
    <div className='container'>
        
          { pathname !== '/' && 
            <Nav 
              onSearch = {onSearch}
              setAccess ={setAccess}
            /> }
        
        <Routes>

          <Route path='/'  element= {<Form login= {login} />}/>

          <Route  path="/home" element={<Cards characters= {characters} onClose = {onClose}/> }/>

          <Route  path="/about" element={<About/>}/>

          <Route  path='/detail/:id' element={<Detail/>}/>

          <Route path='/favorites' element={<Favorites/>}/>

        </Routes>
    </div>
  )
}

export default App