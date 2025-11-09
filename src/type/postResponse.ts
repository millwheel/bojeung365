import { JSONContent } from '@tiptap/core';

export type AuthorResponse = {
    id: number;
    username: string;
    nickname: string;
};

export type CommentResponse = {
    id: number;
    authorNickname: string;
    body: string;
    createdAt: string;
};

export type NoticePostResponse = {
    id: number;
    title: string;
    viewCount: number;
    author: AuthorResponse;
    createdAt: string;
    updatedAt: string;
    commentResponses: CommentResponse[];
    richBody: JSONContent;
    editable: boolean;
};

export type EventPostResponse = {
    id: number;
    title: string;
    viewCount: number;
    author: AuthorResponse;
    createdAt: string;
    updatedAt: string;
    commentResponses: CommentResponse[];
    richBody: JSONContent;
    editable: boolean;
};

export type ReviewPostResponse = {
    id: number;
    title: string;
    viewCount: number;
    author: AuthorResponse;
    createdAt: string;
    updatedAt: string;
    commentResponses: CommentResponse[];
    siteName: string;
    siteUrl: string;
    bettingDate: string; // LocalDate → string
    bettingAmount: string; // BigDecimal → string
    dividend: string; // BigDecimal → string
    winAmount: string; // BigDecimal → string
    exchangeSpeed: number;
    dividendRating: number;
    eventRating: number;
    reliability: number;
    body: string;
    editable: boolean;
};