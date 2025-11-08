import Image from "@tiptap/extension-image";
import type { Attribute, CommandProps } from "@tiptap/core";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        imageAlign: {
            setImageAlign: (align: "left" | "center" | "right" | null) => ReturnType;
        };
    }
}

type AlignType = "left" | "center" | "right" | null;

export const ImageWithAlign = Image.extend({
    name: "image",

    addAttributes() {
        const alignAttr: Attribute = {
            default: null as AlignType,
            parseHTML: (element: HTMLElement): AlignType =>
                (element.getAttribute("data-align") as AlignType) ?? null,
            renderHTML: (attrs: { align?: AlignType }) =>
                attrs.align ? { "data-align": String(attrs.align) } : {},
        };

        return {
            align: alignAttr,
        };
    },

    addCommands() {
        return {
            setImageAlign:
                (align: AlignType) =>
                    ({ commands }: CommandProps) =>
                        commands.updateAttributes("image", { align }),
        };
    },
});
