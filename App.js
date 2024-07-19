import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child } from 'firebase/database';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCtUXCFDn0UFdAhCurshTnxI7n1qQIpD2w",
  authDomain: "autenticacion-15912.firebaseapp.com",
  databaseURL: "https://autenticacion-15912-default-rtdb.firebaseio.com",
  projectId: "autenticacion-15912",
  storageBucket: "autenticacion-15912.appspot.com",
  messagingSenderId: "415606533152",
  appId: "1:415606533152:web:129a59346790d7e9d3a045",
  measurementId: "G-LW6837CZ5C"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);

  // Función para escribir datos de usuario
  const writeUserData = (userId, name, email) => {
    set(ref(database, 'users/' + userId), {
      username: name,
      email: email
    })
    .then(() => {
      console.log("Datos insertados correctamente");
    })
    .catch((error) => {
      console.error("Error al insertar datos: ", error);
    });
  };

  // Función para leer datos de usuario
  const readUserData = (userId) => {
    const dbRef = ref(database);
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      } else {
        setUserData("No data available");
      }
    }).catch((error) => {
      console.error("Error al leer datos: ", error);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Submit" onPress={() => writeUserData(userId, name, email)} />
      <Button title="Read Data" onPress={() => readUserData(userId)} />
      {userData && (
        <View style={styles.userData}>
          <Text>{JSON.stringify(userData, null, 2)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
  userData: {
    marginTop: 20,
    alignItems: 'center',
  },
});
