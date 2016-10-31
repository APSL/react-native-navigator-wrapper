/* @flow */

import React, { PropTypes } from 'react'
import { View, Navigator, Platform } from 'react-native'
import NavigatorWrapper from './NavigatorWrapper'
import { defaultRouteMapper } from './RouteMapper'

class TopNavigatorWrapper extends React.Component {
  static isAndroid = Platform.OS !== 'ios';

  _renderScene (route: Object, navigator: Object) {
    // Render the inner component or the modal. This is basically a container
    // that can handle anything, usually a TabBarIOS with more NavigatorWrappers
    // inside.
    if (route.id === 'mainComponent') {
      // Inject the top navigator into the inner component in order to be able
      // to open a modal from anywhere
      const children = React.cloneElement(this.props.children, {
        topNavigator: navigator
      })
      return (
        <View style={[{flex: 1}, this.props.containerStyle]}>
          {children}
        </View>
      )
    }

    // Render the modal component. This component serves as a FloatFromBottom
    // Navigator. Can have another navigator inside. ``passProps`` is sent into
    // the NavigatorWrapper in order to send props to the component pushed.
    //
    // By generating the routeMapper from a function, we can pass the outer
    // modal navigator into the route mapper.
    const modalRouteMapper = this.props.modalRouteMapper || defaultRouteMapper
    return (
      <NavigatorWrapper
        initialRoute={{
          handleBackAndroid: true,
          ...route,
        }}
        topNavigator={navigator}
        navBarStyle={this.props.modalNavBarStyle}
        routeMapper={modalRouteMapper(navigator)}
        hideNavBar={this.props.hideNavBar}
        navBar={this.props.navBar}
      />
    )
  }

  render () {
    const modalAnimation = (TopNavigatorWrapper.isAndroid) ? Navigator.SceneConfigs.FloatFromBottomAndroid : Navigator.SceneConfigs.FloatFromBottom
    return (
      <Navigator
        ref='topNavigator'
        renderScene={(route, navigator) => (this._renderScene(route, navigator))}
        initialRoute={{id: 'mainComponent'}}
        configureScene={(route, routeStack) => modalAnimation}
        style={this.props.modalStyle}
      />
    )
  }
}

TopNavigatorWrapper.propTypes = {
  /**
   * Optional style for the default modal navigation bar.
   */
  modalNavBarStyle: View.propTypes.style,

  /**
   * Route mapper for the modal component
   */
  modalRouteMapper: PropTypes.func,

  /**
   * The style of the inner container
   */
  containerStyle: View.propTypes.style,

  /**
   * The style of the modal transition
   */
  modalStyle: View.propTypes.style,

  /**
   * Hides the modal navigation bar
   */
  hideNavBar: PropTypes.bool,

  /**
   * Optional navigation bar elements
   */
  navBar: PropTypes.element,
}

export default TopNavigatorWrapper
