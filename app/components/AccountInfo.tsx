import { StyleSheet, Text, TextInput, View, type ViewProps } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText';

export type AccountInfoProps = ViewProps & {
  userName: string;
  fullName: string;
  phoneNum: string;
  email: string;
}

const AccountInfoCard = ({ userName, fullName, phoneNum, email }: AccountInfoProps) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.field}>
          <ThemedText>Username</ThemedText>
          <TextInput style={styles.input} value={userName} />
        </View>
        <View style={styles.field}>
          <ThemedText>Name</ThemedText>
          <TextInput style={styles.input} value={fullName} />
        </View>
        <View style={styles.field}>
          <ThemedText>Email</ThemedText>
          <TextInput style={styles.input} value={email} />
        </View>     
        <View style={styles.field}>
          <ThemedText>Phone</ThemedText>
          <TextInput style={styles.input}  value={phoneNum}/>
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
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomWidth: 1
  }
})

export default AccountInfoCard;