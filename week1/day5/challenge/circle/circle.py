class Circle:
    def __init__(self, radius=None, diameter=None):
        if radius is not None:
            self._radius = float(radius)
        elif diameter is not None:
            self._radius = float(diameter) / 2
        else:
            raise ValueError("Either radius or diameter must be provided")

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value >= 0:
            self._radius = float(value)
        else:
            raise ValueError("Radius must be non-negative")

    @property
    def diameter(self):
        return self._radius * 2

    @diameter.setter
    def diameter(self, value):
        if value >= 0:
            self._radius = float(value) / 2
        else:
            raise ValueError("Diameter must be non-negative")

    def area(self):
        import math
        return math.pi * self._radius ** 2

    def __str__(self):
        return f"Circle(radius={self._radius:.2f}, diameter={self.diameter:.2f})"

    def __add__(self, other):
        if not isinstance(other, Circle):
            raise TypeError("Can only add Circle objects together")
        return Circle(radius=self.radius + other.radius)

    def __lt__(self, other):
        if not isinstance(other, Circle):
            raise TypeError("Can only compare Circle objects")
        return self.radius < other.radius

    def __gt__(self, other):
        if not isinstance(other, Circle):
            raise TypeError("Can only compare Circle objects")
        return self.radius > other.radius

    def __eq__(self, other):
        if not isinstance(other, Circle):
            return False
        return self.radius == other.radius

    def __le__(self, other):
        return self.radius <= other.radius

    def __ge__(self, other):
        return self.radius >= other.radius

if __name__ == "__main__":
    circle1 = Circle(radius=5)
    circle2 = Circle(diameter=12)
    print(f"Circle 1: {circle1}")
    print(f"Circle 2: {circle2}")


    print(f"Circle 1 radius: {circle1.radius}")
    print(f"Circle 1 diameter: {circle1.diameter}")
    print(f"Circle 1 area: {circle1.area():.2f}")

    # Add circles
    circle3 = circle1 + circle2
    print(f"Circle 3 (sum of 1 and 2): {circle3}")

    # Compare circles
    print(f"Circle 1 > Circle 2: {circle1 > circle2}")
    print(f"Circle 1 == Circle 2: {circle1 == circle2}")

    # Sort circles
    circles = [Circle(radius=7), Circle(radius=3), Circle(radius=10)]
    sorted_circles = sorted(circles)
    print("Sorted circles by radius (smallest to largest):")
    for idx, circle in enumerate(sorted_circles):
        print(f"{idx+1}. {circle}")