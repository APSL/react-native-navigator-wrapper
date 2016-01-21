import React, {
  Navigator,
  StyleSheet
} from 'react-native'

/**
 * React Native component to draw a Navigator.NavigationBar with Android
 * customisations. This is currenty a WIP because the component is very
 * similar to iOS one.
 */

const stylesAndroid = StyleSheet.create({
  navBar: {
    backgroundColor: 'white',
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
