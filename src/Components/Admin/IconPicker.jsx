import EmojiPickerLib from "emoji-picker-react";
import { useState } from "react";
import { LuImage, LuX } from "react-icons/lu";

const IconPicker = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      
      {/* Trigger */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-[#1a1a24] text-white rounded-lg">
          {icon ? (
            <span className="text-xl">{icon}</span>
          ) : (
            <LuImage />
          )}
        </div>

        <p className="text-gray-300 text-sm">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {/* Picker */}
      {isOpen && (
        <div className="relative">
          <button
            className="w-7 h-7 flex items-center justify-center bg-black border border-gray-600 rounded-full absolute -top-2 -right-2 z-10"
            onClick={() => setIsOpen(false)}
          >
            <LuX className="text-white" />
          </button>

          <EmojiPickerLib
            theme="dark"
            onEmojiClick={(emojiData) => {
              onSelect(emojiData.emoji);
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default IconPicker;