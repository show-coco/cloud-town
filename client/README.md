This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## コンポーネント設計

### Atomic Designの５つのグループの役割
|  グループ名  |  特徴  |
| ---- | ---- |
|  atoms  |  ・UIパーツの最小構成部品<br>・他のコンポーネントには依存しない<br>・自分自身で状態はなるべく持たない  |
|  molecules  |  ・他のatomsやmoleculesのコンポーネントに依存している<br>・atomsの原始的行動に意味を付加する<br>・自分自身で状態はなるべく持たない  |
|  organisms  |  ・ドメインが入ったらOrganisms<br>・独立して機能し、他のページでも同じ意図で使える<br>・その機能のためのAPIを叩くのはここ。  |
|  templates  |  ・atoms, molecules, organismsを配置する<br>・ロジックは持たない  |
|  pages  |  ・templatesのラッパー<br>・データを流し込むのはNext.jsの`pages`ディレクトリ  |

#### 迷ったときの判断基準
* atoms vs molecules  
他のコンポーネントに依存している？
YES → moelcules
NO → atoms

* molecules vs organisms  
ドメインが入っている？（特定のコンテンツ・コンテキストじゃないと使えない状態）
YES → organisms
NO → molecules

* organisms vs templates  
配置を自由に変えられる場合 → templates
配置を自由に変えられない場合 → organisms

* templates vs pages  
実際のデータに依存する場合 → pages
実際のデータに依存しない場合 → templates

参考：
https://note.com/tabelog_frontend/n/n4b8bcb44294c
