  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

  import { AppRoutingModule } from './app-routing.module';
  import { AppComponent } from './app.component';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  import { ImageCropperComponent } from './image-cropper/image-cropper.component';
  import { MaterialModule } from "./material/material.module";
import { PdfCropperComponent } from './pdf-cropper/pdf-cropper.component';


  @NgModule({
    declarations: [
      AppComponent,
      ImageCropperComponent,
      PdfCropperComponent
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
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
  })
  export class AppModule { }
