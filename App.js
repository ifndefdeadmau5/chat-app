import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';

const socket = io('http://121.254.173.45:3333');

const ID = getRandomInt(0, 1000);

export default function App() {
  const [input, setInput] = useState('hey');
  const [messages, setMessages] = useState([]);

  const onSend = (giftMessages = []) => {
    socket.emit('new message', giftMessages[0]);
    setMessages(prev => GiftedChat.append(prev, giftMessages));
  };

  useEffect(() => {
    socket.on('new message', function(data) {
      setMessages(prev => GiftedChat.append(prev, data));
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: ID,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      }}
    />
  );
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
