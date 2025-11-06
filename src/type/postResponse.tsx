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
};