#include <iostream>
using namespace std;

int main() {
    int i = 1, n;

    cout << "Enter number: ";
    cin >> n;

    while (i <= n) {
        cout << i * 2 << endl;
        i++;
    }
    return 0;
}