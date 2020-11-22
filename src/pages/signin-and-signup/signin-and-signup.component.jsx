import React from 'react'
import './signin-and-signup.styles.scss'
import Signin from "../../components/signin/signin.component.jsx"
import Signup from "../../components/signup/signup.component.jsx"

const SigninAndSignupPage = (props) => {
  return <div className="signin-and-signup">
    <Signin />
    <Signup />
  </div>
}

export default SigninAndSignupPage
