import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <h1 className="text-4xl font-bold text-slate-900">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-slate-800">
          ページが見つかりません
        </h2>

        <p className="mt-4 text-slate-600">
          お探しのページは存在しないか、移動または削除された可能性があります。
        </p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          トップページへ戻る
        </Link>
      </div>
    </main>
  );
}