# react-native-navigator-wrapper
A React Native Navigator component wrapper that implements nested navigators for
both push and modal transitions.

## Installation
You can install this component through ``npm``:

```shell
npm i react-native-navigator-wrapper --save
```

You also need to install the awesome
[``react-native-vector-icons``](https://github.com/oblador/react-native-vector-icons#installation)
from Joel Oblador (in order to use the back button arrow icon) and include the
``Ionicons.ttf`` font in your project. All the components of the library are
written in ES6/ES7 style.

## Motivation
This library implements the nested ``Navigator`` strategy to let the developer
to use both push-like transitions and modal transitions that can also handle
push navigation inside them. Think about a login/signup process. You can let the
user to browse your app and then present a modal when they want to register.
Once the modal is open, you can provide push navigation between signup or register
screens. This is what tries to solve this component.

Take this pseudo-jsx code as an example:

```js
<Navigator
  renderScene={(route, navigator) => {
    if (route.id === 'innerNavigator') {
      // This navigator uses push-like transitions
      return <Navigator />
    }
    // This navigator also uses push-like transitions, but it is opened using
    // FloatFromBottom scene config
    return <Navigator />
  }}
/>
```

The parent navigator will push new components using ``FloatFromBottom``. Both
inner navigators will use ``FloatFromRight``, but the inner navigator will keep
the default navigation history and the other navigator is going to be used when
presenting a modal component. With this you can have push navigation inside a
modal component.

## Usage
This library can be used in several ways. It's composed from a couple of different
components that interact with each other. In short, it has a navigation bar that
mimics the iOS navigation bar and two navigation wrappers. Expect an Android
style navigation bar soon.

### Nested navigation with ``TopNavigatorWrapper``
You can use ``TopNavigatorWrapper`` component to bring the nested navigator
strategy just importing the component and wrapping whatever you want to render
inside it:

```js
import React from 'react-native'
import { TopNavigatorWrapper } from 'react-native-navigator-wrapper'
import MyComponent from './MyComponent'

class MyApp extends React.Component {
  render () {
    return (
      <TopNavigatorWrapper
        initialComponent={MyComponent}
        title='My App'
      />
    )
  }
}
```

You component ``MyComponent`` will have two props, **navigator** and
**topNavigator**. They will let you to push new components from right using
the first one or open a modal pushing from the second one.

### Navigation with ``NavigationWrapper``
If you just want to use the navigation bar inside a navigator, use the
``NavigationWrapper`` component:

```js
import React from 'react-native'
import { NavigationWrapper } from 'react-native-navigator-wrapper'

class MyComponent extends React.Component {
  render () {
    return (
      <NavigationWrapper
        initialComponent={Component}
        title='Title'
      />
    )
  }
}
```

Every time you push a component that's inside the ``NavigationWrapper`` component
you will have a **navigator** prop, just like the top navigation option before,
that will let you to keep pushing components in the stack.

### Custom ``routeMapper``
The React Native ``Navigator.NavigatorBar`` component has an object called
``routeMapper`` that configures the three components that can be displayed
inside the navigation bar: ``LeftButton``, ``RightButton`` and ``Title``.
This library auto-generates a default route mapper object that displays an iOS
style back button, a title and accepts a right element to render.

It also provides functions to generate each of the route mapper components so
you can build a completely custom navigation bar for each ``NavigatorWrapper``.
See the source code for more information.

## License
MIT.
