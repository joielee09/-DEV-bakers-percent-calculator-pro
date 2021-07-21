import axios from 'axios';
import { headers, urls } from './vars';

/** Function for uploading picture for S3 (사진을 S3에 저장하는 함수) */
export const uploadImageAsync = async (base64) => {
    /**
     * @ param {base64} encoded image
     */
    try {
        const data={
            "BASE_64":base64
        }
        const result = await axios.post(
            urls.uploadImageAsync_url,
            data,
            {headers},
        )
        return result.data
    }
    catch (e) {
        console.warn(e);
    }
}

// GET
export const getPublicRecipeData = async () => {
    try {
        const result = await axios.get(
            urls.getPublicRecipeData_url,
            {headers}
        )
        return result.data
    }
    catch (e) {
        console.warn(e);
    }
}

// POST
export const getPrivateRecipe = async (USER_ID) => {
    try {
        const data={
            "USER_ID":USER_ID
        }
        const result = await axios.post(
            urls.getPrivateRecipe_url,
            data,
            {headers},
        )
        return result.data
    }
    catch (e) {
        console.warn(e);
    }
}

// POST
export const makePrivateRecipe = async (ITEM) => {
    try {
            const data={
                "item":ITEM
            }
            const result = await axios.post(
                urls.makePrivateRecipe_url,
                data,
                {headers},
            )
            return result.data
        }
    catch (e) {
        console.warn(e);
    }
}

export const makePublicRecipe = async (ITEM) => {
    try {
            const data={
                "item":ITEM
            }
            const result = await axios.post(
                urls.makePublicRecipe_url,
                data,
                {headers},
            )
        }
    catch (e) {
        console.warn(e);
    }
}



// /** 저장하기 기능: Function for save Private Recipe, Review, Rating to DB (개인 레시피 기록을 DB에 저장하는 함수) */
// export const updatePrivateRecipe = async (ITEM) => {
// /**
//  * @ ITEM: Contents of Private Recipe. It includes Picture, Recipe, Review, Rating
//  */
//     try {
//         const data = {
//             "item": ITEM
//         }
//         const result = await axios.post(
//             urls.updatePrivateRecipe_url,
//             data,
//             {headers}
//         )
//     }
//     catch (e) {
//         console.warn(e);
//     }
// }

export const updatePrivateRecipe = async (ITEM) => {
    console.log("update working???", ITEM)
    try {
            const data={
                "item":ITEM
            }
            const result = await axios.post(
                `https://fbo2vnjyz6.execute-api.ap-northeast-2.amazonaws.com/baker_stage/update-private-recipe`,
                data,
                {headers},
            )
            console.log("✅ get response: ", result.data);
            return result.data
        }
    catch (e) {
        console.log(e);
    }
}



// DELETE

/** 저장하기 기능: Function for save Private Recipe, Review, Rating to DB (개인 레시피 기록을 DB에 저장하는 함수) */
export const deletePrivateRecipe = async (ITEM) => {
    /**
     * @ ITEM: Contents of Private Recipe. It includes Picture, Recipe, Review, Rating
     */
        try {
            const data = {
                "item": ITEM
            }
            const result = await axios.post(
                urls.deletePrivateRecipe_url,
                data,
                {headers}
            )
            console.log("✅ successfully deleted: ", result);
        }
        catch (e) {
            console.warn(e);
        }
    }

    export const updatePublicLikes = async(ITEM) => {
        try {
            const data = {
                "item": ITEM
            }
            const result = await axios.post(
                urls.updatePublicLikes_url,
                data,
                {headers}
            )
        }
        catch (e) {
            console.warn(e);
        }
    }


// CREATE USER

export const createUser = async(USER_INFO) => {
    try {
        const data = USER_INFO;
        const result = await axios.post(
            urls.createUser_url,
            data,
            {headers}
        )
    }
    catch (e) {
        console.warn(e)
    }
}

// CHECK USER DUPLICATION

export const checkUserDuplication = async(NICKNAME) => {
    try{
        const data = {
            "NICKNAME":NICKNAME
        };
        const result = await axios.post(
            urls.checkUserDuplication_url,
            data,
            {headers}
        )
        console.log(result.data);
        if(result.data.Count===0) return false;
        else return true;
    } catch(e) {
        console.warn(e);
    }
}


/* ITEM format */
/* 
    {
        "IMAGE": "https://lh3.googleusercontent.com/proxy/B_WUq19ore-Azvf-Moglr0uWzvEn_22UE1bpMyh4-T47LAKVtJsPLbQTMvHNJZeJqt3jFKJuwCQ7g3TWXoSFonfnMoGaJxYbo4w4O0DJDZuXRHgN23Q",
        "PUBLIC": true,
        "RATING": 4,
        "RECIPE_ID": 13,
        "REVIEW": "룰루 랄라! 씹을수록 맛이 더해지는 빵에서 식감이 차지하는 부분은 정말 큰 것 같아요. 우물우물 씹는 재미가 있는 빵을 찾으시는 분이라면 치즈 치아바타는 어떨까요? 겉은 바삭하고 속은 쫄깃쫄깃한데, 씹을수록 고소하고 담백한 재미있는 빵이랍니다.",
        "TITLE": "치아바타",
        "TRAY": [
            {
                "flourInput": true,
                "inputGram": 1000,
                "inputName": "강력분",
                "percentage": 100,
                "targetGram": 0
            },
            {
                "inputGram": 450,
                "inputName": "계란",
                "percentage": 45,
                "targetGram": 0
            },
            {
                "inputGram": 700,
                "inputName": "스파게티",
                "percentage": 70,
                "targetGram": 0
            },
            {
                "flag": true,
                "flourInput": false,
                "inputGram": 1000,
                "inputName": "flour",
                "percentage": 100,
                "targetGram": 0
            }
        ],
        "USER_ID":3,
        "AUTHOR": "프랑스참새", (localStorage의 정보 넣기)
        "LIKES": 0,
        "TOTAL_FLOUR": 1700
    }
*/