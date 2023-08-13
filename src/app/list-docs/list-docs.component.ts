import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatTableModule, } from '@angular/material/table';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { Document } from '../Model/Document';
import { TypeDocuments } from '../Model/TypeDocuments';
import { DataserviceService } from '../dataservice.service';
import { NotificationService } from '../notification.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDocumentComponent } from './add-document/add-document/add-document.component';
import { EditDocumentComponent } from './edit-document/edit-document/edit-document.component';
;


@Component({
  selector: 'app-list-docs',
  templateUrl: './list-docs.component.html',
  styleUrls: ['./list-docs.component.scss'],
})


export class ListDocsComponent {
 
  documents: Document[] = [];
 //Заголовки колонок таблиц
  displayedColumns: string[] = ['isMain','id', 'type', 'series', 'number', 'issueDate'];
  dataSource!: MatTableDataSource<Document>;
  //Table Data Source
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;
  docs: Array<TypeDocuments> = new Array<TypeDocuments>;
  pageSize = 10;
  pageIndex = 0;
  totalItems = 0;
  selectedDocument:Document | undefined;
  constructor(public dialog: MatDialog, private servise: DataserviceService) {
    this.dataSource = new MatTableDataSource<Document>([]);
  }
  
  ngOnInit() {
    this.dataSource.sort = this.sort;
      this.getAllDocuments();
    this.servise.getTypeDocuments().subscribe((data)=>{
      this.docs = data;
   },(error)=>{
     console.log('Получение типов документов: '+error);
   });  
  }

  getAllDocuments(): void {
    const start = this.pageIndex * this.pageSize;
    this.servise.getDocuments(start, this.pageSize).subscribe((data) => {
        this.dataSource = new MatTableDataSource<Document>(data);
      }, (error) => {
        console.log('Error getting documents:', error);
      });
      this.servise.getAllDocuments().subscribe((count) => {
        this.totalItems = count.length;
      }, (error) => {
        console.log('Error getting document count:', error);
      });
      this.dataSource.sortData(this.dataSource.data, this.sort);
  }

  //Открываем окно для созания нового документа
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddDocumentComponent);
    //После создания документа обновляем данные в таблице
    dialogRef.afterClosed().subscribe(result => {
      this.getAllDocuments();
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
  openEditDialog():void{
    const dialogRef = this.dialog.open(EditDocumentComponent,{ data:  this.selectedDocument,});
    //После создания документа обновляем данные в таблице
    dialogRef.afterClosed().subscribe(result => {
      this.getAllDocuments();
    });
  }
  //Удаление элемента
  deleteDocument():void{

  }

  //Пагинация
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllDocuments();
  }
  
  /** Announce the change in sort state for assistive technology. */
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}

