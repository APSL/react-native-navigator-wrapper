/* @flow */

import React from 'react'
import { StyleSheet, PixelRatio } from 'react-native'
import CustomComponents from 'react-native-deprecated-custom-components'

class NavBar extends React.Component {
  updateProgress (progress, fromIndex, toIndex) {
    this._nav.updateProgress(progress, fromIndex, toIndex);
  }

  render () {
    return (
      <CustomComponents.Navigator.NavigationBar
        style={[styles.navBar, this.props.style]}
        routeMapper={this.props.routeMapper}
        navState={this.props.navState}
        navigator={this.props.navigator}
        ref={nav => { this._nav = nav }}
      />
    )
  }
}

NavBar.propTypes = {
  ...CustomComponents.Navigator.NavigationBar.propTypes,
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'white',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#8e8e93',
  },
})

export default NavBar
