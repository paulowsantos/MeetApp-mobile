import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
`;

export const Header = styled.View`
  flex-direction: row;
  align-self: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
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
  /* padding: 10px; */
  border-radius: 4px;
  background: #fff;

  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Banner = styled.Image`
  align-self: center;
  max-width: 100%;
  height: 200px;
`;

export const Infos = styled.View`
  padding: 15px;
`;

export const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 5px;
`;

export const InfoInfo = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
`;

export const InfoText = styled.Text`
  font-size: 14px;
  margin-left: 5px;
  color: #999;
`;

export const RegisterButton = styled(RectButton)`
  background: #f64c75;
  margin: 10px;
  margin-top: 0;
  height: 46px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const TextButton = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
