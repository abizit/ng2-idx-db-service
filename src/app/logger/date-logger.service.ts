
/* tslint:disable:one-line:check-open-brace*/
import { Injectable }    from '@angular/core';
/**
 * Created by fh on 06-10-16.
 * source forked from angular.io
 */
import { LoggerService } from './logger.service';

// class used as a restricting interface (hides other public members)
export abstract class MinimalLogger {
  logInfo: (msg: string) => void;
  logs: string[];
}

@Injectable()
export class DateLoggerService extends LoggerService implements MinimalLogger {
  logInfo(msg: any) {
    super.logInfo(stamp(msg));
  }

  logDebug(msg: any) {
    super.logDebug(stamp(msg));
  }

  logError(msg: any) {
    super.logError(stamp(msg));
  }
}

function stamp(msg: any) {
  return msg + ' at ' + new Date();
}
