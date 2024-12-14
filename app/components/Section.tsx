import { StyleSheet, View, type ViewProps } from 'react-native'
import React, { ReactElement } from 'react'

type SectionProps = {
    children: ReactElement | ReactElement[];
}

const Section = ({children}: SectionProps) => {
  return (
    <View style={styles.container}>{children}</View>
  )
}


const styles = StyleSheet.create({
    container: {
        marginVertical: 10
    }
})

export default Section;