const express = require("express");
const mysql = require("mysql2");
const axios = require("axios");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// =======================
// DATABASE
// =======================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "stock_db",
});

// =======================
// RUN C++ ENGINE
// =======================
function runEngine(mode) {
  return new Promise((resolve, reject) => {
    exec(`engine ${mode}`, (error, stdout) => {
      if (error) reject(error);
      else resolve(stdout.trim().split(" "));
    });
  });
}

// =======================
// STOCKS → BFS
// =======================
app.get("/stocks", async (req, res) => {
  try {
    let bfsStocks = await runEngine("bfs"); // 🔥 BFS USED HERE

    let result = [];

    for (let s of bfsStocks) {
      try {
        const response = await axios.get(
          `https://query1.finance.yahoo.com/v8/finance/chart/${s}`,
        );

        let basePrice = response.data.chart.result[0].meta.regularMarketPrice;

        let randomChange = Math.random() * 2 - 1;
        let finalPrice = (basePrice + randomChange).toFixed(2);

        result.push({
          name: s,
          price: finalPrice,
        });
      } catch {
        result.push({
          name: s,
          price: (Math.random() * 1000).toFixed(2),
        });
      }
    }

    res.json(result);
  } catch (err) {
    res.status(500).send("Error loading stocks");
  }
});

// =======================
// RECOMMENDATIONS → DFS
// =======================
app.get("/recommend", async (req, res) => {
  try {
    let dfsStocks = await runEngine("dfs"); // 🔥 DFS USED HERE
    res.json({ data: dfsStocks });
  } catch {
    res.status(500).send("Error in DFS");
  }
});

// =======================
// BUY STOCK
// =======================
app.post("/buy", (req, res) => {
  let { symbol, price } = req.body;

  db.query("INSERT INTO portfolio(symbol,quantity,buy_price) VALUES (?,1,?)", [
    symbol,
    price,
  ]);

  db.query(
    "INSERT INTO transactions(symbol,type,price,quantity) VALUES (?, 'BUY', ?,1)",
    [symbol, price],
  );

  res.send("Bought");
});

// =======================
// SELL STOCK
// =======================
app.post("/sell", (req, res) => {
  let { symbol, price } = req.body;

  db.query("DELETE FROM portfolio WHERE symbol=? LIMIT 1", [symbol]);

  db.query(
    "INSERT INTO transactions(symbol,type,price,quantity) VALUES (?, 'SELL', ?,1)",
    [symbol, price],
  );

  res.send("Sold");
});

// =======================
// PORTFOLIO → LRU
// =======================
app.get("/portfolio", async (req, res) => {
  try {
    let lruOrder = await runEngine("lru"); // 🔥 LRU USED HERE

    db.query("SELECT * FROM portfolio", (err, data) => {
      if (err) return res.status(500).send("DB Error");

      // 🔥 Sort portfolio based on LRU order
      let sorted = data.sort((a, b) => {
        return lruOrder.indexOf(a.symbol) - lruOrder.indexOf(b.symbol);
      });

      res.json(sorted);
    });
  } catch {
    res.status(500).send("Error in LRU");
  }
});

// =======================
// TRANSACTION HISTORY
// =======================
app.get("/transactions", (req, res) => {
  db.query("SELECT * FROM transactions ORDER BY id DESC", (err, data) => {
    res.json(data);
  });
});

// =======================
// SERVER
// =======================
app.listen(3000, () =>
  console.log("🚀 Server running on http://localhost:3000"),
);
