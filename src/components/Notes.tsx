import React from "react";
import { CancelIcon } from "./icons/Icons";

type NotesProps = {
  setToggleNoteDialog: (value: boolean) => void;
  selectedNote: string | null;
  setSelectedNote: (value: string | null) => void;
};

const Notes = ({
  setToggleNoteDialog,
  selectedNote,
  setSelectedNote,
}: NotesProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={() => {
        setToggleNoteDialog(false);
        setSelectedNote(null);
      }}
    >
      <div
        className="backdrop-blur-sm bg-surface/80 p-8 rounded-2xl border border-custom shadow-2xl w-[500px] max-h-[90vh] overflow-y-auto transform transition-all duration-300 scrollbar-hide relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            setToggleNoteDialog(false);
            setSelectedNote(null);
          }}
          className="absolute top-4 right-4 text-secondary hover:text-main transition-colors cursor-pointer p-2 hover:bg-background/50 rounded-lg"
        >
          <CancelIcon />
        </button>

        <h2 className="text-3xl font-bold mb-10 text-center text-main bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent pr-12">
          Problem Notes
        </h2>

        <div className="bg-surface backdrop-blur-sm p-6 rounded-xl  mb-6">
          <p className="text-main leading-relaxed whitespace-pre-wrap">
            {selectedNote || "No notes available for this problem."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notes;
