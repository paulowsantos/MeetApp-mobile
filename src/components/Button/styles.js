import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 46px;
  background: #e5556e;
  border-radius: 4px;

  align-items: center;
  justify-content: center;
`;

export const Text = styled.View`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
