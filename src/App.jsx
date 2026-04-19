// npm install lucide-react recharts firebase
import React, { useState, useEffect } from 'react';
import { Check, X, Home, ChevronRight, List, RotateCcw, LogOut, Play, BookOpen, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// ==========================================
// Firebase Configuration
// ==========================================
// ※本番環境のキーに書き換えてください
const firebaseConfig = {
  apiKey: "AIzaSyCyo4bAZwqaN2V0g91DehS6mHmjZD5XJTc",
  authDomain: "sabu-hide-web-app.firebaseapp.com",
  projectId: "sabu-hide-web-app",
  storageBucket: "sabu-hide-web-app.firebasestorage.app",
  messagingSenderId: "145944786114",
  appId: "1:145944786114:web:0da0c2d87a9e24ca6cf75b",
  measurementId: "G-XSS72H1ZKV"
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// アプリケーション固有のID（他のアプリとデータが混ざらないように設定）
const APP_ID = "past-exam-4-7";

// ==========================================
// 問題データ定義
// ==========================================
const q2Table = (

<div className="overflow-x-auto my-4 border border-gray-300 rounded shadow-sm">
<table className="w-full text-sm text-left">
<thead className="bg-orange-100 border-b border-gray-300">
<tr>
<th className="px-4 py-2 border-r border-gray-300 text-center whitespace-nowrap">分類</th>
<th className="px-4 py-2 border-r border-gray-300 text-center whitespace-nowrap">言語</th>
<th className="px-4 py-2 text-center">特徴</th>
</tr>
</thead>
<tbody>
<tr className="border-b border-gray-300">
<td className="px-4 py-2 border-r border-gray-300 text-center align-middle" rowSpan={2}>低水準言語</td>
<td className="px-4 py-2 border-r border-gray-300 whitespace-nowrap">機械語</td>
<td className="px-4 py-2">命令を0と1から構成される2進数で表す。</td>
</tr>
<tr className="border-b border-gray-300">
<td className="px-4 py-2 border-r border-gray-300 whitespace-nowrap">アセンブラ</td>
<td className="px-4 py-2">機械語の命令を、人間がわかる単語に対応させた。</td>
</tr>
<tr className="border-b border-gray-300">
<td className="px-4 py-2 border-r border-gray-300 text-center align-middle" rowSpan={4}>手続き型</td>
<td className="px-4 py-2 border-r border-gray-300 whitespace-nowrap">COBOL</td>
<td className="px-4 py-2">事務処理用に古くからメインフレームで使われた。</td>
</tr>
<tr className="border-b border-gray-300">
<td className="px-4 py-2 border-r border-gray-300 whitespace-nowrap">C言語</td>
<td className="px-4 py-2">UNIXの開発で用いられた。</td>
</tr>
<tr className="border-b border-gray-300">
<td className="px-4 py-2 border-r border-gray-300 whitespace-nowrap">FORTRAN</td>
<td className="px-4 py-2">科学技術計算向けの言語。</td>
</tr>
<tr className="border-b border-gray-300">
<td className="px-4 py-2 border-r border-gray-300 whitespace-nowrap">BASIC</td>
<td className="px-4 py-2">コンピュータ教育用に開発された。</td>
</tr>
<tr className="border-b border-gray-300">
<td className="px-4 py-2 border-r border-gray-300 text-center align-middle" rowSpan={3}>非手続き型</td>
<td className="px-4 py-2 border-r border-gray-300 whitespace-nowrap">C++</td>
<td className="px-4 py-2">C言語にオブジェクト指向の特徴を加えた言語。</td>
</tr>
<tr className="border-b border-gray-300">
<td className="px-4 py-2 border-r border-gray-300 whitespace-nowrap">C#</td>
<td className="px-4 py-2">C/C++をもとに拡張したオブジェクト指向言語。</td>
</tr>
<tr className="border-b border-gray-300">
<td className="px-4 py-2 border-r border-gray-300 whitespace-nowrap">Java</td>
<td className="px-4 py-2">インターネット上のアプリケーションで広く用いられた。</td>
</tr>
<tr className="border-b border-gray-300 border-dashed">
<td className="px-4 py-2 border-r border-gray-300 text-center">(第4世代)</td>
<td className="px-4 py-2 border-r border-gray-300 whitespace-nowrap">SQL</td>
<td className="px-4 py-2">データベースの操作を行う。</td>
</tr>
<tr className="border-b border-gray-300">
<td className="px-4 py-2 border-r border-gray-300 text-center align-middle" rowSpan={3}>スクリプト言語</td>
<td className="px-4 py-2 border-r border-gray-300 whitespace-nowrap">Perl</td>
<td className="px-4 py-2">テキスト処理に優れたインタプリタ型言語。</td>
</tr>
<tr className="border-b border-gray-300">
<td className="px-4 py-2 border-r border-gray-300 whitespace-nowrap">JavaScript</td>
<td className="px-4 py-2">Webページに動きや機能を埋め込む。</td>
</tr>
<tr>
<td className="px-4 py-2 border-r border-gray-300 whitespace-nowrap">PHP</td>
<td className="px-4 py-2">動的なWebページを作成できる。</td>
</tr>
</tbody>
</table>
</div>
);

const allQuestions = [
{
id: 1,
year: "令和3年 第6問",
title: "Python",
text: "データ分析や機械学習を容易に行うことができるプログラミング言語である Python の利用が拡大している。 Python に関する記述として、最も適切なものはどれか。",
options: [
"Python2.x で動作するプログラムは全て、Python3.x でも動作する。",
"オブジェクト指向のプログラミング言語であり、関数型プログラミングをサポートしていない。",
"クラスや関数、条件文などのコードブロックの範囲はインデントの深さによって指定する。",
"データの操作や定義を行うための問い合わせ言語である。",
"論理プログラミング言語であり、プログラムは宣言的に表現される。"
],
answerIndex: 2,
explanation: 解答：ウ\n\n本問では、機械学習などで用いられるプログラミング言語であるPythonについて問われています。\nPythonについて詳細な知識が求められており、解答が難しい問題です。本問題を通して学習を深めていきましょう。\n\nPythonは、1991年にリリースされたプログラミング言語です。シンプルなコードで簡潔に記述することができるため、効率よく開発でき、読みやすいプログラムになるという特徴があります。近年では、データ分析や機械学習を行う際によく用いられています。\n\n・選択肢アについて、2008年にPython3.0がリリースされましたが、従来に比べて大幅な改訂がなされています。そのため、Python2.xとの互換性を保っておらず、Python2.xのコードの多くは、Python3.xではそのままでは動作しません。よって、不適切です。\n・選択肢イについて、Pythonは、オブジェクト指向のプログラミング言語でありながら、関数型プログラミングの特徴も持っております。オブジェクト指向では、データとそれを操作する処理を一体化します。これによって、オブジェクトを部品のように組み合わせて開発することができます。関数型プログラミングは、関数を主に使うプログラミングであり、関数の組み合わせでコーディングをしていきます。Pythonは、純粋な関数型プログラミング言語ではありませんが、関数の組み合わせでコードを記述することができます。よって、不適切です。\n・選択肢ウについて、Pythonは、インデントが意味を持つという特徴があります。インデントとは、文章の行頭に空白を入れて字下げを行うことです。Pythonでは、同じ数の空白でインデントされたまとまりを１つのブロックとして認識します。つまり、クラスや関数、条件文などのコードブロックの範囲はインデントの深さによって指定します。よって、選択肢ウは適切であり、これが正解です。\n・選択肢エについて、データの操作や定義を行うための問い合わせ言語はSQL言語などの特徴です。よって不適切です。\n・選択肢オについて、論理プログラミング言語は、数理論理学にもとづいて設計されたプログラミング言語です。代表的な論理プログラミング言語として、Prologがあります。Pythonは論理プログラミング言語ではありませんので、不適切です。,
table: null
},
{
id: 2,
year: "平成27年 第4問",
title: "プログラム言語の種類",
text: "ソフトウェアの開発には多様なプログラミング言語が使われるが、それぞれ特徴がある。下記の記述のうち最も適切なものはどれか。",
options: [
"Cは、OSも開発できる言語であるが、メモリ解放の指示を忘れるとメモリリークバグが発生することがある。",
"C#は、日本人が開発したオブジェクト指向型言語であるが、Perlを参考にして開発された。",
"Javaは、インタプリタ言語なので、初心者にも習得がしやすい。",
"Perlは、HTMLとともに記述することができるサーバサイドスクリプト言語で、Webページ作成に特化している。"
],
answerIndex: 0,
explanation: 解答：ア\n\n経営情報システムから、プログラム言語に関する出題です。それぞれのプログラム言語に関する詳細な知識が問われており、やや難易度の高い問題です。\n\n・選択肢アは、C言語に関する記述です。\nC言語は、ISO(国際標準化機構)やJIS(日本産業規格)で標準として採用されている、広く普及しているプログラム言語です。C言語は多くのアプリケーション開発で用いられており、UNIXもC言語で記述されています。メモリリークとは、C言語で発生しやすい代表的なバグであり、プログラムの終了時に使用中のメモリを解放する処理を加える事で防ぐことができます。よって、アの記述は適切です。\n・選択肢イは、C#に関する記述です。\nC#とは、Microsoft社が開発したプログラム言語であり、C/C++を基に拡張されたオブジェクト指向言語のことです。選択肢の内容はRubyのことであり、C#のことではありません。よって、イの記述は不適切です。\n・選択肢ウは、Javaに関する記述です。\nJavaは、C++で導入されたオブジェクト指向をさらに強化したオブジェクト指向言語であり、サンマイクロシステムズ社により開発されました。Javaからは様々な技術が派生し、その技術はインターネット上でのアプリケーションで広く用いられています。しかしながら、Javaは、選択肢にあるような、初心者にも習得しやすいインタプリタ言語ではありません。よって、ウの記述は不適切です。\n・選択肢エは、Perlに関する記述です。\nPerlは、テキストベースで動作するインタプリタ言語であり、テキストの検索や抽出に向いていますが、一般的には、HTMLとともに記述することはありません。また、Webページ作成に特化しているわけでもありません。選択肢の内容はPHPに関する内容となります。よって、エの記述は不適切です。\n\n以上より、アが適切であり、これが正解となります。\nなお、主なプログラミング言語をまとめると次のようになります。しっかり復習しておきましょう。,
table: q2Table
},
{
id: 3,
year: "令和元年 第3問",
title: "Webアプリケーションの開発",
text: "Webアプリケーションを開発するに当たっては、さまざまな開発言語や仕組みが必要になる。\nWebアプリケーションの開発に利用する言語や仕組みに関する記述として、最も適切なものはどれか。",
options: [
"Ajax は、Webブラウザの JavaScriptの HTTP通信機能を利用して、対話型のWebアプリケーションを構築する仕組みである。",
"Cookieは、Webサーバに対するアクセスがどの端末からのものであるかを識別するために、Webサーバの指示によってWebサーバにユーザ情報などを保存する仕組みである。",
"CSSは、タグによってWebページの構造を記述するマーク付け言語であり、利用者独自のタグを使って文書の属性情報や論理構造を定義できる。",
"Javaは、Ｃ言語にクラスやインヘリタンスといったオブジェクト指向の概念を取り入れた言語であり、Ｃ言語に対して上位互換性を持つ。"
],
answerIndex: 0,
explanation: 解答：ア\n\n本問では、Webアプリケーションの開発に利用する言語や仕組みについて問われています。開発言語や仕組みの特長をおさえていれば、正解できる問題です。\n\n・選択肢アは、Ajax（Asynchronous JavaScript + XML）について問われています。\nAjaxとは、その名称のとおり、JavaScriptとXMLを利用し、非同期（Asynchronous）な通信を行う技術 です。Ajaxを利用すれば、画面を遷移せずにWebページを更新することができるため、ユーザに分かりやすい対話型Webアプリケーションを作ることができます。よって適切であり、これが正解となります。\n・選択肢イは、Cookie（クッキー）について問われています。\nCookieは、ネットショップなどで複数のWebページを移動する際、ページごとにログインせずに済むように、利用者のコンピュータに一時的にログイン情報を書き込んで保存し、画面遷移してもログイン情報を引き継ぐ仕組み のことです。選択肢にあるような、Webサーバにユーザ情報などを保存する仕組みではありません。よって、不適切です。\n・選択肢ウは、CSS（Cascading Style Sheets）について問われています。\nCSSは、Webサイトでよく使う書式などのデザインの組み合わせをあらかじめファイルとして定義しておくもの です。Webサイト制作時に、CSSで定義したデザインを指定することで、簡単にデザインを適用できるようになります。また、デザインを変更する場合には、CSSファイルのみ変更すればよいため、サイトのメンテナンス性が向上します。なお、選択肢の記述内容はXMLに関するものです。よって、不適切です。\n・選択肢エは、Javaについて問われています。\nJavaは、主としてネットワーク環境で利用されることを想定して作られたオブジェクト指向言語 です。選択肢の内容は、C++のものであり、Javaの説明ではありません。よって、不適切です。\n\nWebアプリケーションに係る言語・仕組みなどは、毎年、頻出の事項となっています。しっかり復習して理解しておきましょう。,
table: null
},
{
id: 4,
year: "令和2年 第19問",
title: "Webシステムのユーザビリティ",
text: "Webシステムの開発では、「使いやすさ（ユーザビリティ）」の重要性が指摘されている。ユーザビリティの向上のための方策に関する記述として、最も適切なものの組み合わせを下記の解答群から選べ。\n\nａ　応答がすぐにできない場合には、サーバ処理中などの状況を画面に表示するなど、ユーザがシステムの状態を把握できるような仕組みを実装する必要がある。\nｂ　ユーザがミスを起こしやすい箇所が見つかった場合は、丁寧なエラーメッセージを表示させれば良い。\nｃ　ユーザがWebサイトの画面にあるボタンを押し間違えた場合に、前の画面に後戻りできたり、最初から操作をやり直せるような仕組みを構築する必要がある。\nｄ　ユーザビリティ評価においては、システム開発が完了した段階において、問題点を把握することが重要である。",
options: [
"ａとｂ",
"ａとｃ",
"ｂとｄ",
"ｃとｄ"
],
answerIndex: 1,
explanation: 解答：イ\n\n本問では、Webシステム開発のユーザビリティについて問われています。\n\n・記述aについて、システムの応答がすぐできない場合、ユーザがすぐにシステムの状態を把握できる仕組みを実装することは必要です。このような仕組みにより、ユーザに必要以上にストレスを与えず、また正しい判断をさせることができるようになります。よって適切です。\n・記述bについて、エラーメッセージも必要ですが、 根本的な解決策として「ユーザがミスを起こさないように設計を変更できないか」を検討することが重要 であり、そのほうがユーザビリティは向上します。よって不適切です。\n・記述cについて、ユーザがミスをした際、一つ前の画面に戻ったり、操作を最初からやり直せる仕組みを構築することで処理を継続できるようにすることは重要 です。よって適切です。\n・記述dについて、ユーザビリティの問題点の把握をシステム開発が完了した段階で行われることは遅すぎます。 ユーザビリティの問題点はシステム設計段階から考慮し、システム開発中に問題点が露呈した場合、逐次対処を検討する必要 があります。よって不適切です。\n\n以上より、ａとｃが適切であるため、選択肢イが正解となります。,
table: null
},
{
id: 5,
year: "平成27年 第2問",
title: "WEBサイトの開発",
text: "自社のWebサイトの開発にあたっては、利用可能な様々な言語や仕組みがあり、Webコンテンツごとに必要な機能や表現に合ったものを使用する必要がある。これらの言語や仕組みの特徴に関する以下の①～④の記述と、その名称の組み合わせとして、最も適切なものを選べ。\n\n① Webページに記述された文書・データの表示位置の指示や表の定義、および、文字修飾指示等の表示方法に関する事項を記述するもの。\n② Webページ内でHTMLとともに記述することができるスクリプト言語で、サーバ側においてスクリプトを処理し、その結果を端末側で表示することが可能であり、データベースとの連携も容易である。\n③ Webページの中に実行可能なコマンドを埋め込み、それをサーバ側で実行させ、実行結 果を端末側で表示させる仕組み。\n④ コンピュータグラフィックスに関する図形、画像データを扱うベクターイメージデータをXMLの規格に従って記述するもの。",
options: [
"①：CSS 　　②：ASP 　　　　　　 ③：PHP 　　④：SGML",
"①：CSS 　　②：PHP　　　　　　 ③：SSI　　 ④：SVG",
"①：SMIL 　 ②：Javaアプレット　　③：ASP 　　④：SSI",
"①：SVG 　　②：SMIL 　　　　　 ③：PHP 　　④：SGML"
],
answerIndex: 1,
explanation: 解答：イ\n\nWebサイトの開発にあたって利用可能な様々な言語や仕組みについて細かな知識を確認する問題です。\n\n・記述①は、CSS（Cascading Style Sheets）です。HTMLのプログラムが煩雑になるのを防ぎ、デザインの組み合わせをあらかじめ定義しておくことができます。\n・記述②は、PHP（Hypertext Preprocessor）です。動的サービスを作成するための言語で、データベースを操作する命令が組み込まれているのが特徴です。\n・記述③は、SSI（Server Side Include）です。HTMLの中にWebサーバ側で実行するコマンドを埋め込んでおき、その実行結果をクライアントサーバに返します。\n・記述④は、SVG（Scalable Vector Graphics）です。XMLをベースとした、2次元ベクターイメージ用の画像形式です。\n\n以上より、選択肢イが適切であり、これが正解です。,
table: null
},
{
id: 6,
year: "令和3年 第17問",
title: "SOA",
text: "情報システムを開発する際には、基本的な考え方（アーキテクチャ）に基づいてなされることが多い。このような考え方の1 つにSOA がある。SOA に関する記述として、最も適切なものはどれか。",
options: [
"順次・選択・繰返しの3 つの論理構造の組み合わせで、コンポーネントレベルで設計を行うというアーキテクチャである。",
"生産・販売・物流・会計・人事などの基幹業務を統合し管理することで、全体最適を図るというアーキテクチャである。",
"ソフトウェアの機能をサービスという部品とみなして、サービスのモジュールを組み合わせてシステムを構築するというアーキテクチャである。",
"ビジネスアーキテクチャ、データアーキテクチャ、アプリケーションアーキテクチャ、テクノロジーアーキテクチャの 4 つの体系で分析して、全体最適の観点 からシステム構築を検討するというアーキテクチャである。",
"利用部門が要求するシステム開発に対して、データの構造や関係に合わせてシステムを開発するというアーキテクチャである。"
],
answerIndex: 2,
explanation: 解答：ウ\n\nSOA（サービス指向アーキテクチャ）について問われています。\nSOA は、 アプリケーションを部品化して、それらを組み合わせることでシステムを構成するアーキテクチャ（設計思想） です。SOAでは、部品化したアプリケーションの単位のことを「サービス」と呼びます。\n\n・選択肢アは、 構造化プログラミング に関する記述です。\n・選択肢イは、 ERP（Enterprise Resource Planning） に関する記述です。\n・選択肢ウは、SOAに関する説明であり、これが正解です。\n・選択肢エは、 EA(Enterprise Architecture) に関する記述です。\n・選択肢オは、 DOA（データ指向アプローチ） に関する記述です。,
table: null
},
{
id: 7,
year: "令和元年 第5問",
title: "WEBサービスの開発手法",
text: "Webサービス開発では、従来のシステム開発とは異なる手法を採用することで、開発の迅速化やコストを低減することができる。そのような開発手法の1つであるマッシュアップに関する記述として、最も適切なものはどれか。",
options: [
"開発対象のシステムを分割し、短期間に計画・分析・プログラミング・テストなどを繰り返して実施する方法である。",
"既存ソフトウェアの動作を解析することで、プログラムの仕様やソースコードを導き出す方法である。",
"公開されている複数のWebサービスを組み合わせることで新しいサービスを提供する方法である。",
"部品として開発されたプログラムを組み合わせてプログラムを開発する方法である。"
],
answerIndex: 2,
explanation: 解答：ウ\n\nマッシュアップに関する出題です。\n\n・選択肢アは、インクリメンタルモデルの説明です。\n・選択肢イは、リバースエンジニアリングに関する説明です。\n・選択肢ウは、マッシュアップの説明です。元々は音楽用語ですが、IT分野においては、Web上に公開されている複数のWebサービスや情報などを組み合わせることで新しいサービスを提供する方法を指します。よって適切であり、これが正解となります。\n・選択肢エは、SOAに関する説明です。,
table: null
},
{
id: 8,
year: "平成30年 第6問",
title: "WEB環境におけるソフトウェア開発",
text: "Web環境におけるソフトウェア開発においては、開発目的に応じて利用可能なさまざまなプログラミング言語などを組み合わせて実現していくことが必要になる。以下の①～④の記述と、それらに対応するプログラミング言語などの組み合わせとして、最も適切なものを下記の解答群から選べ。\n\n①　HTMLファイルの中で記述され、動的なWebページを作成することができる。\n②　データベースと連携したWebページを作成することができる。\n③　Webサーバと非同期通信を行うことで、Webページの一部分のみのデータ内容を動的に更新することができる技術である。\n④　Webページのフォントや文字の大きさ、行間、表示位置の指示など、表示方法に関する事項を定義するために利用する",
options: [
"①：Java ②：jQuery ③：Perl ④：CSS",
"①：Java ②：PHP ③：Perl ④：XSL",
"①：JavaScript ②：jQuery ③：Ajax ④：XSL",
"①：JavaScript ②：PHP ③：Ajax ④：CSS"
],
answerIndex: 3,
explanation: 解答：エ\n\n・記述①は、JavaScriptです。Webページに動きや機能を埋め込むためのスクリプト言語です。\n・記述②は、PHP（Hypertext Preprocessor）です。データベースとの連携が容易です。\n・記述③は、Ajaxです。Webサーバと非同期通信を行う技術であり、画面の一部のみ動的に再描画できます。\n・記述④は、CSS（Cascading Style Sheets）です。表示方法に関する事項を定義します。\n\n以上より、①がJavaScript、②がPHP、③がAjax、④がCSSの選択肢エが適切であり、これが正解です。,
table: null
}
];

// ==========================================
// Main Application Component
// ==========================================
export default function App() {
const [view, setView] = useState("login");
const [userId, setUserId] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [errorMsg, setErrorMsg] = useState("");

// User Data State
const [userData, setUserData] = useState({
history: {}, // { questionId: { isCorrect: boolean, count: number } }
needsReview: {}, // { questionId: boolean }
progressIndex: 0,
progressMode: "all",
});

// Quiz State
const [currentMode, setCurrentMode] = useState("all");
const [filteredQuestions, setFilteredQuestions] = useState([]);
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [currentAnswer, setCurrentAnswer] = useState(null);
const [showExplanation, setShowExplanation] = useState(false);

// ------------------------------------------
// Firebase Operations
// ------------------------------------------
const loadUserData = async (uid) => {
setIsLoading(true);
try {
const docRef = doc(db, APP_ID, uid);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
const data = docSnap.data();
setUserData({
history: data.history || {},
needsReview: data.needsReview || {},
progressIndex: data.progressIndex || 0,
progressMode: data.progressMode || "all"
});
console.log("Data loaded from Firestore", data);
} else {
// Create new document for new user
const newData = { history: {}, needsReview: {}, progressIndex: 0, progressMode: "all" };
await setDoc(docRef, newData);
setUserData(newData);
console.log("New user initialized in Firestore");
}
setView("home");
} catch (error) {
console.error("Error loading data:", error);
setErrorMsg("データの読み込みに失敗しました。オフラインモードまたはAPIキーを確認してください。");
// Fallback for development/offline
setView("home");
} finally {
setIsLoading(false);
}
};

const syncDataToFirebase = async (partialData) => {
if (!userId) return;
try {
const docRef = doc(db, APP_ID, userId);
await updateDoc(docRef, partialData);
setUserData(prev => ({ ...prev, ...partialData }));
console.log("Synced to Firestore:", partialData);
} catch (error) {
console.error("Error syncing data:", error);
}
};

// ------------------------------------------
// Handlers
// ------------------------------------------
const handleLogin = (e) => {
e.preventDefault();
if (userId.trim().length < 3) {
setErrorMsg("合言葉は3文字以上で入力してください");
return;
}
setErrorMsg("");
loadUserData(userId.trim());
};

const handleLogout = () => {
setUserId("");
setUserData({ history: {}, needsReview: {}, progressIndex: 0, progressMode: "all" });
setView("login");
};

const buildQuestionList = (mode) => {
let list = [];
if (mode === "all") {
list = [...allQuestions];
} else if (mode === "wrong") {
list = allQuestions.filter(q => userData.history[q.id]?.isCorrect === false);
} else if (mode === "review") {
list = allQuestions.filter(q => userData.needsReview[q.id] === true);
}
return list;
};

const startQuiz = async (mode, resume = false) => {
const list = buildQuestionList(mode);
if (list.length === 0) {
alert("該当する問題がありません。");
return;
}

setFilteredQuestions(list);
setCurrentMode(mode);
setCurrentAnswer(null);
setShowExplanation(false);

if (resume) {
  setCurrentQuestionIndex(userData.progressIndex);
} else {
  setCurrentQuestionIndex(0);
  // Reset progress
  await syncDataToFirebase({ progressIndex: 0, progressMode: mode });
}

setView("quiz");
};

const handleAnswerSelect = async (index) => {
if (showExplanation) return;

setCurrentAnswer(index);
setShowExplanation(true);

const question = filteredQuestions[currentQuestionIndex];
const isCorrect = index === question.answerIndex;

// Update History
const updatedHistory = { ...userData.history };
const prevRecord = updatedHistory[question.id] || { count: 0 };
updatedHistory[question.id] = {
  isCorrect: isCorrect,
  count: prevRecord.count + 1
};

// Save history and current progress index
await syncDataToFirebase({ 
  history: updatedHistory,
  progressIndex: currentQuestionIndex,
  progressMode: currentMode
});
};

const toggleReview = async (qId) => {
const updatedReviews = { ...userData.needsReview };
updatedReviews[qId] = !updatedReviews[qId];
await syncDataToFirebase({ needsReview: updatedReviews });
};

const nextQuestion = async () => {
if (currentQuestionIndex < filteredQuestions.length - 1) {
const nextIdx = currentQuestionIndex + 1;
setCurrentQuestionIndex(nextIdx);
setCurrentAnswer(null);
setShowExplanation(false);
// Update progress to the next question
await syncDataToFirebase({ progressIndex: nextIdx, progressMode: currentMode });
} else {
// Finished
await syncDataToFirebase({ progressIndex: 0 });
setView("result");
}
};

const quitQuiz = async () => {
// If they quit during a quiz, progress is already saved at handleAnswerSelect/nextQuestion.
setView("home");
};

// ------------------------------------------
// Renderers
// ------------------------------------------
if (isLoading) {
return (
<div className="min-h-screen flex items-center justify-center bg-gray-50">
<div className="text-xl font-bold text-gray-600 animate-pulse">Loading Data...</div>
</div>
);
}

if (view === "login") {
return (
<div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
<div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 text-center">
<BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
<h1 className="text-2xl font-bold text-gray-800 mb-2">過去問セレクト演習</h1>
<p className="text-sm text-gray-500 mb-6">4-7 プログラム言語とWeb アプリケーション</p>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-left text-sm font-medium text-gray-700 mb-1">合言葉 (ユーザーID)</label>
          <input 
            type="text" 
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="例: secret123"
          />
        </div>
        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        <button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          学習を始める
        </button>
      </form>
      <div className="mt-6 text-xs text-gray-400">
        ※入力した合言葉を別の端末で入力すると、履歴を同期して続きから学習できます。
      </div>
    </div>
  </div>
);
}

if (view === "home") {
const wrongCount = allQuestions.filter(q => userData.history[q.id]?.isCorrect === false).length;
const reviewCount = allQuestions.filter(q => userData.needsReview[q.id] === true).length;
const hasProgress = userData.progressIndex > 0;

return (
  <div className="min-h-screen bg-gray-50 pb-20">
    <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
      <h1 className="font-bold text-lg text-gray-800">過去問 4-7</h1>
      <button onClick={handleLogout} className="text-gray-500 hover:text-gray-800 flex items-center">
        <LogOut className="w-5 h-5 mr-1" />
        <span className="text-sm">切替</span>
      </button>
    </header>

    <div className="max-w-2xl mx-auto p-4 mt-4 space-y-6">
      {hasProgress && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center text-orange-800 mb-3">
            <AlertCircle className="w-6 h-6 mr-2" />
            <h2 className="font-bold text-lg">学習の途中です</h2>
          </div>
          <p className="text-gray-700 mb-4">
            前回は <span className="font-bold">【{userData.progressMode === 'all' ? 'すべての問題' : userData.progressMode === 'wrong' ? '前回不正解のみ' : '要復習のみ'}】</span> の 
            <span className="font-bold text-orange-600"> 第{userData.progressIndex + 1}問目 </span> から中断されています。
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => startQuiz(userData.progressMode, true)}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
            >
              <Play className="w-5 h-5 mr-2" /> 続きから再開する
            </button>
            <button 
              onClick={() => syncDataToFirebase({ progressIndex: 0 })}
              className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-lg transition-colors"
            >
              状態をリセット
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-gray-500 text-sm font-bold mb-4 uppercase tracking-wider">モード選択</h2>
        <div className="space-y-3">
          <button 
            onClick={() => startQuiz("all", false)}
            className="w-full text-left bg-blue-50 hover:bg-blue-100 border border-blue-200 p-4 rounded-lg flex items-center justify-between transition-colors"
          >
            <div>
              <div className="font-bold text-blue-900 text-lg">すべての問題</div>
              <div className="text-sm text-blue-700 mt-1">全{allQuestions.length}問を出題します</div>
            </div>
            <ChevronRight className="text-blue-400" />
          </button>

          <button 
            onClick={() => startQuiz("wrong", false)}
            disabled={wrongCount === 0}
            className={`w-full text-left border p-4 rounded-lg flex items-center justify-between transition-colors ${wrongCount > 0 ? 'bg-red-50 hover:bg-red-100 border-red-200' : 'bg-gray-50 border-gray-200 opacity-60'}`}
          >
            <div>
              <div className={`font-bold text-lg ${wrongCount > 0 ? 'text-red-900' : 'text-gray-500'}`}>前回不正解の問題のみ</div>
              <div className={`text-sm mt-1 ${wrongCount > 0 ? 'text-red-700' : 'text-gray-400'}`}>該当: {wrongCount}問</div>
            </div>
            <ChevronRight className={wrongCount > 0 ? "text-red-400" : "text-gray-300"} />
          </button>

          <button 
            onClick={() => startQuiz("review", false)}
            disabled={reviewCount === 0}
            className={`w-full text-left border p-4 rounded-lg flex items-center justify-between transition-colors ${reviewCount > 0 ? 'bg-green-50 hover:bg-green-100 border-green-200' : 'bg-gray-50 border-gray-200 opacity-60'}`}
          >
            <div>
              <div className={`font-bold text-lg ${reviewCount > 0 ? 'text-green-900' : 'text-gray-500'}`}>要復習の問題のみ</div>
              <div className={`text-sm mt-1 ${reviewCount > 0 ? 'text-green-700' : 'text-gray-400'}`}>該当: {reviewCount}問</div>
            </div>
            <ChevronRight className={reviewCount > 0 ? "text-green-400" : "text-gray-300"} />
          </button>
        </div>
      </div>

      <button 
        onClick={() => setView("history")}
        className="w-full bg-white border border-gray-300 shadow-sm hover:bg-gray-50 text-gray-800 font-bold py-4 px-4 rounded-xl flex items-center justify-center transition-colors"
      >
        <List className="w-5 h-5 mr-2 text-gray-600" /> 学習履歴を見る
      </button>
    </div>
  </div>
);
}

if (view === "quiz") {
const question = filteredQuestions[currentQuestionIndex];
if (!question) return null;

const isCorrect = currentAnswer === question.answerIndex;
const isReview = userData.needsReview[question.id] || false;

return (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    {/* Header */}
    <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
      <button onClick={quitQuiz} className="text-gray-500 hover:text-gray-800">
        <X className="w-6 h-6" />
      </button>
      <div className="font-bold text-gray-700">
        {currentQuestionIndex + 1} / {filteredQuestions.length}
      </div>
      <div className="w-6" /> {/* spacer */}
    </header>

    {/* Progress Bar */}
    <div className="h-1.5 w-full bg-gray-200">
      <div 
        className="h-1.5 bg-blue-600 transition-all duration-300"
        style={{ width: `${((currentQuestionIndex) / filteredQuestions.length) * 100}%` }}
      />
    </div>

    <main className="flex-1 max-w-3xl w-full mx-auto p-4 pb-24">
      {/* Question Title & Year */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">問題 {question.id}</span>
          <span className="text-sm font-medium text-gray-500">{question.year}</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 leading-relaxed">
          {question.title}
        </h2>
      </div>

      {/* Question Text */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 mb-6">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{question.text}</p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((opt, idx) => {
          let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all ";
          if (!showExplanation) {
            btnClass += "bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50";
          } else {
            if (idx === question.answerIndex) {
              btnClass += "bg-green-50 border-green-500";
            } else if (idx === currentAnswer) {
              btnClass += "bg-red-50 border-red-500";
            } else {
              btnClass += "bg-white border-gray-200 opacity-50";
            }
          }

          return (
            <button
              key={idx}
              disabled={showExplanation}
              onClick={() => handleAnswerSelect(idx)}
              className={btnClass}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5 mr-3">
                  {showExplanation && idx === question.answerIndex && <Check className="w-5 h-5 text-green-600" />}
                  {showExplanation && idx === currentAnswer && idx !== question.answerIndex && <X className="w-5 h-5 text-red-600" />}
                  {!showExplanation && <div className="w-5 h-5 rounded-full border-2 border-gray-300" />}
                </div>
                <span className={`leading-relaxed ${showExplanation && idx === question.answerIndex ? 'font-bold text-green-900' : 'text-gray-700'}`}>
                  {opt}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation Area */}
      {showExplanation && (
        <div className="mt-8 animate-fade-in-up">
          <div className={`p-4 rounded-t-xl text-center font-bold text-lg text-white ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
            {isCorrect ? '正解！' : '不正解...'}
          </div>
          <div className="bg-white border-x border-b border-gray-200 rounded-b-xl p-6 shadow-sm">
            <h3 className="font-bold border-b pb-2 mb-4 text-gray-800">解説</h3>
            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
              {question.explanation}
            </div>
            {question.table && question.table}

            <div className="mt-6 pt-4 border-t flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  checked={isReview}
                  onChange={() => toggleReview(question.id)}
                />
                <span className="ml-2 text-gray-700 group-hover:text-blue-700 font-medium select-none">
                  要復習リストに入れる
                </span>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={nextQuestion}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center"
            >
              {currentQuestionIndex < filteredQuestions.length - 1 ? (
                <>次の問題へ <ChevronRight className="ml-1 w-5 h-5" /></>
              ) : (
                '結果を見る'
              )}
            </button>
          </div>
        </div>
      )}
    </main>
  </div>
);
}

if (view === "result") {
const correctCount = filteredQuestions.filter(q => {
const record = userData.history[q.id];
return record && record.isCorrect;
}).length;
const total = filteredQuestions.length;
const rate = Math.round((correctCount / total) * 100);

const pieData = [
  { name: '正解', value: correctCount, color: '#22c55e' },
  { name: '不正解', value: total - correctCount, color: '#ef4444' }
];

return (
  <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
    <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">お疲れ様でした！</h2>
      
      <div className="h-48 w-full mb-6 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <RechartsTooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-3xl font-bold text-gray-800">{rate}%</span>
        </div>
      </div>

      <div className="text-lg text-gray-600 mb-8">
        {total}問中 <span className="font-bold text-green-600">{correctCount}</span> 問正解
      </div>

      <div className="space-y-3">
        <button 
          onClick={() => startQuiz(currentMode, false)}
          className="w-full bg-blue-50 text-blue-700 font-bold py-3 px-4 rounded-xl flex items-center justify-center hover:bg-blue-100 transition-colors"
        >
          <RotateCcw className="w-5 h-5 mr-2" /> もう一度同じモードで解く
        </button>
        <button 
          onClick={() => setView("home")}
          className="w-full bg-gray-100 text-gray-700 font-bold py-3 px-4 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <Home className="w-5 h-5 mr-2" /> ホームへ戻る
        </button>
      </div>
    </div>
  </div>
);
}

if (view === "history") {
return (
<div className="min-h-screen bg-gray-50 flex flex-col pb-20">
<header className="bg-white shadow-sm p-4 flex items-center sticky top-0 z-10">
<button onClick={() => setView("home")} className="text-gray-500 hover:text-gray-800 p-1 mr-2">
<ChevronRight className="w-6 h-6 rotate-180" />
</button>
<h1 className="font-bold text-lg text-gray-800">学習履歴</h1>
</header>

    <main className="flex-1 max-w-3xl w-full mx-auto p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {allQuestions.map(q => {
            const history = userData.history[q.id];
            const isReview = userData.needsReview[q.id];
            return (
              <div key={q.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex-1 mr-4">
                  <div className="flex items-center mb-1">
                    <span className="text-xs font-bold text-gray-500 mr-2">問 {q.id}</span>
                    {history ? (
                      history.isCorrect ? 
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded font-medium">正解</span> : 
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded font-medium">不正解</span>
                    ) : (
                      <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded font-medium">未解答</span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-800 line-clamp-1">{q.title}</div>
                </div>
                
                <button 
                  onClick={() => toggleReview(q.id)}
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isReview ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-300 hover:bg-gray-200'}`}
                  title="要復習"
                >
                  <AlertCircle className="w-5 h-5" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  </div>
);
}

return null;
}