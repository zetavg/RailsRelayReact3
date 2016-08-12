# Rails - Relay - React 實驗專案

使用 Rails 做為後端 server、GraphQL/Relay 做 API、React (Native) 做前端介面的簡易論壇。

## 如何跑起專案

### 後端 - Rails

```bash
cd GraphQLRails
bundle install
rails server
```

## 更新 GraphQL Schema

如果在開發時更新了 GraphQL Schema，需要跑以下指令，來更新 GraphQL 的 schema dumb：

```bash
cd GraphQLRails
rake graph_ql:dump_schema
```

產生的 schema dumb 位於專案目錄下的 `graphql-schema.json`。
