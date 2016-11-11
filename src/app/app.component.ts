import { Component, OnInit } from '@angular/core';
import { IndexedDbService } from './indexed-db/indexed-db.service';
import { CompanyEntity, Company } from './models/crm-company-entity';
import { LoggerService } from './logger/logger.service';
import { ConfigService } from './config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  config: any;

  constructor(public indexedDB: IndexedDbService,
              public cEntity: CompanyEntity,
              public logger: LoggerService,
              public configService: ConfigService) {
  }

  ngOnInit() {
    this.config = this.configService.config;
    this.openDb(this.config.dbName);
  }

  openDb(dbName: string) {
    this.indexedDB.openDBAsync(dbName, 1).forEach(
      (readyState: string)=> {
        this.logger.logInfo('IndexedDB service: opening ' + dbName + ': ' + readyState);
      }, null)
      .then(()=> {
          this.indexedDB.getAllRecordsAsync(this.config.companyStore)
            .forEach((record: Company) => {
              if (record != null) {
                this.cEntity.addRecord(record);
              }
            }, null)
            .then(()=> this.logger.logInfo('IndexedDB service: ' + this.config.companyStore + ' obtaining all records  complete'))
        }
      )
  }

}
