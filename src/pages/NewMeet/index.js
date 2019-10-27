import React, { useRef, useState, useEffect } from 'react';
import { Text, Image, Alert, DatePickerIOS } from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import ca from 'date-fns/locale/en-CA';

import api from '../../services/api';
import Background from '../../components/Background';
import Header from '../../components/Header';
import { changeMeet } from '../../store/modules/meet/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  TextButton,
  BannerInput,
  BannerContent,
  FakeDateInput,
  DatePickerContainer,
  OkButton,
  OkButtonText,
} from './styles';

export default function NewMeet() {
  const dispatch = useDispatch();

  const descRef = useRef();
  const locRef = useRef();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState(new Date());
  const [local, setLocal] = useState('');
  // const [bannerId, setBannerId] = useState();
  const [bannerImg, setBannerImg] = useState();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const loading = false; // TODO

  useEffect(() => {
    async function getPermission() {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          Alert.alert(
            'Warn',
            'Sorry, we need camera roll permissions to make this work!'
          );
        }
      }
    }

    getPermission();
  }, []);

  function FormatDate(dateF) {
    return format(dateF, "MMM do '-' hh:mma", { locale: ca });
  }

  async function handleSubmit() {
    try {
      const fmtDate = format(date, "yyyy'-'MM'-'dd'T'HH:mm:ss'-08:00'", {
        locale: ca,
      });

      const meet = {
        title,
        description: desc,
        localization: local,
        date: fmtDate,
      };

      await api.post('/meetups', meet);

      dispatch(changeMeet());

      Alert.alert('Success!', 'Meetup successfuly created.');

      setTitle('');
      setDesc('');
      setDate(new Date());
      setLocal('');
      setIsDatePickerVisible(false);
    } catch (err) {
      Alert.alert('Error', 'Check your input data.');
    }
  }

  async function handleBanner() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

      // const response = await api.post('files', data);

      // const { id } = response.data;

      // setBannerId(id);
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
            onChangeText={setDesc}
            multiline
            enablesReturnKeyAutomatically
            style={{
              height: 120,
              textAlignVertical: 'top',
              alignItems: 'top',
              paddingTop: 10,
            }}
          />

          <FakeDateInput
            vis={!isDatePickerVisible}
            onPress={() => setIsDatePickerVisible(!isDatePickerVisible)}
          >
            <OkButtonText colorText={!!date}>
              {date && FormatDate(date)}
            </OkButtonText>
          </FakeDateInput>

          <DatePickerContainer vis={isDatePickerVisible}>
            <DatePickerIOS
              date={date}
              onDateChange={dt => setDate(dt)}
              minuteInterval={10}
              minimumDate={new Date()}
            />
            <OkButton
              onPress={() => setIsDatePickerVisible(!isDatePickerVisible)}
            >
              <OkButtonText colorText={!!date}>
                Confirm Date: {date && FormatDate(date)}
              </OkButtonText>
            </OkButton>
          </DatePickerContainer>

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
