import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function MediaItem({ item, type }: any) {
  const router = useRouter();
  const imageUrl = item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : null;

  return (
    <View style={styles.card}>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title || item.name}</Text>

         {item.popularity && (
          <Text style={styles.metaText}>Popularity: {item.popularity.toFixed(0)}</Text>
        )}

        {item.release_date && (
          <Text style={styles.metaText}> Release: {item.release_date}</Text>
        )}

        <TouchableOpacity style={styles.detailsButton} onPress={() => router.push(`/details/${item.id}?type=${type}`)}>
          <Text style={styles.detailsButtonText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsButton: {
  backgroundColor: '#00BCD4', // Cyan blue
  paddingVertical: 10,
  paddingHorizontal: 21,
  borderRadius: 0,
  alignItems: 'center',
  // marginTop: 10,
},
detailsButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},
  card: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 0,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 0,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
  metaText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#555',
  },
});
