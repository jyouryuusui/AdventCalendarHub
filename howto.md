this is first vite project

I asked project for vite to ChatGPT.
He responced to..


```
vue create incubateqac（ここにアプリ名）
```

```
ue CLI v5.0.8
? Please pick a preset: Manually select features

? Check the features needed for your project: Babel, TS, Router, Vuex, Linter

? Choose a version of Vue.js that you want to start the project with 3.x

? Use class-style component syntax? No

? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? Yes

? Use history mode for router? (Requires proper server setup for index fallback in production) Yes

? Pick a linter / formatter config: Basic

? Pick additional lint features: Lint on save

? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files

? Save this as a preset for future projects? No
```

つくれたら一段下がって

```
cd incubateqac
```

```
yarn serve
```

もしもyarn入っていなかったら

```
brew install yarn --ignore-dependencies
```


で入れておいて
これでVueの緑色アイコンページが表示されるはず
Local:   http://localhost:8080/ 

役目が終わったらctrl+Cで終了して

```
vue add vuetify
```

```
? Choose a preset: Vuetify 3 - Vite (preview)

? Would you like to install Vuetify 3 nightly build? (WARNING: Nightly builds are 
intended for development testing and may include bugs or other issues.) Yes
```

```
yarn dev
```

で完成というかVuetify3の実行が成功


TypeScriptの勉強としては、
typescriptbook.jp
をみよう

もう一度、学び直しましょう。

# TypeScriptの特徴

静的型付け、Apache2.0、JavaScriptの上位互換、トランスパイルされる

静的型付けを持つことで、変数や関数の引数に型を指定することで、コードの安全性が
向上し、バグが発見されやすくなります。　らしい。

TypeScriptは、型注釈がついていない変数でもコンテキストに基づいて
自動的に型を推測します。これにより、開発者は型を明示しなくても安全性が向上します。

```
function sum(a:number,b:number):number{
    return a + b;
}
```

構造的部分型システム　を採用しており、オブジェクトの形状（つまりオブジェクトがどのようなプロパティとメソッドを有しているか）に基づいて型を判断します。したがって、広称型ではなく構造的部分型に基づいて動作します。

ジェネリクス

TypeScriptはジェネリクスをサポートしており、汎用的で再利用可能なコードを書くことができます。

```
function identity<T>(arg: T):T{
    return arg;
}

```


terraformを学び始めましょう。と思ったけど、、
インストールできない。。また今度
まずは、
S3の作成






