import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableModule,} from '@angular/material/table';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';

export interface DataDocs {
  id:string,
  typeDoc: string;
  series: string;
  number: number;
  date: Date;
}

const DATA_DOCS: DataDocs[] = [
  {id:'',typeDoc: "паспорт гражданина РФ", series: '4004', number: 523131, date: new Date(2023,10,27)},
  {id:'',typeDoc: "загран. паспорт гражданина", series: 'XXII-AK', number: 676652, date: new Date(2014,10,15)},
  {id:'',typeDoc: "паспорт", series: 'XI-AK', number: 636813, date: new Date(1997, 2,8)}
];

@Component({
  selector: 'app-list-docs',
  templateUrl: './list-docs.component.html',
  styleUrls: ['./list-docs.component.scss'],
})

export class ListDocsComponent {
  displayedColumns: string[] = ['id','typeDoc', 'series', 'number', 'date'];
  dataSource: MatTableDataSource<DataDocs>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor() {

    this.dataSource = new MatTableDataSource(DATA_DOCS);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
