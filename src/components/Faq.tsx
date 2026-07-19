export default function Faq() {
    return (
        <section className="mt-12 border-t border-slate-200 pt-10">
            <h2 className="text-2xl font-bold text-slate-900">
                よくある質問
            </h2>

            <div className="mt-8 space-y-6">

                <div>
                    <h3 className="font-semibold text-slate-900">
                        無料で利用できますか？
                    </h3>

                    <p className="mt-2 leading-7 text-slate-700">
                        はい。CheckFlowは登録不要・無料でご利用いただけます。
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-slate-900">
                        アプリのインストールは必要ですか？
                    </h3>

                    <p className="mt-2 leading-7 text-slate-700">
                        必要ありません。ブラウザだけで利用できます。
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-slate-900">
                        スマートフォンでも使えますか？
                    </h3>

                    <p className="mt-2 leading-7 text-slate-700">
                        はい。スマートフォン・タブレット・PCに対応しています。
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-slate-900">
                        チェックリストは保存されますか？
                    </h3>

                    <p className="mt-2 leading-7 text-slate-700">
                        同じブラウザであればチェックリストの内容は保存されます。
                    </p>
                </div>

            </div>
        </section>
    );
}