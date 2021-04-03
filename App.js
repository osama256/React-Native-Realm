import React, { useEffect,useState} from 'react'
import Realm from "realm";
// import RNFetchBlob from 'rn-fetch-blob'
import { TextInput, Dimensions, Button, PermissionsAndroid, View, Text } from 'react-native'
import Form from './components/Form'
const { width, height } = Dimensions.get('window')
let date = new Date();
var realm
let task1, task2, task4, myTask
const TaskSchema = {
  name: "Task",
  properties: {
    _id: "int",
    name: "string",
    status: "string?",
  },
  primaryKey: "_id",
};
export default function App() {
  const [updateID,setUpdateID]=useState('')
  const [updateName,setUpadteName]=useState('')
  const [updateDep,setUpdateDep]=useState('')
  const [deleteID,setDeleteID] = useState('')
  useEffect(() => {

    async function getPermissions() {
      try {
        console.log('trying')
        const granted = await PermissionsAndroid.requestMultiple([
          // PermissionsAndroid.PERMISSIONS.,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE],

          {
            title: "Talabat Elsokhna App Ask for Camera permission",
            message: "We need this permission to Capture Products",
            // "so you can take awesome pictures.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        // return granted;
        // console.log(PermissionsAndroid.RESULTS)
        // console.log(granted)
        // console.log( 'results is : '+granted["android.permission.CAMERA"])
        // for(let i in granted){
        //     console.log(granted[i])
        // }
        if (granted["android.permission.CAMERA"] === PermissionsAndroid.RESULTS.GRANTED &&
          granted["android.permission.READ_EXTERNAL_STORAGE"] === PermissionsAndroid.RESULTS.GRANTED &&
          granted["android.permission.WRITE_EXTERNAL_STORAGE"] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log()
        }
      } catch (e) {
        console.log(e)
      }
      //  realm = await new Realm({
      realm = await Realm.open({
        path: "myrealm",
        schema: [TaskSchema],
      });
    }
    getPermissions()

  })
  return (
    <View>
      <View style={{ flexDirection: 'row', backgroundColor: 'red', height: height / 2.2 }}>

        <View style={{ backgroundColor: 'green', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Form type="insert" />
        </View>
        <View style={{ backgroundColor: '#d9a657', flex: 1, alignContent: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' }}>update</Text>
          <View style={{ flexDirection: "row", marginBottom: 10, marginHorizontal: 5 }}>
            <Text>ID </Text>
            <TextInput style={{ flex: 1, height: 40, backgroundColor: '#bbb', marginLeft: 10, color: '#000' }} value={updateID} onChangeText={(text) => {setUpdateID(text)}} keyboardType='numeric'/>
          </View>
          <View style={{ flexDirection: "row", marginHorizontal: 10, marginBottom: 10, justifyContent: 'space-between' }} >
            <Text>Name </Text>
            <TextInput style={{ flex: 1, height: 40, backgroundColor: '#bbb', marginLeft: 10, color: '#000' }} value={updateName} onChangeText={(text) => {setUpadteName(text)}}/>
          </View>
          <View style={{ marginHorizontal: 5, flexDirection: "row", marginBottom: 10, justifyContent: 'space-between', }}>
            <Text>Dep</Text>
            <TextInput style={{ flex: 1, height: 40, backgroundColor: '#bbb', marginLeft: 10, color: '#000' }} value={updateDep} onChangeText={(text) => {setUpdateDep(text)}}/>
          </View>
          <View style={{ alignSelf: 'center' }}>
            <Button title="update" onPress={() => {

            }} />
          </View>
        </View>
        <View style={{ backgroundColor: '#9628de', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' }}>delete</Text>
          <View style={{ flexDirection: "row", marginBottom: 70, marginHorizontal: 5 }}>
            <Text>ID </Text>
            <TextInput style={{ flex: 1, height: 40, backgroundColor: '#bbb', marginLeft: 10, color: '#000' }} value={deleteID} onChangeText={text => setDeleteID(text)} keyboardType='numeric'/>
          </View>
          <Button title="delete" onPress={() => {

          }} />
        </View>
        {/* <TextInput value="fdsfsdfs"/> */}
      </View>
      {/* <Button title="download" onPress={() => {
        RNFetchBlob
          .config({
            // add this option that makes response data to be stored as a file,
            // this is much more performant.
            fileCache: true,
            addAndroidDownloads: {
              // Related to the Android only
              useDownloadManager: true,
              notification: false,
              path:
                '/storage/emulated/0/TalabatAdmin/' +
                +
                Math.floor(date.getTime() + date.getSeconds() / 2) + '.png'
              ,
              description: 'Image',
            },
          })
          .fetch('GET', 'http://192.168.1.50:3000/img', {
            //some headers ..
          })
          .then((res) => {
            // the temp file path
            console.log('The file saved to ', res.path())
          })
      }} />

      <Button title="open database" onPress={async () => {

        // console.log('hello')
      }} />
      <Button title='create obj' onPress={() => {
        realm.write(() => {
          task1 = realm.create("Task", {
            _id: 3,
            name: "go grocery shopping",
            status: "Open",
          });
          task2 = realm.create("Task", {
            _id: 4,
            name: "go exercise",
            status: "Open",
          })
        });
      }} />
      <Button title="read from realm" onPress={() => {
        const tasks = realm.objects("Task");
        const task = tasks.filtered("_id=3")
        console.log(tasks)
      }}/>
      <Button title="update realm" onPress={() => {
        realm.write(() => {
          task4.status = "not Open";
        });
      }}/>
      <Button title="task4" onPress={() => {
        let taskk={
          
        }
        realm.write(() => {
          task4 = realm.create("Task",{_id:5,name:"osama",status:"closed"});
        });
      }}/>
      <Button title="delete" onPress={() => {
        let taskk={

        }
        realm.write(() => {
          // let x={"_id": 5, "name": "osama", "status": "closed"}
          // task1 = realm.create("Task", {
          //   _id: 3,
          //   name: "go grocery shopping",
          //   status: "Open",
          // });
           realm.delete(myTask)
        });
      }}/>
      <Button title="find one" onPress={() => {
        myTask = realm.objectForPrimaryKey("Task", 2);
        console.log(myTask)
      }}/> */}

      {/* <Text></Text> */}
    </View>
  )
}
