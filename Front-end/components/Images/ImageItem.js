import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constant/colors';

function ImageItem({ image, onSelect }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect}
    >
      <Image style={styles.image} source={{ uri: image.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{image.title}</Text>
        <Text style={styles.address}>{image.date}</Text>
      </View>
    </Pressable>
  );
}

export default ImageItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.88,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: 'bold',
    color: Colors.gray700,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
});
