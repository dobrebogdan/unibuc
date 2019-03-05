package pao.lab2.tasks.task4;

public class Main {
    public static void main(String[] args) {
        Shape redCircle = new Shape("circle", "red");
        Shape blueLine = new Shape("line", "blue");
        Shape greySquare = new Shape("square", "grey");
        Shape[] shapes = {redCircle, blueLine, greySquare};
        for (Shape shape : shapes) {
            Shape.printShape(shape);
        }
        System.out.println("Shape counter = " + Shape.counter);
    }
}
