import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from './Slice';

function DetailProfileScreen({ route, navigation }) {
  const { contact } = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.contact.favorites);

  const addToFavorites = () => {
    if (!favorites.find(fav => fav.id === contact.id)) {
      dispatch(addFavorite(contact));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>&lt; Profile Contact</Text>
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <Image source={{ uri: contact.picture }} style={styles.profileImage} />
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.phone}>{contact.phone}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email</Text>
          <Text style={styles.detailText}>{contact.email}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Work</Text>
          <Text style={styles.detailText}>{contact.phone}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Personal</Text>
          <Text style={styles.detailText}>{contact.cell || "(366)-105-3398"}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.favoriteButton} onPress={addToFavorites}>
        <Text style={styles.favoriteButtonText}>Add to Favorites</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    fontSize: 16,
    color: '#000',
    padding: 10,
  },
  profileContainer: {
    alignItems: 'center',
    backgroundColor: '#0000FF', // Bright blue background
    paddingVertical: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  detailsContainer: {
    padding: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 16,
    color: '#555',
  },
  favoriteButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  favoriteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailProfileScreen;
