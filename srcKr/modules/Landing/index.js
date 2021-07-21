import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Modal, Button, Image, Dimensions, Pressable, TextInput, ScrollView, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { createUser, checkUserDuplication } from '../../../apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  margin-top: 20px;
`;
const DisabledText = styled.Text`
  font-size: 15px;
  font-family: "PoorStory";
  color: white;
`;
const DisabledButtonContainer = styled.View`
  width: ${WIDTH * 0.5}px;
  height: ${WIDTH * 0.5 * 0.5}px;
  border: 1px solid gray;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  background-color: lightgray;
`;
const CheckButton = styled.View`
  border: 1px gray solid;
  width: ${WIDTH * 0.5}px;
  height: ${WIDTH * 0.5 * 0.2}px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
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
  justify-content: center;
  padding-top: ${HEIGHT*0.04}px;
`;
const AlertBox = styled.View``;
const StopText = styled.Text`
  font-size: 10px;
  font-family: "PoorStory";
  color: red;
  margin: auto;
`;
const PassText = styled.Text`
  font-size: 10px;
  font-family: "PoorStory";
  color: blue;
  margin: auto;
`;

export default Basic = () => {
  const [FULL_NAME, setFullname] = useState('');
  const [NICKNAME, setNickname] = useState('');
  const [modal, setModal] = useState(false);
  const [avail, setAvail] = useState(false);
  const [checked, setChecked] = useState(false);
  const [ready, setReady] = useState(false);

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

  const duplicateCheck = async () => {
    if(FULL_NAME==='' || FULL_NAME===undefined){
      Alert.alert('이름을 먼저 입력해주세요.');
      return;
    }
    if(NICKNAME==='' || NICKNAME===undefined){
      Alert.alert('닉네임을 입력하세요.');
      return;
    }
    setChecked(true);
    const res = await checkUserDuplication(NICKNAME);
    if(res){ // if nickname exist
      setAvail(false);
    }
    else{ // if nickname not exist(available)
      setAvail(true);
      setReady(true);
    }
    // console.log("duplicateCheck", res);
  }

  const goToMainPage = async() => {

    if(FULL_NAME==='' || FULL_NAME===undefined){
      Alert.alert('이름을 입력해주세요.');
      return;
    }
    if(NICKNAME==='' || NICKNAME===undefined){
      Alert.alert('닉네임을 입력해주세요.');
      return;
    }
    if(avail===false){
      Alert.alert('사용 가능한 닉네임을 입력해주세요.');
      return;
    }

    setModal(true);
    const ID = parseInt(Math.random()*100000);
    const USER_INFO={
      "USER_ID": ID,
      "NICKNAME": NICKNAME,
      "FULL_NAME": FULL_NAME
    };

    // LocalStorage
    try{
      const STR_USER_INFO = JSON.stringify(USER_INFO)
      await AsyncStorage.setItem("USER_INFO", STR_USER_INFO);
    } catch (e) {
      console.warn(e)
    }
    // DynamoDB
    createUser(USER_INFO);
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
            label="FULL_NAME"
            value={FULL_NAME}
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
            value={NICKNAME}
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
          {
            checked?
              avail?(
                <AlertBox><PassText>사용 가능한 닉네임입니다.</PassText></AlertBox>                
              ) : (
                <AlertBox><StopText>이미 있는 닉네임입니다.</StopText></AlertBox>
            ):(
                <></>
            )
          }
          
          </InputContainer>
          <Pressable onPress={()=>duplicateCheck(NICKNAME)}>
            <CheckButton><Text>닉네임 중복체크</Text></CheckButton>
          </Pressable>

          {
            ready?(
              <Pressable onPress={goToMainPage}>
                <ButtonContainer><Text>빵일기장 시작하기</Text></ButtonContainer>
              </Pressable>              
            ) : (
              <DisabledButtonContainer><DisabledText>빵일기장 시작하기</DisabledText></DisabledButtonContainer>
            )
          }
        

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