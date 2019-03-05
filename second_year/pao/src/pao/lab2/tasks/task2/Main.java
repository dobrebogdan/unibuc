package pao.lab2.tasks.task2;

public class Main {
    public static void main(String[] args) {
//        Integer[][] table = { { 1, 2, 3 }, { 2, 1, 4 }, { 3, 4, 3 } };
        Integer[][] table = { { 1, 3, 3 }, { 2, 1, 4 }, { 3, 4, 3 } };
        boolean isSymmetric = (new Main()).isSquareAndSymmetric(table);
        System.out.println(isSymmetric ? "The matrix is symmetric" : "The matrix is not symmetric");
    }

    private boolean isSquareAndSymmetric(Integer[][] table) {
        int sz = table.length;
        for (Integer[] line : table) {
            if (line.length != sz) {
                return false;  // nu e patrat.
            }
        }
        for (int i = 0; i < sz; ++ i) {
            for (int j = i + 1; j < sz; ++ j) {
                if (!table[i][j].equals(table[j][i])) {
                    return false;  // nu e simetrica
                }
            }
        }
        return true;
    }
}
