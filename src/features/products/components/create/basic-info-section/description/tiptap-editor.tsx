"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Button } from "@/components/ui/button"

import { useCallback, useEffect, useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import TiptapMenu from "./tiptap-menu"

interface ProductDescriptionEditorProps {
   content?: string
   onChange: (content: string) => void
   id?: string
   placeholder?: string
   isDirty?: boolean
}

export default function ProductDescriptionEditor({
   content = "",
   id="product-description",
   onChange,
   isDirty = false
}: ProductDescriptionEditorProps) {
   const [linkUrl, setLinkUrl] = useState("")
   const [showLinkInput, setShowLinkInput] = useState(false)
   const [isUpdatingFromEditor, setIsUpdatingFromEditor] = useState(false)

   const editor = useEditor({
      extensions: [
         StarterKit,
         // Link.configure({
         //    openOnClick: false,
         //    HTMLAttributes: {
         //       class: "text-blue-600 underline cursor-pointer",
         //    },
         // }),
         // CharacterCount
      ],
      content,
      onUpdate: ({ editor }) => {
         setIsUpdatingFromEditor(true)
         onChange(editor.getHTML())
         // Reset the flag after a short delay to allow the effect to process
         setTimeout(() => setIsUpdatingFromEditor(false), 10)
      },
      editorProps: {
         attributes: {
            class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4",
         },
      },
      immediatelyRender: true,
   })
   
   useEffect(() => {
      if (!editor || isUpdatingFromEditor) return
      
      const currentContent = editor.getHTML()
      // Only update content if it's actually different and not from editor update
      if (!isDirty && content !== currentContent && content !== "") {
         editor.commands.setContent(content)
      }
   }, [content, isDirty, editor, isUpdatingFromEditor])
   const setLink = useCallback(() => {
      if (!editor) return

      if (linkUrl) {
         editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run()
         setLinkUrl("")
         setShowLinkInput(false)
      }
   }, [editor, linkUrl])
   const toggleLink = () => {
      if (!editor) return

      if (editor.isActive("link")) {
         editor.chain().focus().unsetLink().run()
      } else {
         setShowLinkInput(true)
      }
   }
   if (!editor) {
      return null
   }

   return (
      <div className="w-full max-w-4xl mx-auto border rounded-lg overflow-hidden">
         {/* Toolbar */}
         
         <TiptapMenu
            editor={editor}
            toggleLink={toggleLink}
         />
         {/* Link Input */}
         {showLinkInput && (
            <div className="border-b bg-blue-50 p-3 flex items-center gap-2">
               <Label htmlFor="link-url" className="text-sm font-medium">
                  URL:
               </Label>
               <Input
                  id="link-url"
                  type="url"
                  placeholder="https://example.com"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                     if (e.key === "Enter") {
                        setLink()
                     } else if (e.key === "Escape") {
                        setShowLinkInput(false)
                        setLinkUrl("")
                     }
                  }}
               />
               <Button
                  type="button"
                  size="sm" onClick={setLink}>
                  Add Link
               </Button>
               <Button
                  type="button"

                  size="sm"
                  variant="ghost"
                  onClick={() => {
                     setShowLinkInput(false)
                     setLinkUrl("")
                  }}
               >
                  Cancel
               </Button>
            </div>
         )}

         {/* Editor */}
         <div className="bg-white">
            <EditorContent editor={editor} className="min-h-[200px] focus-within:outline-none" id={id} />
            {/* {editor.isEmpty && (
               <div className="absolute top-[120px] left-4 text-gray-400 pointer-events-none">{placeholder}</div>
            )} */}
         </div>

         {/* Footer with character count */}
         <div className="border-t bg-gray-50 px-4 py-2 text-sm text-gray-600 flex justify-between items-center">
            <span>Rich text editor for product descriptions</span>
            <span>{editor.getText().length} characters</span>
         </div>
      </div>
   )
}
