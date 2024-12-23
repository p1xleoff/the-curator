import { StyleSheet, Text, TextInput, View, type ViewProps } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText';
import { UserProfile } from '../types/userTypes';

const AccountInfoCard = ({ fullName, phoneNumber, email }: UserProfile) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.field}>
          <ThemedText type='subtext'>Email</ThemedText>
          <TextInput style={[styles.input, {borderBottomWidth: 0}]} value={email} />
        </View>     
        <View style={styles.field}>
          <ThemedText type='subtext'>Name</ThemedText>
          <TextInput style={styles.input} value={fullName} />
        </View>
        <View style={styles.field}>
          <ThemedText type='subtext'>Phone</ThemedText>
          <TextInput style={styles.input}  value={phoneNumber.toString()}/>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {},
  field: {
    marginVertical: 10,
  },
  input: {
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomWidth: 1
  }
})

export default AccountInfoCard;