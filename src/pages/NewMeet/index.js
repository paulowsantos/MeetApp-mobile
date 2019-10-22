import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../components/Background';

import { Container, Title } from './styles';

export default function NewMeet() {
  return (
    <Background>
      <Container>
        <Title>New Meetup</Title>
      </Container>
    </Background>
  );
}

NewMeet.navigationOptions = {
  tabBarLabel: 'New Meetup',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="add-circle-outline" size={20} color={tintColor} />
  ),
};
