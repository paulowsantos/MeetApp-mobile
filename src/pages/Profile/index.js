import React, { useRef, useState, useEffect } from 'react';
import { Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import Background from '../../components/Background';
// import api from '../../services/api';
import Header from '../../components/Header';
import avatar from '../../assets/avatar.jpg';
import { updateProfileRequest } from '../../store/modules/user/actions';
import { signOut } from '../../store/modules/auth/actions';
import {
  Container,
  Form,
  FormInput,
  Separator,
  SubmitButton,
  LogoutButton,
  TextButton,
  AvatarInput,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const emailRef = useRef();
  const passwordRef = useRef();
  const oldPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarimg, setAvatarimg] = useState(
    profile.avatar && profile.avatar.url
  );
  // const [avatar_id, setAvatarid] = useState('');

  useEffect(() => {
    async function getPermission() {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          Alert.alert(
            'Error.',
            'Sorry, we need camera roll permissions to make this work!'
          );
        }
      }
    }

    getPermission();
  }, []);

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        // avatar_id,
        oldPassword,
        password,
        confirmPassword,
      })
    );
  }

  function handleLogout() {
    dispatch(signOut());
  }

  async function handleAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setAvatarimg(result.uri);

      const data = new FormData();

      data.append('file', {
        originalname: 'teste.svg',
        filename: Constants.platform.ios
          ? result.uri.replace('file://', '')
          : result.uri,
      });

      // const response = await api.post('files', data);

      // const { id } = response.data;

      // setAvatarid(id);
    }
  }

  return (
    <Background>
      <Container>
        <Form>
          <AvatarInput onPress={handleAvatar}>
            <Image
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                borderWidth: 5,
                borderColor: '#999',
              }}
              source={
                avatarimg
                  ? {
                      uri: avatarimg,
                    }
                  : avatar
              }
            />
          </AvatarInput>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Full name"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />

          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Email"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={handleSubmit}
            value={email}
            onChangeText={setEmail}
          />

          <Separator />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Password"
            ref={oldPasswordRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="New password"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            value={password}
            onChangeText={setPassword}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Confirm new password"
            ref={confirmPasswordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <SubmitButton onPress={handleSubmit}>
            <TextButton>Save</TextButton>
          </SubmitButton>
          <LogoutButton onPress={handleLogout}>
            <TextButton>Log out</TextButton>
          </LogoutButton>
        </Form>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  headerTitle: <Header />,
};
