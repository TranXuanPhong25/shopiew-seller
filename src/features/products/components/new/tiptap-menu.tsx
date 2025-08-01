import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEditor } from "@tiptap/react";
import { Bold, Italic, UnderlineIcon, Heading1, Heading2, Heading3, List, ListOrdered, Quote, LinkIcon, Undo, Redo } from "lucide-react";

export default function TiptapMenu({
   editor,
   toggleLink
}: {
   toggleLink: () => void;
   editor: ReturnType<typeof useEditor>
}) {
   return (
      <div className="border-b bg-gray-50 p-2 flex flex-wrap items-center gap-1">
         {/* Text Formatting */}
         <Button
            type="button"

            variant={editor.isActive("bold") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
         >
            <Bold className="h-4 w-4" />
         </Button>

         <Button
            type="button"

            variant={editor.isActive("italic") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
         >
            <Italic className="h-4 w-4" />
         </Button>

         <Button
            type="button"

            variant={editor.isActive("underline") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
         >
            <UnderlineIcon className="h-4 w-4" />
         </Button>

         <Separator orientation="vertical" className="h-6" />

         {/* Headings */}
         <Button
            type="button"

            variant={editor.isActive("heading", { level: 1 }) ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
         >
            <Heading1 className="h-4 w-4" />
         </Button>

         <Button
            type="button"

            variant={editor.isActive("heading", { level: 2 }) ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
         >
            <Heading2 className="h-4 w-4" />
         </Button>

         <Button
            type="button"

            variant={editor.isActive("heading", { level: 3 }) ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
         >
            <Heading3 className="h-4 w-4" />
         </Button>

         <Separator orientation="vertical" className="h-6" />

         {/* Lists */}
         <Button
            type="button"

            variant={editor.isActive("bulletList") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
         >
            <List className="h-4 w-4" />
         </Button>

         <Button
            type="button"

            variant={editor.isActive("orderedList") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
         >
            <ListOrdered className="h-4 w-4" />
         </Button>

         <Separator orientation="vertical" className="h-6" />

         {/* Quote */}
         <Button
            type="button"

            variant={editor.isActive("blockquote") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
         >
            <Quote className="h-4 w-4" />
         </Button>

         {/* Link */}
         <Button
            type="button"
            variant={editor.isActive("link") ? "default" : "ghost"} size="sm" onClick={toggleLink}>
            <LinkIcon className="h-4 w-4" />
         </Button>

         <Separator orientation="vertical" className="h-6" />

         {/* Undo/Redo */}
         <Button
            type="button"

            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
         >
            <Undo className="h-4 w-4" />
         </Button>

         <Button
            type="button"

            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
         >
            <Redo className="h-4 w-4" />
         </Button>
      </div>
   )
}