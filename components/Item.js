import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

export default function Item({ id, name, completed, onToggle, onDelete }) {
  const deleteAlertHandler = () => {
    Alert.alert(
      'Deletar',

      'Deseja mesmo deletar esse item ?',
      [
        { text: 'Sim', onPress: () => onDelete(id) },
        {
          text: 'Não',
          onPress: () => console.log(''),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <TouchableOpacity style={styles.checkIcon}>
          <Feather
            name={completed ? 'check-square' : 'square'}
            size={24}
            color={completed ? '#3FAF47' : '#6E6E6E'}
            onPress={() => onToggle(id)}
          />
        </TouchableOpacity>
        <Text style={styles.itemName}>{name}</Text>
        <TouchableOpacity
          onPress={() => deleteAlertHandler()}
          style={styles.deleteIcon}>
          <AntDesign name="closecircle" size={20} color="#FF8888" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    width: 340,
    backgroundColor: completed ? '#D9FCE1' : 'white',
  },
  item: {
    flexDirection: 'row',
    height: 50,
    width: 100,
    margin: 10,
    borderColor: 'black',
  },
  checkIcon: {
    alignSelf: 'center',
    right: 5,
  },
  itemName: {
    alignSelf: 'center',
    textDecorationLine: completed ? 'line-through' : 'none',
    color: completed ? '#3FAF47' : 'black',
    fontSize: 16,
    width: 260,
  },
  deleteIcon: {
    alignContent: 'flex-end',
    right: -210,
    top: 15,
    position: 'absolute',
  },
});
