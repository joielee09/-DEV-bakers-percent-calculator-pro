import React, { useEffect, useState } from "react";
import { getPrivateRecipe } from "../../../apis";
import ListPresenter from "./ListPresenter";
import { Text } from 'react-native';

export default () => {
    // tmp user id
    const USER_ID=0;

    const [recipes, setRecipes] = useState({
        loading: true,
        recipes:[],
        recipesError:null
    })
    const getData = async() => {
        const res = await getPrivateRecipe(USER_ID);
        // console.log("res in list container: ", res);
        setRecipes({
            loading:false,
            recipes: res.Items,
            recipesError: null
        })
    }
    useEffect(()=>{
        getData();
    }, []);

    return <ListPresenter refreshFn={getData}{...recipes}/>
    // return <Text>hello</Text>
}