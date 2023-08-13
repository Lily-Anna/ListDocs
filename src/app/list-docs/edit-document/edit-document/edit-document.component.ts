import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Document } from 'src/app/Model/Document';
import { Organisation } from 'src/app/Model/Organization';
import { TypeDocuments } from 'src/app/Model/TypeDocuments';
import { DataserviceService } from 'src/app/dataservice.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.scss']
})
export class EditDocumentComponent {
  docs: Array<TypeDocuments>= new Array<TypeDocuments>;
  organisation: Array<Organisation>= new Array<Organisation>;
  documentForm: FormGroup;
  editDoc:Document;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Document,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private servise: DataserviceService,
    public dialogRef: MatDialogRef<Document>) {
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
    this.editDoc = data;
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
   console.log('Получение организаций: '+ error);
 }); 
  }

  onSubmit() {
    if (this.documentForm.valid) {
      // Get the form values
      const documentData = this.documentForm.value;
      this.servise.update(this.editDoc.id, documentData).subscribe(
        (response) => {
          this.notificationService.showSuccess('Документ изменён!');
        },
        (error) => {
          this.notificationService.showError('Ошибка при выполнении действия: '+ error.message);
        }
      );
      this.dialogRef.close();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
