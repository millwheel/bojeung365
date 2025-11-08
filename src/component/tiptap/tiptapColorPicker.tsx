'use client';

import { Editor } from '@tiptap/core';

interface ColorPickerProps {
    editor: Editor;
}

export default function ColorPicker({ editor }: ColorPickerProps) {
    const currentColor =
        (editor.getAttributes('textStyle')?.color as string) ?? '#000000';

    return (
        <input
            type="color"
            className="w-8 h-8 rounded border border-gray-300"
            value={currentColor}
            onChange={(e) =>
                editor.chain().focus().setColor(e.target.value).run()
            }
            title="글자색"
        />
    );
}
