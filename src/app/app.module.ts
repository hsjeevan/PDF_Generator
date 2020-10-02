  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';

  import { AppRoutingModule } from './app-routing.module';
  import { AppComponent } from './app.component';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  import { ImageCropperComponent } from './image-cropper/image-cropper.component';
  import { MaterialModule } from "./material/material.module";


  @NgModule({
    declarations: [
      AppComponent,
      ImageCropperComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MaterialModule
    ],

    providers: [],
    entryComponents: [
      ImageCropperComponent   
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
