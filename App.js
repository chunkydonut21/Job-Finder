import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/Settings';
import ReviewScreen  from './screens/ReviewScreen';
import reducers from './reducers';

const store = createStore(reducers, {}, compose(applyMiddleware(thunk), autoRehydrate()));

persistStore(store, { storage: AsyncStorage, whitelist: ['likes'] });

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const MainNavigator = createBottomTabNavigator({
  welcome: WelcomeScreen,
  auth: AuthScreen,
  main: createBottomTabNavigator({
    map: MapScreen,
    deck: DeckScreen,
    review: createStackNavigator({
      review: ReviewScreen,
      settings: SettingsScreen
    })
  }, {
    tabBarOptions: {
      labelStyle: {
        fontSize: 12
      }
    }
  })
}, {
  navigationOptions: { tabBarVisible: false }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});