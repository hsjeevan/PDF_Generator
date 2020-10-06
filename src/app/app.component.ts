import { Component } from '@angular/core';
import { Record } from './record';
import { ScriptService } from './script.service';
declare let pdfMake: any ;
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //name:string;
   image1:string;
  data: any;
  record = new Record();
 imageDestination: string;

  constructor(public dialog: MatDialog, private scriptService: ScriptService) {
    this.record = JSON.parse(sessionStorage.getItem('record')) || new Record();
    
    console.log('Loading External Scripts');
    this.scriptService.load('pdfMake', 'vfsFonts');

    this.data={};
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
                                      {image:this.imageDestination,
                                        width:200,
                                        height:400},
                                      
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
                      },

                  ]   
            };
  }

  getRecordPicObject() {
    if (this.imageDestination) {
      return {
        image: this.imageDestination ,
        width: 200,
        height:400,
        alignment : 'left'
      };
    }
    return null;
  }
  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }
  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.image1 = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };

  }

openDialog(){
const dialogRef = this.dialog.open(ImageCropperComponent, {
      width: '1200px',
      height:'500px',
      data:{   imageDestination:this.imageDestination
}
      
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.imageDestination = result;
    });
  
 //  const dialogConfig= new MatDialogConfig();
 //  dialogConfig.disableClose=true;
 //  dialogConfig.autoFocus=true;
 //  dialogConfig.width="100%";  
 //  dialogConfig.height="50%";
  //  this.dialog.open(ImageCropperComponent, dialogConfig);

}

}
