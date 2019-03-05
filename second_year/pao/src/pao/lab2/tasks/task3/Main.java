package pao.lab2.tasks.task3;

import java.util.Arrays;
import java.util.OptionalInt;
import java.util.stream.IntStream;

public class Main {
    public static void main(String[] args) {
        Integer[] arr = {1, 5, 6, 9, 12, 22, 7, 20};
        Integer item = 9;

        Integer[] result = (new Main()).findItem(arr, item);
        System.out.println(Arrays.toString(result));
    }

    private Integer[] findItem(Integer[] arr, Integer item) {
        OptionalInt position = IntStream.range(0, arr.length).filter(index -> arr[index].equals(item)).findFirst();
        if (position.isEmpty()) {
            throw new IllegalArgumentException("Array " + Arrays.toString(arr) + " does not contain " + item.toString());
        }
        return Arrays.copyOfRange(arr, position.getAsInt(), arr.length);
    }
}
