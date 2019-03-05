package pao.lab1.tasks.task5;

import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String op = sc.next();
        double a = sc.nextDouble();
        double b = sc.nextDouble();
        double ret;
        switch (op) {
            case "/": ret = a / b; break;
            case "*": ret = a * b; break;
            case "+": ret = a + b; break;
            case "-": ret = a - b; break;
            default: throw new IllegalArgumentException("Invalid operation '" + op + "'");
        }
        System.out.println(ret);
    }
}
