export class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) { }
}

export type PartialUser = Partial<User>;
