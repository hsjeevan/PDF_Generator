
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Cropper from "cropperjs";
//import { Record } from '../record';
import { PDFJSStatic, PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
import * as  PDFJS from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { PdfCropperComponent } from '../pdf-cropper/pdf-cropper.component';

declare global {
  const PDFJS: PDFJSStatic;
}

interface ICanvasWorkspace {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
}

class NodeCanvasFactory {
  create(width: number, height: number): ICanvasWorkspace {
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    return {
      canvas,
      context,
    };
  }

  reset(workspace: ICanvasWorkspace, width: number, height: number) {
    workspace.canvas.width = width;
    workspace.canvas.height = height;
  }

  destroy(workspace: ICanvasWorkspace) {
    workspace.canvas.width = 0;
    workspace.canvas.height = 0;
    workspace.canvas.remove();
    workspace.context = null;
  }
}


@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css']
})
export class ImageCropperComponent implements OnInit {

@ViewChild('holder', { static: true }) holder: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  pdfurl = 'assets/demo.pdf';
  result: any;
  imgURL: string;
  page_num: number = 0;
  pdfDoc: any;

 ngOnInit(){
 	this.imgURL = "assets/download.jpg";
    this.renderPDF();
  }

  constructor(public dialogRef: MatDialogRef<ImageCropperComponent>, @Inject(MAT_DIALOG_DATA) public data:any) {	 }

  renderPDF() {
    PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    PDFJS.getDocument(this.pdfurl).promise.then((pdf: PDFDocumentProxy) => {
      this.renderDoc(pdf, 1);
      this.pdfDoc = pdf;
    })
  }

  renderDoc(pdfDoc, num) {
    this.page_num = num;
    // for (var num = 1; num <= pdfDoc.numPages; num++)
    if (this.page_num <= pdfDoc.numPages) {
      pdfDoc.getPage(this.page_num).then((page) => {
        this.renderPage(page);
        console.log("num", num)
        console.log("page", page)
      });
    }

  }

  nextPage() {
    this.page_num = this.page_num + 1;
    if (this.page_num <= this.pdfDoc.numPages) {
      this.renderDoc(this.pdfDoc, this.page_num);
    }
    else {
      console.log("Error: Page Not Found")
    }

  }

  prevPage() {
    this.page_num = this.page_num - 1;
    if (this.page_num > 0) {
      this.renderDoc(this.pdfDoc, this.page_num);
    }
    else {
      console.log("Error: Page Not Found")
    }
  }

  renderPage(page) {
    var viewport = page.getViewport({ scale: 1 });
    var wrapper = document.createElement("div");
    wrapper.className = "canvas-wrapper";
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };

    canvas.height = viewport.height;
    canvas.width = viewport.width;
    wrapper.appendChild(canvas)
    //this.holder.nativeElement.appendChild(wrapper);
    page.render(renderContext).promise.then(() => {
      this.result = canvas.toDataURL('image/jpeg');
    });


  }
 
 onClose(){
 	this.dialogRef.close();
 }

}
