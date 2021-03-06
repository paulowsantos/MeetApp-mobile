import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import logo from '../../assets/M.png';

import Background from '../../components/Background';
import { signUpRequest } from '../../store/modules/auth/actions';
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  TextButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const loading = useSelector(state => state.auth.loading);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    dispatch(signUpRequest(name, email, password));
    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <Background>
      <Container>
        <Image source={logo} style={{ height: 80, width: 80 }} />

        <Form>
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
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Password"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            <TextButton>{loading ? 'Loading...' : 'Sign Up'}</TextButton>
          </SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Already a member</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.object.isRequired,
};
