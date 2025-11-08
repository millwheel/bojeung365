import { JSONContent } from '@tiptap/core';

export type NoticePostRequest = {
    title: string;
    richBody: JSONContent;
};

export type EventPostRequest = {
    title: string;
    richBody: JSONContent;
};
