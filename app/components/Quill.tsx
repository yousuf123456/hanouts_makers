"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillProps {
  field?: any;
  placeholder?: string;
}

export const Quill: React.FC<QuillProps> = ({ field, placeholder }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    document
      .getElementsByClassName("ql-image")[0]
      .setAttribute("title", "Upload Image");
    document
      .getElementsByClassName("ql-color")[0]
      .setAttribute("title", "Text Color");
    document
      .getElementsByClassName("ql-link")[0]
      .setAttribute("title", "Upload Link");
    document.getElementsByClassName("ql-bold")[0].setAttribute("title", "Bold");
    document
      .getElementsByClassName("ql-italic")[0]
      .setAttribute("title", "Italic");
    document
      .getElementsByClassName("ql-underline")[0]
      .setAttribute("title", "Underline");
    document
      .getElementsByClassName("ql-strike")[0]
      .setAttribute("title", "Strikethrough");

    const alignElems = document.getElementsByClassName("ql-align");
    for (let i = 0; i < alignElems.length; i++) {
      const elem = alignElems[i];
      //@ts-ignore
      const tooltip = "Align " + (elem.value || "left");
      elem.setAttribute("title", tooltip);
    }

    const listElems = document.getElementsByClassName("ql-list");
    for (let i = 0; i < listElems.length; i++) {
      const elem = listElems[i];
      const tooltip =
        //@ts-ignore
        elem.value === "unordered" ? "Unordered List" : "Ordered List";
      elem.setAttribute("title", tooltip);
    }

    const indentElems = document.getElementsByClassName("ql-indent");
    for (let i = 0; i < indentElems.length; i++) {
      const elem = indentElems[i];
      const tooltip =
        //@ts-ignore
        elem.value === "-1" ? "Indent Backwards" : "Indent Forwards";
      elem.setAttribute("title", tooltip);
    }
  }, []);

  const imageHandler = (e: any) => {
    //@ts-ignore
    const editor = quillRef?.current?.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      //@ts-ignore
      const file = input?.files[0];
      if (/^image\//.test(file.type)) {
        const formData = new FormData();
        formData.append("image", file);
        const url = URL.createObjectURL(file);
        // console.log(file);
        // Upload Here

        //   const url = res?.data?.url;
        editor.insertEmbed(editor.getSelection(), "image", url);
      } else {
        console.log("You could only upload images.");
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],

          [
            { align: null },
            { align: "center" },
            { align: "right" },
            { align: "justify" },
          ],

          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["image", "link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
              ],
            },
          ],
          ["omega"],
        ],
        handlers: {
          image: imageHandler,
        },
        buttonTitles: {
          bold: "Bold",
        },
      },
    }),
    []
  );

  return (
    <div className="pb-12">
      <ReactQuill
        {...field}
        placeholder={placeholder}
        theme="snow"
        ref={quillRef}
        modules={modules}
        onChange={(value) => field.onChange(value)}
        style={{
          height: "350px",
        }}
      />
    </div>
  );
};
