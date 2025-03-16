export enum FileCategoryEnum {
    Animals = 0,
    Art = 1,
    Nature = 2,
    People = 3,
    Abstract = 4
}
export class File {
    constructor(
        public Name:string  ,
        public CategoryId:number  ,
        public FileUrl:string  
    ) { }
}

export type PartialFile = Partial<File>;
