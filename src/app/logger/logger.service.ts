import { Injectable } from '@angular/core';
/**
 * Created by fh on 06-10-16.
 * source forked from angular.io
 */

@Injectable()
export class LoggerService {
  logs: string[] = [];

  logInfo(msg: any) {
    this.log(`INFO: ${msg}`);
  }

  logDebug(msg: any) {
    this.log(`DEBUG: ${msg}`);
  }

  logError(msg: any) {
    this.log(`ERROR: ${msg}`, true);
  }

  private log(msg: any, isErr = false) {
    this.logs.push(msg);
    isErr ? console.error(msg) : console.log(msg);
  }
}
