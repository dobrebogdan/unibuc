package pao.lab1.tasks.task1;

import static java.lang.System.out;

public class Task1 {
    public int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        out.println((new Task1()).add(1, 2));
    }
}
