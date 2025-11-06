'use client';

import { useEffect, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { apiPost } from "@/lib/api";
import {useRouter} from "next/navigation";
import { StarterKit } from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import { Color } from '@tiptap/extension-color';
import { TextStyle, FontSize } from '@tiptap/extension-text-style';
import Toolbar from "@/tiptap/tiptapToolbar";


type NoticePostRequest = { title: string; richBody: unknown };

export default function NewNoticePage() {
    const [title, setTitle] = useState('');
    const [saving, setSaving] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => setMounted(true), []);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({}),
            Underline,
            TextStyle,
            Color.configure({
                types: ['textStyle'],
            }),
            FontSize.configure({
                types: ['textStyle']
            }),
        ],
        content: '',
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class:
                    'prose prose-sm sm:prose max-w-none focus:outline-none min-h-[280px] text-black',
            },
        },
    });

    const handleSubmit = async () => {
        if (!title.trim() || !editor) return alert('제목과 내용을 입력하세요.');

        setSaving(true);
        try {
            const payload: NoticePostRequest = {
                title: title.trim(),
                richBody: editor.getJSON(),
            };
            const { error } = await apiPost<void>('/posts/notice', payload);
            if (error) {
                alert(`저장 실패: ${error.message}`);
                return;
            }
            router.replace('/main/notice');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white">
            <h1 className="text-md md:text-xl font-bold mb-4 text-black">새 글 작성</h1>

            <input
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 text-black"
            />

            {/* Toolbar */}
            {mounted && editor && <Toolbar editor={editor} />}

            <div className="border border-gray-300 rounded p-2 min-h-[300px] text-black">
                {mounted && editor && <EditorContent editor={editor} />}
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded cursor-pointer"
                >
                    {saving ? '저장 중...' : '저장하기'}
                </button>
            </div>

        </div>
    );
}
