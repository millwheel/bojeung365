'use client';

import { useEffect, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { apiPost } from "@/lib/api";

type NoticePostRequest = { title: string; richBody: unknown };

export default function NewNoticePage() {
    const [title, setTitle] = useState('');
    const [saving, setSaving] = useState(false);
    const [mounted, setMounted] = useState(false);

    // 클라이언트 마운트 플래그
    useEffect(() => setMounted(true), []);

    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>공지 내용을 입력하세요</p>',
        // SSR 즉시 렌더 금지 (하이드레이션 미스매치 방지)
        immediatelyRender: false,
    });

    const handleSubmit = async () => {
        if (!title.trim() || !editor) return alert('제목과 내용을 입력하세요.');

        setSaving(true);
        try {
            const payload: NoticePostRequest = {
                title: title.trim(),
                richBody: editor.getJSON(),
            };
            const { error } = await apiPost<void>('/api/notices', payload);
            if (error) {
                alert(`저장 실패: ${error.message}`);
                return;
            }
            alert('저장 완료!');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold mb-4">새 공지 작성</h1>

            <input
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
            />

            <div className="border border-gray-300 rounded p-2 min-h-[300px]">
                {mounted && editor && <EditorContent editor={editor} />}
            </div>

            <button
                onClick={handleSubmit}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded"
            >
                {saving ? '저장 중...' : '저장하기'}
            </button>
        </div>
    );
}
