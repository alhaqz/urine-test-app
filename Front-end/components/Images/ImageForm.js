import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors } from '../../constant/colors';
import { Image } from '../../models/Image';
import Button from '../UI/Button';
import ImagePicker from './ImagePicker';

import Amplify, { Storage } from '@aws-amplify/core';

import awsconfig from '../../src/aws-exports';
Amplify.configure(awsconfig);

function ImageForm({ onCreateImage }) {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState();

  const [mediaFiles, setMediaFiles] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  ///// upload image /////
  async function fetchImageUri(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  }

  async function uploadFile(file) {
    const img = await fetchImageUri(file.uri);
    return Storage.put(`images-filename-${Math.random()}.jpg`, img, {
      level: 'public',
      contentType: file.type,
      progressCallback(uploadProgress) {
        console.log(
          'PROGRESS--',
          uploadProgress.loaded + '/' + uploadProgress.total
        );
      },
    })
      .then((res) => {
        Storage.get(res.key)
          .then((result) => {
            console.log('RESULT ----', result);
            let awsImageUri = result.substring(0, result.indexOf('?'));
            console.log('RESULT AFTER REMOVER URI --', awsImageUri);
            setIsLoading(false);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  //// end upload img ////

  function changeTitleHandler(enteredTitle) {
    setEnteredTitle(enteredTitle);
  }

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  function saveImageHandler() {
    uploadFile(selectedImage);
    setSelectedImage({ localUri: selectedImage });
    console.log(selectedImage);
    const imageData = new Image(enteredTitle, selectedImage);
    console.log(imageData);
    // onCreateImage(imageData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Judul</Text>
        <TextInput
          style={styles.input}
          onChange={changeTitleHandler}
          value={enteredTitle}
        />
      </View>

      <ImagePicker onTakeImage={takeImageHandler} />
      <Button onPress={saveImageHandler}>Unggah Foto</Button>
    </ScrollView>
  );
}

export default ImageForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
