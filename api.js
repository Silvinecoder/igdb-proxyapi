import axios from 'axios'


async function loadGames (ID, search = '') { //async due to await, search is to search games url is ?search=Mario, if the search is undefined is empty

    const { API_URL, API_TOKEN } = process.env // this is the same as below - destructuring assignment - 
    // const URL = process.env.URL
    // const TOKEN = process.env.TOKEN

    if (search)
        search = `?search=${search}` // if search has information inside we want it to be ?search= whatever info is inside

    if (ID)
        ID = `?id=${ID}` // if id has information inside we want it to be ?search= whatever info is inside
    

    // if (!URL || !TOKEN )  throw new Error('missing info') -  if its empty or Falsy add an error, throw new Error terminates the process
    if (!API_URL || !API_TOKEN )  console.error('missing info') // is less destructive than throw new error 

    const response = await axios(API_URL + search + ID, { // default is get if you want post you do axios.post
    headers: {
        Authorization: `Bearer ${API_TOKEN}` // auth of the token to show data 
    }}) 



    return response.data // to show data of the api
}

export { loadGames } // export async function loadgames

// env means environment variables - by env it won't be in our code 
// git ignore for envirnoment and node_modules so it doesn't send to git 
// download yarn add dotenv