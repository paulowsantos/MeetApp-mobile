import React, { useRef, useState, useEffect } from 'react';
import { Text, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import api from '../../services/api';
import Background from '../../components/Background';
import Header from '../../components/Header';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  TextButton,
  BannerInput,
  BannerContent,
} from './styles';

export default function NewMeet() {
  const descRef = useRef();
  const dateRef = useRef();
  const locRef = useRef();

  const [title, setTitle] = useState('');
  const [desc, detDesc] = useState('');
  const [date, setDate] = useState('');
  const [local, setLocal] = useState('');
  const [bannerId, setBannerId] = useState();
  const [bannerImg, setBannerImg] = useState();

  const loading = false; // TODO

  useEffect(() => {
    async function getPermission() {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    }

    getPermission();
  }, []);

  function handleSubmit() {}

  async function handleBanner() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [16, 9],
    });

    if (!result.cancelled) {
      console.tron.log(result);
      setBannerImg(result.uri);

      const data = new FormData();
      console.tron.log(data);

      data.append('file', {
        originalname: 'teste.svg',
        filename: Constants.platform.ios
          ? result.uri.replace('file://', '')
          : result.uri,
      });

      console.tron.log(data);

      const response = await api.post('files', data);

      const { id } = response.data;

      setBannerId(id);
    }
  }

  return (
    <Background>
      <Container>
        <Form>
          <BannerInput onPress={handleBanner}>
            {bannerImg ? (
              <Image
                style={{ flex: 1 }}
                source={{
                  uri: bannerImg,
                }}
              />
            ) : (
              <BannerContent>
                <Icon
                  name="camera-alt"
                  size={30}
                  color="rgba(255, 255, 255, 0.6)"
                />
                <Text
                  style={{ fontSize: 15, color: 'rgba(255, 255, 255, 0.6)' }}
                >
                  Select Image
                </Text>
              </BannerContent>
            )}
          </BannerInput>
          <FormInput
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Meetup Title"
            returnKeyType="next"
            onSubmitEditing={() => descRef.current.focus()}
            value={title}
            onChangeText={setTitle}
          />

          <FormInput
            placeholder="Description"
            ref={descRef}
            value={desc}
            onChangeText={detDesc}
            multiline
            enablesReturnKeyAutomatically
            style={{
              height: 120,
              textAlignVertical: 'top',
              alignItems: 'top',
              paddingTop: 10,
            }}
          />

          <FormInput
            placeholder="Meetup Date"
            ref={dateRef}
            returnKeyType="next"
            onSubmitEditing={() => locRef.current.focus()}
            value={date}
            onChangeText={setDate}
          />

          <FormInput
            placeholder="Location"
            ref={locRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={local}
            onChangeText={setLocal}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            <TextButton>Save</TextButton>
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}

NewMeet.navigationOptions = {
  headerTitle: <Header />,
};
