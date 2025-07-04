import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { fetchData } from '../utils/api';

type RouteParams = {
  id: string;
  type: string;
};

type ShowDetails = {
  id: number;
  poster_path?: string;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  overview?: string;
};

export default function DetailsScreen() {
  const { id, type } = useLocalSearchParams<RouteParams>();
  const router = useRouter();

  const [details, setDetails] = useState<ShowDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && type) {
      fetchData(`/${type}/${id}`)
        .then(data => setDetails(data))
        .finally(() => setLoading(false));
    }
  }, [id, type]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }

  if (!details) {
    return <Text style={styles.errorText}>Details not found.</Text>;
  }

  const imageUrl = details.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      <Text style={styles.title}>{details.title || details.name}</Text>
      <Text style={styles.subtitle}>Release Date: {details.release_date || details.first_air_date}</Text>
      <Text style={styles.overview}>{details.overview}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    flexGrow: 1,
  },
  image: {
    width: 250,
    height: 375,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 10,
  },
  overview: {
    fontSize: 14,
    color: '#ddd',
    textAlign: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backText: {
    color: '#1E90FF',
    fontSize: 16,
  },
  errorText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
});
