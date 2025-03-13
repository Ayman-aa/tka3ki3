import turtle
from circle import Circle  

def draw_circles(circles, colors=None):
    if colors is None:
        colors = []
        for i in range(len(circles)):
            blue_value = min(255, 50 + (i * 40))
            colors.append(f"#{0:02x}{0:02x}{blue_value:02x}")
    

    screen = turtle.Screen()
    screen.title("Sorted Circles")
    screen.setup(800, 600)

    t = turtle.Turtle()
    t.speed(0)  
    t.hideturtle()

    total_width = sum(c.diameter for c in circles) + (len(circles) - 1) * 10
    start_x = -total_width / 2

    x_pos = start_x
    for i, circle in enumerate(circles):
        t.penup()
        t.goto(x_pos + circle.radius, 0)
        t.pendown()
        
        t.fillcolor(colors[i % len(colors)])
        t.pencolor("black")
        
        t.begin_fill()
        t.circle(circle.radius)
        t.end_fill()
        
        t.penup()
        t.goto(x_pos + circle.radius, -circle.radius - 20)
        t.write(f"Radius: {circle.radius}", align="center", font=("Arial", 12, "normal"))
        
        x_pos += circle.diameter + 10

    screen.mainloop()


if __name__ == "__main__":
    circles = [
        Circle(radius=30),
        Circle(radius=50),
        Circle(radius=20),
        Circle(radius=70),
        Circle(diameter=80)
    ]
    sorted_circles = sorted(circles)
    colors = ["lightblue", "royalblue", "navy", "blue", "cornflowerblue"]
    draw_circles(sorted_circles, colors)
