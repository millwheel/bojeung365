import { JSONContent } from '@tiptap/core';

export type NoticePostRequest = {
    title: string;
    richBody: JSONContent;
};
