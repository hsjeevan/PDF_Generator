
import { Component, OnInit, ViewChild, Input, ElementRef, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Cropper from "cropperjs";
import { Record } from '../record';


@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css']
})
export class ImageCropperComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ImageCropperComponent>, @Inject(MAT_DIALOG_DATA) public data:any) {	 }

  ngOnInit(): void {}
 
 onClose(){
 	this.dialogRef.close();
 }
}
