import React, { useRef, useState } from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

import Background from '../../components/Background';
import Header from '../../components/Header';

import { Container, Form, FormInput, SubmitButton, TextButton } from './styles';

export default function NewMeet() {
  const descRef = useRef();
  const dateRef = useRef();
  const locRef = useRef();

  const [title, setTitle] = useState('');
  const [desc, detDesc] = useState('');
  const [date, setDate] = useState('');
  const [local, setLocal] = useState('');

  const loading = false; // TODO

  function handleSubmit() {}

  return (
    <Background>
      <Container>
        <Form>
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
            returnKeyType="next"
            onSubmitEditing={() => dateRef.current.focus()}
            value={desc}
            onChangeText={detDesc}
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
