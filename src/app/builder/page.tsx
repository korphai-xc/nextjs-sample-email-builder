"use client";
import React, { useRef } from "react";
import EmailEditor, { EditorRef } from "react-email-editor";
import axios from "axios";

export default function Builder() {
  const emailEditorRef = useRef<EditorRef>(null);

  const exportHtml = () => {
    if (!emailEditorRef) return;

    emailEditorRef?.current?.editor?.exportHtml((data) => {
      const { design, html } = data;
      //   console.log("design", design);
      //   console.log("exportHtml", html);

      axios.post("http://localhost:8888/api/template", {
        data: {
          design: design,
          html: html,
        },
      });
    });
  };

  const onLoad = async () => {
    if (!emailEditorRef) return;
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    const { data } = await axios.get("http://localhost:8888/api/template");
    console.log(data);
    emailEditorRef?.current?.editor?.loadDesign(data);
  };

  const onReady = () => {
    // editor is ready
    console.log("onReady");
  };

  const saveDesign = () => {
    if (!emailEditorRef) return;
    emailEditorRef?.current?.editor?.saveDesign((data) => {
      console.log(data);
    });
  };

  return (
    <div>
      <div>
        <button onClick={exportHtml}>Export HTML</button>
        <button onClick={saveDesign}>SaveDesign</button>
      </div>

      <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
    </div>
  );
}
