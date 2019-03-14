# -*- coding: utf-8 -*-

def playConway():
	cells = {}
	# create a hashmap of dead cells
	for r in range(-5, 5):
		for c in range(-5, 5):
			cells[(r,c)] = 0

	# set some cells to be alive
	cells[(0,0)] = 1
	cells[(0,1)] = 1
	cells[(-1,1)] = 1
	cells[(-2,-1)] = 1
	cells[(-1,-1)] = 1
	cells[(3,2)] = 1
	cells[(3,3)] = 1
	cells[(2,3)] = 1

	# iterate 10 times
	for i in range(10):
		printBoard(cells, i)
		cells = updateCells(cells)

def updateCells(cell):
	cells = cell
	# make a copy of the cells map to apply this generation of iterations to
	newCells = cells.copy()
	for key in cells:

		live = checkNeighbours(cells, key)
		# if cell is alive, apply rules
		if cells[key] == 1:
			if live < 2:
				newCells[key] = 0
			elif live > 3:
				newCells[key] = 0
		# if cell is dead, apply neighbour rules
		elif cells[key] == 0:
			if live == 3:
				newCells[key] = 1
	return newCells


def checkNeighbours(cells, key):
	count = 0
	r = key[0]
	c = key[1]
	# all of the neighbours of a given cell
	neighbours = [ ((r+1), c), ((r+1), c+1), ((r+1), (c-1)),
				   ((r-1), c), ((r-1), (c+1)), ((r-1), (c-1)),
				   (r, (c-1)), (r, (c+1)) ]
	for n in neighbours:
		if cells.get(n) == 1:
			count+=1

	return count


def printBoard(cells, index):
	print("board at iteration " + str(index))
	output = ""
	for r in range(-10,10):
		for c in range(-10,10):
			if cells.get((r,c)) == 1:
				output += "O "
			else:
				output += ". "
		output += "\n"
	print(output)


def main():
	playConway()

if __name__ == "__main__":
	main()
