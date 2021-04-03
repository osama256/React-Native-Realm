import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

export default function Form({ type, cb }) {
    const [id, setID] = useState('')
    const [name, setName] = useState('')
    const [dep, setDep] = useState('')
    return (
        <View>
            <View style={{ backgroundColor: 'green', flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 20 }}>{type}</Text>
                <View style={{ flexDirection: "row", marginBottom: 10, marginHorizontal: 5 }}>
                    <Text>ID </Text>
                    <TextInput style={{ flex: 1, height: 40, backgroundColor: '#bbb', marginLeft: 10, color: '#000' }} keyboardType='numeric' value={id} onChangeText={(text) => { setID(text) }} />
                </View>

                <View style={{ flexDirection: "row", marginHorizontal: 10, marginBottom: 10, justifyContent: 'space-between' }}>
                    <Text>Name </Text>
                    <TextInput style={{ flex: 1, height: 40, backgroundColor: '#bbb', marginLeft: 10, color: '#000' }} value={name} onChangeText={(text) => { setName(text) }} />
                </View>

                <View style={{ marginHorizontal: 5, flexDirection: "row", marginBottom: 10, justifyContent: 'space-between', }}>
                    <Text>Dep</Text>
                    <TextInput style={{ flex: 1, height: 40, backgroundColor: '#bbb', marginLeft: 10, color: '#000' }} value={dep} onChangeText={(text) => { setDep(text) }} />
                </View>

                <Button title={type} onPress={() => {cb(parseInt(id,10),name,dep)}} />
            </View>
        </View>
    )
}
