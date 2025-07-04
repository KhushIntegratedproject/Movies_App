import { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchData } from '../utils/api';
import MediaItem from '../../components/MediaItem';
import Dropdown from '../../components/Dropdown';

type TvShowItem = {
  id: number;
  name: string;
  poster_path?: string;
  first_air_date?: string;
  overview?: string;
  vote_average?: number;
};

export default function TvShows() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('airing_today');
  const [items, setItems] = useState([
    { label: 'Airing Today', value: 'airing_today' },
    { label: 'On The Air', value: 'on_the_air' },
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
  ]);

  const [shows, setShows] = useState<TvShowItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchData(`/tv/${category}`)
      .then(data => setShows(data.results || []))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <View style={styles.container}>
      <Dropdown
        open={open}
        setOpen={setOpen}
        value={category}
        setValue={setCategory}
        items={items}
        setItems={setItems}
      />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={shows}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <MediaItem item={item} type="tv" />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
});
