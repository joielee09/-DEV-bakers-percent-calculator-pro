import axios from 'axios';

const headers={
    'x-api-key': 'VdlzJiifdv5h43Hs5dRh881dWVPFjzsQ1U3D1cH5',
    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': '*/*',
    'Connection': 'keep-alive'
    }

export const getPublicRecipeData = async () => {
    try {
        const result = await axios.get(
            `https://fbo2vnjyz6.execute-api.ap-northeast-2.amazonaws.com/baker_stage/get_public_recipe`,
            {headers}
        )
        return result.data
        // .then((res) => {
        //     // console.log("axios working ✅",res.data); // console for checking axios
        //     return result;
        // })
    }
    catch (e) {
        console.log(e);
    }
}

export const getUserData = async (USER_ID) => {
try {
        const data={
            "USER_ID":USER_ID
        }
        await axios.post(
            `https://fbo2vnjyz6.execute-api.ap-northeast-2.amazonaws.com/baker_stage/get_user`,
            data,
            {headers},
        )
        .then((res) => {
            console.log("axios working ✅",res.data); // console for checking axios
            return res.data
        })
    }
    catch (e) {
        console.log(e);
    }
}
