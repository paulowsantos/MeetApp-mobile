import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import defaultBanner from '../../../assets/Bitmap.png';
import Background from '../../../components/Background';
import api from '../../../services/api';

import {
  Container,
  MeetsList,
  Meet,
  Banner,
  Infos,
  Title,
  InfoInfo,
  InfoText,
  CancelButton,
  TextButton,
} from './styles';

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
              <Banner
                source={item.banner ? { uri: item.banner.url } : defaultBanner}
              />
              <Infos>
                <Title>{item.title}</Title>
                <InfoInfo>
                  <Icon name="event" size={15} color="#999" />
                  <InfoText>{item.date}</InfoText>
                </InfoInfo>
                <InfoInfo>
                  <Icon name="location-on" size={15} color="#999" />
                  <InfoText>{item.localization}</InfoText>
                </InfoInfo>
              </Infos>
              <CancelButton>
                <TextButton>Cancel</TextButton>
              </CancelButton>
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
