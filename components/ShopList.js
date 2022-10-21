import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
} from 'react-native';
import Item from './Item';
import uuid from 'react-native-uuid';
import { AntDesign } from '@expo/vector-icons';

export default function ShopList() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  const [counter, setCounter] = useState(
    items.filter((item) => item.completed).length
  );

  useEffect(() => {
    setCounter(items.filter((item) => item.completed).length);
  }, [items]);

  const addItem = (name) => {
    setItems([...items, { id: uuid.v4(), name: name, completed: false }]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const toggleItem = (id) => {
    const itemToToggle = items.filter((item) => item.id === id)[0];
    const updated = { ...itemToToggle, completed: !itemToToggle.completed };
    setItems(items.map((item) => (item.id === id ? updated : item)));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Lista de compras</Text>
        <Text style={styles.counterText}>
          {counter}/{items.length}
        </Text>
      </View>
      <ScrollView style={styles.itemList}>
        {items.length > 0 ? (
          items.map((item) => (
            <Item
              id={item.id}
              name={item.name}
              completed={item.completed}
              onToggle={toggleItem}
              onDelete={removeItem}
            />
          ))
        ) : (
          <Text style={styles.noItem}>Nenhum item na lista</Text>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          onChangeText={(newText) => setText(newText)}
          defaultValue={text}
          placeholder="Novo item da lista"
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addItem(text)}>
          <AntDesign name="plus" size={20} color="#2980B9" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: Platform.OS === 'android' ? 100 : 90,
    width: '100%',
    backgroundColor: '#2980B9',
    flexDirection: 'row',
  },
  headerText: {
    top: Platform.OS === 'android' ? 35 : 30,
    margin: 20,
    fontFamily: 'Roboto',
    fontSize: 20,
    color: 'white',
  },
  counterText: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
    top: Platform.OS === 'android' ? 17 : 15,
    right: Platform.OS === 'android' ? -110 : -150,
  },
  itemList: {
    top: 10,
    left: 10,
    width: 4000,
  },
  noItem: {
    fontSize: 16,
    left: Platform.OS === 'android' ? 90 : 100,
  },
  footer: {
    flex: 1,
    backgroundColor: '#2980B9',
    height: Platform.OS === 'android' ? 80 : 100,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  input: {
    backgroundColor: 'white',
    alignSelf: 'center',
    paddingLeft: 10,
    height: 50,
    width: 250,
    margin: 10,
    borderRadius: 10,
    fontFamily: 'Roboto',
  },
  addButton: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    width: 70,
    height: 50,
    bottom: Platform.OS === 'android' ? 15 : 25,
    borderRadius: 10,
    right: Platform.OS === 'android' ? -10 : -50,
    left: Platform.OS === 'android' ? 10 : 15,
  },
});
