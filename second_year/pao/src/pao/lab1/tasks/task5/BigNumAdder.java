package pao.lab1.tasks.task5;

import java.util.Scanner;

public class BigNumAdder {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String first = sc.next();
        String second = sc.next();
        int maxLength = Math.max(first.length(), second.length());
        first = new String(new char[maxLength - first.length()]).replace('\0', '0') + first;
        second = new String(new char[maxLength - second.length()]).replace('\0', '0') + second;
        StringBuilder resultBuilder = new StringBuilder();
        resultBuilder.setLength(maxLength);
        int carryover = 0;
        for (int i = maxLength - 1; i >= 0; -- i) {
            int firstDigit = first.charAt(i) - '0';
            int secondDigit = second.charAt(i) - '0';
            int resultDigit = firstDigit + secondDigit + carryover;
            if (resultDigit >= 10) {
                resultDigit -= 10;
                carryover = 1;
            } else {
                carryover = 0;
            }
            resultBuilder.setCharAt(i, (char)('0' + resultDigit));
        }
        if (carryover == 1) {
            resultBuilder.insert(0, '1');
        }
        String result = resultBuilder.toString();
        System.out.println(result);
    }
}
