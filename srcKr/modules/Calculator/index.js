import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, ScrollView, TextInput, Modal, Button, View, StyleSheet, Pressable, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ingredient from '../../component/ingredient';
import { connect } from 'react-redux';
import { store, flourStore } from '../../../Redux/Store.js';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useNavigation  } from "@react-navigation/native";
import * as Font from 'expo-font';
import ModalComponent from '../../component/alertModals/ingredientAlertModal';
import { makePrivateRecipe } from "../../../apis";
import { AntDesign } from '@expo/vector-icons';


import { uploadImageAsync } from '../../../apis';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View``;
const Text = styled.Text`
  font-size: 14px;
  font-family : 'PoorStory';
`;

const InputContainer = styled.View`
  /* width: ${WIDTH*0.45}; */
`;

const AddBtn = styled.View`
  width: ${WIDTH*0.3}px;
  height: ${WIDTH*0.5*0.3}px;
  /* background-color: #dcdc; */
  background-color: lightgray;
  border-radius: 10px;
  justify-content: center;
`;
const AddText = styled.Text`
  /* margin: auto; */
  font-family: 'PoorStory';
  font-size: 12px;
  text-align: center;
`;
const NameContainer = styled.View`
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  /* background-color:lightyellow; */
  margin-top: ${WIDTH*0.03}px;
  margin-bottom: ${WIDTH*0.03}px;
`;
const SaveBtn = styled.View`
  width: ${WIDTH*0.25}px;
  height: ${WIDTH*0.25*0.4}px;
  background-color: lightgray;
  border-radius: 5px;
`;
const SaveText = styled.Text`
  margin: auto;
  font-family: 'PoorStory';
  font-size: 12px;
`;
const DevListBtn = styled.View`
  width: ${WIDTH*0.5}px;
  height: ${WIDTH*0.5*0.2}px;
  background-color: purple;
  margin: 5px auto auto;
`;
const ResetBtn = styled.View`
  width: ${WIDTH*0.3}px;
  height: ${WIDTH*0.5*0.3}px;
  background-color: lightgray;
  border-radius: 10px;
`;
const ResetText = styled.Text`
  margin: auto;
  font-family: 'PoorStory';
  font-size: 12px;
`;
const ModalWrapper = styled.View`
  height: ${HEIGHT*0.5}px;
  background-color: #fff;
  margin-top: ${HEIGHT*0.15}px;
`;
const IngredientContainer = styled.View`
  height: ${HEIGHT*0.42}px;
  border: 0.5px lightgray solid;
`;
const FlourContainer = styled.View`
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  /* background-color:lightyellow; */
  margin-top: ${WIDTH*0.05}px;
`;
const Apply = styled.View`
  width: ${WIDTH*0.25}px;
  height: ${WIDTH*0.25*0.6}px;
  background-color: #F4C8AC;
  border-radius: 5px;
`;
const ApplyText = styled.Text`
  margin: auto;
  font-family: 'PoorStory';
  font-size: 12px;
`;
const ButtomContainer = styled.View`
  /* background-color: lightyellow; */
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: ${HEIGHT*0.01}px;
`;
const Blank = styled.View`
  height: 10px;
  font-family: 'PoorStory';
`;
const ModalInputContainer = styled.View`
  width: ${WIDTH}px;
  height: ${HEIGHT*0.2}px;
  justify-content: center;
  align-items: center;
`;
const InputFromBR = styled.Text`
  width: ${WIDTH*0.5}px;
  text-align: center;
  /* background-color: lightyellow; */
  font-size: 12px;
  font-family: 'PoorStory';
`;
const ButtonContainer = styled.View`
  width: ${WIDTH * 0.8}px;
  height: ${WIDTH * 0.8 * 0.25}px;
  justify-content: center;
  border-radius: 10px;
  border: 0.5px gray solid;
  margin: auto;
  margin-bottom: 5px;
`;
const ButtonText = styled.Text`
  color: gray;
  text-align: center;
  font-family : 'PoorStory';
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
const IngredientWrapper = styled.View`
  height: 50px;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: space-around;
