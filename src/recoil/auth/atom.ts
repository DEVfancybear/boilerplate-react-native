import {atom} from 'recoil';

import {AUTH_KEY} from '../atomKey';

const authFormStatusAtom = atom({
  key: AUTH_KEY.AUTH_FORM_STATUS_ATOM_KEY,
  default: {
    type: '',
    visible: false,
  },
});

const authResultAtom = atom({
  key: AUTH_KEY.AUTH_RESULT_ATOM_KEY,
  default: {
    auth: null,
    authError: null,
    authSuccess: null,
  },
});

export {authFormStatusAtom, authResultAtom};
