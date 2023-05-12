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
  //const EMAIL = 'almatheos@gmail.com';
  //const PASSWORD = "almatheos"

  const { pathname } = useLocation();
  const navigate = useNavigate();

 async function onSearch(id) {
  //axios(`https://rickandmortyapi.com/api/character/${id}`)
    /*
    axios(`http://localhost:3001/rickandmorty/character/${id}`)  
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
    */
    try {
      const promiseAxios= axios(`http://localhost:3001/rickandmorty/character/${id}`)  
      const dataAxios = ( await promiseAxios).data
      const char = characters?.find(e => e.id === dataAxios.id)
      if (char){
        alert("Already in the list") 
      } 
      else if(dataAxios.id !== undefined) {
        setCharacters(characters => [...characters, dataAxios]);
      }
    
      else {
        alert('Character not found');
      }

    } catch (error) {
      alert('HORROR SEARCH BAR :'+error);

    }

}


async function login(userData) {
  const { email, password } = userData;
  const URL = 'http://localhost:3001/rickandmorty/login/';
  axios(URL + `?email=${email}&password=${password}`)
  .then(({ data }) => {
     const { access } = data;
     setAccess(data);
     access && navigate('/home');
  });
  /*
  try {
    const promiseAxios= axios(URL + `?email=${email}&password=${password}`)
    const dataAxios = (await promiseAxios).data

    const { access } = dataAxios
    setAccess( dataAxios )
    access && navigate('/home')

  } catch (error) {
    alert('HORROR LOGIN:'+error);
  }
*/


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