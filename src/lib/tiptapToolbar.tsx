import {Editor} from "@tiptap/core";
import TiptapToggleButton from "@/lib/tiptapToggleButton";

export default function TiptapToolbar({ editor }: { editor: Editor }) {
    if (!editor) return null;

    const fontSizes = [
        { label: '기본', value: '' },
        { label: '12', value: '12px' },
        { label: '14', value: '14px' },
        { label: '16', value: '16px' },
        { label: '18', value: '18px' },
        { label: '20', value: '20px' },
        { label: '24', value: '24px' },
    ];

    const applyFontSize = (v: string) => {
        if (!v) {
            editor.chain().focus().unsetMark('textStyle').run();
            return;
        }
        editor.chain().focus().setMark('textStyle', { fontSize: v }).run();
    };

    const currentColor =
        (editor.getAttributes('textStyle')?.color as string | undefined) ?? '#000000';

    return (
        <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded p-2 bg-white text-black">
            <TiptapToggleButton
                active={editor.isActive('bold')}
                onClick={() => editor.chain().focus().toggleBold().run()}
                label={<strong>B</strong>}
            />

            <TiptapToggleButton
                active={editor.isActive('italic')}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                label={<span>I</span>}
            />

            <TiptapToggleButton
                active={editor.isActive('strike')}
                onClick={() => editor.chain().focus().toggleStrike().run()}
                label={<span style={{ textDecoration: 'line-through' }}>S</span>}
            />

            <TiptapToggleButton
                active={editor.isActive('underline')}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                label={<u>U</u>}
            />

            <div className="h-6 w-px bg-gray-300 mx-1" />

            <select
                className="border rounded px-2 py-1 text-sm border-grat-300"
                onChange={(e) => applyFontSize(e.target.value)}
                defaultValue=""
            >
                {fontSizes.map((fs) => (
                    <option key={fs.label} value={fs.value}>
                        {fs.label}{fs.value ? 'px' : ''}
                    </option>
                ))}
            </select>

            <input
                type="color"
                className="w-8 h-8 p-0 border rounded border-grat-300"
                value={currentColor}
                onChange={(e) =>
                    editor.chain().focus().setColor(e.target.value).run()
                }
                title="글자색"
            />

            <div className="h-6 w-px bg-gray-300 mx-1" />
        </div>
    );
}