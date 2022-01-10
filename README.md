Index.js file: 

The Index.js is the starting point and endpoint, within the endpoint we call the API 

We first import Express and env

```
import express from 'express' 
```

```
import dotenv from 'dotenv'
```

Env variables are secure because they are not tracked by git 

After importing env we add a configuration which loads everything in env, to process.env

```
dotenv.config() 
```
We have a variable that is initiating a new express 

```
const app = express()
```

and another variable that either stores the port that you've picked or processes a port 

```
const port = process.env.PORT || 3000 
```

Import loadGames is self explanatory; it imports the async function from the api.js file. 
There's is also a ./api.js - . is the directory that you are in, without the . it will try to find ./api.js inside the node_modules 

```
import { loadGames } from './api.js'
```

MiddleWare

function checkAuth - In this function we are checking if the user has authorization 

```
function checkAuth (req, res, next){
    if (req.headers.authorization?.split(' ')[1] !== process.env.TOKEN)

        return res.status(401).send('Unauthorized')

    next()    
}
```

``` 
if (req.headers.authorization?.split(' ')[1] 
``` 

We are first taking the token and spliting it with a space to pick the token and not the bearer - ``` [1] ``` picks the token

``` !== process.env.TOKEN) ``` 

This means that if the token is different than the token: 

``` 
return res.status(401).send('Unauthorized')
``` 

Return a status of 401 if it's unauthorized 

```
app.get('/', (req, res) => {
    res.send( 'this is home')
})
```
 This creates a directory which is home
 
 ```res.send( 'this is home') ```
Then sends a response called this is home

```app.get```
get is a HTTP request method which retrives data from that 


```
app.get('/games', checkAuth, async (req, res) => { 
    const { id, search } = req.query 
    res.json(await loadGames(id, search))   
})
```
This creates a directory called /games, it then calls back the checkAuth function and has to be async due to await

``` 
const { id, search } = req.query 
```
we are creating two consts called id and called search, this const equals the request.query 

Requests the search that is in the query, if the users don't include the ?search it's undefined, but even if it's undefined we are still sending it to loadGames

 ```
 app.listen(port, (req, res) => {
    console.log(`port http://localhost:${port}`)
})
```
This app function starts a server and listens on port 3000 for connections

Api.js file:

This is the file that is requesting/get the API from Nuno Gois, and specifies the ID and search 

```
import axios from 'axios'
```
We first import axios 

```
async function loadGames (ID, search = '') { 
``` 
I've created an async function called loadGames - the function accepts the two parameters ID and search - the search default is empty, but it's functionality searches for specific games - in the url it would appear as ?search=Mario if the user searches for Mario. If the search is also undefined it's empty

The ID is a unique identifier about each specific game; this can include the ratings, company, platform .. etc

```
 const { API_URL, API_TOKEN } = process.env 
```
This creates two consts called API_URL and API_TOKEN which are destructuring assignment to process.env 

Process.env represents the state of the system environment of our app when it starts

The code above is the same as below: 

```const URL = process.env.URL```
```const TOKEN = process.env.TOKEN```

I've then created two if statements for search and ID 

```
if (search)
        search = `?search=${search}` 
```

if search has information inside we want it to be ?search= whatever search the user wants, ex: Mario

```
if (ID)
        ID = `?id=${ID}`
```

if ID has information inside we want it to be ?id= whatever id the user wants to look at

Our last if function is for authorization and errors

```
 if (!URL || !TOKEN )  throw new Error('missing info') 
```
if the URL and TOKEN is empty or Falsy throw new Error - which means it terminates the process

The alternative and safer way is to show a console error instead of terminating the process, we do this by: 

```
if (!API_URL || !API_TOKEN )  console.error('missing info')
```
For the last function it calls the API_URL, search and ID shows the data if the user gave the right API_TOKEN

```
const response = await axios(API_URL + search + ID, {
    headers: {
        Authorization: `Bearer ${API_TOKEN}` 
    }}) 
```  

Authorization of the token to show data 

```
headers: {
        Authorization: `Bearer ${API_TOKEN}`
    }}) 
```

Inside the async function loadGames we have a return 

```
return response.data
```
This return shows the data of the api

```
export { loadGames }
```
Lastly we have an export which exports the loadgames function, which can then be used in the index.js

Keywords:
env means environment variables - by env it won't be in our code 

.gitignore file:
git ignore file - doesn't commit specific files that you specify in this case it's the node_modules and .env
