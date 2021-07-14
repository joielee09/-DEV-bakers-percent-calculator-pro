import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { createNativeWrapper } from "react-native-gesture-handler";
import { getPublicRecipeData } from "../../../apis";
import ListPresenter from "./ListPresenter";
import styled from 'styled-components/native';

const Wrapper = styled.View`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export default () => {
    const [ready, setReady] = useState(false);
    const [recipes, setRecipes] = useState({
        loading: true,
        recipes:[],
        recipesError:null
    })
    const getData = async() => {
        const res = await getPublicRecipeData();
        setRecipes({
            loading:true,
            recipes: res.Items,
            recipesError: null
        })
        setReady(true)
    }
    useEffect(()=>{
        getData();
    }, []);
    return (
        ready
        ? <ListPresenter refreshFn={getData}{...recipes}/>
        : 
        <Wrapper>
        <ActivityIndicator color="#BB6767" size="large" />
        </Wrapper>
    )
}