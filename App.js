import React, { useEffect, useState } from 'react'
import Realm from "realm";
import { FlatList, TextInput, Dimensions, Button, PermissionsAndroid, View, Text } from 'react-native'
import Form from './components/Form'
const { width, height } = Dimensions.get('window')
var realm
var realmData = []
const EmployeeSchema = {
  name: "Employee",
  properties: {
    id: "int",
    name: "string",
    dep: "string",
  },
  primaryKey: "id",
};
export default function App() {
  const [updateID, setUpdateID] = useState('')
  const [updateName, setUpadteName] = useState('')
  const [updateDep, setUpdateDep] = useState('')
  const [deleteID, setDeleteID] = useState('')
  const [data,setData] = useState([])
  useEffect(() => {
    const newDB = async () => {
      realm = await new Realm({
        path: "myrealm",
        schema: [EmployeeSchema],
      });
    }
    newDB()
  })
  return (
    <View>
      <View style={{ flexDirection: 'row', backgroundColor: 'red', height: height / 2.2 }}>

        <View style={{ backgroundColor: 'green', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Form type="insert" cb={async (id, name, dep) => {
            try {
              realm.write(() => {
                realm.create("Employee", {
                  id,
                  name,
                  dep,
                })
              })
            }
            catch (e) {
              console.log(e)
            }
          }} />
        </View>
        <View style={{ backgroundColor: '#d9a657', flex: 1, alignContent: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' }}>update</Text>
          <View style={{ flexDirection: "row", marginBottom: 10, marginHorizontal: 5 }}>
            <Text>ID </Text>
            <TextInput style={{ flex: 1, height: 40, backgroundColor: '#bbb', marginLeft: 10, color: '#000' }} value={updateID} onChangeText={(text) => { setUpdateID(text) }} keyboardType='numeric' />
          </View>
          <View style={{ flexDirection: "row", marginHorizontal: 10, marginBottom: 10, justifyContent: 'space-between' }} >
            <Text>Name </Text>
            <TextInput style={{ flex: 1, height: 40, backgroundColor: '#bbb', marginLeft: 10, color: '#000' }} value={updateName} onChangeText={(text) => { setUpadteName(text) }} />
          </View>
          <View style={{ marginHorizontal: 5, flexDirection: "row", marginBottom: 10, justifyContent: 'space-between', }}>
            <Text>Dep</Text>
            <TextInput style={{ flex: 1, height: 40, backgroundColor: '#bbb', marginLeft: 10, color: '#000' }} value={updateDep} onChangeText={(text) => { setUpdateDep(text) }} />
          </View>
          <View style={{ alignSelf: 'center' }}>
            <Button title="update" onPress={() => {
              try {
                realm.write(() => {
                  realm.create("Employee", {
                    id: parseInt(updateID, 10),
                    name: updateName,
                    dep: updateDep,
                  },
                    "modified"
                  )
                })
              } catch (e) { console.log(e) }
            }} />
          </View>
        </View>
        <View style={{ backgroundColor: '#9628de', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' }}>delete</Text>
          <View style={{ flexDirection: "row", marginBottom: 105, marginHorizontal: 5 }}>
            <Text>ID </Text>
            <TextInput style={{ flex: 1, height: 40, backgroundColor: '#bbb', marginLeft: 10, color: '#000' }} value={deleteID} onChangeText={text => setDeleteID(text)} keyboardType='numeric' />
          </View>
          <Button title="delete" onPress={() => {
            try {
              realm.write(() => {
                let employee = realm.objectForPrimaryKey("Employee", parseInt(deleteID, 10));
                realm.delete(employee)
              })
            } catch (e) { console.log(e) }
          }}
          />
        </View>
        <View style={{ width: 200, height: 29, position: 'absolute', top: 5, left: (width / 2) - 100 }}>
          <Text style={{ alignSelf: 'center', color: '#990d0d', fontWeight: 'bold', fontSize: 20 }}>how to use Realm</Text>
          <View style={{ height: 2, backgroundColor: '#000' }} />
        </View>
      </View>
      <View style={{ height: height / 1.8, width: width,paddingTop: 20 }}>
        <FlatList
          data={data}
          keyExtractor={employee => employee.id}
          renderItem={({ item }) => {
            return <View style={{marginHorizontal:10,marginBottom:20,backgroundColor:'#bbb'}}> 
              <Text>ID : {item.id} </Text>
              <Text>Name : {item.name} </Text>
              <Text>Dep : {item.dep} </Text>
            </View>
          }}
        />
        <View style={{ position: 'absolute', bottom: 40, width: width }}>
          <Button title="show realm" onPress={() => {
            const employes = realm.objects("Employee");
            setData(employes)
            console.log(employes)
            realmData = employes
          }} />
        </View>
      </View>
    </View>
  )
}
