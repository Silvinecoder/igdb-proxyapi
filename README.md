**Index.js file:** 

The Index.js is made of the startingpoints and the endpoints.

```
import express from 'express' 

```
We first import Express and dotEnv

```
import dotenv from 'dotenv'
```

dotEnv is a file to control application environments; my dotEnv includes the tokens and sensitive URL secured by gitignore, which git ... ignores. 

```
dotenv.config() 
```

After importing dotenv we add a dotenv.config() which allows you to load a set of configuration options to process.env

```
const app = express()
```

We have a variable that is initiating a new express 

```
const port = process.env.PORT || 3000 
```

The const port variable stores the port that you've picked or processes a port from a specific platform service in this case it's Heroku

```
import { loadGames } from './api.js'
```

Import loadGames is self-explanatory; it imports the async function from the api.js file, so we can then use it inside index.js.  

As for the code ./api.js - . is the directory you are in, without the . it will try to find ./api.js inside the node_modules 

**MiddleWare**

```
function checkAuth (req, res, next){
    if (req.headers.authorization?.split(' ')[1] !== process.env.TOKEN)

        return res.status(401).send('Unauthorized')

    next()    
}
```

In this function we are checking if the user has authorization; this is how it works:

``` 
if (req.headers.authorization?.split(' ')[1] 
``` 

We are first requesting if the authorization has the token; if it does split it - we split it by dividing the token with ('')/space - this gives us the option of separating the bearer and the token. 

We select the token with ``` [1] ``` 

``` !== process.env.TOKEN) ``` 

This means that if the token is different than the token that the user provided, then: 

``` 
return res.status(401).send('Unauthorized')
``` 

We respond with a status of 401 and a string saying Unauthorized.

```
app.get('/', (req, res) => {
    res.send( 'this is home')
})
```

app.get routes HTTP GET request to a path specified; in this case, it's '/' 

 ```res.send( 'this is home') ```

Then sends a response string expressing this is home

```
app.get('/games', checkAuth, async (req, res) => { 
    const { id, search } = req.query 
    res.json(await loadGames(id, search))   
})
```

for /games, it routes HTTP GET request to a new path called games, then calls the function checkAuth, and uses code async to be fast and reliable.

``` 
const { id, search } = req.query 
```

This const creates two conts called id and search. The way this const is built, it's a destructuring assignment that makes it possible to unpack values from arrays, or properties from objects, into distinct variables; which processes the env variables the shows the state of the system environment of our app.

The req.query requests the strings that are found in the url of the search and id.

```
res.json(await loadGames(id, search)) 
```

```res.json``` handsets the content-type header to JSON to treat it as a valid JSON object; in this case it's the ?search and ?id 

```await``` pauses the code on this line, calls the ```loadGames``` from api.js and the information stored for ?id= and ?search= - In this case, even if the id and search is undefined, we are still sending this information to loadGames function

 ```
 app.listen(port, (req, res) => {
    console.log(`port http://localhost:${port}`)
})
```

The final bit of the index.js file is the ```app.listen``` function that listens for the 3000 port, it then starts a server and a console.log which provides us with the local:host link.

**Api.js file:**

The api.js file requests the API from Nuno Gois URL for us to use with our ID and Search parameters   

```
import axios from 'axios'
```

We first import axios 

```
async function loadGames (ID = '', search = '') { 
``` 

I've created an async function called loadGames. 

The function accepts the two parameters ID and search; by default, these parameters are empty/undefined until the user triggers the operation and searches for a specific game.  In the URL, the endpoint would look like this if the user searches for Mario: ?search=Mario 

As for the ID, its a unique identifier about each game; in our object, it includes the ratings, company, platform .. etc. 

```
 const { API_URL, API_TOKEN } = process.env 
```

This creates two conts called API_URL and API_TOKEN. The way this const is built, it's a destructuring assignment that makes it possible to unpack values from arrays, or properties from objects, into distinct variables, which processes the env variables the shows the state of the system environment of our app.

The code above is the same as below: 

```const URL = process.env.URL```
```const TOKEN = process.env.TOKEN```

I've then created two if statements for search and ID 

```
if (search)
        search = `?search=${search}` 
```

if the search has information inside, we want to output in the endpoint as ?search=gameName

```
if (ID)
        ID = `?id=${ID}`
```

If the ID has information inside, we want to output in the endpoint as ?id=informationAboutGame

Our last if function is for Authorization and Errors, this is how it works: 

```
 if (!URL || !TOKEN )  throw new Error('missing info') 
```

if the URL and TOKEN is empty or Falsy (false value in a boolean context) it terminate the process 

```
if (!API_URL || !API_TOKEN )  console.error('missing info')
```

The alternative and safer way is to show a console error instead of throw new error. 

For our last function it checks if the user provides the right API_token, it's done by:

```
const response = await axios(API_URL + search + ID, {
    headers: {
        Authorization: `Bearer ${API_TOKEN}` 
    }}) 
```  

The API_URL, search and ID provides us with the information that the user added


```
headers: {
        Authorization: `Bearer ${API_TOKEN}`
    }}) 
```

Then checks if the user gave the right API_TOKEN 

```
return response.data
```

If the user provided the token correctly it returns with a response of our data

```
export { loadGames }
```

Lastly we have an export which exports the loadgames function, which can then be used in the index.js
