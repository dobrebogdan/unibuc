package pao.lab1.examples;

public class C_PublicClass {
    public static void main(String[] args){
        System.out.println("This is the main method of the public class");
        AnotherClass.anotherMethod();
    }
}

class AnotherClass{
    public static void anotherMethod(){
        System.out.println("Hello from AnotherClass");
    }
}

/*public class ThirdClass{
     // This will generate a compiling error
}*/