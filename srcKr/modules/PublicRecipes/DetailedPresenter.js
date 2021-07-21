import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Dimensions, ScrollView, Image, Pressable } from 'react-native';
import * as brData from '../../../mockAPI/korean_customAPI.json';
const data = brData;
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { store, flourStore } from '../../../Redux/Store.js';
import * as Font from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { updatePublicLikes } from '../../../apis';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View``;
const Text = styled.Text`
  font-size: 15px;
  font-family: 'PoorStory';
`;
const TextContainer = styled.View`
  height: ${HEIGHT*0.08}px;
  width: ${WIDTH*0.8}px;
  border-bottom-color: lightgray;
  border-bottom-width: 0.3px;
  flex-wrap: wrap;
  flex-direction: row;
  margin-left: ${WIDTH*0.1}px;
  /* background-color: lightyellow; */
  justify-content: space-around;
`;
const Title = styled.Text`
  font-size: 20px;
  margin: 20px;
  font-family: 'PoorStory';
`;
const IngredientName = styled.Text`
  margin-top: 20px;
  font-family: 'PoorStory';
`;
const IngredientGram = styled.Text`
  margin-top: 20px;
  font-family: 'PoorStory';
`;
const Flour = styled.Text`
  margin: 5px auto auto auto;
  font-family: 'PoorStory';
`;
const CalBtnContainer = styled.View`
  width: ${WIDTH * 0.8}px;
  height: ${WIDTH * 0.8 * 0.25}px;
  justify-content: center;
  border-radius: 10px;
  border: 0.5px gray solid;
  margin: auto;
  margin-bottom: 70px;
`;
const CalBtnText = styled.Text`
  text-align: center;
  font-family: 'PoorStory';
`;
const Author = styled.Text`
  font-family: 'PoorStory';
  margin-left: 20px;
`;
const ReviewContainer = styled.View`
  margin: 20px;
`;
const StarContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin: auto;
`;
const Star = styled.Text`'
  margin: 10px;
  font-size: 24px;
  font-family: 'PoorStory';
`;
const LikeBoxOFF = styled.View`
  width: ${WIDTH*0.3}px;
  height: ${WIDTH*0.3*0.4}px;
  border-radius: 10px;
  border: 1px solid gray;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 20px;
`;
const TextOFF = styled.Text`
  color: gray;
`;
const LikeBoxON = styled.View`  
  background-color: blue;
  width: ${WIDTH*0.3}px;
  height: ${WIDTH*0.3*0.4}px;
  border-radius: 10px;
  border: 1px solid gray;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 20px;
`;
const TextON = styled.Text`
  color: white;
`;


const Basic = ({
  navigation,
  route:{
    params: {cur, USER_INFO}
  }
  }) => {
  // console.log("cur and USER_INFO: ", cur, USER_INFO);
  console.log("LIKE USERS: ", cur.LIKE_USERS);
  const [LIKES, setLIKES] = useState(cur.LIKE_USERS.filter(cur=>cur===USER_INFO.USER_ID).length==1?true:false); // use local user number
  const loaded = Font.useFonts({
    'PoorStory': require('../../../assets/fonts/Delius-Regular.ttf'),
    'PoorStory': require('../../../assets/fonts/PoorStory-Regular.ttf'),
  });  

  const loadAssets = () => {}
  const onFinish = () => {}

  const pressLike = () => {
    console.log(LIKES)
    // Todo : 해당 글의 LIKES를 증가시키는 함수

    if(LIKES===true){
      cur.LIKES-=1;
      cur.LIKE_USERS.pop();
      console.log(cur.LIKE_USERS);
    } else{
      cur.LIKES+=1;
      cur.LIKE_USERS.push(USER_INFO.USER_ID); // local user number
      console.log(cur.LIKE_USERS);
    }
    
    updatePublicLikes({
      "USER_ID":cur.USER_ID,
      "RECIPE_ID":cur.RECIPE_ID,
      "LIKES":cur.LIKES,
      "LIKE_USERS":cur.LIKE_USERS
    })
    setLIKES(!LIKES);
  }

  const goToCal = async() => {
    navigation.navigate("GoToCalculator",{
      cur
    });
  }

  useEffect(()=>{
    // navigation.addListener('blur', ()=>updatePublicLikes({
    //   "USER_ID":cur.USER_ID,
    //   "RECIPE_ID":cur.RECIPE_ID,
    //   "LIKES":cur.LIKES,
    //   "LIKE_USERS":cur.LIKE_USERS
    // }))
  })

  if(loaded){
    return (
      <ScrollView>
      <Wrapper>
        <Image 
          source={{ uri:cur.IMAGE }}
          style={{
            width: 170,
            height: 170,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 10
          }}
        />
        <Pressable onPress={pressLike}>
        {
          LIKES
          ? <LikeBoxON><TextON>LIKE IT 👍</TextON></LikeBoxON>
          : <LikeBoxOFF><TextOFF>LIKE IT</TextOFF></LikeBoxOFF>
        }
          
        </Pressable>
        <Title>{cur.TITLE}</Title>
        <Author>👨‍🍳 작성자: {cur.AUTHOR}</Author>
        <Text />
        <Author>👍 좋아요: {cur.LIKES}</Author>
        <Text />
        <ReviewContainer><Text>{cur.REVIEW}</Text></ReviewContainer>
        <Text />
        <StarContainer> 
          {
            cur.RATING==1
            ? <Star>점수: ❤ 🖤 🖤 🖤 🖤</Star>
            : cur.RATING==2
              ? <Star>점수: ❤ ❤ 🖤 🖤 🖤</Star>
              : cur.RATING==3
                ? <Star>점수: ❤ ❤ ❤ 🖤 🖤</Star>
                : cur.RATING ==4
                  ? <Star>점수: ❤ ❤ ❤ ❤ 🖤</Star>
                  : <Star>점수: ❤ ❤ ❤ ❤ ❤</Star>
          }
        </StarContainer>
        <Text />
        {/* <Flour>총 밀가루: {}</Flour> */}
        {
          cur.TRAY.map((cur, index) => (
            <TextContainer key={index}>
            <IngredientName >{cur.inputName}</IngredientName>
            <IngredientGram >{cur.inputGram} (g)</IngredientGram>
            </TextContainer>
            )
          )
        }
      <Text />
      <TouchableOpacity
        onPress={goToCal}
      >
        <CalBtnContainer><CalBtnText>내 레시피 계산기로 이동하기</CalBtnText></CalBtnContainer>
      </TouchableOpacity>
      </Wrapper>
      </ScrollView>
    )

  } else {
    return(
      <AppLoading 
        startAsync={loadAssets}
        onFinish={onFinish}
        onError={console.warn}
      />
    )
  }
}

const mapStateToProps = ( state ) => {
  return ({ state : state });
};
const mapDispatchToProps = ( dispatch ) => {
  return ({ dispatch: dispatch });
};

export default connect(mapStateToProps, mapDispatchToProps)(Basic);