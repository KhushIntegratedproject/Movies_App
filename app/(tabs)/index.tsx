import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { fetchData } from '../utils/api';
import MediaItem from '../../components/MediaItem';
import Dropdown from '../../components/Dropdown';


type MovieItem = {
  id: number;
    title?: string;
    name?: string;
    poster_path?: string;
    overview?: string;
    release_date?: string;
    first_air_date?: string;
    popularity?: number;
};

export default function HomeScreen() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('now_playing');
  const [items, setItems] = useState([
    { label: 'Now Playing', value: 'now_playing' },
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
  ]);

  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchData(`/movie/${category}`)
      .then(data => setMovies(data.results || []))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movies</Text>

      <Dropdown
        open={open}
        setOpen={setOpen}
        value={category}
        setValue={setCategory}
        items={items}
        setItems={setItems}
      />

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <MediaItem item={item} type="movie" />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
