import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions, ScrollView, TextInput, Image, Alert, Modal, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { ConfirmDialog } from 'react-native-simple-dialogs';

import * as ImagePicker from 'expo-image-picker';

import { connect } from 'react-redux';
import { store, flourStore } from '../../../Redux/Store';
import Clipboard from 'expo-clipboard';

import { 
  uploadImageAsync, 
  updatePrivateRecipe, 
  deletePrivateRecipe 
} from '../../../apis';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Wrapper = styled.View``;
const LoadingWrapper = styled.View`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const RecipeTitle = styled.Text`
  font-size: 18px;
  font-family: 'PoorStory';
  height: 30px;
`;
const Text = styled.Text`
  font-size: 13px;
  color: gray;
  font-family: 'PoorStory';
`;
const NameText = styled.Text`
  font-size: 13px;
  color: gray;
  font-family: 'PoorStory';
  width: ${WIDTH*0.4}px;
`;
const GramText = styled.Text`
  font-size: 13px;
  color: gray;
  font-family: 'PoorStory';
  width: ${WIDTH*0.2}px;
`;
const PerText = styled.Text`
  font-size: 13px;
  color: gray;
  font-family: 'PoorStory';
  width: ${WIDTH*0.2}px;
`;
const Container = styled.View`
  margin: 10px;
  border-bottom-color: lightgray;
  border-bottom-width: 0.6px;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 10px;
`;
const TitleContainer = styled.View`
  width: ${WIDTH*0.9}px;
  padding: 10px;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
  border-bottom-color: lightgray;
  border-bottom-width: 2px;
  border-top-color: lightgray;
  border-top-width: 2px;
`;
const Title = styled.Text`
  font-size: 28px;
  font-family: 'PoorStory';
  margin: auto;
`;
const TextContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: ${WIDTH*0.9}px;
  margin: 3px;
  margin-top:10px;
`;
const ImageContainer = styled.View`
  margin: auto;
`;
const ReviewContainer = styled.View`
  margin: auto;
`;
const RecipeContainer = styled.View`
  margin: auto;
`;
const ButtonContainer = styled.View`
  margin: 30px;
`;

const RateEmo = styled.Text`
  font-size: 14px;
  font-family: 'PoorStory';
  margin: auto;
  color: gray;
`;

const Star = styled.Text`'
  margin: 10px;
  font-size: 28px;
  font-family: 'PoorStory';
`;
const StarContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin: auto;
`;
const ImageButtonContainer = styled.View`
  width: ${WIDTH}px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 10px;
`;
const ImageButtonView = styled.View`
  /* background-color: #2288DD; */
  width: ${WIDTH * 0.25}px;
  height: ${WIDTH * 0.4 * 0.4}px;
  justify-content: center;
  border-radius: 10px;
  border: 0.5px gray solid;
`;
const ImageButtonText = styled.Text`
  text-align: center;
  font-family: 'PoorStory';
`;
const DelImageButtonText = styled.Text`
  text-align: center;
  color: tomato;
  font-family: 'PoorStory';
`;
const CalButtonView = styled.View`
  width: ${WIDTH * 0.8}px;
  height: ${WIDTH * 0.8 * 0.25}px;
  justify-content: center;
  border-radius: 10px;
  border: 0.5px gray solid;
  margin: auto;
  margin-bottom: 5px;
`;
const DelButtonView = styled.View`
  width: ${WIDTH * 0.8}px;
  height: ${WIDTH * 0.8 * 0.25}px;
  justify-content: center;
  border-radius: 10px;
  border: 0.5px gray solid;
  margin: auto;
  margin-bottom: 5px;
  border-color: tomato;
`;
const FlourText = styled.Text`
  color: lightgray;
  font-family: 'PoorStory'
`;
const SnapContainer = styled.View`
  width: 300px;
  height: 200px;
  padding-top: 150px;
`;
const DetailedContainer = styled.View`
  border-radius: 1px;
  border: 1px lightgray dashed;
  margin: 10px;
  margin-top: 30px;
  margin-bottom: 30px;
  padding-top: 30px;
  padding-bottom: 30px;
`;
const DialogContainer = styled.View`
  width: ${WIDTH * 0.7}px;
  height: ${WIDTH * 0.7 * 0.5}px;
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


