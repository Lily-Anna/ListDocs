import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {  MatTableDataSource } from '@angular/material/table';
import { Document } from '../Model/Document';
import { TypeDocuments } from '../Model/TypeDocuments';
import { DataserviceService } from '../services/dataservice.service';
import { NotificationService } from '../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDocumentComponent } from './add-document/add-document/add-document.component';
import { EditDocumentComponent } from './edit-document/edit-document/edit-document.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-docs',
  templateUrl: './list-docs.component.html',
  styleUrls: ['./list-docs.component.scss'],
})

export class ListDocsComponent {
  //для получения события при нажатии на checkbox
  @Output() change!: EventEmitter<MatCheckboxChange>;

  //Заголовки колонок таблиц
  displayedColumns: string[] = ['isMain', 'id', 'type', 'series', 'number', 'issueDate'];

  //данные таблицы
  dataSource!: MatTableDataSource<Document>;

  //Table Data Source
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;

  //Массив с типами документов
  docs: Array<TypeDocuments> = new Array<TypeDocuments>;

  //количество выводимых записей на страницу
  pageSize = 10;

  //текущая страница
  pageIndex = 0;

  //общее количество записей
  totalItems = 0;

  //выбранная запись
  selectedDocument: Document | undefined;

  //Значение - нужно ли выводить архивные
  isArchive: boolean;

  //Данные для формы
  filterForm: FormGroup;

  constructor(public dialog: MatDialog,
    private servise: DataserviceService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService) {
    this.dataSource = new MatTableDataSource<Document>([]);
    this.isArchive = true;
    this.filterForm = this.formBuilder.group({
      type: [null],
      number: [null],
    });
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.applyFilter();
    //получаем типы документов для фильтрации
    this.servise.getTypeDocuments().subscribe((data) => {
      this.docs = data;
    }, (error) => {
      console.log('Получение типов документов: ' + error);
    });
  }

  //Для вывода названия типа документа
  findDocById(id: number): any {
    return this.docs.find(doc => doc.id === id);
  }

  //Обработка показа архивных записей
  onChangeArchive(ob: MatCheckboxChange): void {
    this.isArchive = ob.checked;
    this.applyFilter();
  }

  //Открываем окно для созания нового документа
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddDocumentComponent);
    //После создания документа обновляем данные в таблице
    dialogRef.afterClosed().subscribe(result => {
      this.applyFilter();
    });
  }

  //Сохраняем выбранный элемент, для передачи его на редактирование или удаление
  selectedDocumnet(document: any): void {
    if (this.selectedDocument?.id == document.id) {
      this.selectedDocument = undefined;
    } else {
      this.selectedDocument = document;
    }
  }

  //Открываем окно для редактирования документа
  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditDocumentComponent, { data: this.selectedDocument, });
    //После создания документа обновляем данные в таблице
    dialogRef.afterClosed().subscribe(result => {
      this.applyFilter();
    });
  }

  //Удаление элемента
  deleteDocument(): void {
    this.servise.delete(this.selectedDocument?.id, this.selectedDocument).subscribe(
      (response) => {
        this.notificationService.showSuccess('Документ удалён!');

        //обнуляем выбранный элемент
        this.selectedDocument = undefined;

        //переходим на первую страницу
        this.pageIndex = 0;

        //обновляем данные в таблице
        this.applyFilter();
      },
      (error) => {
        this.notificationService.showError('Ошибка при выполнении действия: ' + error.message);
      });
  }

  //Пагинация
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyFilter();
  }

  /** Сортировка даннх в таблице по столбцам */
  announceSortChange(sortState: Sort) {
    this.dataSource.data.sort((a, b) => {
      switch (sortState.active) {
        case 'id': {
          // Сортировка по полю id
          if (a.id < b.id) {
            return sortState.direction === 'asc' ? -1 : 1;
          } else if (a.id > b.id) {
            return sortState.direction === 'asc' ? 1 : -1;
          }
          break;
        }
        case 'type': {
          // Сортировка по полю type
          if (a.type < b.type) {
            return sortState.direction === 'asc' ? -1 : 1;
          } else if (a.type > b.type) {
            return sortState.direction === 'asc' ? 1 : -1;
          }
          break;
        }
        case 'series': {
          // Сортировка по полю series
          if (a.series < b.series) {
            return sortState.direction === 'asc' ? -1 : 1;
          } else if (a.series > b.series) {
            return sortState.direction === 'asc' ? 1 : -1;
          }
          break;
        }
        case 'number': {
          // Сортировка по полю number
          if (a.number < b.number) {
            return sortState.direction === 'asc' ? -1 : 1;
          } else if (a.number > b.number) {
            return sortState.direction === 'asc' ? 1 : -1;
          }
          break;
        }
        case 'issueDate': {
          // Сортировка по полю issueDate
          if (a.issueDate < b.issueDate) {
            return sortState.direction === 'asc' ? -1 : 1;
          } else if (a.issueDate > b.issueDate) {
            return sortState.direction === 'asc' ? 1 : -1;
          }
          break;
        }
      }
      // Если все поля равны, сохраняем исходный порядок
      return 0;
    });

    // Обновяем таблицу после сортировки
    this.dataSource._updateChangeSubscription();
  }

  //Фильтрация данных
  applyFilter() {
    //Поисковые данные
    const filterData = this.filterForm.value;
    //Начальный индекс
    const start = this.pageIndex * this.pageSize;
    //Получения данных. Если фильтр пустой, то выводит все данные
    this.servise.getForTypeDocuments(start, this.pageSize, filterData?.type, filterData?.number, this.isArchive).subscribe((data) => {
      this.dataSource.data = data;
    }, (error) => {
      console.log(error);
    });
    //Получение общего количества данных в базе по запросу
    this.servise.getForTypeDocuments(-1, -1, filterData?.type, filterData?.number, this.isArchive).subscribe((count) => {
      this.totalItems = count.length;
    }, (error) => {
      console.log('Error getting document count:', error);
    });

    //Загружаем в таблицу полученные данные с нужной сортировкой
    this.dataSource.sortData(this.dataSource.data, this.sort);

    this.dataSource._updateChangeSubscription();
  }

  //Очистить фильтр
  clearFilter() :void{ 
    this.filterForm.reset();
    this.applyFilter();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}