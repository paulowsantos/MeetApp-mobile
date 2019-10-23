import React, { useState, useMemo, useEffect } from 'react';
import { Text } from 'react-native';
import { format, subDays, addDays } from 'date-fns';
import ca from 'date-fns/locale/en-CA';
import Icon from 'react-native-vector-icons/MaterialIcons';

import defaultBanner from '../../../assets/Bitmap.png';
import Background from '../../../components/Background';
import api from '../../../services/api';

import {
  Container,
  Header,
  NavButton,
  DateText,
  MeetsList,
  Meet,
  Banner,
  Infos,
  Title,
  InfoInfo,
  InfoText,
  RegisterButton,
  TextButton,
} from './styles';

export default function SearchMeets() {
  const [meets, setMeets] = useState([]);
  const [dateT, setDate] = useState(new Date());

  const dateFormatted = useMemo(() => format(dateT, 'MMM do', { locale: ca }), [
    dateT,
  ]);

  const dateParam = String(
    `${dateT.getUTCFullYear()}-${dateT.getUTCMonth() + 1}-${
      dateT.getUTCDate() < 10 ? `0${dateT.getUTCDate()}` : dateT.getUTCDate()
    }`
  );

  useEffect(() => {
    async function loadMeets() {
      const response = await api.get('search', {
        params: { date: dateParam },
      });

      setMeets(response.data);
    }

    loadMeets();
  }, [dateParam]);

  function handlePrevDay() {
    setDate(subDays(dateT, 1));
  }

  function handleNextDay() {
    setDate(addDays(dateT, 1));
  }

  return (
    <Background>
      <Container>
        <Header>
          <NavButton onPress={handlePrevDay}>
            <Icon name="chevron-left" size={36} color="#FFF" />
          </NavButton>
          <DateText>{dateFormatted}</DateText>
          <NavButton onPress={handleNextDay}>
            <Icon name="chevron-right" size={36} color="#FFF" />
          </NavButton>
        </Header>

        <MeetsList
          data={meets}
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
                <InfoInfo>
                  <Icon name="person" size={15} color="#999" />
                  <InfoText>Organizer: {item.User.name}</InfoText>
                </InfoInfo>
              </Infos>
              <RegisterButton>
                <TextButton>Register</TextButton>
              </RegisterButton>
            </Meet>
          )}
        />
      </Container>
    </Background>
  );
}

SearchMeets.navigationOptions = {
  tabBarLabel: 'Meetups',
};