`;

let TRAY = [];
let total_flour=0;


const Calculator = ({
  dispatch,
  navigation,
  route:{
    params
  }
}) => {
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

  const [inputFromBR, setInputFromBR] = useState(flourStore.getState().totalFlour)
  const [inputFlour, setInputFlour] = useState('');
  const [targetFlour, setTargetFlour] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [flourModalVisible, setFlourModalVisible] = useState(false);
  const [inputName, setInputName] = useState('');
  const [inputGram, setInputGram] = useState(0.0);
  const [title, setTitle] = useState('');
  const [IngedientAlertModalVisible,setIngedientAlertModalVisible] = useState(false);
  const [nameAlertModalVisible,setNameAlertModalVisible] = useState(false);
  const [pageReload, setPageReload] = useState(true)

  const deleteItem = (itemName) =>{
    console.log(itemName)
    const filtered=[]
    TRAY.map(cur=>{
      if(cur.inputName===itemName && cur.flourInput==true){
        total_flour=parseInt(total_flour)-parseInt(cur.inputGram);
      }
      else{
        filtered.push(cur)
      }
    })
    console.log(filtered, TRAY)
    TRAY = filtered;
    setPageReload(!pageReload)
  }

  const valid = () => {
    return title && total_flour && (TRAY.length!=0);
  }


  // 밀가루 또는 재료 추가 모달
  const add = (category) => {
    // inputFlour가 없는 경우 경고페이지
    if (category === 'igd') {
      if (inputFlour || inputFromBR) setModalVisible(true);
      else setIngedientAlertModalVisible(true);
    }
    if (category === 'flour') setFlourModalVisible(true)
  }

  // private recipe에 저장하기
  const save = async() => {
    // 이름이 없는 경우
    if(!title){
      Alert.alert('이름을 입력해주세요');
      return;
    }
    // 재료가 없는 경우
    if(!valid()){
      Alert.alert('재료를 입력해주세요');
      return;
    }

    // redux에 저장된 재료 statue 가져오기
    // let list = store.getState();
    // if (inputFromBR) setInputFlour(inputFromBR);
    // console.log("inputFlour: ", inputFromBR)

    // let total_flour = flourStore.getState().totalFlour
    // error 1
    // list.TRAY.push({
    //   "inputGram": total_flour,
    //   "inputName": 'flour',
    //   "percentage": '100.0',
    //   "targetGram": targetFlour,
    //   "flag": true,
    //   "flourInput": false,
    // });

    // console.log("list: ", list);
    const USER_INFO = await getUserInfo();
    console.log("USER_INFO: ", USER_INFO);

    const recipe_id = parseInt(Math.random()*100000000);
    // Save at DB
    await makePrivateRecipe({
      "IMAGE": "https://i.stack.imgur.com/y9DpT.jpg",
      "PUBLIC": false,
      "RATING": 1,
      "RECIPE_ID":recipe_id, // automatically escalate
      "REVIEW": "",
      "TITLE": title,
      "TRAY": TRAY,
      "USER_ID": USER_INFO.USER_ID, // get user id in localStorage
      "AUTHOR": USER_INFO.NICKNAME, // get name of user in localStorage
      "LIEKS": 0,
      "TOTAL_FLOUR": total_flour
    })
    Alert.alert('저장되었습니다!')

  }

  // const devList = () => {console.log(store.getState());}
  // const devstorageList = async() => {
  //   const keys = await AsyncStorage.getAllKeys();
  //     const localList = await AsyncStorage.multiGet(keys);
  //     // console.log(localList);  
  // } 

  // 적용하기 버튼
  const apply = () => {
    // check current input, target flour status
    console.log(`before apply , ${total_flour}, ${targetFlour}`);
    
    // if user delete target to blank / 0 put default input flour
    let targetHelper = targetFlour;
    if ( targetFlour.toString() === '' ) {
      console.log("targetFlour is blank")
      // setTargetFlour(total_flour);
      targetHelper = total_flour;
    }

    if ( parseInt(targetFlour) === 0 ) {
      console.log("targetFlour is zero")
      // setTargetFlour(total_flour);
      targetHelper = total_flour;
    }

    setPageReload(!pageReload)

    // console.log(`after apply , ${flourStore.getState().totalFlour}, ${targetFlour}`);
    
    TRAY.map(cur=>{
      cur.percentage = (((cur.inputGram / total_flour).toFixed(3))*100).toFixed(1);
      cur.targetGram = ((cur.inputGram / total_flour)* parseInt(targetHelper)).toFixed(1);
      // console.log((cur.inputGram / total_flour), parseInt(targetHelper), (cur.inputGram / total_flour)* parseInt(targetHelper))
    })

    // console.log("TRAY in apply: ", TRAY);
    // store.dispatch({
    //   type: 'apply',
    //   totalFlour: flourStore.getState().totalFlour,
    //   targetFlour: targetHelper 
    // })

  }

  const test = async() => {
    try{
      const value = await AsyncStorage.getItem('USER_INFO');
      if(value!==null){
        console.log(JSON.parse(value));
      }
    } catch (e) {
      console.warn(e);
    }
  }

  const deleteTest = async() => {
    try{
      const value = await AsyncStorage.removeItem('USER_INFO');
    } catch (e) {
      console.warn(e)
    }
  }

  const reset = () => {
    TRAY=[];
    total_flour=0;
    setTargetFlour('');
    setTitle('');
    setPageReload(!pageReload)
  }

  const loadAssets = () => {
    setInputFromBR(flourStore.getState().totalFlour);
  }

  const onFinish = () => {}
  
  useEffect(() => {
    navigation.addListener('blur', () => reset());
  }, []);

  const [loaded] = Font.useFonts({
    'PoorStory': require('../../../assets/fonts/Delius-Regular.ttf'),
    'PoorStory': require('../../../assets/fonts/PoorStory-Regular.ttf'),
  });

  if(loaded){
  return (
    <Wrapper>
      <FlourContainer>
        <InputContainer>
        <InputFromBR>{`레시피 총 밀가루양:`}</InputFromBR>
        {/* <InputFromBR>{`${flourStore.getState().totalFlour} (g)`}</InputFromBR> */}
        <InputFromBR>{`${total_flour} (g)`}</InputFromBR>
        <InputFromBR />
        <InputFromBR>{`적용시킬 밀가루양:`}</InputFromBR>
        <TextInput
          placeholder = {`${total_flour}(g)`}
          label="input Flour"
          value={targetFlour}
          // defaultValue={(flourStore.getState().totalFlour).toString()}
          onChangeText={cur=>setTargetFlour(cur)}
          style={{
            width: WIDTH*0.5, 
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
            fontSize: 16,
            textAlign: 'center',
            marginTop: 10,
            fontFamily: 'PoorStory',
            fontSize: 12
          }}
          keyboardType={'numeric'}
        />
        </InputContainer>
        <TouchableOpacity onPress={apply}>
          <Apply>
          <ApplyText>적용하기</ApplyText>
          </Apply>
        </TouchableOpacity>
      </FlourContainer>
      
      <NameContainer>
        <TextInput 
          placeholder="레시피 이름"
          value={title}
          onChangeText={cur=>setTitle(cur)}
          style={{
            width: WIDTH*0.5, 
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
            fontSize: 12,
            textAlign: 'center',
            fontFamily: 'PoorStory'
          }}
        />
        <TouchableOpacity onPress={save}><SaveBtn>
        <SaveText>저장하기</SaveText>
        </SaveBtn></TouchableOpacity>
      </NameContainer>

      <IngredientContainer>
      <ScrollView>
        {
          TRAY.map(cur=>
            <>
            <IngredientWrapper>
            <Ingredient key={`${cur.inputName}${Date()}`} cur={cur}/>
            <Pressable  onPress={()=>deleteItem(cur.inputName)}>
              <AntDesign 
                name="delete" 
                size={18} 
                color="gray"
                style={{
              }}/>
            </Pressable>
            </IngredientWrapper>
          </>
          )
        }
        {/* store.getState().TRAY.map(cur=>
            <Ingredient key={`${cur.inputName}${Date()}`} cur={cur}/>
          ) */}
      </ScrollView>
      </IngredientContainer>
      <ButtomContainer>

        <TouchableOpacity onPress={deleteTest}><ResetBtn>
        <ResetText>초기화</ResetText>
        </ResetBtn></TouchableOpacity>

        <TouchableOpacity onPress={()=>add('flour')}><AddBtn>
        <AddText>밀가루 추가</AddText>
        </AddBtn></TouchableOpacity>

        <TouchableOpacity onPress={()=>add('igd')}><AddBtn>
        <AddText>재료 추가</AddText>
        </AddBtn></TouchableOpacity>

      </ButtomContainer>

      {/* ingredient modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <ModalWrapper>
        <ModalInputContainer>
        <TextInput 
          placeholder="재료"
          value={inputName}
          onChangeText={cur=>setInputName(cur)}
          style={{
            width: WIDTH*0.5,
            backgroundColor: "#fff",
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
            marginTop: 5,
            marginBottom: 5,
            textAlign: 'center',
            height: HEIGHT*0.07,
            fontFamily: 'PoorStory'
          }}
        />
        <TextInput 
          placeholder="(g)"
          value={inputGram}
          onChangeText={cur=>setInputGram(cur)}
          style={{
            width: WIDTH*0.5,
            backgroundColor: "#fff",
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
            marginTop: 5,
            marginBottom: 5,
            textAlign: 'center',
            height: HEIGHT*0.07,
            fontFamily: 'PoorStory'
          }}
          keyboardType={'numeric'}
        />
        </ModalInputContainer>

        <Pressable
            onPress={() => {
              // validity check: ingredient element identify based
              const res = store.getState().TRAY.filter(cur=>cur.inputName===inputName);
              console.log("res", res);
              
              // 이름 중복 확인
              if (res.length !== 0) {
                Alert.alert('이미 입력된 이름입니다.');
                setInputName('');
                setInputGram('');
                return;
              }
              // 무입력 확인
              if (inputName === '') return;
              if (inputGram === '') return;

              TRAY.push({
                "inputName":inputName, 
                "inputGram":inputGram,
                "percentage": 0,
                "flag": false,
                "flourInput": false,
                "targetGram": 0
              })

              store.dispatch({
                type:'addIgd',
                value:{
                  "inputName":inputName, 
                  "inputGram":inputGram,
                  "percentage": 0,
                  "flag": true,
                  "flourInput": false,
                  "targetGram": 0
                }
              })
              // setModalVisible(!modalVisible);
              setInputName('');
              setInputGram('');
              alert('재료가 추가되었습니다');
          }}
        ><ButtonContainer><ButtonText>재료 추가</ButtonText></ButtonContainer>
            </Pressable>
        <Blank />
          
          <Pressable
            onPress={
              ()=> setModalVisible(!modalVisible)
            }
          >
            <ButtonContainer><ButtonText>GO BACK</ButtonText></ButtonContainer>
        </Pressable>
        </ModalWrapper>
      </Modal>

      

      {/* flour modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={flourModalVisible}
      >
        <ModalWrapper>
        <ModalInputContainer>
        <TextInput 
          placeholder="밀가루 종류"
          value={inputName}
          onChangeText={ cur => {
            // validity of child name check
            setInputName(cur);
          }}
          style={{
            width: WIDTH*0.5,
            backgroundColor: "#fff",
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
            marginTop: 5,
            marginBottom: 5,
            textAlign: 'center',
            height: HEIGHT*0.07,
            fontFamily: 'PoorStory'
          }}
        />
        <TextInput 
          placeholder="(g)"
          value={inputGram}
          onChangeText={cur=>setInputGram(cur)}
          style={{
            width: WIDTH*0.5,
            backgroundColor: "#fff",
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
            marginTop: 5,
            marginBottom: 5,
            textAlign: 'center',
            height: HEIGHT*0.07,
            fontFamily: 'PoorStory'
          }}
          keyboardType={'numeric'}
        />
        </ModalInputContainer>

        <Pressable
            onPress={() => {
              
              // validity check: ingredient element identify based
              const res = TRAY.filter(cur=>cur.inputName===inputName)
              console.log(res)
              // const res = store.getState().TRAY.filter(cur=>cur.inputName===inputName);
              // console.log("res", res);
              if (res.length!==0) {
                alert('이미 있는 이름입니다.');
                setInputName('');
                setInputGram('');
                return;
              }

              // 아무것도 입력하지 않았다면 return
              if (inputName === '') return;
              if (inputGram === '') return;
              
              TRAY.push({
                "inputName":inputName, 
                "inputGram":inputGram,
                "percentage": 0,
                "flag": true,
                "flourInput": true,
                "targetGram": 0
              })
              store.dispatch({
                type:'addIgd',
                value:{
                "inputName":inputName, 
                "inputGram":inputGram,
                "percentage": 0,
                "flag": true,
                "targetGram": 0
              }
              })

              total_flour = parseInt(total_flour)+parseInt(inputGram)
              console.log("total flour is: ", total_flour)
              // flourStore.dispatch({
              //   type:'addFlour',
              //   value:{
              //     "flour":inputGram
              //   }
              // })
              
            // reset TextArea
            setInputName('');
            setInputGram('');
            setInputFromBR(total_flour);
            Alert.alert('밀가루가 추가되었습니다');
          }}
        ><ButtonContainer><ButtonText>밀가루 추가</ButtonText></ButtonContainer>
            </Pressable>
        <Blank />
          
          <Pressable
            onPress={
              ()=> setFlourModalVisible(!flourModalVisible)
            }
          >
            <ButtonContainer><ButtonText>뒤로가기</ButtonText></ButtonContainer>
        </Pressable>
        </ModalWrapper>
      </Modal>
      
      <Modal
        animationType="none"
        transparent={true}
        visible={IngedientAlertModalVisible}
      >
      <AlertModalWrapper>
      <Pressable
          onPress={
          ()=> setIngedientAlertModalVisible(!IngedientAlertModalVisible)
          }
      >
        <AlertModalTextContainer><Text>밀가루를 먼저 추가해주세요.</Text></AlertModalTextContainer>
      </Pressable>
      </AlertModalWrapper>
      </Modal>

      <Modal
        animationType="none"
        transparent={true}
        visible={nameAlertModalVisible}
      >
      <AlertModalWrapper>
      <Pressable
          onPress={
          ()=> setNameAlertModalVisible(!nameAlertModalVisible)
          }
      >
        <AlertModalTextContainer><Text>이름을 입력해주세요.</Text></AlertModalTextContainer>
      </Pressable>
      </AlertModalWrapper>
      </Modal>

      {/* alert modal 모듈화 */}
      {/* <ModalComponent cur={[true, "밀가루를 먼저 추가해주세요"]}/> */}

    </Wrapper>
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

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);