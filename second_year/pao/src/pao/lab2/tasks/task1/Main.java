package pao.lab2.tasks.task1;

public class Main {
    private void printTable(Integer[][] table) {
        for (Integer[] tableLine : table) {
            for (int i = 0; i < tableLine.length; ++ i) {
                System.out.print(tableLine[i]);
                System.out.print(i + 1 == tableLine.length ? '\n' : ' ');
            }
        }
    }

    public static void main(String[] args) {
        Integer[][] table = { { 1, 2 }, { 3, 4 }, {56,65,33,7} };
        (new Main()).printTable(table);
    }
}
