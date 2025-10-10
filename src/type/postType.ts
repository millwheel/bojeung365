export enum PostType {
    NOTICE = 'notice',
    EVENT = 'event',
    REVIEW = 'review',
    REPORT = 'report', // ScamReport
    TETHER = 'tether',
    OFFICIAL = 'official',
}

export type BasePostList = {
    id: number;
    title: string;
    viewCount: number;
    createdAt: string; // ISO 8601 string (LocalDateTime)
    authorNickname: string;
    commentCount: number;
};

export type NoticePostList = BasePostList & {
    board: PostType.NOTICE;
};

export type EventPostList = BasePostList & {
    board: PostType.EVENT;
};

export type OfficialPostList = BasePostList & {
    board: PostType.OFFICIAL;
    thumbnailUrl?: string;
};

export type ReviewPostList = BasePostList & {
    board: PostType.REVIEW;
    siteName: string;
};

export type ReportPostList = BasePostList & {
    board: PostType.REPORT;
    siteName: string;
};

export type TetherPostList = BasePostList & {
    board: PostType.TETHER;
    thumbnailUrl?: string;
};