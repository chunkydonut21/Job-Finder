import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { fetchJobs } from '../actions/index';
import { Button, Icon } from 'react-native-elements';

class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Map',
    tabBarIcon: ({ tintColor }) => <Icon name="my-location" size={30} color={tintColor} />
  }
  constructor(props) {
    super(props);
    this.state = {
      mapLoaded: false,
      region: {
        longitude: -122,
        latitude: 37,
        longitudeDelta: 0.04,
        latitudeDelta: 0.09
      }
    };
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  onButtonPress = () => {
    this.props.fetchJobs(this.state.region, () => {
      this.props.navigation.navigate('deck');
    });

  }

  render() {
    if(!this.state.mapLoaded) {
      return (
        <View>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <MapView
          region={this.state.region}
          style={{ flex: 1 }}
          onRegionChangeComplete={(region) => this.setState({ region })}
        />
        <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0 }}>
          <Button large 
            title="Search This Area" 
            backgroundColor="#009688" 
            icon={{ name: 'search' }}
            onPress={() => this.onButtonPress()}
          />
        </View>
      </View>
    );
  }
}

export default connect(null, { fetchJobs })(MapScreen);