const detailed = (
  {
    dispatch,
    navigation,
    route:{
      params: {currentRecipe}
    }
  }
) => {

  // console.log("cur in private detailed: ",currentRecipe);
  // set temp user_id
  const USER_ID = 2;
  // const key = data[0];
  // const TRAY = JSON.parse(data[1])['TRAY'];
  const fixedTRAY = [];
  // const flourObject = TRAY.filter(cur => cur.inputName === 'flour');
  // fixedTRAY.push(flourObject[0]);
  // TRAY.map(cur => (cur.inputName !== 'flour') ? fixedTRAY.push(cur): '');

  const [localList, setLocalList] = useState();
  const [update, setUpdate] = useState(false);
  const [imgUri, setImgUri] = useState(currentRecipe.IMAGE);
  const [value, onChangeText] = useState(currentRecipe.REVIEW); //review
  const [rate, setRate] = useState(currentRecipe.RATING);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [changed, setChanged] = useState(true);
  let camera;
  const [base64, setBase64] = useState('');
  const [photoInfo, setPhotoInfo] = useState({
    imgUri:'https://i.stack.imgur.com/y9DpT.jpg',
    base64: ''
  })
  const [modal, setModal] = useState(false);

  const Navigation = useNavigation();

  const handleCal = async () => {
    Navigation.navigate("GoToCalculator",{cur:currentRecipe});
  }
  const createTwoButtonAlert = () =>
    Alert.alert(
      "",
      "삭제하시겠습니까?",
      [
        {
          text: "취소",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "삭제", onPress: async () => {
            setChanged(false);
            try{
              await deletePrivateRecipe({
                "RECIPE_ID": currentRecipe.RECIPE_ID,
                "USER_ID": currentRecipe.USER_ID
              });
            }
            catch (e) {
              console.warn(e);
            }
            Alert.alert('삭제되었습니다.');
            Navigation.goBack();
        } }
      ],
    { cancelable: false }
    );
  
  const createConfirmAlert = () =>
    Alert.alert(
      "",
      "저장되었습니다 💾",
      [
        {
          text: "확인",
          onPress: () => console.log("successfully updated"),
          // style: "cancel"
        },
      ],
    { cancelable: false }
  );
  
  const handleDelete = async(key) => {
    try {
      createTwoButtonAlert()
    } catch (e) {
      console.log("error in deleting items: ", e);
    }
  }

  // error : item update error
  const updateList = async () => {

    setModal(true);
    // send image to S3 && get location link
    let location=''
    if(base64){
      // return image URL from S3
      location = await uploadImageAsync(base64);
    } else {
      location = imgUri
    }

    console.log("location: ", location);
    
    try{
      await updatePrivateRecipe({
        "RECIPE_ID": currentRecipe.RECIPE_ID,
        "USER_ID": currentRecipe.USER_ID,
        "IMAGE": location, // update IMAGE
        "PUBLIC": currentRecipe.PUBLIC,
        "RATING": rate, //update RATING
        "REVIEW": value, // update REVIEW
        "TITLE": currentRecipe.TITLE,
        "TRAY": currentRecipe.TRAY,
        "TOTAL_FLOUR":currentRecipe.TOTAL_FLOUR,
        "AUTHOR": currentRecipe.AUTHOR,
        "LIKES": currentRecipe.LIKES,
      });
    }
    catch (e) {
      console.warn(e);
    }
    // try{
    //   let item = await AsyncStorage.getItem(key)
    //   item = JSON.parse(item);
    //   item.image = imgUri;
    //   item.rating = rate;
    //   item.review = value;
    //   console.log("item: ", item);

    //   await AsyncStorage.setItem(key,JSON.stringify(item))
    //     .then((res)=>console.log('successfully updated', res))
    //     .catch(()=>'error in saving')
    //     // alert('저장되었습니다. 💾')
    //     createConfirmAlert()
    //     setChanged(false);
    // }
    // catch(e){
    //   console.log(e);
    // }
    setModal(false);
    setChanged(false)
    Alert.alert('저장되었습니다.')
  }

    const handleUpdate = async (key) => {
    try{
        setChanged(false);
    }
    catch(e){
      console.log(e);
    }
  }
  
  const [loaded] = Font.useFonts({
      'PoorStory': require('../../../assets/fonts/DelaGothicOne-Regular.ttf'),
      'PoorStory': require('../../../assets/fonts/PoorStory-Regular.ttf'),
  });
  
  const loadAssets = async () => {
    // let item = await AsyncStorage.getItem(key);
    // console.log("item in load Assets: ", item);
    // item = JSON.parse(item);
    // if(item.image!==undefined)  setImgUri(item.image);
    // if(item.rating!==undefined) setRate(item.rating);
    // if (item.review !== undefined) onChangeText(item.review);
  }
  const onFinish = () => {
    setUpdate(true);
  }

  const handleCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    console.log("status: ", status);
    if (status === 'granted') {
      try {
      const options = { quality: 0.5, base64: true };
      let photo = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true
        })
        console.log("image: ", photo.base64);
        setImgUri(photo.uri);
        setBase64(photo.base64)
      } catch (error) {
        console.log("error in handle camera", error)
      }
    } else {
      console.log("not granted")
    }
  }

  const handleAlbum = async() => {
    // Picker -> get and render image -> save it in localstorage
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true
        });

        console.log("result base64 from album: ", result.base64);
        setImgUri(result.uri);
        setBase64(result.base64);
      } catch (error) {
      console.log("error in handle album", error)
      }
    } else {
      console.log("not granted")
    }
  }

  const resetImage = () => {
    setImgUri("https://i.stack.imgur.com/y9DpT.jpg");
  }

  const copyToClipboard = (data) => {
    const title = data[0];
    let TRAY = JSON.parse(data[1]).TRAY;
    console.log("data in personal index: ", data);
    let recipe = `${title} \n\n`;
    let flourRecipe=[];
    let restRecipe=[];
    TRAY.map(cur => {
      if (cur.inputName === 'flour') {
        flourRecipe.push(cur);
      }
      else restRecipe.push(cur);
    })
    recipe += `${flourRecipe[0].inputName}: ${flourRecipe[0].inputGram} (${flourRecipe[0].percentage} %)\n`;
    restRecipe.map(cur=>{
      recipe += `${cur.inputName}: ${cur.inputGram} (${cur.percentage} %)\n`
    })
    // console.log(recipe);
    Clipboard.setString(recipe);
    Alert.alert(`[${title}]이 복사되었습니다. 🍪`)
  };

  useEffect(() => {
  }, [rate]);

  React.useEffect(
    () =>
      Navigation.addListener('beforeRemove', (e) => {
        if (!changed) {
          return;
        }

        e.preventDefault();
        // Alert.alert('뒤로 가기 전에 저장해주세요. (다시 한 번 뒤로가기를 누르면 저장 없이 나갈 수 있습니다.)')
        Alert.alert(
          '',
        '뒤로 가기 전에 저장해주세요.\n\n(다시 한 번 뒤로가기를 누르면 저장 없이 나갈 수 있습니다.)',
          [
            {
              // text: '확인',
              // style: 'destructive',
              // onPress: () => handleUpdate(true),
              onPress: () => setChanged(false)
            },
          ]
        );
      }),
    [Navigation, changed]
  );

  if (loaded) {
    return (
      <ScrollView>
      <Wrapper>
          <TitleContainer><Title>{currentRecipe.TITLE}</Title></TitleContainer>


          {/* Picture */}
          <ImageContainer>
            <Image
              source={{ uri: imgUri }}
              style={{ width: WIDTH * 0.9, height: WIDTH * 0.9 * 0.8 }}
              />
          </ImageContainer>

          <ImageButtonContainer>
              
              <TouchableOpacity onPress={handleCamera}>
              <ImageButtonView><ImageButtonText>카메라</ImageButtonText></ImageButtonView>
              </TouchableOpacity>
            
              <TouchableOpacity onPress={handleAlbum}>
              <ImageButtonView><ImageButtonText>앨범</ImageButtonText></ImageButtonView>
              </TouchableOpacity>
            
              <TouchableOpacity onPress={resetImage}>
              <ImageButtonView><ImageButtonText>초기화</ImageButtonText></ImageButtonView>
              </TouchableOpacity>
          </ImageButtonContainer>
          
          <DetailedContainer>


          
            {/* Recipe */}
            <RateEmo>{`[ 레시피 ]`}</RateEmo>
          <TouchableOpacity
            onLongPress={() => copyToClipboard(currentRecipe.TRAY)}
          >
          <RecipeContainer>
            {
              currentRecipe.TRAY.map((cur, index) => (
                <TextContainer
                  key={index}
                >
                  <NameText>{cur.inputName} </NameText>
                    <GramText>{cur.inputGram}(g)  </GramText>
                    <PerText>{cur.percentage}(%)</PerText>
                </TextContainer>
              ))
            }
          </RecipeContainer>
          </TouchableOpacity>
            
            <FlourText>* flour: 밀가루 총량</FlourText>
            <FlourText>* 길게 누르면 레시피 내용이 복사됩니다. </FlourText>
          
          
          {/* Review */}
          <ReviewContainer>
            <ButtonContainer>
            <RateEmo>{`[ 점수: ${rate}/5 ]`}</RateEmo>
              <StarContainer>
              <TouchableOpacity
                onPress={()=>setRate('1')}
                ><Star>❤ </Star>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>setRate('2')}
              >{
                  rate >= '2'
                  ? <Star>❤ </Star>
                  : <Star>🖤 </Star>
                }
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>setRate('3')}
              >{
                  rate >= '3'
                  ? <Star>❤ </Star>
                  : <Star>🖤 </Star>
                }
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>setRate('4')}
              >{
                  rate >= '4'
                  ? <Star>❤ </Star>
                  : <Star>🖤 </Star>
                }
              </TouchableOpacity>
                            <TouchableOpacity
                onPress={()=>setRate('5')}
              >{
                  rate >= '5'
                  ? <Star>❤ </Star>
                  : <Star>🖤 </Star>
                }
              </TouchableOpacity>
              </StarContainer>
            </ButtonContainer>
            <RateEmo>[ 상세설명 ]</RateEmo>
          <TextInput
            style={{
              height: 180,
              width: WIDTH*0.9,
              borderColor: 'gray',
              borderWidth: 0.2,
              marginBottom: 10,
              borderColor: 'lightgray',
              fontFamily: 'PoorStory',
              textAlign: 'center'
              }}
            placeholder="자세한 설명을 입력해주세요"
            onChangeText={text => onChangeText(text)}
            value={value}
            multiline
            />
          </ReviewContainer>
          </DetailedContainer>

          {/* Save,Back Btn */}
          <TouchableOpacity onPress={handleCal}>
            <CalButtonView><ImageButtonText>계산기로 이동하기</ImageButtonText></CalButtonView>
          </TouchableOpacity>
          <TouchableOpacity onPress={updateList}>
            <CalButtonView><ImageButtonText>저장하기</ImageButtonText></CalButtonView>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(currentRecipe.RECIPE_ID)}>
            <DelButtonView><DelImageButtonText>삭제하기</DelImageButtonText></DelButtonView>
          </TouchableOpacity>

          {/* dialog popup */}
          {/* <ConfirmDialog
            title="Confirm Dialog"
            message="Do you want to SAVE?"
            visible={dialogVisible}
            onTouchOutside={() => setDialogVisible(false)}
            positiveButton={{
              title: "YES",
              onPress: () => {
                updateList(currentRecipe.RECIPE_ID);
                Navigation.goBack();
              }
            }}
            negativeButton={{
              title: "NO",
              onPress: () => Navigation.goBack()
            }}
          /> */}

      <Modal
        animationType="none"
        transparent={true}
        visible={modal}
      >
      <AlertModalWrapper>
        <AlertModalTextContainer><Text>저장중...</Text></AlertModalTextContainer>
      </AlertModalWrapper>
      </Modal>

      </Wrapper>
      </ScrollView>
    )
  } else {
    return (
      <LoadingWrapper>
      <ActivityIndicator color="#BB6767" size="large" />
      </LoadingWrapper>
    )
  }
}

const mapStateToProps = ( state ) => {
  return ({ state : state });
};
const mapDispatchToProps = ( dispatch ) => {
  return ({ dispatch: dispatch });
};

// export default detailed;
export default connect(mapStateToProps, mapDispatchToProps)(detailed);