import React from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

function FavoriteScreen() {
  const navigation = useNavigation();
  const favorites = useSelector(state => state.contact.favorites);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.contactContainer}
      onPress={() => navigation.navigate('DetailProfile', { contact: item })}
    >
      <Image source={{ uri: item.picture }} style={styles.contactImage} />
      <View style={styles.contactDetails}>
        <Text style={styles.contactName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No favorites yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 20,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#aaa',
    marginTop: 20,
  },
});

export default FavoriteScreen;
