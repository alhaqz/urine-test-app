import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constant/colors';
import ImageItem from './ImageItem';

function ImagesList({ images }) {
  if (!images || images.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          Belum terdapat pengecekan kadar Kreatinin - Silahkan memulai
          pengecekan terlebih dahulu!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={images}
      keyExtractor={(item) => item.id}
      renderItem={(item) => <ImageItem image={item} />}
    />
  );
}

export default ImagesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
