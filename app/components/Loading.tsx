import { ActivityIndicator, StyleProp, View, ViewStyle, StyleSheet } from 'react-native'
import React from 'react'

interface LoadingProps {
  style?: StyleProp<ViewStyle>;
}

export const Loading = ({ style }: LoadingProps) => {
  return (
    <View style={[styles.loader, style]}>
      <ActivityIndicator size='large' color='#ff5e00' />
    </View>
  )
}

export const SmallLoader = () => {
  return (
    <View style={styles.smolLoader}>
      <ActivityIndicator size='small' color='#7700ff' />
    </View>
  )
}
export const Loader = () => {
  return (
    <View style={styles.ReLoader}>
      <ActivityIndicator size={30} color={'#ff1e00'} />
    </View>
  )
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smolLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ReLoader: {
    alignItems: 'center',
  },
});

export default Loader;