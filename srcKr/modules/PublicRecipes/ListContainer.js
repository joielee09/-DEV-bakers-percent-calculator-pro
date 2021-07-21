import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { createNativeWrapper } from "react-native-gesture-handler";
import { getPublicRecipeData } from "../../../apis";
import ListPresenter from "./ListPresenter";
import styled from 'styled-components/native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


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
        recipesError:null,
        USER_INFO:null
    })

    const getUserInfo = async() => {
        try{
            const value = await AsyncStorage.getItem('USER_INFO');
            if(value!==null){
                return JSON.parse(value);
            }
        } catch (e) {
            console.warn(e);
        }
    }

    const getData = async() => {
        const USER_INFO = await getUserInfo();
        const res = await getPublicRecipeData();
        
        setRecipes({
            loading:false,
            recipes: res.Items,
            recipesError: null,
            USER_INFO:USER_INFO
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