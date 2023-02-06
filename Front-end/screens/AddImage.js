import ImageForm from '../components/Images/ImageForm';
import { insertImage } from '../util/database';

function AddImage({ navigation }) {
  async function createImageHandler(image) {
    await insertImage(image);
    navigation.navigate('AllImages');
  }

  return <ImageForm onCreateImage={createImageHandler} />;
}

export default AddImage;
