export class File {
    constructor(
        public id:number,
        public name:string  ,
        public categoryId:number  ,
        public fileUrl:string  
    ) { }
}

export type PartialFile = Partial<File>;
