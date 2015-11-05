import React, { Navigator, PropTypes } from 'react-native'
import NavigatorWrapper from './NavigatorWrapper'

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
        />
      )
    }

    // Render the modal component. This component serves as a FloatFromBottom
    // Navigator. Can have another navigator inside. ``passProps`` is sent into
    // the NavigatorWrapper in order to send props to the component pushed.
    return (
      <NavigatorWrapper
        initialComponent={route.component}
        title={route.title}
        topNavigator={navigator}
        passProps={route.passProps}
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
  title: PropTypes.string
}

export default TopNavigatorWrapper
