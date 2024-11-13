import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

export default function Signup() {
  // const navigate = useNavigate();
  const { firstName , setFirstName} = useState('');
  const [email, setEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [hiddenPassword, onChangeHiddenPassword] = useState('');
  const [bool, setBool] = useState(false);

  const handleChangePassword = (newText) => {
    const lastLetter = newText.slice(-1);
    if (newText.length > password.length) {
      onChangePassword(password + lastLetter);
    } else if (newText.length < password.length) {
      onChangePassword(password.slice(0, newText.length));
    } else if (newText === '') {
      onChangePassword('');
      setBool(false);
    }
    let newTextWithDots = '';
    newText.split('').forEach((char, index, array) => {
      if (index === array.length - 1) {
        newTextWithDots += char;
      } else {
        newTextWithDots += '•';
      }
    });
    onChangeHiddenPassword(newTextWithDots);
  };


  // const handleSignUp = async (e) => {
  //   e.preventDefault();
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((user) => {
  //       // Signed up 
  //       console.log("Success signing up ", firstName);
  //       navigate('/home');
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorCode,errorMessage);
  //       alert("Error, please try again");
  //     });
  // };

  return (
    <div className="signUp">
      <div className = "container">
        <div className="inputContainer">
          <input
            type="text"
            className="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            placeholder="first name"
          />
        </div>
        <div className="inputContainer">
          <input
            type="email"
            className="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="email"
          />
        </div>
        <div className="inputContainer">
          <input
            type={bool ? 'text' : 'password'}
            className="password"
            onChange={(e) => handleChangePassword(e.target.value)}
            value={hiddenPassword}
            placeholder="password (7+ chars)"
          />
        </div>
        <div className="alignSignUp">
          {/* <Link to="/home">
            <button className="SignUp" onClick={handleSignUp}>sign up</button>
          </Link> */}
        </div>
        <p>Already have an account? Login here</p>
      </div>
    </div>
  );
}