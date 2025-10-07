export enum UserRole {
    Admin = 'admin',
    Member = 'member',
}

export type UserProfile = {
    uid: string;
    nickname: string;
    role: UserRole;
};

export enum PostType {
    Notice = 'notice',
    Event = 'event',
    Review = 'review',
    Report = 'report',
    Tether = 'tether',
    Official = 'official',
}

export type BasePost = {
    id: number;
    board: PostType;
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
    board: PostType.Event;
    eventStart?: string;
    eventEnd?: string;
};

export type ReviewPost = BasePost & {
    board: PostType.Review;
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