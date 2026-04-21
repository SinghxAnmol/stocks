// =======================
// GLOBAL DATA
// =======================
let lastPrices = {};
let chartMap = {};
let priceHistory = {};

// =======================
// LOAD STOCKS (LIVE)
// =======================
async function loadStocks() {
  try {
    let res = await fetch("http://localhost:3000/stocks");
    let data = await res.json();

    let div = document.getElementById("stocks");
    div.innerHTML = "";

    data.forEach((s) => {
      let price = parseFloat(s.price);

      // store latest price for portfolio
      lastPrices[s.name] = price;

      div.innerHTML += `
        <div class="card">
          <div class="card-header">
            <h3>${s.name}</h3>
            <span class="live-dot"></span>
          </div>

          <p class="price">💲 ${price}</p>

          <div class="actions">
            <button class="buy" onclick="buy('${s.name}', ${price})">Buy</button>
            <button class="sell" onclick="sell('${s.name}', ${price})">Sell</button>
          </div>
        </div>
      `;
    });

    // 🔥 render all charts
    renderCharts(data);
  } catch (err) {
    console.error("Stock Load Error:", err);
  }
}

// =======================
// MULTI STOCK CHARTS
// =======================
function renderCharts(stocks) {
  let container = document.getElementById("charts");
  container.innerHTML = "";

  stocks.forEach((s) => {
    let price = parseFloat(s.price);

    // Create card
    let card = document.createElement("div");
    card.className = "chart-card";

    card.innerHTML = `
      <div class="chart-header">
        <h3>${s.name}</h3>
        <span style="color:lime">● LIVE</span>
      </div>
      <canvas id="chart-${s.name}"></canvas>
    `;

    container.appendChild(card);

    // Init history
    if (!priceHistory[s.name]) {
      priceHistory[s.name] = [];
    }

    priceHistory[s.name].push(price);

    // keep last 20 values
    if (priceHistory[s.name].length > 20) {
      priceHistory[s.name].shift();
    }

    let ctx = document.getElementById(`chart-${s.name}`).getContext("2d");

    // destroy old chart (important fix)
    if (chartMap[s.name]) {
      chartMap[s.name].destroy();
    }

    // create new chart
    chartMap[s.name] = new Chart(ctx, {
      type: "line",
      data: {
        labels: priceHistory[s.name].map((_, i) => i + 1),
        datasets: [
          {
            label: `${s.name} Price`,
            data: priceHistory[s.name],
            borderColor: "#22c55e",
            backgroundColor: "rgba(34,197,94,0.1)",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "white",
            },
          },
        },
        scales: {
          x: {
            ticks: { color: "gray" },
          },
          y: {
            ticks: { color: "gray" },
          },
        },
      },
    });
  });
}

// =======================
// BUY STOCK
// =======================
async function buy(name, price) {
  try {
    await fetch("http://localhost:3000/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symbol: name, price: price }),
    });

    loadPortfolio();
  } catch (err) {
    console.error("Buy Error:", err);
  }
}

async function loadRecommendations() {
  let res = await fetch("http://localhost:3000/recommend");
  let data = await res.json();

  let div = document.getElementById("recommend");
  div.innerHTML = "";

  data.data.forEach((s) => {
    div.innerHTML += `<p>🔥 ${s}</p>`;
  });
}
// =======================
// SELL STOCK
// =======================
async function sell(name, price) {
  try {
    await fetch("http://localhost:3000/sell", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symbol: name, price: price }),
    });

    loadPortfolio();
  } catch (err) {
    console.error("Sell Error:", err);
  }
}

// =======================
// PORTFOLIO + PROFIT
// =======================
async function loadPortfolio() {
  try {
    let res = await fetch("http://localhost:3000/portfolio");
    let data = await res.json();

    let div = document.getElementById("portfolio");
    let dash = document.getElementById("dashboard");

    div.innerHTML = "";

    let totalInvestment = 0;
    let currentValue = 0;

    if (data.length === 0) {
      div.innerHTML = "<p style='color:gray'>No stocks yet</p>";
      dash.innerHTML = "";
      return;
    }

    data.forEach((p) => {
      let currentPrice = lastPrices[p.symbol] || p.buy_price;

      totalInvestment += p.buy_price;
      currentValue += currentPrice;

      div.innerHTML += `
        <div class="card">
          <h3>${p.symbol}</h3>
          <p>Buy: 💲 ${p.buy_price}</p>
          <p>Now: 💲 ${currentPrice}</p>
        </div>
      `;
    });

    let profit = (currentValue - totalInvestment).toFixed(2);

    dash.innerHTML = `
      <div class="dashboard-card">
        💰 Investment <br> ${totalInvestment.toFixed(2)}
      </div>

      <div class="dashboard-card">
        📊 Current Value <br> ${currentValue.toFixed(2)}
      </div>

      <div class="dashboard-card" style="color:${profit >= 0 ? "#22c55e" : "#ef4444"}">
        📈 Profit/Loss <br> ${profit}
      </div>
    `;
  } catch (err) {
    console.error("Portfolio Error:", err);
  }
}

// =======================
// AUTO REFRESH
// =======================
setInterval(loadStocks, 2000);

// =======================
// INIT LOAD
// =======================
loadStocks();
loadPortfolio();
loadRecommendations();
