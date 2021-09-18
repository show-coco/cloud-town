## Prisma
DBを更新したときに行う。DBの変更はHasuraから行う。

```bash
$ yarn prisma pull # DBからschemaを生成
$ yarn prisma generate # Prismaクライアントを生成
```

## デプロイ

```bash
# Dockerイメージビルド&プッシュ(M1 Mac)
$ docker buildx build --platform linux/amd64 -f ./docker/Dockerfile -t 097538377308.dkr.ecr.ap-northeast-1.amazonaws.com/backend:<version> --push .
```

プッシュしたら、AWS ECRでタスクのリビジョンを更新する