#include <iostream>
using namespace std;

int main() {
    int a, b, i = 1;

    cout << "Enter desired table: ";
    cin >> a;
    cout << "How far it will go: ";
    cin >> b;

    while (i <= b) {
        cout << a << " * " << i << " = " << a * i << endl;
        i++;
    }
    return 0;
}