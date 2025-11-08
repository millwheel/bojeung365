'use client';

import { useEffect, useMemo } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { JSONContent } from '@tiptap/core';
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from '@tiptap/extension-underline';
import { FontSize, TextStyle } from "@tiptap/extension-text-style";
import { Color } from '@tiptap/extension-text-style';
import TextAlign from "@tiptap/extension-text-align";
import Image from '@tiptap/extension-image';

interface TipTapViewerProps {
    value: JSONContent;
}

export default function TipTapViewer({ value }: TipTapViewerProps) {
    const content = useMemo(() => {
        if (!value) return { type: 'doc', content: [] };
        return value;
    }, [value]);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextStyle,
            Color,
            FontSize.configure({ types: ['textStyle'] }),
            TextAlign.configure({
                types: ['paragraph', 'heading'],
            }),
            Image.configure({
                HTMLAttributes: { loading: 'lazy', decoding: 'async' },
            }),
        ],
        content,
        editable: false,
        editorProps: {
            attributes: {
                class: 'ProseMirror prose max-w-none focus:outline-none',
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
        <div>
            <EditorContent editor={editor} />
        </div>
    );
}