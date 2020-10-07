import { Component } from '@angular/core';
import { Record } from './record';
import { ScriptService } from './script.service';
declare let pdfMake: any ;
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CropImageComponent } from './crop-image/crop-image.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   imgURL: string;
   pdfURL: string;
  data: any;
  record = new Record();
 imageDestination: string;
 imageDestination2: string;
 result1:any

  constructor(public dialog: MatDialog, private scriptService: ScriptService) {
    this.record = JSON.parse(sessionStorage.getItem('record')) || new Record();
    
    console.log('Loading External Scripts');
    this.scriptService.load('pdfMake', 'vfsFonts');

    this.data={};
  }

    ngOnInit() {
        this.imgURL = "assets/sample.png";
        this.pdfURL = "assets/download.jpg";
  }

  generatePdf(action = 'open') {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;
    }
  }

  getDocumentDefinition() {
    sessionStorage.setItem('record', JSON.stringify(this.record));
    return {
          content:[
                      { 
                          columns: [
                                          [ 'TAC image',
                                              {image:this.imageDestination,
                                                width:200,
                                                height:200,
                                            },
                                            'Observation Table',
                                            {image:this.imageDestination2,
                                                width:200,
                                                height:200,
                                            }],
                                           
                                      {
                                          table: {
                                          
                                          body: [
                                                    
                                                    [ {text: [
                                                        {text:'Aim: '},
                                                        {text:this.record.aim},
                                                        
                                                        ]   
                                                    
                                                      },
                                                    ],
                                                     [
                                                      {text:[
                                                          {text:'Theory:\n '},
                                                          {text:this.record.theory}

                                                          ]
                                                      }
                                                    ],
                                                    [
                                                      {text:[
                                                          {text:'Material Required:\n '},
                                                          {text:this.record.material}

                                                          ]
                                                      }
                                                    ],
                                                     [
                                                      {text:[
                                                          {text:'Procedure:\n '},
                                                          {text:this.record.procedure}

                                                          ]
                                                      }
                                                    ],
                                                     [
                                                      {text:[
                                                          {text:'Calculation and Discussion:\n '},
                                                          {text:this.record.calculation}

                                                          ]
                                                      }
                                                    ],
                                                     [
                                                      {text:[
                                                          {text:'Analysis:\n '},
                                                          {text:this.record.analysis}

                                                          ]
                                                      }
                                                    ]


                                                 ]
                                                  }
                                      }
                                       
                                    ],
                                    columnGap:20
                      }

                  ]   
            };
  }

  

openDialog(){
const dialogRef = this.dialog.open(ImageCropperComponent, {
      width: '1200px',
      height:'500px',
      data:{imageDestination2:this.imageDestination2
            }   
    });
    dialogRef.afterClosed().subscribe(result1 => {
      console.log('The dialog was closed');
      this.imageDestination2 = result1;
    });
}

openModal(){
const dialogRef = this.dialog.open(CropImageComponent, {
      width: '1200px',
      height:'500px',
      data:{imageDestination:this.imageDestination
            }   
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.imageDestination = result;
    });
}

}
