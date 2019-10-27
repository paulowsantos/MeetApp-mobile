import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO, format } from 'date-fns';
import ca from 'date-fns/locale/en-CA';
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
  Loading,
} from './styles';

export default function MyMeets() {
  const dispatch = useDispatch();
  const changedMeet = useSelector(state => state.meet.meetchanged);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [myMeets, setMyMeets] = useState([]);

  async function loadMyMeets(pg = page) {
    if (totalPages && pg > totalPages) return;

    setLoading(true);

    const response = await api.get('meetups', {
      params: { page: pg },
    });

    setTotalPages(Math.ceil(response.data.count / 10));

    if (myMeets.length === 0) {
      console.tron.log(totalPages);
      setMyMeets(response.data.rows);
    } else {
      console.tron.log(totalPages);
      setMyMeets([...myMeets, ...response.data.rows]);
    }
    setPage(pg + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadMyMeets();
  }, [changedMeet]); //eslint-disable-line

  function FormatDate(date) {
    const newDate = parseISO(date);
    return format(newDate, "MMM do '-' hh:mma", { locale: ca });
  }

  async function handleCancel(id) {
    try {
      const meet = { id };

      await api.delete('/meetups', { data: meet });

      dispatch(changeMeet());

      Alert.alert('Success', 'Meetup canceld.');
    } catch (err) {
      Alert.alert('Error.', "You can't delete this meetup.");
    }
  }

  return (
    <Background>
      <Container>
        <MeetsList
          data={myMeets}
          keyExtractor={item => String(item.id)}
          onEndReached={() => loadMyMeets()}
          onEndReachedThreshold={0.1}
          ListFooterComponent={loading && <Loading />}
          renderItem={({ item }) => (
            <Meet past={item.past}>
              <Banner
                source={item.banner ? { uri: item.banner.url } : defaultBanner}
              />
              <Infos>
                <Title>{item.title}</Title>
                <InfoInfo>
                  <Icon name="event" size={15} color="#999" />
                  <InfoText>{FormatDate(item.date)}</InfoText>
                </InfoInfo>
                <InfoInfo>
                  <Icon name="location-on" size={15} color="#999" />
                  <InfoText>{item.localization}</InfoText>
                </InfoInfo>
              </Infos>
              <CancelButton
                onPress={() => handleCancel(item.id)}
                enabled={!item.past}
              >
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
