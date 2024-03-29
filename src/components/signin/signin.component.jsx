import React from 'react'
import FormInput from '../form-input/form-input.component.jsx'
import CustomButton from "../custom-button/custom-button.component.jsx"
import './signin.styles.scss'
import {auth, signInWithGoogle} from "../../firebase/firebase.utils.js"

class Signin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: ""
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const {email, password} = this.state

    try {
      await auth.signInWithEmailAndPassword(email, password)

      this.setState({
        email: "",
        password: ""
      })
    } catch (error) {
      console.log(error)
    }

  }


  handleChange = event => {
    const {value, name} = event.target //name = password or email
    
    this.setState({
      [name]: value,
       
    })
  }

  render() {
    return <div className="signin">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={this.handleSubmit}>
        <FormInput name="email" type="email" value={this.state.email} onChange={this.handleChange} label="email" required />
        <FormInput name="password" type="password" value={this.state.password} onChange={this.handleChange} label="password" required />

        <div className="buttons">
        <CustomButton type="submit" value="Submit" >Sign In</CustomButton>
        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In with google</CustomButton>
        </div>
      </form>
    </div>
  }
}

export default Signin
