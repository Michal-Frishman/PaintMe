export enum FileCategoryEnum {
    Animals = 0,
    Art = 1,
    Nature = 2,
    People = 3,
    Abstract = 4
}
export class File {
    constructor(
        public id: number,
        public name: string,
        public category: FileCategoryEnum,
        public fileUrl: string,
        public createdAt: Date,
        public createdBy: number | null,
        public updatedAt: Date,
        public updatedBy: number | null,
    ) { }
}

export type PartialFile = Partial<File>;
