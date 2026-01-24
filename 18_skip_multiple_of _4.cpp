#include <iostream>
using namespace std;

int main() {
    int N, i = 1;

    cout << "Enter a number: ";
    cin >> N;

    while (i <= N) {
        if (i % 4 != 0) {   // skip multiples of 4
            cout << i << " ";
        }
        i++;
    }

    return 0;
}
