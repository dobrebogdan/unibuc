from math import sqrt, fabs

from src.eps import EPSILON


class Point:
    def __init__(self, x, y):
        """
        :type: x: float
        :type: y: float
        """
        self.x = x
        self.y = y

    @staticmethod
    def test_orientation(a, b, c):
        """
        :type: a: Point
        :type: b: Point
        :type: c: Point
        :rtype: int
        """
        vector_product = (b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x)
        if vector_product <= -EPSILON:
            return -1
        if vector_product >= EPSILON:
            return 1
        return 0

    @staticmethod
    def distance(a, b):
        """
        :type: a Point
        :type: b Point
        :rtype: float
        """
        return sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y))

    @staticmethod
    def are_collinear(a, b, c):
        """
        :type: a: Point
        :type: b: Point
        :type: c: Point
        :rtype: bool
        """
        return Point.test_orientation(a, b, c) == 0

    def __eq__(self, other):
        return isinstance(other, Point) and \
               fabs(self.x - other.x) < EPSILON and \
               fabs(self.y - other.y) < EPSILON

    def __str__(self):
        return "(" + str(self.x) + "," + str(self.y) + ")"

    def __repr__(self):
        return str(self)
