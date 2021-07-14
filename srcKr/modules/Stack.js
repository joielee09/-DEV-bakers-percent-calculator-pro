import React from 'react';
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import Tab from './Tabs';
import PublicRecipesList from './PublicRecipes/ListContainer'
import PublicRecipesDetailed from './PublicRecipes/DetailedPresenter'
import Calculator from './Calculator'
import GoToCalculator from './Calculator/goToCalculator'
import Personal from './Personal/ListContainer'
import Detailed from './Personal/Detailed';

const Stack = createStackNavigator();

export default Basic = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle:''
      }}
    >
      <Stack.Screen name="Tab" component={Tab} />
      <Stack.Screen name="BasicRecipe" component={PublicRecipesDetailed} />
      <Stack.Screen name="BRList" component={PublicRecipesList} />
      <Stack.Screen name="Calculator" component={Calculator} />
      <Stack.Screen name="Personal" component={Personal} />
      <Stack.Screen name="detailed" component={Detailed} />
      <Stack.Screen name="GoToCalculator" component={GoToCalculator} />
    </Stack.Navigator>
  )
}