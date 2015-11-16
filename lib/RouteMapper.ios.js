import React, { Text } from 'react-native'
import NavBarBackButton from './NavBarBackButton'

export function leftButtonRouteMapperGenerator (BackComponent, styles, tintColor, topNavigator) {
  return {
    LeftButton: (route, navigator, index, navState) => {
      if (index === 0) {
        return null
      }
      const previousRoute = navState.routeStack[index - 1]
      return (
        <BackComponent
          onPress={() => navigator.pop()}
          style={styles}
          tintColor={tintColor}>
          {previousRoute.title}
        </BackComponent>
      )
    }
  }
}

export function rightButtonRouteMapperGenerator (RightComponent, topNavigator) {
  return {
    RightButton: (route, navigator, index, navState) => {
      if (RightComponent && !route.rightElement) {
        return <RightComponent navigator={navigator} topNavigator={topNavigator} />
      }
      if (route.rightElement) {
        return route.rightElement
      }
    }
  }
}

export function titleRouteMapperGenerator (TitleComponent, styles, topNavigator) {
  return {
    Title: (route, navigator, index, navState) => {
      const title = route.title || ''
      const Component = TitleComponent || Text
      return (
        <Component style={styles}
          numberOfLines={1}>
          {title}
        </Component>
      )
    }
  }
}

const defaultStyles = React.StyleSheet.create({
  back: {
    flex: 1,
    color: 'black',
  },
  navFont: {
    fontSize: 17,
  },
  navText: {
    flex: 1,
    paddingTop: 8,
    textAlign: 'center',
    width: 200,
  },
})

export function defaultRouteMapper () {
  return {
    ...leftButtonRouteMapperGenerator(NavBarBackButton, [defaultStyles.navFont, defaultStyles.back], 'black'),
    ...rightButtonRouteMapperGenerator(),
    ...titleRouteMapperGenerator(Text, [defaultStyles.navFont, defaultStyles.navText])
  }
}
