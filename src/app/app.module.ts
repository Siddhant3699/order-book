import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { OrderBookComponent } from './components/order-book/order-book.component';
import { BidComponent } from './components/bid/bid.component';
import { AskComponent } from './components/ask/ask.component';

import { OrderBookObjectBuilderPipe } from './pipes/order-book-object-builder.pipe';
import { TotalCalculatorPipe } from './pipes/total-calculator.pipe';
import { AbsoluteValuePipe } from './pipes/absolute-value.pipe';
import { OrderByPriceLevelPipe } from './pipes/order-by-price-level.pipe';
import { DataFilterPipe } from './pipes/data-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    OrderBookComponent,
    BidComponent,
    AskComponent,
    OrderBookObjectBuilderPipe,
    TotalCalculatorPipe,
    AbsoluteValuePipe,
    OrderByPriceLevelPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [DataFilterPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
