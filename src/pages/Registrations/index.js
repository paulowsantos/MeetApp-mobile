import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../components/Background';
import Header from '../../components/Header';
import api from '../../services/api';

import { Container, MeetsList, Meet } from './styles';

export default function Registrations() {
  const [myMeets, setMyMeets] = useState([]);

  useEffect(() => {
    async function loadMyMeets() {
      const response = await api.get('searchmymeets');

      setMyMeets(response.data);
    }

    loadMyMeets();
  }, []);

  return (
    <Background>
      <Container>
        <MeetsList
          data={myMeets}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meet past={item.past}>
              <Text>{item.Meetup.title}</Text>
              <Text>{item.Meetup.date}</Text>
              <Text>{item.Meetup.localization}</Text>
              <Text>{item.Meetup.User.name}</Text>
            </Meet>
          )}
        />
      </Container>
    </Background>
  );
}

Registrations.navigationOptions = {
  headerTitle: <Header />,
};
