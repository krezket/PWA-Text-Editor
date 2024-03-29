import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        3
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDB = await openDB('jate', 1);
  const transaction = jateDB.transaction('jate', 'readwrite');
  const store = transaction.objectStore('jate');
  const request = store.put({id: 1, value: content});
  const result = await request;
  console.log("Saved data to db")
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDB = await openDB('jate', 1);
  const transaction = jateDB.transaction('jate', 'readonly');
  const store = transaction.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  return result.value;
};

initdb();
