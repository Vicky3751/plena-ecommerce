import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import commonStyles from '../styles/styles'

const More = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>

      </View>
      <Text style={[commonStyles.heading01Semibold, {color : "#1E222B"}]}>Vinayaka OB</Text>
    </View>
  )
}

export default More

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#d9d9d9'
  }
})