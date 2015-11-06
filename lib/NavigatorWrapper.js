import React, { View, PropTypes, Navigator } from 'react-native'
import NavBar from './NavBar'
import { defaultRouteMapper } from './RouteMapper'
import StyleSheetPropType from 'react-native/Libraries/StyleSheet/StyleSheetPropType'
import ViewStylePropTypes from 'react-native/Libraries/Components/View/ViewStylePropTypes'

class NavigatorWrapper extends React.Component {
  renderScene (route, navigator) {
    const RenderComponent = route.component
    return (
      <View style={{flex: 1, marginTop: 64}}>
        <RenderComponent
          navigator={navigator}
          topNavigator={this.props.topNavigator}
          route={route}
          {...route.passProps}
          {...this.props.passProps}
        />
      </View>
    )
  }

  render () {
    return (
      <Navigator
        initialRoute={{
          component: this.props.initialComponent,
          title: this.props.title || ''
        }}
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
  initialComponent: PropTypes.func.isRequired,
  title: PropTypes.string,
  topNavigator: PropTypes.object,
  passProps: PropTypes.object,
  navBarStyle: StyleSheetPropType(ViewStylePropTypes),
  routeMapper: PropTypes.object,
}

export default NavigatorWrapper
