export enum RoleEnum {
    Admin = 0,
    User = 1
}
export class User {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public role: RoleEnum
    ) { }
}

export type PartialUser = Partial<User>;
