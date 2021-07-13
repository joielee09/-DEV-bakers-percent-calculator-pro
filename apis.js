import axios from 'axios';

const headers={
    'x-api-key': '',
    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': '*/*',
    'Connection': 'keep-alive'
    }

export const getPublicRecipeData = async () => {
    try {
        const result = await axios.get(
            ``,
            {headers}
        )
        return result.data
    }
    catch (e) {
        console.log(e);
    }
}

export const getPrivateRecipe = async (USER_ID) => {
try {
        const data={
            "USER_ID":USER_ID
        }
        const result = await axios.post(
            ``,
            data,
            {headers},
        )
        return result.data
    }
    catch (e) {
        console.log(e);
    }
}
