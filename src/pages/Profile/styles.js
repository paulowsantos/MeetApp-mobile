import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import Input from '../../components/Input';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(RectButton)`
  background: #f64c75;
  margin-top: 5px;
  height: 46px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const LogoutButton = styled(RectButton)`
  background: #f64c75;
  margin-top: 10px;
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

export const AvatarInput = styled.TouchableOpacity`
  align-self: center;
  margin-bottom: 30px;
  /* height: 150px;
  /* width: 150px; */
  /* border-radius: 75px; */
  /* background: #eee; */
`;
