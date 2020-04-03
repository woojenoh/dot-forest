import React from 'react';
import useInput from '../../hooks/useInput';
import './SigninForm.scss';

function SigninForm() {
  const [email, emailInput] = useInput({ type: 'text', placeholder: '이메일', required: true });
  const [password, passwordInput] = useInput({ type: 'password', placeholder: '패스워드', required: true });

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!(email && password)) {
      alert('입력한 정보를 다시 확인하세요.');
    }
  }

  return (
    <div className="signin-form-wrapper">
      <form className="signin-form" onSubmit={handleSubmit}>
        <div className="signin-form-inputs">
          {emailInput}
          {passwordInput}
        </div>
        <div className="signin-form-buttons">
          <button className="green">로그인</button>
          <button className="">회원가입 인증 메일 재전송</button>
        </div>
      </form>
    </div>
  )
}

export default SigninForm