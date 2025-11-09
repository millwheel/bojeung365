import { JSONContent } from '@tiptap/core';

export type NoticePostRequest = {
    title: string;
    richBody: JSONContent;
};

export type EventPostRequest = {
    title: string;
    richBody: JSONContent;
};


export type ReviewPostRequest = {
    title: string;
    siteName: string;
    siteUrl: string;
    bettingDate: string;
    bettingAmount: number;
    dividend: number;
    winAmount: number;
    exchangeSpeed: number;
    dividendRating: number;
    eventRating: number;
    reliability: number;
    body: string;
};