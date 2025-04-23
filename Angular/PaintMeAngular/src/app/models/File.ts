export class File {
    constructor(
        public id:number,
        public Name:string  ,
        public CategoryId:number  ,
        public FileUrl:string  
    ) { }
}

export type PartialFile = Partial<File>;
