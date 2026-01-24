#include <iostream>
using namespace std;

int main() {
    int A, B;

    cout << "Enter number A: ";
    cin >> A;
    cout << "Enter number B: ";
    cin >> B;

    while (A >= B) {
        cout << A << endl;
        A--;
    }
    return 0;
}