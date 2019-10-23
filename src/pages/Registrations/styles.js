import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
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
