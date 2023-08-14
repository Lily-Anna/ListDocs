import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Document } from 'src/app/Model/Document';
import { Organisation } from 'src/app/Model/Organization';
import { TypeDocuments } from 'src/app/Model/TypeDocuments';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.scss']
})
export class EditDocumentComponent {
  //Массив с типами документов
  docs: Array<TypeDocuments> = new Array<TypeDocuments>;

  //Массив с организациями
  organisation: Array<Organisation> = new Array<Organisation>;

  //Данные для формы
  documentForm: FormGroup;

  //Данные для реджактирования
  editDoc: Document;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Document,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private servise: DataserviceService,
    public dialogRef: MatDialogRef<Document>
  ) {
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
    //получение типов документов
    this.servise.getTypeDocuments().subscribe((data) => {
      this.docs = data;
    }, (error) => {
      console.log('Получение типов документов: ' + error);
    });

    //получение организаций
    this.servise.getOrganisation().subscribe((data) => {
      this.organisation = data;
    }, (error) => {
      console.log('Получение организаций: ' + error);
    });
  }

  //Изменение документа
  onSubmit() {
    if (this.documentForm.valid) {
      //  Получаем данные с формы
      const documentData = this.documentForm.value;
      this.servise.update(this.editDoc.id, documentData).subscribe(
        (response) => {
          this.notificationService.showSuccess('Документ изменён!');
        },
        (error) => {
          this.notificationService.showError('Ошибка при выполнении действия: ' + error.message);
        }
      );
      this.dialogRef.close();
    }
  }

  //закрыть окно без сохранения
  onNoClick(): void {
    this.dialogRef.close();
  }
}
