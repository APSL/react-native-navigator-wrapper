/* @flow */

import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  BackAndroid,
  Platform,
} from 'react-native'
import { defaultRouteMapper } from './RouteMapper'
import NavBar from './NavBar'
import CustomComponents from 'react-native-deprecated-custom-components'

class NavigatorWrapper extends React.Component {
  static isAndroid = Platform.OS !== 'ios';
  static androidToolbarHeight = 56;
  static iosStatusAndNavbarHeight = 64;

  navigator: Object;
  firstComponentInStack: boolean;
  bindedBackFunction: Function;

  _handleAndroidBackButton () {
    if (this.navigator && !this.firstComponentInStack) {
      this.navigator.pop()
      return true
    }
    return false
  }

  constructor (props: Object) {
    super(props)
    this.firstComponentInStack = true
  }

  componentDidMount () {
    // Automatically handle back button under Android platform
    if (NavigatorWrapper.isAndroid && this.props.initialRoute.handleBackAndroid !== false) {
      this.bindedBackFunction = this._handleAndroidBackButton.bind(this)
      BackAndroid.addEventListener('hardwareBackPress', this.bindedBackFunction)
    }
  }

  componentWillUnmount () {
    if (NavigatorWrapper.isAndroid) {
      BackAndroid.removeEventListener(
        'hardwareBackPress',
        this.bindedBackFunction
      )
    }
  }

  renderScene (route: Object, navigator: Object) {
    let marginTop = NavigatorWrapper.iosStatusAndNavbarHeight
    this.firstComponentInStack = (navigator.state.routeStack.length === 1)
    if (NavigatorWrapper.isAndroid) {
      // Save navigator to handle back button under Android
      if (!this.navigator) {
        this.navigator = navigator
      }
      // Configure right navbar height
      marginTop = NavigatorWrapper.androidToolbarHeight
    }
    const RenderComponent = route.component
    return (
      <View style={{flex: 1, marginTop: (this.props.hideNavBar) ? 0 : marginTop}}>
        <RenderComponent
          navigator={navigator}
          topNavigator={this.props.topNavigator}
          route={route}
          {...route.passProps}
          {...this.props.initialRoute.passProps}
        />
      </View>
    )
  }

  render () {
    const navAnimation = (NavigatorWrapper.isAndroid) ? CustomComponents.Navigator.SceneConfigs.FadeAndroid : CustomComponents.Navigator.SceneConfigs.PushFromRight
    const routeMapper = this.props.routeMapper || defaultRouteMapper()
    const NavigationBar = (this.props.hideNavBar) ? null : <NavBar routeMapper={routeMapper} style={this.props.navBarStyle} />
    return (
      <CustomComponents.Navigator
        configureScene={(route, routeStack) => this.props.navigationBarAnimation || navAnimation}
        initialRoute={this.props.initialRoute}
        initialRouteStack={this.props.initialRouteStack}
        navigationBar={NavigationBar}
        renderScene={this.renderScene.bind(this)}
      />
    )
  }
}

NavigatorWrapper.propTypes = {
  /**
   * Provide the initial route or the initial route stack.
   *
   * ``leftElement``, ``textElement`` and ``rightElement``` are optional
   * elements to overwrite route mapper defaults.
   */
  initialRoute: PropTypes.shape({
    component: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    passProps: PropTypes.object,
    leftElement: PropTypes.node,
    textElement: PropTypes.node,
    rightElement: PropTypes.node,
    // Set to false to disable the back button under Android
    handleBackAndroid: PropTypes.bool,
  }),
  initialRouteStack: PropTypes.arrayOf(PropTypes.object),

  /**
   * Optional ``topNavigator`` object to use as a parent navigator for modal
   * transitions.
   */
  topNavigator: PropTypes.object,

  /**
   * Optional style for the default navigation bar.
   */
  navBarStyle: View.propTypes.style,

  /**
   * Defines the navigator style. Useful for changing the background color
   * while transitioning
   */
  style: View.propTypes.style,

  /**
   * A ``routeMapper`` object to customize Left, Title and Right components for
   * the ``NavigationBar``.
   */
  routeMapper: PropTypes.object,

  /**
   * Optional prop to hide the navigation bar
   */
  hideNavBar: PropTypes.bool,

  /**
   * Optional navigation scene config animation
   */
  navigationBarAnimation: PropTypes.object,
}

export default NavigatorWrapper
