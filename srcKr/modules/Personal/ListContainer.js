import React, { useEffect, useState } from "react";
import { getPrivateRecipe } from "../../../apis";
import ListPresenter from "./ListPresenter";
import styled from 'styled-components/native';
import { ActivityIndicator, Button } from "react-native";
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


    const [recipes, setRecipes] = useState({
        loading: true,
        recipes:[],
        recipesError:null
    })
    const getData = async() => {
        const USER_INFO = await getUserInfo();
        const res = await getPrivateRecipe(USER_INFO.USER_ID);
        // console.log("res in list container: ", res);
        setRecipes({
            loading:false,
            recipes: res.Items,
            recipesError: null
        })
        setReady(true)
    }
    const navigation = useNavigation();
    useEffect(()=>{
        console.log("Private Refreshing!!")
        navigation.addListener('focus', ()=>getData());
    }, []);
    return (
        ready
        ?
        <ListPresenter refreshFn={getData}{...recipes}/>
        : 
        <Wrapper>
        <ActivityIndicator color="#BB6767" size="large" />
        </Wrapper>
    )
}