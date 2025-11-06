'use client';

import { Editor } from '@tiptap/core';
import {useEffect} from "react";

interface FontSizeSelectorProps {
    editor: Editor;
}

const fontSizes = [
    { label: '12px', value: '12px' },
    { label: '14px', value: '14px' },
    { label: '16px', value: '16px' },
    { label: '18px', value: '18px' },
    { label: '20px', value: '20px' },
    { label: '24px', value: '24px' },
];

const defaultFontSize = '16px';

export default function FontSizeSelector({ editor }: FontSizeSelectorProps) {

    const currentFontSize =
        (editor.getAttributes('textStyle')?.fontSize as string | undefined) ||
        defaultFontSize;

    const applyFontSize = (v: string) => {
        editor.chain().focus().setMark('textStyle', { fontSize: v }).run();
    };

    return (
        <div className="relative">
            <select
                aria-label="글자 크기"
                className="
                  w-20 h-8
                  rounded-lg border border-gray-300
                  bg-white/90 px-3 text-sm
                  appearance-none
                "
                value={currentFontSize}
                onChange={(e) => applyFontSize(e.target.value)}
                defaultValue={`${defaultFontSize}`}
            >
                {fontSizes.map((fs) => (
                    <option key={fs.value} value={fs.value}>
                        {fs.label}
                    </option>
                ))}
            </select>

            {/* 드롭다운 화살표 (네이티브 셀렉트) */}
            <span
                className="
                  pointer-events-none absolute right-2 top-1/2 -translate-y-1/2
                  text-gray-500 select-none
                "
            >
                ▾
            </span>
        </div>
    );
}