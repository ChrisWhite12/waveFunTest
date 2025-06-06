from .models import Tile

def collapse_table_cells(table_cells, map_cols, map_rows, tileGroupId):
    """
    Function to process table cells and assign collapsed values based on logic.

    Args:
        table_cells (list): List of table cell dictionaries.
        map_cols (int): Number of columns in the map.
        map_rows (int): Number of rows in the map.

    Returns:
        list: Updated table cells with collapsed values.
    """
    def check_valid_options(cell, direction, options):
        filtered_tiles = Tile.objects.filter(tileGroupId=tileGroupId)
        # socket data is [['AAA'],['ABA'],['BBB'],['ABA']] - top, bottom, left, right
        # cell is a Tile object
        # find the matching filtered tile with the cell based on the socket data and the direction

        top_tiles = filtered_tiles.filter(socketData__contains=cell['socketData'][0])
        bottom_tiles = filtered_tiles.filter(socketData__contains=cell['socketData'][1])
        left_tiles = filtered_tiles.filter(socketData__contains=cell['socketData'][2])
        right_tiles = filtered_tiles.filter(socketData__contains=cell['socketData'][3])


        outcomes = {
            "horizontal": {
                "top": ["horizontal", "bottomLeft", "bottomRight", "blank"],
                "bottom": ["horizontal", "topLeft", "topRight", "blank"],
                "left": ["vertical", "topRight", "bottomRight", "blank"],
                "right": ["vertical", "topLeft", "bottomLeft", "blank"],
            },
            "vertical": {
                "top": ["vertical", "topLeft", "topRight"],
                "bottom": ["vertical", "bottomLeft", "bottomRight"],
                "left": ["horizontal", "topLeft", "bottomLeft"],
                "right": ["horizontal", "topRight", "bottomRight"],
            },
        }
        valid_options = []
        # TODO Look in direction and match the socket to the options
        for option in cell['options']:
            valid = outcomes[option][direction]
            valid_options.extend(valid)
        # Remove options that are not valid
        options[:] = [opt for opt in options if opt in valid_options]
        return options

    

    next_tiles = []
    for index, cell in enumerate(table_cells):
        if cell['collapsed']:
            next_tiles.append(cell)
            continue

        # TODO need all the options for the tile group
        options = ["horizontal", "vertical", "topLeft", "topRight", "bottomLeft", "bottomRight", "blank"]
        col = index % map_cols
        row = index // map_cols

        # Check top neighbor
        if row < map_rows - 1:
            top_cell = table_cells[index + map_cols]
            check_valid_options(top_cell, 'bottom', options)

        # Check bottom neighbor
        if row > 0:
            bottom_cell = table_cells[index - map_cols]
            check_valid_options(bottom_cell, 'top', options)

        # Check left neighbor
        if col < map_cols - 1:
            left_cell = table_cells[index + 1]
            check_valid_options(left_cell, 'right', options)

        # Check right neighbor
        if col > 0:
            right_cell = table_cells[index - 1]
            check_valid_options(right_cell, 'left', options)

        # Remove duplicates and update cell
        unique_options = list(set(options))
        next_tiles.append({
            'collapsed': len(unique_options) == 1,
            'options': unique_options,
            'x': col,
            'y': row
        })

    return next_tiles