#include <iostream>
using namespace std;

int main() {
    int i = 1, odd = 1, n;

    cout << "Enter count: ";
    cin >> n;

    while (i <= n) {
        cout << odd << endl;
        odd += 2;
        i++;
    }
    return 0;
}