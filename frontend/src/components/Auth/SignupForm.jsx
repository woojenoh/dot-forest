import React from 'react';
import useInput from '../../hooks/useInput';
import './SignupForm.scss';

function SignupForm() {
  const [email, emailInput] = useInput({ type: 'text', placeholder: '이메일', required: true })
  const [password, passwordInput] = useInput({ type: 'password', placeholder: '패스워드(영문, 숫자 포함 6~12자)', required: true })
  const [passwordConfirm, passwordConfirmInput] = useInput({ type: 'password', placeholder: '패스워드 확인', required: true })
  const [nickName, nickNameInput] = useInput({ type: 'text', placeholder: '닉네임(특수문자 제외 2자 이상)', required: true })

  const isEmailOk = email.match(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i);
  const isPasswordOk = password.match(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,12}$/);
  const isPasswordConfirmOk = password !== '' && password === passwordConfirm;
  const isNickNameOk = nickName.match(/^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!(isEmailOk && isPasswordOk && isPasswordConfirmOk && isNickNameOk)) {
      alert('입력한 정보를 다시 확인하세요.');
    }
  }

  return (
    <div className="signup-form-wrapper">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-form-inputs">
          <div className="input-wrapper">
            {emailInput}
            {isEmailOk && <span className="valid-check">✔</span>}
          </div>
          <div className="input-wrapper">
            {passwordInput}
            {isPasswordOk && <span className="valid-check">✔</span>}
          </div>
          <div className="input-wrapper">
            {passwordConfirmInput}
            {isPasswordConfirmOk && <span className="valid-check">✔</span>}
          </div>
          <div className="input-wrapper">
            {nickNameInput}
            {isNickNameOk && <span className="valid-check">✔</span>}
          </div>
        </div>
        <div className="signup-form-buttons">
          <button className="green">회원가입</button>
        </div>
      </form>
    </div>
  )
}

export default SignupForm