import React, { Navigator, PropTypes } from 'react-native'
import NavigatorWrapper from './NavigatorWrapper'
import StyleSheetPropType from 'react-native/Libraries/StyleSheet/StyleSheetPropType'
import ViewStylePropTypes from 'react-native/Libraries/Components/View/ViewStylePropTypes'

class TopNavigatorWrapper extends React.Component {
  _renderScene (route, navigator) {
    // Render the inner component or the modal. This component will be the one
    // with push-like transitions.
    if (route.id === 'mainComponent') {
      return (
        <NavigatorWrapper
          initialComponent={this.props.initialComponent}
          title={this.props.title}
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
        initialComponent={route.component}
        title={route.title}
        topNavigator={navigator}
        passProps={route.passProps}
        navBarStyle={this.props.modalNavBarStyle}
        routeMapper={this.props.modalRouteMapper(navigator)}
      />
    )
  }

  render () {
    return (
      <Navigator
        ref='topNavigator'
        renderScene={(route, navigator) => (this._renderScene(route, navigator))}
        initialRoute={{id: 'mainComponent'}}
        configureScene={route => Navigator.SceneConfigs.FloatFromBottom}
      />
    )
  }
}

TopNavigatorWrapper.propTypes = {
  initialComponent: PropTypes.func.isRequired,
  title: PropTypes.string,
  navBarStyle: StyleSheetPropType(ViewStylePropTypes),
  routeMapper: PropTypes.func,
  modalNavBarStyle: StyleSheetPropType(ViewStylePropTypes),
  modalRouteMapper: PropTypes.func,
}

export default TopNavigatorWrapper
