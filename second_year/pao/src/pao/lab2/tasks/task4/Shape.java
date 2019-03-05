package pao.lab2.tasks.task4;

public class Shape {
    public static int counter = 5;

    public String name;
    public String color;

    Shape(String name, String color) {
        ++ counter;
        this.name = name;
        this.color = color;
    }

    public static void printShape(Shape s) {
        System.out.println(s.color + " " + s.name);
    }
}
