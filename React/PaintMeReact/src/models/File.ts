export enum FileCategoryEnum {
    Animals = 0,
    Art = 1,
    Nature = 2,
    People = 3,
    Abstract = 4,
}
export type File = {
    id: number;
    name: string;
    category: FileCategoryEnum;
    fileUrl: string;
    createdAt: Date;
    createdBy?: number;
    updatedAt: Date;
    updatedBy?: number;
};

