"use client"

import {Editor} from "@tiptap/core";
import ToggleButton from "@/component/tiptap/tiptapToggleButton";
import {useEffect, useRef, useState} from "react";
import ColorPicker from "@/component/tiptap/tiptapColorPicker";
import FontSizeSelector from "./tiptapFontSizeSelector";
import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Bold,
    Italic,
    RotateCcw,
    Strikethrough,
    Underline,
    ImagePlus,
} from "lucide-react";
import { uploadImage } from "@/lib/imageFileApi";

export default function Toolbar({ editor }: { editor: Editor }) {
    const [, forceUpdate] = useState(0);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!editor) return;

        const rerender = () => forceUpdate(v => v + 1);

        editor.on('transaction', rerender);
        editor.on('selectionUpdate', rerender);
        editor.on('update', rerender);

        return () => {
            editor.off('transaction', rerender);
            editor.off('selectionUpdate', rerender);
            editor.off('update', rerender);
        };
    }, [editor]);

    if (!editor) return null;

    const openPicker = () => fileInputRef.current?.click();

    const onPickFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        e.target.value = ""; // 같은 파일 재선택 허용
        if (!f) return;

        setUploading(true);
        try {
            const { data, error } = await uploadImage(f, "notice"); // 카테고리 필요시 조정
            if (error || !data) {
                alert(`[업로드 실패] ${error?.message ?? "알 수 없는 오류"}`);
                return;
            }
            editor
                .chain()
                .focus()
                .setImage({ src: data.publicUrl, alt: data.originalFilename })
                .run();
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded p-2 bg-white text-black">
            <ToggleButton
                active={editor.isActive('bold')}
                onClick={() => editor.chain().focus().toggleBold().run()}
                label={<Bold className="w-4 h-4" />}
            />

            <ToggleButton
                active={editor.isActive('italic')}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                label={<Italic className="w-4 h-4" />}
            />

            <ToggleButton
                active={editor.isActive('strike')}
                onClick={() => editor.chain().focus().toggleStrike().run()}
                label={<Strikethrough className="w-4 h-4" />}
            />

            <ToggleButton
                active={editor.isActive('underline')}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                label={<Underline className="w-4 h-4" />}
            />

            <div className="h-6 w-px bg-gray-300 mx-1" />

            <FontSizeSelector editor={editor} />
            <ColorPicker editor={editor} />

            <div className="h-6 w-px bg-gray-300 mx-1" />

            <ToggleButton
                active={editor.isActive({ textAlign: 'left' })}
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                label={<AlignLeft className="w-4 h-4" />}
            />

            <ToggleButton
                active={editor.isActive({ textAlign: 'center' })}
                onClick={() => editor.commands.setTextAlign('center')}
                label={<AlignCenter className="w-4 h-4" />}
            />

            <ToggleButton
                active={editor.isActive({ textAlign: 'right' })}
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                label={<AlignRight className="w-4 h-4" />}
            />

            <ToggleButton
                active={editor.isActive({ textAlign: 'justify' })}
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                label={<AlignJustify className="w-4 h-4" />}
            />

            <ToggleButton
                active={false}
                onClick={() => editor.chain().focus().unsetTextAlign().run()}
                label={<RotateCcw className="w-4 h-4" />}
            />

            <div className="h-6 w-px bg-gray-300 mx-1" />
        </div>
    );
}