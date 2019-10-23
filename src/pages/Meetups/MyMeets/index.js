import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

import Background from '../../../components/Background';
import api from '../../../services/api';

import { Container, MeetsList, Meet } from './styles';

export default function MyMeets() {
  const [myMeets, setMyMeets] = useState([]);

  useEffect(() => {
    async function loadMyMeets() {
      const response = await api.get('meetups');

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
              <Text>{item.title}</Text>
              <Text>{item.date}</Text>
              <Text>{item.localization}</Text>
            </Meet>
          )}
        />
      </Container>
    </Background>
  );
}

MyMeets.navigationOptions = {
  tabBarLabel: 'My Meetups',
};
