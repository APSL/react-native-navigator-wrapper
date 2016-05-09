/* @flow */

import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import NavBarBackButton from './NavBarBackButton'

export function leftButtonRouteMapperGenerator (BackComponent, styles, tintColor, topNavigator) {
  return {
    LeftButton: (route, navigator, index, navState) => {
      if (route.leftElement) {
        const leftElement = React.cloneElement(route.leftElement, {
          navigator: navigator,
          topNavigator: topNavigator,
        })
        return (
          <View style={defaultStyles.elementContainer}>
            {leftElement}
          </View>
        )
      } else if (index > 0) {
        const previousRoute = navState.routeStack[index - 1]
        return (
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <BackComponent
              onPress={() => navigator.pop()}
              style={[{flex: 1}, styles]}
              tintColor={tintColor}
              showBackTitle={true}>
              {previousRoute.title}
            </BackComponent>
          </View>
        )
      }
      return null
    }
  }
}

export function rightButtonRouteMapperGenerator (RightComponent, topNavigator) {
  return {
    RightButton: (route, navigator, index, navState) => {
      if (route.rightElement) {
        const rightElement = React.cloneElement(route.rightElement, {
          navigator: navigator,
          topNavigator: topNavigator,
        })
        return (
          <View style={defaultStyles.elementContainer}>
            {rightElement}
          </View>
        )
      } else if (RightComponent) {
        return <RightComponent navigator={navigator} topNavigator={topNavigator} />
      }
      return null
    }
  }
}

export function titleRouteMapperGenerator (TitleComponent, styles, topNavigator) {
  return {
    Title: (route, navigator, index, navState) => {
      const Component = TitleComponent || Text
      return (
        <Component style={styles} numberOfLines={1}>
          {route.title}
        </Component>
      )
    }
  }
}

export class CenteredText extends React.Component {
  render () {
    return (
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={this.props.style}>
          {this.props.children}
        </Text>
      </View>
    )
  }
}

const defaultStyles = StyleSheet.create({
  back: {
    flex: 1,
    color: (Platform.OS === 'ios') ? '#0076ff' : '#607D8B',
  },
  navFont: {
    fontSize: 17,
  },
  navText: {
    flex: 1,
  },
  elementContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export function defaultRouteMapper () {
  return {
    ...leftButtonRouteMapperGenerator(NavBarBackButton, [defaultStyles.navFont, defaultStyles.back], (Platform.OS === 'ios') ? '#0076ff' : '#607D8B'),
    ...rightButtonRouteMapperGenerator(),
    ...titleRouteMapperGenerator(CenteredText, [defaultStyles.navFont, defaultStyles.navText])
  }
}
