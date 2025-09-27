export enum UserRole {
    Admin = 'admin',
    Member = 'member',
}

export type UserProfile = {
    uid: string;
    nickname: string;
    role: UserRole;
};