import React from 'react';
import {StyleSheet, PixelRatio, View, TextInput, Text} from 'react-native';

import {colors, px1} from '../views/styles';
import util from '../libs/Util';

var TextArea = React.createClass({
  propTypes: TextInput.propTypes,

  value: '',

  getInitialState: function() {
    return {
      height: 60,
      text: ""
    };
  },

  setNativeProps: function(nativeProps) {
    var input  = this.refs.input;
    var hidden = this.refs.hidden;
    input.setNativeProps(nativeProps);
    hidden.setNativeProps(nativeProps);
    if (nativeProps.text !== undefined) {
      this.state.text = nativeProps.text;
    }
  },

  onInputLayout: function(event) {
    var width = event.nativeEvent.layout.width;
    if (this.state.width !== width) {
      this.setState({width: width});
    }
  },

  onHiddenLayout: function(event) {
    var height = event.nativeEvent.layout.height;
    if (height < 60) {
      height = 60;
    }
    if (height > 205) {
      height = 205;
    }
    if (this.state.height !== height) {
      this.setState({height: height});
    }
  },

  onChange: function(event) {
    this.value = event.nativeEvent.text;
    this.setState({text: event.nativeEvent.text});
    if (this.props.onChange) this.props.onChange(event);
  },

  focus() {
    this.refs.input.focus();
  },

  blur() {
    this.refs.input.blur();
  },

  render: function() {
    let passedStyle = this.props.style || {};
    let inputStyle = {};
    let hiddenStyle = {};
    // TODO: these don't work beause they are StyleSheet compiled ones
    // if (passedStyle.flex)  containerStyle.flex = passedStyle.flex;
    // if (passedStyle.width) containerStyle.width = passedStyle.width;


    inputStyle.height = this.state.height;
    if (this.state.width) {
      hiddenStyle.width = this.state.width;
    }
    let baseStyle = this.props.flat ? styles.flat : styles.round;
    let baseHidden = this.props.flat ? styles.hiddenFlat : styles.hidden;
    return (
      <View style={styles.container}>
        <TextInput
            ref="input"
            autoCapitalize='none'
            autoCorrect={false}
            clearButtonMode="unless-editing"
            multiline={true}
          {...this.props}
            onChange={this.onChange}
            onLayout={this.onInputLayout}
          style={[baseStyle, passedStyle, inputStyle]}
        />
        <Text
         ref="hidden"
         onLayout={this.onHiddenLayout}
         style={[baseHidden, passedStyle, hiddenStyle]}
        >
          {this.state.text}
        </Text>
      </View>
    );
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: util.isAndroid() ? 0 : 10
  },
  hidden: {
    position: 'absolute',
    top: 10000,  // way off screen
    left: 10000, // way off screen
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: 'transparent',
    padding: 10,
    fontSize: 18
  },
  round: {
    padding: 10,
    flex: 1,
    fontSize: 18,
    marginTop: 10,
    color: colors.dark1,
    borderWidth: px1,
    borderColor: colors.bright2,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  hiddenFlat: {
    marginTop: util.isAndroid() ? 5 : 0,
    position: 'absolute',
    top: 10000,  // way off screen
    left: 10000, // way off screen
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: 'transparent',
    fontSize: 16
  },
  flat: {
    flex: 1,
    marginTop: util.isAndroid() ? 1 : 5,
    color: colors.dark1,
    backgroundColor: 'white',
    fontSize: 14
  }
});

module.exports = TextArea;
