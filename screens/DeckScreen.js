import React from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import Swipe from '../components/Swipe';
import { Card, Button, Icon } from 'react-native-elements';
import { MapView } from 'expo';
import { likeJob } from '../actions/index';

class DeckScreen extends React.Component {
  static navigationOptions = {
    title: 'Jobs',
    tabBarIcon: ({ tintColor }) => <Icon name="description" size={30} color={tintColor} />
  }
  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <Swipe 
          data={this.props.jobs}
          renderCard={(job) => {
            return (
              <Card title={job.jobtitle}>
                <View style={{ height: 300 }}>
                  <MapView
                    scrollEnabled={false} 
                    style={{ flex: 1 }}
                    cacheEnabled={Platform.OS === 'android' ? true : false}
                    initialRegion={{
                      longitude: job.longitude,
                      latitude: job.latitude,
                      latitudeDelta: 0.045,
                      longitudeDelta: 0.02
                    }}
                  >
                  </MapView>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
                    <Text>{job.company}</Text>
                    <Text>{job.formattedRelativeTime}</Text>
                  </View>
                  <Text>{job.snippet.replace(/<b>/g, '').replace(/<\/b/g, '')}</Text>
                </View>
              </Card>
            );
          }}
          renderNoMoreCards={() => {
            return (
              <Card title="No More Jobs">
                <Button
                  title="Back to Map"
                  large
                  icon={{ name: 'my-location' }}
                  backgroundColor="#03A9F4"
                  onPress={() => this.props.navigation.navigate('map')}
                />
              </Card>
            );
          }}
          keyProp="jobkey"
          onSwipeRight={(job) => this.props.likeJob(job)}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs.results
  };
}

export default connect(mapStateToProps, { likeJob })(DeckScreen);
