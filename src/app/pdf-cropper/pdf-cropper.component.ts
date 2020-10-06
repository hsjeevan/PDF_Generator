import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import Cropper from "cropperjs";

@Component({
  selector: 'app-pdf-cropper',
  templateUrl: './pdf-cropper.component.html',
  styleUrls: ['./pdf-cropper.component.css']
})
export class PdfCropperComponent implements OnInit {

@ViewChild("image", { static: false })
  public imageElement: ElementRef;

  @Input("src")
  public imageSource: string;

  public imageDestination: string;
  private cropper: Cropper;
  //imageSource: string = "assets/sample.png";


  constructor() {this.imageDestination = ""; }


  public ngAfterViewInit() {
    // this.imageSource = this.imageInput ? this.imageInput : 'assets/sample.png';
    //this.getCropper();

  }

  getCropper() {
    return this.cropper = new Cropper(this.imageElement.nativeElement, {
      zoomable: true,
      scalable: true,
      aspectRatio: 1,

      ready() {
        this.cropper.crop();
      },
      crop: () => {
        //const canvas = this.cropper.getCroppedCanvas();
        const canvas = this.cropper.getCroppedCanvas({ minWidth: 256, minHeight: 256, maxWidth: 4096, maxHeight: 4096, fillColor: '#fff', imageSmoothingEnabled: false, imageSmoothingQuality: 'low', });
        //this.imageDestination = canvas.toDataURL("image/png");
        canvas.toBlob((blob) => {
          this.imageDestination = canvas.toDataURL("image/jpg");
        }, 'image/jpeg', 1);
      }
    });
  }

  ngOnInit(): void {
  }

   resetCropper() {
    this.cropper.destroy();
    this.imageDestination = " ";
  }

}
