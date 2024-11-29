import { StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'

export type InputProps = {
    label?: string;
    name: string;
    multiline: boolean;
    numOfLines?: number,
    maxLength?: number,
    placeholder?: string;
}

const ThemedInput = ({ label, name, multiline, numOfLines, maxLength, placeholder }: InputProps) => {
    const [inputHeight, setInputHeight] = useState(50);
    const handleInputSizeChange = (event: { nativeEvent: { contentSize: { height: number } } }) => {
        setInputHeight(Math.max(50, event.nativeEvent.contentSize.height));
    }
    return (
        <View style={styles.container}>
            <TextInput
                multiline={multiline}
                style={styles.input}
                numberOfLines={numOfLines}
                maxLength={maxLength}
                onContentSizeChange={handleInputSizeChange}
                placeholder={placeholder}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {},
    input: {
        borderWidth: 1,
        borderRadius: 3,
        padding: 10,
        borderColor: 'gray',
        color: '#fa640e',
        marginTop: 10
    }
})

export default ThemedInput;