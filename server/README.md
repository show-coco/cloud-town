# Server

## Initialization

```shell
# コンテナ
$ docker-compose up -d

# package install
$ yarn install

# DBのマイグレーション
$ yarn migrate
```

## 開発時のメモ

```shell
# Graphqlを変更したら
$ yarn run generate
```

## Prisma開発手順

```shell
# schema.prismaのフォーマット
$ yarn prisma format

# リセットするとDBにmigrationの記録をとるテーブルが作成される
$ yarn prisma migrate reset

# sqlだけ生成する。DBに生成したsqlは反映しない。
$ yarn prisma migrate dev --create-only --name hogeFuga

# DBのマイグレーション
$ yarn migrate
```
