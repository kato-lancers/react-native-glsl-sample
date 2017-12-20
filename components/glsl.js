import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
const  { width, height, scale } = Dimensions.get('window');
import getGLReactImplementation from './gl-react-implementation';
const { Surface } = getGLReactImplementation();
import { Node, Shaders, GLSL } from 'gl-react';
import timeLoop from './hoc/timeLoop';

const shaders = Shaders.create({
  helloGL: {
    frag: GLSL`
precision mediump float;

uniform float time;
uniform vec2 resolution;

void main( void ) {
  float adjustedTime = time * 0.0001;
  vec2 position = ( gl_FragCoord.xy / resolution.xy ) - 0.8;

  float x = 0.3 * ( position.x + 1. ) * sin( 3.0 * position.x - 8. * adjustedTime );

  float y = 4. / ( 40. * abs(position.y - x));

  gl_FragColor = vec4( (position.x) * y, 0.5 * y, y, 10. );
}
`
  }
});

const Sketch = ({ time, width, height }) => {
  return (
    <Surface style={{ width, height }} width={width} height={height}>
      <Node
        shader={shaders.helloGL}
        uniforms={{ time, resolution: [ width, height ] }} />
    </Surface>
  )
}

const Comp = timeLoop(Sketch)

export default class GL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>LOGO</Text>
        <Comp width={width} height={height} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    position: 'absolute',
    top: 120,
    zIndex: 2,
    elevation: 2,
    color: '#fff',
    fontSize: 20,
    backgroundColor: 'transparent'
  }
});