export enum RoleEnum {
    Admin = 0,
    User = 1,
}
export type User = {
    id: number;
    firstName: string;
    lastName: string;
   Email: string;
    Password: string;
    role: RoleEnum;
    createdAt: Date;
    createdBy?: number;
    updatedAt: Date;
    updatedBy?: number;
};