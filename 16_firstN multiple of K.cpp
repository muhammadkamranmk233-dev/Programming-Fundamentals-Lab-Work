#include <iostream>
using namespace std;

int main() {
    int n, k;
    cout << "Enter N: ";
    cin >> n;
    cout << "Enter K: ";
    cin >> k;

    for (int i = 1; i <= n; i++) {
        cout << i * k << endl;
    }
    return 0;
}