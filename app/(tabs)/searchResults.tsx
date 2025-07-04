import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { fetchData } from '../utils/api';
import MediaItem from '../../components/MediaItem';
import Dropdown from '../../components/Dropdown';

type SearchResultItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  overview?: string;
  release_date?: string;
  popularity?: number;
  media_type?: string;
};

export default function SearchResults() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('movie');
  const [items, setItems] = useState([
    { label: 'Movie', value: 'movie' },
    { label: 'Multi', value: 'multi' },
    { label: 'TV', value: 'tv' },
  ]);
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!query) return;
    setLoading(true);
    fetchData(`/search/${type}?query=${encodeURIComponent(query)}`)
      .then(data => setResults(data.results || []))
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <Dropdown
        open={open}
        setOpen={setOpen}
        value={type}
        setValue={setType}
        items={items}
        setItems={setItems}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter search query..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />

      {query === '' ? (
        <Text style={{ marginTop: 10 }}>Please enter a search term.</Text>
      ) : loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList<SearchResultItem>
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MediaItem item={item} type={type === 'multi' ? item.media_type || 'movie' : type} />
          )}
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 10,
    borderRadius: 5,
  },
});
