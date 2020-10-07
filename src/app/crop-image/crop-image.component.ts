import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import Cropper from "cropperjs";

@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.css']
})
export class CropImageComponent implements OnInit {

@ViewChild("image", { static: false })
  public imageElement: ElementRef;

  @Input("src")
  public imageSource: string="assets/sample.png";

  public imageDestination: string;
  private cropper: Cropper;

  constructor() {this.imageDestination = ""; }

  ngOnInit(): void {
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
        const canvas = this.cropper.getCroppedCanvas({ minWidth: 256, minHeight: 256, maxWidth: 4096, maxHeight: 4096, fillColor: '#fff', imageSmoothingEnabled: false, imageSmoothingQuality: 'low', });

        canvas.toBlob((blob) => {
          this.imageDestination = canvas.toDataURL("image/jpg");
        }, 'image/jpeg', 1);
      }
    });
  }
resetCropper() {
    this.cropper.destroy();
    this.imageDestination = " ";
  }
}
