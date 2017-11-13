/* @flow */

import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'

type State = {
  tintColor: String
}

class NavBarBackButton extends React.Component<any, State> {
  state: State

  static propTypes = {
    ...TouchableOpacity.propTypes,
    tintColor: PropTypes.string,
    children: PropTypes.string.isRequired,
    style: Text.propTypes.style,
    showBackTitle: PropTypes.bool,
  }

  constructor (props: Object) {
    super(props)
    this.state = {
      tintColor: props.tintColor || 'black'
    }
  }

  _renderBackTitle () {
    if (this.props.showBackTitle) {
      return (
        <Text style={[this.props.style, styles.navText]}>
          {this.props.children}
        </Text>
      )
    }
  }

  render () {
    const touchableProps = {
      onPress: this.props.onPress,
      onPressIn: this.props.onPressIn,
      onPressOut: this.props.onPressOut,
      onLongPress: this.props.onLongPress
    }
    return (
      <TouchableOpacity
        {...touchableProps}
        style={styles.container}>
        <Ionicon name='ios-arrow-back' size={32} style={styles.icon}
          color={this.state.tintColor} />
        {this._renderBackTitle()}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 2,
    paddingRight: 15,
  },
  icon: {
    paddingLeft: 8,
    paddingTop: 2,
  },
  navText: {
    paddingLeft: 5,
    paddingTop: 7,
  },
})

export default NavBarBackButton
