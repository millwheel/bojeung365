'use client';

import { useEffect, useMemo } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import {StarterKit} from "@tiptap/starter-kit";
import Underline from '@tiptap/extension-underline';
import {FontSize, TextStyle} from "@tiptap/extension-text-style";
import { Color } from '@tiptap/extension-text-style';
import { JSONContent } from '@tiptap/core';

interface TipTapViewerProps {
    value: JSONContent;
    className?: string;
}

export default function TipTapViewer({ value, className }: TipTapViewerProps) {
    const content = useMemo(() => {
        if (!value) return { type: 'doc', content: [] };
        return value;
    }, [value]);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({

            }),
            Underline,
            TextStyle,
            Color,
            FontSize,
        ],
        content,
        editable: false,
        editorProps: {
            attributes: {
                class: 'focus:outline-none',
            },
        },
        immediatelyRender: false,
    });

    useEffect(() => {
        if (editor) editor.commands.setContent(content, { emitUpdate: false });
    }, [editor, content]);

    if (!editor) {
        return null;
    }

    return (
        <div className={className}>
            <EditorContent editor={editor} />
        </div>
    );
}