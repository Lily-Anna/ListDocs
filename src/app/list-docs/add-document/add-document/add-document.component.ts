import { Component} from '@angular/core';
import { Document } from '../../../Model/Document';
import { TypeDocuments } from 'src/app/Model/TypeDocuments';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { Organisation } from 'src/app/Model/Organization';
import { NotificationService } from 'src/app/services/notification.service';
import { formatDate } from '@angular/common';
import '@angular/common/locales/global/ru';
@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent {

  //Массив с типами документов
  docs: Array<TypeDocuments> = new Array<TypeDocuments>;

  //Массив с организациями
  organisation: Array<Organisation> = new Array<Organisation>;

  //Данные для формы
  documentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private servise: DataserviceService,
    public dialogRef: MatDialogRef<Document>
  ) {
    const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0); // Установите время на 00:00:00
    this.documentForm = this.formBuilder.group({
      id: [null],
      type: [null, Validators.required],
      series: [''],
      number: ['', Validators.required],
      issueDate: [formatDate(currentDate, 'dd/MM/yyyy', 'ru')],
      isMain: [false],
      isArchive: [false],
      organisation: [null],
      code: ['', Validators.pattern('[0-9]{3}-[0-9]{3}')]
    });
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

  //Создание документа
  onSubmit() {
    if (this.documentForm.valid) {
      // Получаем данные с формы
      var documentData = this.documentForm.value;
      documentData.issueDate = this.documentForm.value.issueDate.toISOString().split('T')[0];
      //отправляем запрос на добавление документа
      this.servise.postData(documentData).subscribe(
        (response) => {
          this.notificationService.showSuccess('Документ создан! ');
        },
        (error) => {
          this.notificationService.showError('Ошибка при выполнении действия: ' + error);
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
