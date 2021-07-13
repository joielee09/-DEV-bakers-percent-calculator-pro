import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { getPublicRecipeData } from "../../../apis";
import DetailedPresenter from "./DetailedPresenter";

export default (cur) => {
    cur = cur.route.params.currentRecipe;
    console.log("cur in detail container",cur)
    
    const [recipes, setRecipes] = useState({
        loading: true,
        recipes:[],
        recipesError:null
    })
    
    const getData = async() => {
        const res = await getPublicRecipeData();
        setRecipes({
            loading:false,
            recipes: res.Items,
            recipesError: null
        })
    }

    useEffect(()=>{
    }, []);

    return <DetailedPresenter ingredients={cur.TRAY}{...cur.AUTHOR}/>
}