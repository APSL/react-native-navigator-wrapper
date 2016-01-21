import React, { View, Navigator, PropTypes, Platform } from 'react-native'
import NavigatorWrapper from './NavigatorWrapper'

class TopNavigatorWrapper extends React.Component {
  _renderScene (route, navigator) {
    // Render the inner component or the modal. This component will be the one
    // with push-like transitions.
    if (route.id === 'mainComponent') {
      return (
        <NavigatorWrapper
          initialRoute={this.props.initialRoute}
          topNavigator={navigator}
          navBarStyle={this.props.navBarStyle}
          routeMapper={this.props.routeMapper(navigator)}
        />
      )
    }

    // Render the modal component. This component serves as a FloatFromBottom
    // Navigator. Can have another navigator inside. ``passProps`` is sent into
    // the NavigatorWrapper in order to send props to the component pushed.
    //
    // By generating the routeMapper from a function, we can pass the outer
    // modal navigator into the route mapper.
    return (
      <NavigatorWrapper
        initialRoute={{
          component: route.component,
          title: route.title,
          passProps: route.passProps,
        }}
        topNavigator={navigator}
        navBarStyle={this.props.modalNavBarStyle}
        routeMapper={this.props.modalRouteMapper(navigator)}
      />
    )
  }

  render () {
    const modalAnimation = (Platform.OS === 'ios') ? Navigator.SceneConfigs.FloatFromBottom : Navigator.SceneConfigs.FloatFromBottomAndroid
    return (
      <Navigator
        ref='topNavigator'
        renderScene={(route, navigator) => (this._renderScene(route, navigator))}
        initialRoute={{id: 'mainComponent'}}
        configureScene={(route, routeStack) => modalAnimation}
      />
    )
  }
}

TopNavigatorWrapper.propTypes = {
  /**
   * Provide the initial route or the initial route stack.
   */
  initialRoute: PropTypes.shape({
    component: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    passProps: PropTypes.object,
  }),
  initialRouteStack: PropTypes.arrayOf(PropTypes.object),

  /**
   * Optional style for the default navigation bar.
   */
  navBarStyle: View.propTypes.style,

  /**
   * Optional style for the default modal navigation bar.
   */
  modalNavBarStyle: View.propTypes.style,

  routeMapper: PropTypes.func,
  modalRouteMapper: PropTypes.func,
}

export default TopNavigatorWrapper
