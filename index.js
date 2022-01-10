import express from 'express'
import dotenv from 'dotenv'

dotenv.config() 

const app = express()
const port = process.env.PORT || 3000 

import { loadGames } from './api.js'

// MiddleWare
 
function checkAuth (req, res, next){
    if (req.headers.authorization?.split(' ')[1] !== process.env.TOKEN) 
     
        return res.status(401).send('Unauthorized') 

    next()  
}

app.get('/', (req, res) => {
    res.send( 'this is home')
})

app.get('/games', checkAuth, async (req, res) => { 
    const { id, search } = req.query 
    res.json(await loadGames(id, search))   
})

app.listen(port, (req, res) => {
    console.log(`port http://localhost:${port}`)
})