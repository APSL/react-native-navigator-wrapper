import React, { TouchableOpacity, Text, PropTypes, StyleSheet } from 'react-native'
import StyleSheetPropType from 'react-native/Libraries/StyleSheet/StyleSheetPropType'
import TextStylePropTypes from 'react-native/Libraries/Text/TextStylePropTypes'
import Ionicon from 'react-native-vector-icons/Ionicons'

class NavBarBackButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tintColor: props.tintColor || 'black'
    }
  }

  _renderBackTitle () {
    if (this.props.showBackTitle) {
      return (
        <Text style={[this.props.style, styles.navText]}>
          {this.props.children}
        </Text>
      )
    }
  }

  render () {
    const touchableProps = {
      onPress: this.props.onPress,
      onPressIn: this.props.onPressIn,
      onPressOut: this.props.onPressOut,
      onLongPress: this.props.onLongPress
    }
    return (
      <TouchableOpacity
        {...touchableProps}
        style={styles.container}>
        <Ionicon name='android-arrow-back' size={24} style={styles.icon}
          color={this.state.tintColor} />
        {this._renderBackTitle.bind(this)}
      </TouchableOpacity>
    )
  }
}

NavBarBackButton.propTypes = {
  ...TouchableOpacity.propTypes,
  tintColor: PropTypes.string,
  children: PropTypes.string.isRequired,
  style: StyleSheetPropType(TextStylePropTypes),
  showBackTitle: PropTypes.bool,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingRight: 15,
  },
  icon: {
    marginLeft: 10,
  },
  navText: {
    paddingLeft: 5,
    paddingTop: 7,
  },
})

export default NavBarBackButton
