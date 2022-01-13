import axios from 'axios'


async function loadGames (ID ='', search = '') { 

    const { API_URL, API_TOKEN } = process.env 

    if (search)
        search = `?search=${search}`

    if (ID)
        ID = `?id=${ID}`
    
    if (!API_URL || !API_TOKEN )  console.error('missing info') 

    const response = await axios(API_URL + search + ID, { 
    headers: {
        Authorization: `Bearer ${API_TOKEN}`
    }}) 

    return response.data 
}

export { loadGames }
