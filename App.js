import 'expo';
import './components/inject-gl-react-implementation';
import React, { Component } from 'react';
import Expo from 'expo';
import GLSL from './components/glsl';

export default class App extends Component {
  render() {
    return <GLSL />;
  }
}

Expo.registerRootComponent(App);
