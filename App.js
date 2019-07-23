import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, FlatList } from 'react-native';
import io from 'socket.io-client';

const socket = io('http://121.254.173.45:3333');

export default function App() {
  const [input, setInput] = useState('hey');
  const [messages, setMessages] = useState([]);

  const handleSubmit = () => {
    socket.emit('new message', input);
    setMessages(prev => [...prev, { username: 'React Native', message: input }]);
    setInput('');
  };

  useEffect(() => {
    socket.on('new message', function(messageObj) {
      setMessages(prev => [...prev, messageObj]);
    });
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40 }}
        placeholder="Type here to translate!"
        onChangeText={text => setInput(text)}
        value={input}
      />
      <Button
        onPress={handleSubmit}
        title="Send"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <FlatList
        // data={[{ key: 'a' }, { key: 'b' }]}
        data={messages}
        renderItem={({ item: { username, message } }) => <Text>{`${username}: ${message}`}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Bananas = () => {
  let pic = {
    uri:
      'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
  };
  return <Image source={pic} style={{ width: 193, height: 110 }} />;
};
