#include <iostream>
using namespace std;

int main() {
    int i = 1, n;

    cout << "Enter number: ";
    cin >> n;

    while (i <= n) {
        if (i % 3 == 0) {
            cout << i << endl;
        }
        i++;
    }
    return 0;
}