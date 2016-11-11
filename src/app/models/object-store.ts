/**
 * ANGULAR 2 INDEXEDDB
 * IndexedDB in the new Angular 2 applications using TypeScript
 * written by Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/angular2indexedDB
 */

/**
 * ObjectStore class.
 * Defines the object stores of the database.
 * The object stores are the primary storage mechanism for storing data in the database.
 * https://w3c.github.io/IndexedDB/
 *
 * @author Roberto Simonetti
 */
export class ObjectStore {

  /**
   * Creates the object stores.
   * The object store has a list of records which hold the data stored in the object store.
   * Each record consists of a key and a value.
   *
   * @param db The database
   */
  createStores(db: IDBDatabase) {

    // Create CompanyStore and additional indexes.
    var activities: IDBObjectStore = db.createObjectStore("activities", { keyPath: 'activityId' });

    // Create ActivityStore and indexes
    var companies: IDBObjectStore = db.createObjectStore("companies", { keyPath: 'companyId' });
    // companies.createIndex('name','name',{unique:false});
    // companies.createIndex('zip','zip',{unique:true});

    // Create ContactStore
    var contacts: IDBObjectStore = db.createObjectStore("contacts", { keyPath: 'contactId' });
    // contacts.createIndex('name','name',{unique:false});
    // contacts.createIndex('email','email',{unique:true});

    // Create DemoStore
    var demoes: IDBObjectStore = db.createObjectStore("demoes", { keyPath: 'demoId' });
    // demoes.createIndex('name','name',{unique:false});
    // demoes.createIndex('product','product',{unique:false});

    // Create NoteStore
    var notes: IDBObjectStore = db.createObjectStore("notes", { keyPath: 'noteId' });

    // Create TaskStore
    var tasks: IDBObjectStore = db.createObjectStore("tasks", { keyPath: 'taskId' });
    // tasks.createIndex('name','name',{unique:false});
    // tasks.createIndex('dueDate','dueDate',{unique:false});
  }

}
