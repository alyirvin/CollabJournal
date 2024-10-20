import React from 'react';
import './forgotPass.css';

const ForgotPass = () => {
  return (
    <div className="background">
      <main>
        <div className="page">
          <div className="containerSpiral">
            <img src="spiral short.png" alt="Journal Spiral Part 1" className="spiral-part" />
            <img src="spiral long.png" alt="Journal Spiral Part 2" className="spiral-part" />
          </div>
          <p className="title">FORGOT PASSWORD</p>
          <label className="textOne">
            We'll send you a link to the email address you registered with.
          </label>
          <div className="containerOne">
            <label className="textTwo">Email</label>
            <input className="input" />
          </div>
          <button className="button">
            <a className="button-prop" href="/resetPass">
              <div id="button-text">SEND EMAIL</div>
            </a>
          </button>
        </div>
      </main>
    </div>
  );
};

export default ForgotPass;