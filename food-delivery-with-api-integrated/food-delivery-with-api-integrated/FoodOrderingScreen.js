import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For navigation and other icons
import axios from 'axios';

const FoodOrderingScreen = () => {
  const [restaurants, setRestaurants] = useState([]); // State to store restaurants
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); // State for filtered restaurants
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [selectedCuisine, setSelectedCuisine] = useState('All'); // State for selected cuisine filter

  // Fetch restaurants from a mock API (replace with Zomato API if needed)
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // Mock restaurant data (replace with API call)
        const mockRestaurants = [
          {
            id: 1,
            name: 'Burger King',
            cuisine: 'Burger',
            rating: '4.5',
            image: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg',
          },
          {
            id: 2,
            name: 'Pizza Hut',
            cuisine: 'Pizza',
            rating: '4.2',
            image: 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg',
          },
          {
            id: 3,
            name: 'Subway',
            cuisine: 'Sandwich',
            rating: '4.0',
            image: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg',
          },
          {
            id: 4,
            name: 'KFC',
            cuisine: 'Fried Chicken',
            rating: '4.3',
            image: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg',
          },
        ];
        setRestaurants(mockRestaurants); // Set mock restaurant data
        setFilteredRestaurants(mockRestaurants); // Set filtered restaurant data
        setLoading(false); // Stop loading
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchRestaurants();
  }, []);

  // Filter restaurants by cuisine type
  const filterRestaurants = (cuisine) => {
    setSelectedCuisine(cuisine);
    if (cuisine === 'All') {
      setFilteredRestaurants(restaurants);
    } else {
      const filtered = restaurants.filter((restaurant) => restaurant.cuisine === cuisine);
      setFilteredRestaurants(filtered);
    }
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f57c00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Icon name="location-on" size={16} color="#f57c00" />
          <Text style={styles.locationText}>Islamabad, Pakistan <Icon name="arrow-drop-down" size={16} color="#f57c00" /></Text>
        </View>
        <Text style={styles.headerTitle}>Order Your Food Fast and Free</Text>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3275/3275978.png' }} // Placeholder for delivery scooter icon
          style={styles.deliveryIcon}
          resizeMode="contain"
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#666"
        />
        <TouchableOpacity style={styles.searchOptions}>
          <Icon name="more-vert" size={24} color="#f57c00" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <TouchableOpacity
          style={[styles.categoryButton, selectedCuisine === 'All' && styles.activeCategory]}
          onPress={() => filterRestaurants('All')}
        >
          <Icon name="local-dining" size={20} color={selectedCuisine === 'All' ? '#fff' : '#f57c00'} />
          <Text style={[styles.categoryText, selectedCuisine === 'All' && { color: '#fff' }]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, selectedCuisine === 'Burger' && styles.activeCategory]}
          onPress={() => filterRestaurants('Burger')}
        >
          <Icon name="local-dining" size={20} color={selectedCuisine === 'Burger' ? '#fff' : '#f57c00'} />
          <Text style={[styles.categoryText, selectedCuisine === 'Burger' && { color: '#fff' }]}>Burger</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, selectedCuisine === 'Pizza' && styles.activeCategory]}
          onPress={() => filterRestaurants('Pizza')}
        >
          <Icon name="local-pizza" size={20} color={selectedCuisine === 'Pizza' ? '#fff' : '#f57c00'} />
          <Text style={[styles.categoryText, selectedCuisine === 'Pizza' && { color: '#fff' }]}>Pizza</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, selectedCuisine === 'Sandwich' && styles.activeCategory]}
          onPress={() => filterRestaurants('Sandwich')}
        >
          <Icon name="hot-dog" size={20} color={selectedCuisine === 'Sandwich' ? '#fff' : '#f57c00'} />
          <Text style={[styles.categoryText, selectedCuisine === 'Sandwich' && { color: '#fff' }]}>Sandw</Text>
        </TouchableOpacity>
      </View>

      {/* Restaurants List */}
      <ScrollView style={styles.foodItemsContainer}>
        {filteredRestaurants.map((restaurant) => (
          <View key={restaurant.id} style={styles.foodItemCard}>
            <Image
              source={{ uri: restaurant.image }}
              style={styles.foodItemImage}
              resizeMode="cover"
            />
            <View style={styles.foodItemDetails}>
              <Text style={styles.foodItemName}>{restaurant.name}</Text>
              <Text style={styles.foodItemPrice}>{restaurant.cuisine}</Text>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color="#f57c00" />
                <Text style={styles.ratingText}>{restaurant.rating}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={24} color="#f57c00" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="shopping-bag" size={24} color="#f57c00" />
          <Text style={styles.navText}>Bag</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="more-vert" size={24} color="#f57c00" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationText: {
    fontSize: 14,
    color: '#f57c00',
    marginLeft: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  deliveryIcon: {
    width: 100,
    height: 100,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  searchOptions: {
    padding: 5,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f57c00',
  },
  activeCategory: {
    backgroundColor: '#f57c00',
  },
  categoryText: {
    fontSize: 14,
    color: '#f57c00',
    marginLeft: 5,
  },
  foodItemsContainer: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  foodItemCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  foodItemImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  foodItemDetails: {
    padding: 10,
  },
  foodItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  foodItemPrice: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#f57c00',
    marginLeft: 5,
  },
  addButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#f57c00',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#f57c00',
    marginTop: 5,
  },
});

export default FoodOrderingScreen;