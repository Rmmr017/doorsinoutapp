import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from './grid/grid.module';
import { DoorsData } from './models/door-list';
import { GuestData } from './models/guest-list';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    BrowserAnimationsModule
  ],
  providers: [ 
    GuestData,
    DoorsData,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
