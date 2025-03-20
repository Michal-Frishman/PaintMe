// export enum FileCategoryEnum {
//     Animals = 0,
//     Art = 1,
//     Nature = 2,
//     People = 3,
//     Abstract = 4,
// }
export type File = {
    id: number;
    name: string;
    categoryId: number;
    fileUrl: string;
};
export type ColoredFile={
    id: number;
    originalDrawingId: number;
    coloredImageUrl: string;
    userId:number;
}

