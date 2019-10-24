import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import defaultBanner from '../../assets/Bitmap.png';
import Background from '../../components/Background';
import Header from '../../components/Header';
import api from '../../services/api';

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

export default function Registrations() {
  const [myMeets, setMyMeets] = useState([]);

  async function loadMyMeets() {
    const response = await api.get('searchmymeets');

    setMyMeets(response.data);
  }

  useEffect(() => {
    loadMyMeets();
  }, [myMeets]);

  async function handleCancel(id) {
    try {
      const meet = { id };

      await api.delete('/enroll', { data: meet });

      Alert.alert('Success', 'Registration canceld.');
    } catch (err) {
      Alert.alert('Error.', 'Fail.');
    }
  }

  return (
    <Background>
      <Container>
        <MeetsList
          data={myMeets}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meet past={item.past}>
              <Banner
                source={
                  item.Meetup.banner
                    ? { uri: item.Meetup.banner.url }
                    : defaultBanner
                }
              />
              <Infos>
                <Title>{item.Meetup.title}</Title>
                <InfoInfo>
                  <Icon name="event" size={15} color="#999" />
                  <InfoText>{item.Meetup.date}</InfoText>
                </InfoInfo>
                <InfoInfo>
                  <Icon name="location-on" size={15} color="#999" />
                  <InfoText>{item.Meetup.localization}</InfoText>
                </InfoInfo>
                <InfoInfo>
                  <Icon name="person" size={15} color="#999" />
                  <InfoText>Organizer: {item.Meetup.User.name}</InfoText>
                </InfoInfo>
              </Infos>
              <CancelButton onPress={() => handleCancel(item.id)}>
                <TextButton>Cancel Registration</TextButton>
              </CancelButton>
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
