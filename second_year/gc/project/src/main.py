from src.draw import draw_triangle, draw_triangle_shade, end_draw, start_draw, draw_point
from src.point import Point
from src.triangle import Triangle
from src.triangulation import triangulate


def locate_point_in_triangulation(points, target):
    """
    :param: points: List of points. The first 3 points must form a triangle
    (must not be collinear) and all the other points must be inside that
    triangle. If either of these is not true, the function returns 1 (failure).
    :type: points list of (float, float)
    :param: target: Point to be located within the triangulation of `points`.
    :type: target (float, float)
    :return: 0 on success, 1 on failure
    :rtype: int
    """

    points = [Point(p[0], p[1]) for p in points]
    target = Point(target[0], target[1])

    if len(points) < 3:
        return 1  # Invalid number of points.

    if Point.are_collinear(*points[:3]):
        return 1  # The first 3 points must form a triangle.

    base = Triangle(*points[:3])

    for point in points[3:]:
        if point not in base:
            # All subsequent points must be inside the triangle
            # formed by the first 3.
            return 1

    # The input is valid. Running the triangulation algorithm
    triangles = triangulate(base, points[3:])

    # Draw the triangulation and locate the target on the graphic:
    start_draw()
    shaded = False
    for triangle in triangles:
        if target in triangle and not shaded:
            draw_triangle_shade(triangle)
            shaded = True
    for triangle in triangles:
        draw_triangle(triangle)
    print(target.x, target.y)
    draw_point(target)
    end_draw()

    return 0
