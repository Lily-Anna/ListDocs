export interface Document {
  id: number;
  type: number;
  series: string;
  number: string;
  issueDate: Date;
  isMain:boolean;
  isArchive:boolean;
  organisation:number;
  code:string;
}
