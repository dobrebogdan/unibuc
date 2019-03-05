from math import atan2

from src.point import Point
from src.triangle import Triangle


def triangulate(exterior, interior):
    """
    :type exterior: Triangle
    :param interior: a List of points inside the `exterior` triangle.
    :type interior: list of Point
    :return: List of triangles representing a valid triangulation
             of the given points.
    :rtype: list of Triangle
    """
    origin, b, c = exterior.a, exterior.b, exterior.c

    triangles_containing_origin = []
    ordered_points = sorted(
        interior + [b, c],
        key=lambda p: atan2(p.y - origin.y, p.x - origin.x)
    )
    # Rotate the array of points if the exterior points b and c do not "flank"
    # all the other points
    if (b, c) != (ordered_points[0], ordered_points[-1]) and \
            (c, b) != (ordered_points[0], ordered_points[-1]):
        for i in range(1, len(ordered_points)):
            if (b, c) == (ordered_points[i - 1], ordered_points[i]) or \
                    (c, b) == (ordered_points[i - 1], ordered_points[i]):
                ordered_points = ordered_points[i:] + ordered_points[:i]
                break
    for i in range(1, len(ordered_points)):
        triangles_containing_origin.append(
            Triangle(ordered_points[i - 1], ordered_points[i], origin)
        )

    ear_clipped_triangles = []
    print(ordered_points[::-1])
    polygon = ordered_points[::-1]

    while len(polygon) != 3:
        for index in range(len(polygon)):
            predecessor = polygon[(index - 1) % len(polygon)]
            current = polygon[index]
            successor = polygon[(index + 1) % len(polygon)]
            if Point.test_orientation(predecessor, current, successor) == 1:
                t = Triangle(predecessor, current, successor)
                contains_points = False
                for p in polygon:
                    if p in t and p not in (predecessor, current, successor):
                        contains_points = True
                        break
                if not contains_points:
                    ear_clipped_triangles.append(t)
                    polygon = polygon[:index] + polygon[index + 1:]
                    break
    ear_clipped_triangles.append(Triangle(*polygon))

    return triangles_containing_origin + ear_clipped_triangles
