import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '../../../services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.password ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    Alert.alert('Success!', 'Profile successfuly updated.');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert('Error', 'Check your input data.');

    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
