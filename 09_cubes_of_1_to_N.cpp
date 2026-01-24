#include <iostream>
using namespace std;

int main() {
    int i = 1, n;

    cout << "Enter number: ";
    cin >> n;

    while (i <= n) {
        cout << "Cube of " << i << " = " << i * i * i << endl;
        i++;
    }
    return 0;
}