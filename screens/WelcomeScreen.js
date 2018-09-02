import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import _ from 'lodash';
import Slides from '../components/Slides';
import { AppLoading } from 'expo';

const SLIDES_DATA = [
  { text: 'Welcome to JobApp', color: '#03A9f4' },
  { text: 'Use this to get a job', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03A9f4' }
]

export default class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { token: null };
  }

  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');
    if(token) {
      this.setState({ token });
      this.props.navigation.navigate('map');
    } else {
      this.setState({ token: false });
    }
  }

  render() {
    if(this.state.token === null) {
      return <AppLoading />
    }
    return (
      <Slides 
        data={SLIDES_DATA} 
        onComplete={() => this.props.navigation.navigate('auth')} 
      />
    );
  }
}