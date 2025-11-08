"use client";

import { useRef } from "react";
import { Editor } from "@tiptap/core";
import { ImagePlus } from "lucide-react";
import {TempImageStorage} from "@/util/tempImageStorage";

export default function TiptapImageButton({ editor, tempImageStorage }: { editor: Editor, tempImageStorage: TempImageStorage }) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const openFilePicker = () => fileInputRef.current?.click();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = "";
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("이미지 파일만 업로드할 수 있습니다.");
            return;
        }

        // 1) Object URL 생성
        const objectUrl = URL.createObjectURL(file);

        // 2) 임시 스토리지에 기록
        tempImageStorage.add({
            objectUrl,
            file,
            alt: file.name, // 필요 시 `${category}_${file.name}` 같은 규칙도 OK
        });

        // 3) 에디터에 즉시 삽입 (임시 URL)
        editor
            .chain()
            .focus()
            .setImage({ src: objectUrl, alt: file.name })
            .setTextAlign("center")
            .run();
    };

    return (
        <>
            <button
                type="button"
                onClick={openFilePicker}
                className={`px-1 py-1 rounded-lg border border-gray-300 transition-colors cursor-pointer flex items-center gap-1 ${
                         "bg-white text-gray-800 hover:bg-gray-50"
                }`}
            >
                <ImagePlus className="w-4 h-4" />
                <span className="text-xs">이미지</span>
            </button>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
        </>
    );
}
