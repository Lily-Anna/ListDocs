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

export interface TypeDocs{
  id:number;
  value:string;
}

export interface TypeOrganisation{
  id:number;
  value:string;
}

const DATA_DOCS: DataDocs[] = [
  {id:'',typeDoc: "паспорт гражданина РФ", series: '4004', number: 523131, date: new Date(2023,10,27)},
  {id:'',typeDoc: "загран. паспорт гражданина", series: 'XXII-AK', number: 676652, date: new Date(2014,10,15)},
  {id:'',typeDoc: "паспорт", series: 'XI-AK', number: 636813, date: new Date(1997, 2,8)}
];

const TYPE_DOCS: TypeDocs[] = [
{id:1, value:"паспорт гражданина РФ"},
{id:2, value:"загран. паспорт гражданина"},
{id:3, value:"свидетельство о рождении"}
];

const TYPE_ORGANISATION: TypeOrganisation[] = [
  {id:1, value:"ГУ МВД Первого района"},
  {id:2, value:"ГУ МВД Второго района"},
  {id:3, value:"ГУ МВД Третьего района)"}
  ];

@Component({
  selector: 'app-list-docs',
  templateUrl: './list-docs.component.html',
  styleUrls: ['./list-docs.component.scss'],
})

export class ListDocsComponent {
  displayedColumns: string[] = ['id','typeDoc', 'series', 'number', 'date'];
  dataSource: MatTableDataSource<DataDocs>;
  organisation = TYPE_ORGANISATION;
  docs = TYPE_DOCS;
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
