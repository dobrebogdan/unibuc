import matplotlib.pyplot as plt
from matplotlib.collections import PatchCollection
from matplotlib.patches import Polygon
import numpy

from src.triangle import Triangle


fig = None
ax = None


def start_draw():
    global fig
    global ax
    fig, ax = plt.subplots()


def draw_triangle_shade(triangle):
    """
    :type triangle: Triangle
    """
    points = numpy.array([
        [triangle.a.x, triangle.a.y],
        [triangle.b.x, triangle.b.y],
        [triangle.c.x, triangle.c.y]
    ])
    p = PatchCollection([Polygon(points[:3, :])])
    p.set_array(numpy.array(['grey']))
    ax.add_collection(p)


def draw_triangle(triangle):
    """
    :type triangle: Triangle
    """
    plt.plot([triangle.a.x, triangle.b.x, triangle.c.x, triangle.a.x],
             [triangle.a.y, triangle.b.y, triangle.c.y, triangle.a.y],
             color='black')


def draw_point(point):
    """
    :type point: Point
    """
    plt.scatter(point.x, point.y, s=100, color="red")


def end_draw():
    plt.show()
