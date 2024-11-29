import { StyleSheet, Text, View, type ViewProps, Pressable } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link, LinkProps } from 'expo-router';

export type SettingsLinkProps = ViewProps & {
  name: string;
  href: LinkProps['href'];
  iconName?: any;
};

const SettingsLink = ({ name, href, iconName }: SettingsLinkProps) => {
  return (
    <Link href={href} asChild>
      <Pressable style={styles.container}>
        <View style={styles.link}>
          <View style={styles.link}>
            <MaterialCommunityIcons name={iconName} size={22} style={styles.icon} />
            <Text style={styles.text}>{name}</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={28} />
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
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
  icon: {
    marginEnd: 20
  }
});

export default SettingsLink;
