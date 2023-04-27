import { connect,useDispatch } from "react-redux";
import Card from "../Card/Card";
import style from './Favorites.module.css';
import { filterCards, orderCards } from "../../redux/actions";
import React, { useState } from 'react';

const Favorites = ({myFavorites})=> {

    const dispatch= useDispatch();
    const[aux,setAux]= useState(false)


    const handleOrder=(event)=>{

        dispatch(orderCards(event.target.value))
    }
    const handleFilter=(event)=>{

        dispatch(filterCards(event.target.value))
    }
    
    return (
        <div className={style.container2}>
            <h1>- </h1>
            <h1  className={style.hh}>Mis Favoritos</h1>
            <select onChange={handleOrder}>
                <option value="A">Ascendente</option>
                <option value="D">Descendente</option>
            </select>
            <select onChange={handleFilter}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Genderless">Genderless</option>
                <option value="unknown">unknown</option>
            
            </select>
        <div className={style.container}>
            
            
            {
                myFavorites?.map(character => {
                    return (
                        <Card 
                            key={character.id}
                            id= {character.id}
                            name={character.name}
                            species={character.species}
                            gender={character.gender}
                            origin = {character.origin}
                            status ={character.status}
                            image={character.image}
                            
                        />
                    )
                })
            }
        </div>
        </div>
        )
}

const mapStateToProps = (state) => {
    return {
        myFavorites: state.myFavorites
    }
}

export default connect(
    mapStateToProps, 
    null)
    (Favorites);