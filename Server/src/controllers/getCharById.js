const axios = require('axios');

const URL="https://rickandmortyapi.com/api/character/"

const getCharById = async (req,res) =>{
  /*  axios(URL + id)
    .then(({ data })=> {
        const { id, status, name, species, origin, image, gender} = data
        const character = { id, status, name, species, origin, image, gender }

        return character ? res.status(200).json(character) 
        : res.status(404).send("Not found")
    })
    .catch((error)=> {
        return res.status(500).json({error: error.message})
    })
*/
    const { id } = req.params;

    try {

        const promiseAxios = axios( URL +  id)
        const dataAxios = (await promiseAxios).data;
        const { name, gender, image, status, origin, species } = dataAxios
        const character = { id, status, name, species, origin, image, gender }

        return character ? res.status(200).json(character) 
        : res.status(404).send("Character not found")

    } catch (error) {
        return res.status(500).json({error: error.message})
    }


}




/*

const getCharById = (res, id) => {
    axios(`https://rickandmortyapi.com/api/character/${id}`)
    .then((result) => result.data )
    .then((data)=> {
        const character = {
            id: data.id,
            name: data.name,
            gender: data.gender,
            species: data.species,
            origin: data.origin,
            image: data.image,
            status: data.status
        }
        res.writeHead(200, {"Content-type": "application/json"})
        res.end(JSON.stringify(character))
    })
    .catch((error)=> {
        res.writeHead(500, {"Content-type": "text/plain"})
        res.end(error.message)
    })
}
*/
module.exports = {
    getCharById
}
