import React, { useState, useMemo, useEffect } from 'react';
import { Text } from 'react-native';
import { format, subDays, addDays } from 'date-fns';
import ca from 'date-fns/locale/en-CA';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../../components/Background';
import api from '../../../services/api';

import {
  Container,
  Header,
  NavButton,
  DateText,
  MeetsList,
  Meet,
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
              <Text>{item.title}</Text>
              <Text>{item.date}</Text>
              <Text>{item.localization}</Text>
              <Text>{item.User.name}</Text>
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
