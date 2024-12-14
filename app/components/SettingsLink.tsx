import { StyleSheet, View, type ViewProps, Pressable } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link, LinkProps } from 'expo-router';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '../hooks/useThemeColor';

export type SettingsLinkProps = ViewProps & {
  name: string;
  href: LinkProps['href'];
  iconName?: any;
};

const SettingsLink = ({ name, href, iconName }: SettingsLinkProps) => {
  const color = useThemeColor({ light: '#141414', dark: '#dfdfdf' }, 'background');
  return (
    <Link href={href} asChild>
      <Pressable style={styles.container}>
        <View style={styles.link}>
          <View style={styles.link}>
            <MaterialCommunityIcons name={iconName} size={22} style={styles.icon} color={color} />
            <ThemedText type='subtitle'>{name}</ThemedText>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={28} color={color} />
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderRadius: 5,
    // backgroundColor: '#e6e6e6',
    marginVertical: 2
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginEnd: 20,
    
  }
});

export default SettingsLink;
