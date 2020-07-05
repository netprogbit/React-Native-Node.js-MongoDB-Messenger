import React, { useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectUser } from '../store/actions/user.actions';

// User list
export default function Home() {  

  // Track changes
  const users = useSelector(state => state.user.users);  
  const selectedUser = useSelector(state => state.user.selectedUser);
  const ownerId = useSelector(state => state.auth.userId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers({ ownerId: ownerId })); // Update users state
  }, []);  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text} h4>Contacts</Text>      
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <Item
            item={item}           
            title={item.name}
            selectedUser={selectedUser}            
          />
        )}
        keyExtractor={item => item._id}
        extraData={selectedUser}
      />
    </SafeAreaView>
  );
}

// User item of flat list
function Item({ item, title, selectedUser }) {

  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => dispatch(selectUser(item))}
      style={[
        styles.itemButton,
        { backgroundColor: (item._id === selectedUser?._id) ? '#A5A5A5' : '#FFB02E' },
      ]}
    >
      <Text style={styles.itemText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFB02E',
    alignSelf: 'center'
  },  
  itemButton: {    
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CD7F32',
    backgroundColor: '#FFB02E',
    width: 150,
    height: 50,
    flex: 1,
    alignSelf: 'flex-end',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemText: {
    color: '#2A211C',
    fontWeight: 'bold',
  }, 
});
