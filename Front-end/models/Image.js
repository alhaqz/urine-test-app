export class Image {
  constructor(title, imageUri, id) {
    this.title = title;
    this.imageUri = imageUri;
    this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.id = id;
  }
}
