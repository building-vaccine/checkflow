export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-10 shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          CheckFlow
        </p>

        <h1 className="mt-4 text-4xl font-bold text-slate-900">
          シンプルなチェックリストを
          <br />
          すばやく作成・管理
        </h1>

        <p className="mt-6 text-lg text-slate-600">
          毎日のタスクや手順を、誰でも簡単にチェックリストとして管理できるWebサービスです。
        </p>

        <button className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
          チェックリストを作る
        </button>
      </div>
    </main>
  );
}