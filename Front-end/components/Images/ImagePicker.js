import { Alert, Image, View, Text, StyleSheet } from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
} from 'expo-image-picker';
import { useState } from 'react';

import { Colors } from '../../constant/colors';
import OutlinedButton from '../UI/OutlineButton';

function ImagePicker({ onTakeImage }) {
  const [pickedImage, setPickedImage] = useState();

  const [cameraPermissionInformation, requestCameraPermission] =
    useCameraPermissions();

  const [photosPermissionInformation, requestPhotosPermission] =
    useMediaLibraryPermissions();

  async function verifyPermission() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionRespone = await requestCameraPermission();

      return permissionRespone.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.'
      );
      return false;
    }

    if (photosPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionRespone = await requestPhotosPermission();

      return permissionRespone.granted;
    }

    if (photosPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant storage permissions to use this app.'
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  }

  async function selectImageHandler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const image = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Ambil Foto
      </OutlinedButton>
      <OutlinedButton icon="image-outline" onPress={selectImageHandler}>
        Pilih Foto
      </OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
