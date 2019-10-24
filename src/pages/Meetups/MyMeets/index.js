import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import defaultBanner from '../../../assets/Bitmap.png';
import Background from '../../../components/Background';
import api from '../../../services/api';
import { changeMeet } from '../../../store/modules/meet/actions';

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
  const dispatch = useDispatch();
  const changedMeet = useSelector(state => state.meet.meetchanged);

  const [myMeets, setMyMeets] = useState([]);

  async function loadMyMeets() {
    const response = await api.get('meetups');

    setMyMeets(response.data);
  }

  useEffect(() => {
    loadMyMeets();
  }, [changedMeet]);

  async function handleCancel(id) {
    try {
      const meet = { id };

      await api.delete('/meetups', { data: meet });

      dispatch(changeMeet());

      Alert.alert('Success', 'Meetup canceld.');
    } catch (err) {
      Alert.alert('Error.', 'Meetup does not exists.');
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
              <CancelButton onPress={() => handleCancel(item.id)}>
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
