import express from 'express'
import dotenv from 'dotenv' // env variables are secure because they are not tracked by git 

dotenv.config() // load everything in env, to process.env

const app = express()
const port = process.env.PORT || 3000 

import { loadGames } from './api.js' // the . is the directory that you are in or it will find it in the node_modules 

//MiddleWare
 
function checkAuth (req, res, next){
    if (req.headers.authorization?.split(' ')[1] !== process.env.TOKEN) // if the request is different than the token 
    //we are taking the token and split with a space because it's bearer : token and we chose the first in the array cos bearer is one and token is another due to not being joined together 
        return res.status(401).send('Unauthorized') // return 401 if it's not unauthorized 

    // There's two different API one is Nuno's the Api we are requesting and the other is the one that we've made 
    next()
     
}

app.get('/', (req, res) => {
    res.send( 'this is home')
})

app.get('/games', checkAuth, async (req, res) => { // it has to be in async 
    const { id, search } = req.query // to request the search that is in the query - if they don't include the ?search it's undefined, if it's undefined we are still sending it to loadGames
    res.json(await loadGames(id, search))   
})

app.listen(port, (req, res) => {
    console.log(`port http://localhost:${port}`)
})