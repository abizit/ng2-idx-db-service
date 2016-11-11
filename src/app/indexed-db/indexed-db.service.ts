'use strict';

import { Injectable } from '@angular/core';
import { Observer, Observable } from 'rxjs';

import { ObjectStore } from '../models/object-store';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class IndexedDbService {
  db: IDBDatabase;

  constructor(private logger: LoggerService) {
  }

  private getObjectStore(storeName: string, mode: string) {
    var tx: IDBTransaction = this.db.transaction(storeName, mode);
    return tx.objectStore(storeName);
  }

  openDBAsync(dbName: string, version: number) {
    return new Observable((observer: Observer<string>) => {
      // open
      var request: IDBOpenDBRequest = indexedDB.open(dbName, version);
      // success
      request.onsuccess = (event: Event) => {
        this.db = (<IDBOpenDBRequest>event.target).result;
        observer.next((<IDBOpenDBRequest>event.target).readyState);
        observer.complete();
      };
      // error
      request.onerror = (event: Event) => {
        this.logger.logError('IndexedDB service: ' + (<IDBOpenDBRequest>event.target).error.name);
        observer.error((<IDBOpenDBRequest>event.target).error.name);
      };
      // upgrade - does not exist - create it.
      request.onupgradeneeded = (event: Event) => {
        this.db = (<IDBOpenDBRequest>event.target).result;
        var objectStores: ObjectStore = new ObjectStore();
        objectStores.createStores(this.db);
        this.logger.logInfo('IndexedDB server: creating ' + dbName + ' completed');
      }
    })
  }

  getAllRecordsAsync(storeName: string) {
    // Gets the object store.
    var store: IDBObjectStore = this.getObjectStore(storeName, "readonly");
    return new Observable((observer: Observer<any>) => {
      var request: IDBRequest = store.openCursor();
      // Success.
      request.onsuccess = (event: Event) => {
        // Steps through all the values in the object store.
        var cursor: IDBCursorWithValue = (<IDBRequest>event.target).result;
        if (cursor) {
          observer.next(cursor.value);
          cursor.continue();
        }
        else {
          observer.complete();
        }
      };
      // Error.
      request.onerror = (event: Event) => {
        this.logger.logError('IndexedDB service: ' + (<IDBRequest>event.target).error.name);
        observer.error((<IDBRequest>event.target).error.name);
      }
    });
  }

  createRecordAsync(storeName: string, record: any) {
    // Gets the object store.
    var store: IDBObjectStore = this.getObjectStore(storeName, "readwrite");
    return new Observable((observer: Observer<string>) => {
      var request: IDBRequest = store.add(record); // Adds a new record.
      // Success.
      request.onsuccess = (event: Event) => {
        observer.next((<IDBRequest>event.target).readyState);
        observer.complete();
      };
      // Error.
      request.onerror = (event: Event) => {
        console.log('IndexedDB service: ' + (<IDBRequest>event.target).error.name);
        observer.error((<IDBRequest>event.target).error.name);
      }
    });
  }


  updateRecordAsync(storeName: string, record: any) {
    // Gets the object store.
    var store: IDBObjectStore = this.getObjectStore(storeName, "readwrite");
    return new Observable((observer: Observer<string>) => {
      var request: IDBRequest = store.put(record); // Puts the updated record back into the database.
      // Success.
      request.onsuccess = (event: Event) => {
        observer.next((<IDBRequest>event.target).readyState);
        observer.complete();
      };
      // Error.
      request.onerror = (event: Event) => {
        console.log('IndexedDB service: ' + (<IDBRequest>event.target).error.name);
        observer.error((<IDBRequest>event.target).error.name);
      }
    });
  }

  deleteRecordAsync(storeName: string, key: string) {
    // Gets the object store.
    var store: IDBObjectStore = this.getObjectStore(storeName, "readwrite");
    return new Observable((observer: Observer<string>) => {
      var request: IDBRequest = store.delete(key); // Deletes the record by the key.
      // Success.
      request.onsuccess = (event: Event) => {
        observer.next((<IDBRequest>event.target).readyState);
        observer.complete();
      };
      // Error.
      request.onerror = (event: Event) => {
        console.log('IndexedDB service: ' + (<IDBRequest>event.target).error.name);
        observer.error((<IDBRequest>event.target).error.name);
      }
    });
  }

  clearObjectStoreAsync(storeName: string) {
    // Gets the object store.
    var store: IDBObjectStore = this.getObjectStore(storeName, "readwrite");
    return new Observable((observer: Observer<string>) => {
      var request: IDBRequest = store.clear(); // Clears the object store.
      // Success.
      request.onsuccess = (event: Event) => {
        observer.next((<IDBRequest>event.target).readyState);
        observer.complete();
      };
      // Error.
      request.onerror = (event: Event) => {
        console.log('IndexedDB service: ' + (<IDBRequest>event.target).error.name);
        observer.error((<IDBRequest>event.target).error.name);
      }
    });
  }

  closeDB() {
    this.db.close();
  }
}
