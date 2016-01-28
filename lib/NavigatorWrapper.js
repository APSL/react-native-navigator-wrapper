import React, {
  View,
  PropTypes,
  Navigator,
  BackAndroid,
  Platform
} from 'react-native'
import NavBar from './NavBar'
import { defaultRouteMapper } from './RouteMapper'

class NavigatorWrapper extends React.Component {
  static isAndroid = Platform.OS !== 'ios';

  _handleAndroidBackButton () {
    if (this.navigator && !this.firstComponentInStack) {
      this.navigator.pop()
      return true
    }
    return false
  }

  constructor (props) {
    super(props)
    this.navigator = undefined
    this.firstComponentInStack = true
  }

  componentDidMount() {
    // Automatically handle back button under Android platform
    if (NavigatorWrapper.isAndroid && this.props.initialRoute.handleBackAndroid) {
      this.bindedBackFunction = this._handleAndroidBackButton.bind(this)
      BackAndroid.addEventListener('hardwareBackPress', this.bindedBackFunction)
    }
  }

  componentWillUnmount () {
    if (NavigatorWrapper.isAndroid) {
      BackAndroid.removeEventListener('hardwareBackPress', this.bindedBackFunction)
    }
  }

  renderScene (route, navigator) {
    let marginTop = 64
    this.firstComponentInStack = route.handleBackAndroid
    if (NavigatorWrapper.isAndroid) {
      // Save navigator to handle back button under Android
      if (!this.navigator) {
        this.navigator = navigator
      }
      marginTop = 56
    }
    const RenderComponent = route.component
    return (
      <View style={{flex: 1, marginTop: marginTop}}>
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
    const navAnimation = (NavigatorWrapper.isAndroid) ? Navigator.SceneConfigs.FadeAndroid : Navigator.SceneConfigs.PushFromRight
    return (
      <Navigator
        configureScene={(route, routeStack) => navAnimation}
        initialRoute={this.props.initialRoute}
        initialRouteStack={this.props.initialRouteStack}
        navigationBar={
          <NavBar
            routeMapper={this.props.routeMapper || defaultRouteMapper()}
            style={this.props.navBarStyle}
          />
        }
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
   * A ``routeMapper`` object to customize Left, Title and Right components for
   * the ``NavigationBar``.
   */
  routeMapper: PropTypes.object,
}

export default NavigatorWrapper
