def main():
    import sys
    from src.main import locate_point_in_triangulation

    args = sys.argv
    if len(args) < 2:
        print("Please provide a file name as the first command-line argument.")
        return 1

    input_file_name = args[1]
    try:
        input_file = open(input_file_name, "r")
    except IOError:
        print("Invalid input file provided.")
        return 1

    try:
        # Reading the data
        n = int(input_file.readline())
        points = []
        for i in range(n):
            x, y = map(float, input_file.readline().split())
            points.append((x, y))
        x, y = map(float, input_file.readline().split())
    except Exception:
        print("Invalid input format.")
        return 1

    return locate_point_in_triangulation(points, (x, y))


if __name__ == "__main__":
    exit(main())
