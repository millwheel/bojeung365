'use client';

import {useEffect, useRef, useState} from 'react';
import { EditorContent } from '@tiptap/react';
import { apiPost } from "@/lib/api";
import {useRouter} from "next/navigation";
import Toolbar from "@/component/tiptap/tiptapToolbar";
import {NoticePostRequest} from "@/type/postRequest";
import {useDefaultTipTapEditor} from "@/component/tiptap/useDefaultTipTapEditor";
import { TempImageStorage } from '@/util/tempImageStorage';
import {JSONContent} from "@tiptap/core";
import {FileMetaResponse} from "@/type/file";

export default function NewNoticePage() {
    const [title, setTitle] = useState('');
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const editor = useDefaultTipTapEditor();

    const tempImageStorageRef = useRef(new TempImageStorage());
    const tempImageStorage = tempImageStorageRef.current;

    const collectBlobSrcs = (json: JSONContent): string[] => {
        const set = new Set<string>();
        const walk = (n?: JSONContent) => {
            if (!n) return;
            if (n.type === "image" && typeof n.attrs?.src === "string") {
                const src = n.attrs.src;
                if (src.startsWith("blob:")) set.add(src);
            }
            n.content?.forEach(walk);
        };
        walk(json);
        return Array.from(set);
    };

    const replaceSrcs = (json: JSONContent, map: Record<string, string>): JSONContent => {
        const deep = (n: JSONContent): JSONContent => {
            let next = { ...n };
            if (next.type === "image" && typeof next.attrs?.src === "string") {
                const src = next.attrs.src;
                if (map[src]) {
                    next = {
                        ...next,
                        attrs: {
                            ...next.attrs,
                            src: map[src], // publicUrl로 치환
                        },
                    };
                }
            }
            if (next.content) {
                next = { ...next, content: next.content.map(deep) };
            }
            return next;
        };
        return deep(json);
    };

    const handleSubmit = async () => {
        if (!title.trim() || !editor) return alert("제목과 내용을 입력하세요.");

        setSaving(true);
        try {
            // 1) 현재 문서 JSON
            const draftJson = editor.getJSON();

            // 2) 문서에 실제 남아있는 blob 이미지들만 대상
            const blobSrcs = collectBlobSrcs(draftJson);

            // 3) 업로드 (문서에 쓰인 blob만 업로드)
            const srcMap: Record<string, string> = {}; // blob -> publicUrl
            for (const blob of blobSrcs) {
                const entry = tempImageStorage.get(blob);
                if (!entry) continue; // 이미 삭제된 이미지일 수 있음
                const formData = new FormData();
                formData.append("file", entry.file);
                formData.append("category", "notice");

                const { data, error } = await apiPost<FileMetaResponse>("/files/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                if (error || !data) throw new Error(`[업로드 실패] ${error?.message ?? "알 수 없는 오류"}`);

                srcMap[blob] = data.publicUrl;
            }

            // 4) JSON 치환
            const finalJson = replaceSrcs(draftJson, srcMap);

            // 5) 게시글 저장
            const payload: NoticePostRequest = {
                title: title.trim(),
                richBody: finalJson,
            };

            const { error: saveErr } = await apiPost<void>("/posts/notice", payload);
            if (saveErr) {
                alert(`저장 실패: ${saveErr.message}`);
                return;
            }

            // 6) 업로드/저장 완료된 blob URL 정리
            Object.keys(srcMap).forEach((blob) => tempImageStorage.remove(blob));

            router.replace("/main/notice");
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
