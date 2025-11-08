import {useEditor} from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import {Underline} from "@tiptap/extension-underline";
import {FontSize, TextStyle} from "@tiptap/extension-text-style";
import {Color} from "@tiptap/extension-color";
import {TextAlign} from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";

export function useDefaultTipTapEditor(content: string = '') {
    return useEditor({
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
            TextAlign.configure({
                types: ['paragraph'],
            }),
            Image.configure({
                HTMLAttributes: { loading: 'lazy', decoding: 'async' },
            }),
        ],
        content: content,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class:
                    'prose prose-sm sm:prose max-w-none focus:outline-none min-h-[280px] text-black',
            },
        },
    });

}