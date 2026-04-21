#include <iostream>
#include <vector>
#include <list>
#include <unordered_map>
using namespace std;

// =======================
// GRAPH (STOCK RELATION)
// =======================
vector<string> stockNames = {"AAPL", "MSFT", "GOOGL", "NVDA", "TSLA"};

vector<vector<int>> graph = {
    {1, 2}, // AAPL -> MSFT, GOOGL
    {3},    // MSFT -> NVDA
    {4},    // GOOGL -> TSLA
    {},     // NVDA
    {}      // TSLA
};

// =======================
// BFS (Homepage Stocks)
// =======================
void bfs(int start)
{
    vector<bool> vis(5, false);
    vector<int> q;

    q.push_back(start);
    vis[start] = true;

    for (int i = 0; i < q.size(); i++)
    {
        int node = q[i];
        cout << stockNames[node] << " ";

        for (int n : graph[node])
        {
            if (!vis[n])
            {
                vis[n] = true;
                q.push_back(n);
            }
        }
    }
}

// =======================
// DFS (Recommendations)
// =======================
void dfs(int node, vector<bool> &vis)
{
    vis[node] = true;
    cout << stockNames[node] << " ";

    for (int n : graph[node])
    {
        if (!vis[n])
            dfs(n, vis);
    }
}

// =======================
// LRU CACHE (Portfolio)
// =======================
class LRUCache
{
    list<string> order;
    unordered_map<string, list<string>::iterator> map;
    int cap;

public:
    LRUCache(int c) { cap = c; }

    void access(string key)
    {
        if (map.find(key) != map.end())
        {
            order.erase(map[key]);
        }
        order.push_front(key);
        map[key] = order.begin();

        if (order.size() > cap)
        {
            string last = order.back();
            order.pop_back();
            map.erase(last);
        }
    }

    void show()
    {
        for (auto s : order)
            cout << s << " ";
    }
};

// =======================
// MAIN
// =======================
int main(int argc, char *argv[])
{

    string mode = argv[1];

    if (mode == "bfs")
    {
        bfs(0); // homepage stocks
    }

    else if (mode == "dfs")
    {
        vector<bool> vis(5, false);
        dfs(0, vis); // recommendations
    }

    else if (mode == "lru")
    {
        LRUCache cache(3);

        // simulate user portfolio
        cache.access("AAPL");
        cache.access("TSLA");
        cache.access("MSFT");
        cache.access("GOOGL");

        cache.show();
    }

    return 0;
}