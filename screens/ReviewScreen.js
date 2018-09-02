import React from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Review Jobs',
      headerRight: (
        <Button
          title='Settings'
          onPress={() => navigation.navigate('settings')} 
          backgroundColor='rgba(0,0,0,0)'
          color='rgba(0,122,255,1)'
        />
      ),
      headerStyle: {
        marginTop: Platform.OS === 'android' ? 24 : 0
      },
      tabBarIcon: ({ tintColor }) => <Icon name="favorite" size={30} color={tintColor} />
    };
  }
  render() {
    return (
      <ScrollView>
        {
          this.props.likes.map((job) => {
            return (
              <Card title={job.jobtitle} key={job.jobkey}>
                <View style={{ height: 200 }}>
                  <MapView 
                    style={{ flex: 1 }} 
                    cacheEnabled={Platform.OS === 'android' ? true: false}
                    scrollEnabled={false}
                    initialRegion={{
                      longitude: job.longitude,
                      latitude: job.latitude,
                      latitudeDelta: 0.045,
                      longitudeDelta: 0.02
                    }}
                  />
                  <View style={{ marginTop: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={{ fontStyle: 'italic' }}>{job.company}</Text>
                    <Text style={{ fontStyle: 'italic' }}>{job.formattedRelativeTime}</Text>
                  </View>
                  <Button 
                    title="Apply Now!"
                    backgroundColor="#03A9F4"
                    onPress={() => Linking.openURL(job.url)}
                  />
                </View>
              </Card>
            );
          })
        }
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    likes: state.likes
  };
}
export default connect(mapStateToProps)(ReviewScreen);