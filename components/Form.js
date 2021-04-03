import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

export default function Form({type,onPress}) {
    return (
        <View>
            <View style={{ backgroundColor: 'green', flex: 1, alignItems: 'center', justifyContent: 'center',width:'100%' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 20 }}>{type}</Text>
                <View style={{ flexDirection: "row", marginBottom: 10, marginHorizontal: 5 }}>
                    <Text>ID </Text>
                    <TextInput style={{ flex: 1, height: 40, backgroundColor: '#bbb', marginLeft: 10, color: '#000' }} keyboardType='numeric'/>
                </View>

                <View style={{ flexDirection: "row", marginHorizontal: 10, marginBottom: 10, justifyContent: 'space-between' }}>
                    <Text>Name </Text>
                    <TextInput style={{ flex: 1, height: 40, backgroundColor: '#bbb', marginLeft: 10, color: '#000' }} />
                </View>

                <View style={{ marginHorizontal: 5, flexDirection: "row", marginBottom: 10, justifyContent: 'space-between', }}>
                    <Text>Dep</Text>
                    <TextInput style={{ flex: 1, height: 40, backgroundColor: '#bbb', marginLeft: 10, color: '#000' }} />
                </View>

                <Button title={type} onPress={() => {

                }} />
            </View>
        </View>
    )
}
