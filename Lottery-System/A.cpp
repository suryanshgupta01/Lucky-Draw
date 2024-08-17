#include <bits/stdc++.h>
using namespace std;
#define loop(i, a, b) for (ll i = a; i < b; i++)
#define rloop(i, b, a) for (ll i = b; i >= a; i--)
#define fr(i, s) for (auto &i : s)
#define ll long long int
#define ln cout << '\n';
#define R cin >>
#define PB(a) push_back(a);
#define all(x) (x).begin(), (x).end()
#define br break;
#define cn continue;
#define yes cout << "YES\n";
#define no cout << "NO\n";
#define minheap priority_queue<long long, vector<long long>, greater<long long>>
#define maxheap priority_queue<long long>
#define F first
#define S second
#define hashmap map<ll, ll>
#define hashset set<ll>
#define pii pair<ll, ll>
#define vi vector<ll>
#define vpii vector<pair<ll, ll>>
#define vvi vector<vector<ll>>
#define print(x) cout << (x);
#define println(x) cout << (x) << endl;
const int N = 1e5 + 10;
const int MOD = 1e9 + 7;
vi dp;
#define ilihg                         \
    ios_base::sync_with_stdio(false); \
    cin.tie(NULL);                    \
    cout.tie(nullptr);

class Solution
{
public:
    int removeDuplicates(vector<int> &nums)
    {
        int n = nums.size();
        int i = 0, k = 0;
        while (i < n)
        {
            int j = i;
            while (j < n && nums[j] == nums[i])
            {
                j++;
            }
            if (j - i >= 2)
            {
                nums[k++] = nums[i];
                nums[k++] = nums[i];
            }
            else if (j - i == 1)
                nums[k++] = nums[i];
            i = j;
        }
        return k;
    }
};
int main()
{
#ifndef ONLINE_JUDGE
    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);
#endif
    clock_t time_req = clock();
    ilihg;
    int T = 1;
    cin >> T;
    while (T--)
    {
        bool flag = false;
        bool flag2 = false;
        ll count = 0;
        ll ans = 0;
        ll sum = 0;
        ll temp = 0;
        ll temp2 = 0;
        ll zero = 0;
        ll one = 0;
        ll mini = LONG_LONG_MAX;
        ll maxi = LONG_LONG_MIN;

        string s, s1, s2, s3;
        ll n, m, x, y, z, k, a, b, c;
        R n;
        // R m;
        vi v, v1, res;
        hashset ss;
        hashmap mp;
        stack<ll> st;
        queue<ll> q;
        maxheap pq;
        vector<pair<ll, ll>> vp;
        unordered_map<ll, vi> adj;
        // loop(i, 0, n) {R z; v.push_back(z); }
    }
#ifndef ONLINE_JUDGE
    cout << "Time: " << fixed << setprecision(6) << ((double)(clock() - time_req)) / CLOCKS_PER_SEC << endl;
#endif
}