import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSendMessage, fetchMessages, addMessage } from '../store/actions/message.actions';
import { selectUser } from '../store/actions/user.actions';
import ApiConfig from '../configs/api.config';
import io from "socket.io-client";

export default function Messenger() {

  const [message, setMessage] = useState(''); // Local message state

  // Track changes
  const messages = useSelector(state => state.message.messages);
  const ownerId = useSelector(state => state.auth.userId);
  const selectedUser = useSelector(state => state.user.selectedUser);

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(fetchMessages({ fromUserId: ownerId, toUserId: selectedUser?._id })); // Update messages state

    // Socket.IO subscribe
    socket = io(ApiConfig.host);
    const handler = (msg) => dispatch(addMessage(msg));
    socket.on(ownerId, handler);

    return () => {
      socket.off(ownerId, handler); //Unsubscribe from Socket.IO
    }
  }, []);

  // Send message to recipient
  const handleSend = () => {        
    dispatch(fetchSendMessage({ fromUserId: ownerId, toUserId: selectedUser?._id, message: message }));    
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.touchable} onPress={() => dispatch(selectUser(null))} >
          <Text style={styles.touchableText}>
            <Icon name='back' size={24} style={styles.icon} />
          </Text>
        </TouchableOpacity>
        <Text style={styles.header} h4>Messenger</Text>
      </View>
      <View style={styles.messagesContainer}>
        <FlatList
          style={styles.flatList}
          contentContainerStyle={styles.flatListContentContainer}
          data={messages.sort((a, b) => new Date(b.date) - new Date(a.date))}
          renderItem={({ item }) => (
            <Item
              item={item}
              fromUserId={ownerId}
            />
          )}
          keyExtractor={item => item._id}
        />
      </View>
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={-160} style={styles.inputMessageContainer}>
        <TextInput
          style={styles.inputMessage}
          placeholder='Type your message...'
          autoCorrect
          underlineColorAndroid='transparent'
          placeholderTextColor='#eaeded'
          value={message}
          onChangeText={(value) => setMessage(value)}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton} disabled={!message}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Message item of flat list
function Item({ item, fromUserId }) {

  if (item.fromUserId === fromUserId) {
    return (
      <View style={[styles.messageContainer, styles.ownerMessageContainer]}>
        <Text style={[styles.message, styles.ownerMessage]}>
          {item.text}
        </Text>
      </View>
    );
  }
  else {
    return (
      <View style={[styles.messageContainer, styles.friendMessageContainer]}>
        <Text style={[styles.message, styles.friendMessage]}>
          {item.text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignSelf: "flex-start",
  },
  touchable: {
    flex: .25,
    backgroundColor: "#2A211C",
    padding: 5,
  },
  touchableText: {
    alignItems: 'flex-start',
  },
  icon: {
    color: '#FFB02E',
  },
  header: {
    flex: 0.5,
    textAlign: 'center',
    color: '#FFB02E',
    backgroundColor: "#2A211C",
  },
  messagesContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2A211C',
  },
  flatList: {
    transform: [{ scaleY: -1 }],
  },
  flatListContentContainer: {
    justifyContent: 'flex-start',
    alignContent: 'space-between',
  },
  messageContainer: {
    margin: 5,
    minHeight: 50,
    justifyContent: 'center',
    transform: [{ scaleY: -1 }],
  },
  ownerMessageContainer: {
    alignItems: 'flex-end',
  },
  friendMessageContainer: {
    alignItems: 'flex-start',
  },
  message: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 10,
    textAlign: 'center',
    minWidth: 90,
    justifyContent: 'center',
  },
  ownerMessage: {
    color: '#2A211C',
    borderColor: '#79443B',
    backgroundColor: '#FFB02E',
  },
  friendMessage: {
    color: '#2A211C',
    borderColor: '#414A4C',
    backgroundColor: '#B5B8B1',
  },
  inputMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#4B3C34',
  },
  inputMessage: {
    color: '#000',
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 18,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#CD7F32',
    backgroundColor: '#FFB02E',
    margin: 10,
    height: 50,
    alignSelf: 'flex-end',
    flex: 4,
  },
  sendButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#25221B',
    backgroundColor: '#2A211C',
    height: 50,
    flex: 1,
    alignSelf: 'flex-end',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendButtonText: {
    color: '#FFB02E',
    fontWeight: 'bold',
  },
});