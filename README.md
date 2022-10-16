# Expense tracker backend server

Expense-Tracker-Frontend: https://github.com/Tommy1023/expense-tracker

## 環境建置與需求 
[![node version](https://img.shields.io/badge/node-v16.15.1-impotent?style=flat "node")](https://nodejs.org/en/)
[![MySQL version](https://img.shields.io/badge/MySQL-v8.0.31-informational "MySQL")](https://dev.mysql.com/downloads/mysql/)

[MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

## 專案下載 

1. 終端機 下載專案

```
git clone https://github.com/tommy1023/expense-tracker-backend.git
```

## 初始化
### Initialize

```
npm install (package.json 已提供相對應需安裝的套件)
```

### 新增.env設定檔
```
PORT= 3000
JWT_SECRET= "your JWTToken secret"
```

### 設定本地資料庫
需要與 config/config.json 一致
```
"development": {
    "username": "root",
    "password": "password",
    "database": "expense_tracker",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
```

1. 本地資料庫

```
帳號：root
密碼：password
```

2. 建立資料庫

```
create database expense-tracker;
```

### 設定資料庫Table

```
npx sequelize db:migrate
```

### 設定種子資料

```
npx sequelize db:seed:all
```

### 執行

```
npm run dev
```



  
  
  
  
  
  
  
  
  
  

