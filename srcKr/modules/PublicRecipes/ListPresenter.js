import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, Dimensions,Image, ScrollView } from 'react-native';
import * as brData from '../../../mockAPI/korean_customAPI.json';
let data = brData;
import AppLoading from 'expo-app-loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View``;
const LoadingWrapper = styled.View`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const Text = styled.Text`
  font-size: 12px;
`;
const RecipeContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: lightgray;
  margin: 10px;
  padding: 10px;
  flex-direction: row;
  flex-wrap:wrap;
  justify-content: space-around;
`;
const ContentsContainer = styled.View``;
const Title = styled.Text`
  font-size: 18px;
  font-family: 'PoorStory';
  width: ${WIDTH*0.4}px;
  ${'' /* background-color: lightyellow; */}
  margin-bottom:10px;
`;
const Contents = styled.Text`
  font-size: 12px;
  font-family: 'PoorStory';
  width: ${WIDTH*0.4}px;
  ${'' /* background-color: lightblue; */}
  margin-bottom: 16px;
`;
const Likes = styled.Text`
  font-size: 13px;
  color: gray;
  font-family: 'PoorStory';
  ${'' /* background-color: lightgreen; */}
`;

export default Basic = ({refreshFn, loading, recipes, USER_INFO}) => {
  // console.log("cur in presenter: ", recipes[0]);
  const list = data.custom_list;

  const [loaded] = Font.useFonts({
    'PoorStory': require('../../../assets/fonts/Delius-Regular.ttf'),
    'PoorStory': require('../../../assets/fonts/PoorStory-Regular.ttf'),
  });
  
  const loadAssets = () => {}
  const onFinish = () => {}

  const Navigation = useNavigation();
  const goToRecipe = (cur) => {
    Navigation.navigate("BasicRecipe",{
      "cur":cur,
      "USER_INFO":USER_INFO
    });
  }

  if(loaded){
  return (
    <ScrollView>
    <Wrapper>
      {
        recipes.map((cur, index) => {
            // console.log("cur in br list...", list[0]);
            return (
              <TouchableOpacity onPress={() => goToRecipe(cur)}>
                <RecipeContainer key={index}>
                  <Image
                    source={{ uri: cur.IMAGE }}
                    style={{
                      width: 100,
                      height: 100
                    }}
                  />
                  <ContentsContainer>
                    <Title>{cur.TITLE.length>14? cur.TITLE.slice(0,14)+"...": cur.TITLE}</Title>
                    <Contents>👩‍🍳🍪 {cur.AUTHOR} </Contents>
                    <Likes>좋아요 {cur.LIKES}</Likes>
                  </ContentsContainer>
                </RecipeContainer>
              </TouchableOpacity>
            )
          })
      }
    </Wrapper>
    </ScrollView>
  )} else {
    return(
      <LoadingWrapper>
      <ActivityIndicator color="#BB6767" size="large" />
      </LoadingWrapper>
    )
  }
}