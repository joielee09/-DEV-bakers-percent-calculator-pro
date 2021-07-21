import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Modal, Button, Image, Dimensions, Pressable, TextInput, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { createUser } from '../../../apis';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View`
  flex:1;
  align-items: center;
  padding-top: 30px;
`;
const InputContainer = styled.View`
  margin:10px;
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
const AlertModalWrapper = styled.View`
  height: ${HEIGHT*0.1}px;
  width: ${HEIGHT*0.2*1.6}px;
  background-color: #fff;
  margin-top: ${HEIGHT*0.25}px;
  margin-right: auto;
  margin-left: auto;
`;
const AlertModalTextContainer = styled.View`
  background-color: #fff;
  height: ${HEIGHT*0.15}px;
  width: ${HEIGHT*0.2*1.6}px;
  align-items: center;
  padding-top: ${HEIGHT*0.04}px;
`;

export default Basic = () => {
  const [fullname, setFullname] = useState('');
  const [nickname, setNickname] = useState('');
  const [modal, setModal] = useState(false);

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
    const ID = parseInt(Math.random()*100000);
    setModal(true);
    createUser({
      "USER_ID": ID,
      "NICKNAME": nickname,
      "FULL_NAME": fullname
    })
    setModal(false);
    Navigation.navigate("Tab",{});
  }
  if(loaded){
    return (
      <ScrollView>
      <Wrapper>
      <Image 
        source={{ uri: 'https://bakerspercent-assets.s3.ap-northeast-2.amazonaws.com/IMG_0964.PNG' }}
        style={{
          width: WIDTH*0.8,
          height: WIDTH*0.7
        }}
      />
        <InputContainer>
        <Text>이름을 입력해주세요: </Text>
          <TextInput
            placeholder = {`예) 이재영`}
            label="fullname"
            value={fullname}
            onChangeText={cur=>setFullname(cur)}
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

        <Modal
          animationType="none"
          transparent={true}
          visible={modal}
        >
        <AlertModalWrapper>
          <AlertModalTextContainer><Text>저장중 ... </Text></AlertModalTextContainer>
        </AlertModalWrapper>
        </Modal>

      </Wrapper>
      </ScrollView>
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