import {PostType} from "@/type/postType";

type BoardResponse<T> = {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
    first: boolean;
    last: boolean;
};

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
    siteUrl: string;
};

export type ReportPostList = BasePostList & {
    board: PostType.REPORT;
    siteUrl: string;
};

export type TetherPostList = BasePostList & {
    board: PostType.TETHER;
    thumbnailUrl?: string;
};