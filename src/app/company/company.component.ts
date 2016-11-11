import { Component, OnInit } from '@angular/core';
import { CrmCompanyConfig } from '../models/crm-company';
import { IndexedDbService } from '../indexed-db/indexed-db.service';
import { LoggerService } from '../logger/logger.service';
import { Company, CompanyEntity } from '../models/crm-company-entity';
import { Observable, Observer } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  config: any;
  newCompany: CrmCompanyConfig = new CrmCompanyConfig;

  constructor(private indexedDb: IndexedDbService,
              private logger: LoggerService,
              private entity: CompanyEntity,
              private configService: ConfigService) {
  }

  ngOnInit() {
    this.config = this.configService.config;
  }

  get companies() {
    return new Observable((observer: Observer<Array<Company>>) => {
      observer.next(this.entity.companies);
      observer.complete();
    })
  }

  createRecord(cfg: CrmCompanyConfig) {
    var record: Company = new Company(cfg);
    this.newCompany = new CrmCompanyConfig;
    record.companyId = this.entity.createKey();
    record.lastSync = 0;
    record.lastChange = Date.now();
    record.userId = this.config.userId;
    this.indexedDb.createRecordAsync(this.config.companyStore, record).forEach(
      (readyState)=> {
        this.logger.logInfo('IndexedDB service: creating record: ' + readyState);
      }, null);
    this.entity.createRecord(record);
  }

  updateRecord(record: Company) {
    record.dirty = true;
    record.lastChange = Date.now();
    record.lastSync = 0;
    this.indexedDb.updateRecordAsync(this.config.companyStore, record).forEach(
      (readyState)=> {
        this.logger.logInfo('IndexedDB service: updating record: ' + readyState);
      }, null
    );
    this.entity.updateRecord(record);
  }

  deleteRecord(record: Company) {
    record.remove = true;
    record.dirty = true;
    record.lastSync = 0;
    var key: string = record.companyId;
    // prepare for sync framework
    // this.indexedDb.deleteRecordAsync(this.config.companyStore, key).forEach(
    this.indexedDb.updateRecordAsync(this.config.companyStore, key).forEach(
      (readyState)=> {
        this.logger.logInfo('IndexedDB service: removing record: ' + readyState);
      }, null
    );
    // prepare for sync framework
    // this.entity.deleteRecord(record);
    this.entity.updateRecord(record);
  }

  clearRecords() {
    this.indexedDb.clearObjectStoreAsync(this.config.companyStore).forEach(
      (readyState) => {
        this.logger.logInfo('IndexedDB service: clearing storage: ' + this.config.companyStore + ': ' + readyState);
      }, null
    )
  }

  sortByName() {
    this.entity.sortByName();
  }

  sortByZip() {
    this.entity.sortByZip();
  }
}
