export enum UserRole {
    Admin = 'ADMIN',
    Member = 'MEMBER',
}

export type UserProfile = {
    username: string;
    nickname: string;
    email: string;
    role: UserRole;
};