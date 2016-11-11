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
    this.logger.logInfo(JSON.stringify(cfg));
    var company: Company = new Company(cfg);
    this.newCompany = new CrmCompanyConfig;
    company.companyId = this.entity.createKey();
    this.logger.logDebug('companyId: ' + company.companyId);
    company.lastSync = 0;
    company.lastChange = Date.now();
    company.userId = this.config.userId;
    this.indexedDb.createRecordAsync(this.config.companyStore, company).forEach(
      (readyState)=> {
        this.logger.logInfo('IndexedDB service: adding record: ' + readyState);
      }, null);
    this.entity.addRecord(company);
  }

  deleteRecord(company: Company) {
    company.remove = true;
    company.dirty = true;
    company.lastSync = 0;
    var key: string = company.companyId;
    this.indexedDb.deleteRecordAsync(this.config.companyStore, key).forEach(
      (readyState)=> {
        this.logger.logInfo('IndexedDB service: deleting record: ' + readyState);
      }, null
    );
    this.entity.deleteRecord(company);
  }

  updateRecord(company: Company) {
    this.indexedDb.updateRecordAsync(this.config.companyStore, company).forEach(
      (readyState)=> {
        this.logger.logInfo('IndexedDB service: editing record: ' + readyState);
      }, null
    );
    this.entity.editRecord(company);
  }

  clearRecords() {
    this.indexedDb.clearObjectStoreAsync(this.config.companyStore).forEach(
      (readyState) => {
        this.logger.logInfo('IndexedDB service: clearing object store: ' + this.config.companyStore + ': ' + readyState);
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
