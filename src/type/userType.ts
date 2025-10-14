export enum UserRole {
    ADMIN = 'ADMIN',
    MEMBER = 'MEMBER',
}

export type UserProfile = {
    username: string;
    nickname: string;
    email: string;
    role: UserRole;
};