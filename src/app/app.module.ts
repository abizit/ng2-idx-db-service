import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { IndexedDbService } from './indexed-db/indexed-db.service';
import { CompanyEntity } from './models/crm-company-entity';
import { LoggerService } from './logger/logger.service';
import { CompanyComponent } from './company/company.component';
import { ConfigService } from './config/config.service';

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [IndexedDbService, CompanyEntity, LoggerService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
