export enum UserRole {
    Admin = 'admin',
    Member = 'member',
}

export type UserProfile = {
    uid: string;
    nickname: string;
    role: UserRole;
};

export enum BoardType {
    Notice = 'notice',
    Event = 'event',
    Review = 'review',
    Report = 'report',
    Tether = 'tether',
    Official = 'official',
}

export type BasePost = {
    id: number;
    board: BoardType;
    title: string;
    content: string;
    author: string;
    createdAt: string; // ISO
    views: number;
};

export type ReportPost = BasePost & {
    id: number;
    siteName: string;
    siteUrl: string;
}

export type EventPost  = BasePost & {
    board: BoardType.Event;
    eventStart?: string;
    eventEnd?: string;
};

export type ReviewPost = BasePost & {
    board: BoardType.Review;
    siteName: string;
    siteUrl: string;
    incomeDate: string;
    incomeAmount: number;
    velocityRating: number;
    incomeRating: number;
    eventRating: number;
    reliabilityRating: number;
};

export type Comment = {
    id: number;
    postId: number;
    author: string;
    content: string;
    createdAt: string;
};