/* @flow */

import React from 'react'
import { StyleSheet } from 'react-native'
import CustomComponents from 'react-native-deprecated-custom-components'

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
      <CustomComponents.Navigator.NavigationBar
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
  ...CustomComponents.Navigator.NavigationBar.propTypes,
}

export default NavBar
