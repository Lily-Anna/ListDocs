import { Component, Inject ,OnInit} from '@angular/core';
import { Document } from '../../../Model/Document';
import { TypeDocuments } from 'src/app/Model/TypeDocuments';
import { getAllTypeDocuments } from 'json-server/server'
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataserviceService } from 'src/app/dataservice.service';
import { Organisation } from 'src/app/Model/Organization';
import { NotificationService } from 'src/app/notification.service';
@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent {
  docs: Array<TypeDocuments>= new Array<TypeDocuments>;
  organisation: Array<Organisation>= new Array<Organisation>;
  documentForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private notificationService: NotificationService, private servise: DataserviceService, public dialogRef: MatDialogRef<Document>) {
    this.documentForm = this.formBuilder.group({
      id: [null],
      type: [null, Validators.required],
      series: [''],
      number: ['', Validators.required],
      issueDate: [null],
      isMain: [false],
      isArchive: [false],
      organisation: [null],
      code: ['', Validators.pattern('[0-9]{3}-[0-9]{3}')]
    });
  }
 
  ngOnInit(): void {
    this.servise.getTypeDocuments().subscribe((data)=>{
      this.docs = data;
   },(error)=>{
     console.log('Получение типов документов: '+error);
   });  
   this.servise.getOrganisation().subscribe((data)=>{
    this.organisation = data;
 },(error)=>{
   console.log('Получение организаций: '+error);
 }); 
  }

  onSubmit() {
    if (this.documentForm.valid) {
      // Get the form values
      const documentData = this.documentForm.value;
      this.servise.postData(documentData).subscribe(
        (response) => {
          this.notificationService.showSuccess('Документ создан! ');
        },
        (error) => {
          this.notificationService.showError('Ошибка при выполнении действия: '+error);
        }
      );
      this.dialogRef.close();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
