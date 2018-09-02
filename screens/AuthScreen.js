import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { facebookLogin } from '../actions/index';

class AuthScreen extends React.Component {
  componentDidMount() {
    this.props.facebookLogin();
    if(this.props.token) {
      this.props.navigation.navigate('map');
    }
    // AsyncStorage.removeItem('fb_token');
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.token) {
      this.props.navigation.navigate('map');
    }
  }
  
  render() {
    return (
      <View />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  };
}

export default connect(mapStateToProps, { facebookLogin })(AuthScreen);