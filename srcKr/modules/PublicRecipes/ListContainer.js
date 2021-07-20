import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { createNativeWrapper } from "react-native-gesture-handler";
import { getPublicRecipeData } from "../../../apis";
import ListPresenter from "./ListPresenter";
import styled from 'styled-components/native';
import { useNavigation } from "@react-navigation/native";

const Wrapper = styled.View`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export default () => {
    const [ready, setReady] = useState(false);
    const [recipes, setRecipes] = useState({
        loading: false,
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
        setReady(true)
    }
    const navigation = useNavigation();
    useEffect(()=>{
        console.log("Public Refreshing!!")
        navigation.addListener('focus', ()=>getData());
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