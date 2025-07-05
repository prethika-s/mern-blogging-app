import React, { useState } from "react";

const TagInput = ({ tags, setTags }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault();
      const newTag = input.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInput('');
    } else if (e.key === 'Backspace' && !input && tags.length) {
      setTags(tags.slice(0, -1));
    }
  };

  const handleRemove = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center border border-gray-300 rounded-md p-2 min-h-[48px] mt-3">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="flex items-center bg-sky-100/70 text-sky-700 px-3 py-1 rounded text-sm font-medium"
        >
          {tag}
          <button
            type="button"
            className="ml-2 text-sky-500 hover:text-sky-700 font-bold cursor-pointer"
            onClick={() => handleRemove(index)}
          >
            &times;
          </button>
        </div>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type and press enter"
        className="flex-1 min-w-[120px] border-none outline-none text-sm p-1"
      />
    </div>
  );
};

export default TagInput;
