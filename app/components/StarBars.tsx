import { StyleSheet, Text, View, type ViewProps } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText';

export type StarProgressProps = ViewProps & {
    total: number;
    five: number;
    four: number;
    three: number;
    two: number;
    one: number;
}

const StarProgress = ({ total, five, four, three, two, one }: StarProgressProps) => {
    const ratings: number[] = [five, four, three, two, one];
    return (
        <View style={styles.container}>
            {ratings.map((rating, index) => {
                const percentage = (rating / total) * 100;
                return (
                    <View style={styles.barContainer}>
                        <View style={styles.infoContainer}>
                            <ThemedText style={styles.numbers}>{5 - index} Stars</ThemedText>
                            <ThemedText style={styles.numbers}>{percentage}%</ThemedText>
                        </View>
                        <View style={styles.background}>
                            <View style={[styles.fill, { width: `${percentage}%` }]}></View>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        // backgroundColor: '#ffffff',
        paddingVertical: 10,
        borderRadius: 5
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    numbers: {
        fontWeight: '600'
    },
    barContainer: {
        marginVertical: 7,
    },
    background: {
        backgroundColor: '#333333',
        maxWidth: '100%',
        height: 15,
        borderRadius: 10
    },
    fill: {
        backgroundColor: 'red',
        height: 15,
        borderRadius: 10,
        paddingHorizontal: 7
    }
})

export default StarProgress;