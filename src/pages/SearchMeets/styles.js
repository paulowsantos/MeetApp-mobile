import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  /* max-width: 600px; */
  /* margin: 50px auto; */
  /* display: flex; */
  flex-direction: column;
`;

export const Header = styled.View`
  flex-direction: row;
  align-self: center;
  align-items: center;
  margin-top: 20px;
`;

export const NavButton = styled.TouchableOpacity`
  border: 0;
`;

export const DateText = styled.Text`
  color: #fff;
  font-size: 24px;
  margin: 0 15px;
`;

export const MeetsList = styled.FlatList.attrs({
  showsVerticalScrollIndiccator: false,
  contentContainerStyle: { padding: 10 },
})`
  flex: 1;
`;

export const Meet = styled.View`
  flex-direction: column;
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
  background: #fff;

  opacity: ${props => (props.past ? 0.6 : 1)};
`;
