import { call, put, takeLatest } from "redux-saga/effects";
import history from '../../utils/history';
import { fetchPOST } from '../../utils/fetch';
import * as userActionCreators from '../actionCreators/user';
import * as userActionTypes from '../actionTypes/user';


// 로그인
function* fetchSignInSaga(action) {
  try {
    const { email, password } = action.payload;
    const { data: { jwtToken, user, message } } = yield call(fetchPOST, { url: '/users/signin', data: { email, password } });

    // 토큰은 로컬 스토리지에, 유저 정보는 Redux Store에
    localStorage.setItem('jwtToken', jwtToken);
    yield put(userActionCreators.fetchSignInFulfilled(user));
    
    alert(message);
    yield call(history.replace, '/');
  } catch(error) {
    alert(error.response.data.message);
    yield put(userActionCreators.fetchSignInRejected(error.response));
  }
}

// 회원가입
function* fetchSignUpSaga(action) {
  try {
    const { email, password, nickName } = action.payload;
    const { data: { message } } = yield call(fetchPOST, { url: '/users/signup', data: { email, password, nickName } });
    
    yield put(userActionCreators.fetchSignUpFulfilled());
    alert(message);
  } catch(error) {
    alert(error.response.data.message);
    yield put(userActionCreators.fetchSignUpRejected(error.response));
  }
}

// 회원가입 인증메일 재전송
function* fetchSendVerifyEmailSaga(action) {
  try {
    const { email, password } = action.payload;
    const { data: { message } } = yield call(fetchPOST, { url: '/users/sendVerifyEmail', data: { email, password } });

    yield put(userActionCreators.fetchSendVerifyEmailFulfilled());
    alert(message);
  } catch(error) {
    alert(error.response.data.message);
    yield put(userActionCreators.fetchSendVerifyEmailRejected(error.response));
  }
}

export default function* root() {
  yield takeLatest(userActionTypes.FETCH_SIGN_IN, fetchSignInSaga);
  yield takeLatest(userActionTypes.FETCH_SIGN_UP, fetchSignUpSaga);
  yield takeLatest(userActionTypes.FETCH_SEND_VERIFY_EMAIL, fetchSendVerifyEmailSaga);
}