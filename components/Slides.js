import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Slides extends Component {
  renderButton(index) {
    if(index === this.props.data.length - 1) {
      return (
        <Button 
          title='Onwards!' 
          raised 
          buttonStyle={styles.buttonStyle}
          onPress={this.props.onComplete}
        />
      );
    }
  }
  render() {
    return (
      <ScrollView horizontal pagingEnabled style={{ flex: 1 }}>
        {
          this.props.data.map((item, index) => {
            const { slide, slideText } = styles; 
            return (
              <View key={item.text} style={[slide, { backgroundColor: item.color }]}>
                <Text style={slideText}>{item.text}</Text>
                {this.renderButton(index)}
              </View>
            );
          })
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  slideText: {
    fontSize: 30,
    color: '#000'
  },
  buttonStyle: {
    backgroundColor: '#0288D1',
    marginTop: 15
  }
});