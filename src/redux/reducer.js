import { ADD_FAV ,  REMOVE_FAV, ORDER, FILTER } from "./actions-types"

const initialState = {
    myFavorites: [],
    allCharacter: [] //todos los favoritos par amezcclarlos como keramos
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAV:
            return {
                ...state,
                myFavorites: [...state.allCharacter, action.payload],
                allCharacter: [...state.allCharacter, action.payload]                
            }

        case REMOVE_FAV:
            let deleteCharacter = state.myFavorites.filter(character => character.id !== Number(action.payload))

            return {
                ...state,
                myFavorites: deleteCharacter
            }
        case FILTER:
            const allCharacterFiltered=state.allCharacter.filter(character => character.gender === action.payload)
            return{
                ...state,
                myFavorites:
                    action.payload === 'allCharacter'
                    ? [...state.allCharacter ]
                    : allCharacterFiltered
            }
        case ORDER:
            const backUpCharacters=[...state.allCharacter]
            backUpCharacters.sort((a, b) => {
                if (a.id < b.id) {
                  return -1;
                }
                if (a.id > b.id) {
                  return 1;
                }
                return 0;
              });
            if (action.payload === 'D') backUpCharacters.reverse()
            
            return{
                ...state,
                myFavorites:backUpCharacters

            }    
        default:
            return {
                ...state
            }
    }

}

export default reducer