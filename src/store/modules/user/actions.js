export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function updateAvatarRequest(data) {
  return {
    type: '@user/UPDATE_AVATAR_REQUEST',
    payload: { data },
  };
}
