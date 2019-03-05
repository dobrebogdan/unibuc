from src.point import Point


class Triangle:
    def __init__(self, a, b, c):
        """
        :type: a: Point
        :type: b: Point
        :type: c: Point
        """
        self.a = a
        self.b = b
        self.c = c

    def __contains__(self, point):
        """
        :type point: Point
        """
        o1 = Point.test_orientation(self.a, self.b, point)
        o2 = Point.test_orientation(self.b, self.c, point)
        o3 = Point.test_orientation(self.c, self.a, point)
        return o1 == 0 or o2 == 0 or o3 == 0 or o1 == o2 == o3
