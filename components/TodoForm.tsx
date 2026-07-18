type TodoFormProps = {
  text: string;
  setText: (value: string) => void;
  addTodo: () => void;
};

export default function TodoForm({
  text,
  setText,
  addTodo,
}: TodoFormProps) {
  return (
    <div className="mt-8 flex gap-3">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="項目を入力"
        className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTodo();
          }
        }}
      />

      <button
        onClick={addTodo}
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        追加
      </button>
    </div>
  );
}