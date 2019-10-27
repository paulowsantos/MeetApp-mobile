import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import Input from '../../components/Input';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
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

export const BannerInput = styled.TouchableOpacity`
  width: 100%;
  height: 200px;
  align-self: center;
  margin-bottom: 20px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

export const BannerContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
`;

export const DateInput = styled.TouchableOpacity`
  width: 100%;
  height: 46px;
  align-self: center;
  margin-bottom: 10px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  padding: 0 15px;
  /* flex-direction: row;
  align-items: center; */
`;

export const FakeDateInput = styled.TouchableOpacity`
  display: ${props => (props.vis ? 'flex' : 'none')};
  padding: 0 15px;
  height: 46px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  font-size: 15px;
  margin-bottom: 10px;
  color: #fff;
`;

export const DatePickerContainer = styled.View`
  display: ${props => (props.vis ? 'flex' : 'none')};
`;

export const OkButton = styled.TouchableOpacity`
  padding: 0 15px;
  height: 46px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  font-size: 15px;
  margin-bottom: 10px;
`;

export const OkButtonText = styled.Text`
  font-size: 15px;
  color: ${props => (props.colorText ? '#FFF' : 'rgba(255, 255, 255, 0.6)')};
  margin-left: 10px;
`;
