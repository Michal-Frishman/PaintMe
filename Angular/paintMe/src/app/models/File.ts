export class File {
    constructor(
        public name: string,
        public categoryId: number,
        public fileUrl: string,
        public id?: number) { }
}

export type PartialFile = Partial<File>;
