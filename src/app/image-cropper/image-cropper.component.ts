import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css']
})
export class ImageCropperComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ImageCropperComponent>) { }

  ngOnInit(): void {
  }
 
 onClose(){
 	this.dialogRef.close();
 }
}
