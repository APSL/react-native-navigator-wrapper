import React, { Text } from 'react-native'
import NavBarBackButton from './NavBarBackButton'

export const defaultRouteMapper = {
  LeftButton: (route, navigator, index, navState) => {
    if (index === 0) {
      return null
    }
    const previousRoute = navState.routeStack[index - 1]
    return (
      <NavBarBackButton onPress={() => navigator.pop()}
        style={[styles.navFont, styles.back]}>
        {previousRoute.title}
      </NavBarBackButton>
    )
  },
  RightButton: (route, navigator, index, navState) => {
    if (route.rightElement) {
      return route.rightElement
    }
  },
  Title: (route, navigator, index, navState) => {
    const title = route.title || ''
    return (
      <Text style={[styles.navFont, styles.navText]} numberOfLines={1}>
        {title}
      </Text>
    )
  }
}

const styles = React.StyleSheet.create({
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
