import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { View, StyleSheet, Text } from 'react-native';

const { Navigator } = createMaterialTopTabNavigator();

const TopTabs = withLayoutContext(Navigator);

export default function TabLayout() {
  // const colorScheme = useColorScheme();

  return (
    // <Tabs>
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: 'Home',
    //       tabBarIcon: ({ color, size }) => (
    //         <Ionicons name="home-outline" size={size} color={color} />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="movies"
    //     options={{
    //       title: 'Movies',
    //       tabBarIcon: ({ color, size }) => (
    //         <Ionicons name="film-outline" size={size} color={color} />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="profile"
    //     options={{
    //       title: 'Profile',
    //       tabBarIcon: ({ color, size }) => (
    //         <Ionicons name="person-outline" size={size} color={color} />
    //       ),
    //     }}
    //   />
    // </Tabs>
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MOVIE APP</Text>
      
    </View>
    <TopTabs>
    <TopTabs.Screen name="index" options={{ title: 'Movies' }} />
    <TopTabs.Screen name="searchResults" options={{ title: 'Search Results' }} />
    <TopTabs.Screen name="tvShows" options={{ title: 'TV Shows' }} />
  </TopTabs>
  </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1D3D47',
    paddingTop: 50, // for status bar spacing
    paddingBottom: 16,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
