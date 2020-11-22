import React from 'react';
import './App.css';
import HomePage from "./pages/homepage/homepage.component"
import ShopPage from './pages/shop/shop.component'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Header from "./components/header/header.component.jsx"
import SigninAndSignupPage from "./pages/signin-and-signup/signin-and-signup.component.jsx"
import {auth, createUserProfileDocument} from './firebase/firebase.utils'
import {setCurrentUser} from './redux/user/user.actions'


class App extends React.Component {
  // constructor not needed due to redux
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     currentUser: null
  //   }
  // }

  unsubscribeFromAuth = null


  componentDidMount() {
    const {setCurrentUser} = this.props


    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapshot => {
          this.props.setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            
          })
        })
      }
      //set current user to null
      this.props.setCurrentUser(userAuth)


    })
  }

  componentWillUnmount() { //for no memory leaks
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        {/* <Header currentUser={this.state.currentUser} /> */}
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/signin" render={() => (
            this.props.currentUser ? <Redirect to='/' /> : <SigninAndSignupPage />
          )} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

