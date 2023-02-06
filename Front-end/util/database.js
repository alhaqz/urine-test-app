import * as SQlite from 'expo-sqlite';

import { Image } from '../models/Image';

const database = SQlite.openDatabase('images.db');

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS images (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            date DATETIME NOT NULL
        )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function insertImage(image) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO images (title, imageUri, date ) VALUES (?, ?, ?)`,
        [image.title, image.imageUri, image.date],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
}

export function fetchImages() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM images',
        [],
        (_, result) => {
          console.log(result);
          const images = [];

          for (const dp of result.rows._array) {
            images.push(new Image(dp.title, dp.imageUri, dp.date, dp.id));
          }
          resolve(images);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
