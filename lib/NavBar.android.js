/* @flow */

import React from 'react'
import {
  Navigator,
  StyleSheet,
} from 'react-native'

const stylesAndroid = StyleSheet.create({
  navBar: {
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

class NavBar extends React.Component {
  updateProgress (progress, fromIndex, toIndex) {
    this._nav.updateProgress(progress, fromIndex, toIndex);
  }

  render () {
    return (
      <Navigator.NavigationBar
        style={[stylesAndroid.navBar, this.props.style]}
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

export default NavBar
