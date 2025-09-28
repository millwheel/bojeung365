export enum UserRole {
    Admin = 'ADMIN',
    Member = 'MEMBER',
}

export type UserProfile = {
    uid: string;
    nickname: string;
    role: UserRole;
};