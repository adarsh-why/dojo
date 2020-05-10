import numpy as np


class Mandelbrot:

    def __init__(self, plane_low: complex, plane_high: complex):
        self.plane_low = plane_low
        self.plane_high = plane_high
        self.resolution = (1, 1)

    def map_plane(self, window_size: tuple, window_low: tuple, window_high: tuple):

        plane_width = (self.plane_high.real - self.plane_low.real)
        plane_height = (self.plane_high.imag - self.plane_low.imag)

        plane_real_low, plane_imag_low = self.plane_low.real, self.plane_low.imag

        real_low = (window_low[0]*plane_width) / window_size[0]
        imag_low = (window_low[1]*plane_height) / window_size[1]

        real_high = (window_high[0]*plane_width) / window_size[0]
        imag_high = (window_high[1]*plane_height) / window_size[1]

        self.plane_low = complex(
            plane_real_low + real_low, plane_imag_low + imag_low)
        self.plane_high = complex(
            plane_real_low + real_high, plane_imag_low + imag_high)

    def set_resolution(self, window_size: tuple):
        width_resolution = (self.plane_high.real -
                            self.plane_low.real) / window_size[0]
        height_resolution = (self.plane_high.imag -
                             self.plane_low.imag) / window_size[1]

        self.resolution = (width_resolution, height_resolution)

    @staticmethod
    def tends_inf(point: complex):
        return abs(point.real) > 1 or abs(point.imag) > 1

    @staticmethod
    def equ(z, c: complex):
        return z ** 2 + c

    @staticmethod
    def mandel_elem(point: complex):
        memoized = []
        z = complex(0, 0)
        for _ in range(100):
            z = Mandelbrot.equ(z, point)

            if Mandelbrot.tends_inf(z):
                return False

            if z in memoized:
                return True
            else:
                memoized.append(z)
        else:
            return True

