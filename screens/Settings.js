import React from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { clearLikedJobs } from '../actions/index';
import { Button } from 'react-native-elements';

class Settings extends React.Component {
  static navigationOptions = {
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  }
  render() {
    return (
      <View>
        <Button
          large
          title="Reset Liked Jobs"
          icon={{ name: 'delete-forever' }}
          backgroundColor="#F44336"
          onPress={() => this.props.clearLikedJobs()}
        />
      </View>
    );
  }
}

export default connect(null, { clearLikedJobs })(Settings);