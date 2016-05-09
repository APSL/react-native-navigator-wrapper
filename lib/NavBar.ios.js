/* @flow */

import React from 'react'
import { Navigator, StyleSheet, PixelRatio } from 'react-native'

class NavBar extends React.Component {
  updateProgress (progress, fromIndex, toIndex) {
    this._nav.updateProgress(progress, fromIndex, toIndex);
  }

  render () {
    return (
      <Navigator.NavigationBar
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
  ...Navigator.NavigationBar.propTypes,
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'white',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#8e8e93',
  },
})

export default NavBar
