#include <iostream>
using namespace std;

int main() {
    int N, count = 1;

    cout << "Enter N: ";
    cin >> N;

    while (count <= N) {
        cout << count << " ";
        count++;
    }

    return 0;
}
