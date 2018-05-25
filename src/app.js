import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
  state = {
    loggedIn: null
  }
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCz84-ooLNJiTCqSWYwB9IKtaoQsxzfIiA',
      authDomain: 'react-native-auth-ad628.firebaseapp.com',
      databaseURL: 'https://react-native-auth-ad628.firebaseio.com',
      projectId: 'react-native-auth-ad628',
      storageBucket: 'react-native-auth-ad628.appspot.com',
      messagingSenderId: '457213315065'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true
        });
      } else {
        this.setState({
          loggedIn: false
        });
      }
    });
  }
  

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>Log out</Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Auth" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
