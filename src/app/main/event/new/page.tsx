'use client';

import {useEffect, useRef, useState} from 'react';
import { EditorContent } from '@tiptap/react';
import { apiPost } from "@/lib/api";
import {useRouter} from "next/navigation";
import Toolbar from "@/component/tiptap/tiptapToolbar";
import {useDefaultTipTapEditor} from "@/component/tiptap/useDefaultTipTapEditor";
import { TempImageStorage } from '@/util/tempImageStorage';
import { uploadRichTextImages} from "@/util/richTextImageUploader";

export default function NewEventPage() {
    const [title, setTitle] = useState('');
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const editor = useDefaultTipTapEditor();

    const tempImageStorageRef = useRef(new TempImageStorage());
    const tempImageStorage = tempImageStorageRef.current;
    const category = "event";

    const handleSubmit = async () => {
        if (!title.trim() || !editor) return alert("제목과 내용을 입력하세요.");

        setSaving(true);
        try {
            // 임시 이미지 파일 포함하는 json
            const draftJson = editor.getJSON();
            // 업로드 완성된 파일 포함하는 json
            const { finalJson, srcMap } = await uploadRichTextImages(draftJson, tempImageStorage, category);

            // 게시글 저장
            const { error: saveErr } = await apiPost<void>(`/posts/${category}`, {
                title: title.trim(),
                richBody: finalJson,
            });
            if (saveErr) {
                alert(`저장 실패: ${saveErr.message}`);
                return;
            }

            // 업로드/저장 완료된 blob URL 정리
            Object.keys(srcMap).forEach((blob) => tempImageStorage.remove(blob));

            router.replace(`/main/${category}`);
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        return () => tempImageStorage.revokeAll();
    }, [tempImageStorage]);

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

            {editor && (
                <Toolbar editor={editor} tempImageStorage={tempImageStorage} />
            )}

            <div className="border border-gray-300 rounded p-2 min-h-[300px] text-black">
                {editor && <EditorContent editor={editor} />}
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
