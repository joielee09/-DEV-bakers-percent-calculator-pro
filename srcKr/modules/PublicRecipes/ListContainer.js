import React, { useEffect, useState } from "react";
import { getPublicRecipeData } from "../../../apis";
import ListPresenter from "./ListPresenter";

export default () => {
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
        getData();
    }, []);
    return <ListPresenter refreshFn={getData}{...recipes}/>
}