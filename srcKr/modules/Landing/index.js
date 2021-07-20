import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Button, Dimensions, Pressable, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View`
  flex:1;
  align-items: center;
  justify-content: center;
`;
const InputContainer = styled.View`
  margin:50px;
`;
const Text = styled.Text`
  font-size: 15px;
  font-family: "PoorStory";
`;
const ButtonContainer = styled.View`
  width: ${WIDTH * 0.5}px;
  height: ${WIDTH * 0.5 * 0.5}px;
  border: 1px solid gray;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export default Basic = () => {
  const [nickname, setNickname] = useState('');

  const navigation = useNavigation();
  const goToBR = () => {
    navigation.navigate("BasicRecipe", {});
  }
  const goToCal = () => {
    navigation.navigate("Calculator", {});
  }
  const goToPersonal = () => {
    navigation.navigate("Personal", {});
  }

  const [loaded] = Font.useFonts({
    'PoorStory': require('../../../assets/fonts/Delius-Regular.ttf'),
    'PoorStory': require('../../../assets/fonts/PoorStory-Regular.ttf'),
  });

  const loadAssets = () => {}
  const onFinish = () => {}
  const Navigation = useNavigation();
  const goToMainPage = () => {
    Navigation.navigate("Tab",{});
  }
  if(loaded){
    return (
      <Wrapper>
        <InputContainer>
          <Text>닉네임을 입력해주세요: </Text>
          <TextInput
            placeholder = {`예) 백두산 까치`}
            label="nickname"
            value={nickname}
            onChangeText={cur=>setNickname(cur)}
            style={{
              width: WIDTH*0.5, 
              borderBottomColor: 'lightgray',
              borderBottomWidth: 1,
              fontSize: 20,
              textAlign: 'center',
              marginTop: 10,
              fontFamily: 'PoorStory',
            }}
          />
          </InputContainer>
        <Pressable onPress={goToMainPage}>
        <ButtonContainer><Text>빵일기장 시작하기</Text></ButtonContainer>
        </Pressable>
      </Wrapper>
    )
  } else {
    return (
      <AppLoading 
        startAsync={loadAssets}
        onFinish={onFinish}
        onError={console.warn}
      />
    )
  }
  
}