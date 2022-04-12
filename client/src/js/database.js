import { openDB } from "idb";

const initdb = async () =>
	openDB("jate", 1, {
		upgrade(db) {
			if (db.objectStoreNames.contains("jate")) {
				console.log("jate database already exists");
				return;
			}
			db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
			console.log("jate database created");
		},
	});

// Logic to a method that accepts some content and adds it to the database
export const putDb = async (value) => {
	console.log("update DB");
	const jateDb = await openDB("jate", 1);
	const text = jateDb.transaction("jate", "readwrite");
	const store = text.objectStore("jate");
	const request = store.add({ value: value });
	const result = await request;
	console.log("DB is updated", result);
};

// Logic for a method that gets all the content from the database
export const getDb = async () => {
	console.log("get all DB entries");
	const jateDb = await openDB("jate", 1);
	const text = jateDb.transaction("jate", "readonly");
	const store = text.objectStore("jate");
	const request = store.getAll();
	const result = await request;
	console.log(result);
	return result;
};

initdb();
