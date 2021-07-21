import React, { useEffect, useState } from 'react';
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import Tab from './Tabs';
import PublicRecipesList from './PublicRecipes/ListContainer'
import PublicRecipesDetailed from './PublicRecipes/DetailedPresenter'
import Calculator from './Calculator'
import GoToCalculator from './Calculator/goToCalculator'
import Personal from './Personal/ListContainer'
import Detailed from './Personal/Detailed';
import Register from './Landing';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();

export default Basic = () => {

  const [userInfo, setUserInfo] = useState();
  const [ready, setReady] = useState(false);
  const loadAssets = async() => {
    try{
      const result = await AsyncStorage.getItem('USER_INFO');
      if(result!==null){
        const USER_INFO = JSON.parse(result);
        setUserInfo(USER_INFO)
        console.log(USER_INFO);
      }
    } catch (e) {
      console.warn(e);
    }
  }
  const onFinish = () => {
    setReady(true)
  }

  return ready? 
      (
        <Stack.Navigator
          screenOptions={{
            headerTitle:''
          }}
        >{userInfo?(
            <>
            <Stack.Screen name="Tab" component={Tab} />
            <Stack.Screen name="BasicRecipe" component={PublicRecipesDetailed} />
            <Stack.Screen name="BRList" component={PublicRecipesList} />
            <Stack.Screen name="Calculator" component={Calculator} />
            <Stack.Screen name="Personal" component={Personal} />
            <Stack.Screen name="detailed" component={Detailed} />
            <Stack.Screen name="GoToCalculator" component={GoToCalculator} />
            </>
          ) : (
            <>
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Tab" component={Tab} />
            <Stack.Screen name="BasicRecipe" component={PublicRecipesDetailed} />
            <Stack.Screen name="BRList" component={PublicRecipesList} />
            <Stack.Screen name="Calculator" component={Calculator} />
            <Stack.Screen name="Personal" component={Personal} />
            <Stack.Screen name="detailed" component={Detailed} />
            <Stack.Screen name="GoToCalculator" component={GoToCalculator} />
            </>
          )
        }
        </Stack.Navigator>
    ) : (
      <AppLoading 
          startAsync={loadAssets}
          onFinish={onFinish}
          onError={console.warn}
      />
    )
}