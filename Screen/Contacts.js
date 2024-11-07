import React, { useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setContacts } from './Slice'; // Ensure this path is correct

function ContactListScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contact.contacts);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=20');
        const data = await response.json();
        console.log(data);
        const fetchedContacts = data.results.map(user => ({
          id: user.login.uuid, // Use a unique ID from the API if available
          name: `${user.name.first} ${user.name.last}`,
          phone: user.phone,
          email: user.email,
          picture: user.picture.large,
        }));
        dispatch(setContacts(fetchedContacts));
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.contactContainer}
      onPress={() => navigation.navigate('DetailProfile', { contact: item })}
    >
      <Image source={{ uri: item.picture }} style={styles.contactImage} />
      <View style={styles.contactDetails}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phone}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={contacts} 
        renderItem={renderItem} 
        keyExtractor={item => item.id} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactPhone: {
    fontSize: 14,
    color: '#555',
  },
});

export default ContactListScreen;
