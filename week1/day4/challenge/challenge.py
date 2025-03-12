class Pagination:

    def __init__(self, items, pageSize=10):
        self.items = items if  items not None else []
        self.pageSize = int(pageSize)
        self.totalPages = max(1, -(-len(self.items) // self.pageSize))
        self.currentPage = 1

    def getVisibleItems(self):
        start = (self.currentPage - 1) * self.pageSize
        end = self.currentPage + self.pageSize
        return self.items[start:end]

    def prevPage(self):
        if self.currentPage > 1:
            self.currentPage -= 1
        return self

    def nextPage(self):
        if self.currentPage < self.totalPages:
            self.currentPage += 1
        return self

    def firstPage(self):
        self.currentPage = 1
        return self

    def lastPage(self):
        self.currentPage = self.totalPages
        return self

    def gotToPage(self,pageNum):
        pageNum = int(pageNum)
        if pageNum < 1:
            self.currentPage = 1
        elif pageNum > self.totalPages:
            self.currentPage = self.totalPages
        else:
            self.currentPage = pageNum
        return self