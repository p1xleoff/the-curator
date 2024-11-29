import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

const TestApp = () => {
  auth()
  .signInAnonymously()
  .then((userCredential) => console.log('User signed in:', userCredential.user))
  .catch((error) => console.error('Firebase error:', error));

  return (
    <View>
      <Text>Testing Firebase</Text>
    </View>
  );
};

export default TestApp;
