from flask import Flask, jsonify, request
from heapq import heapify, heappush, heappop
import sys
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "application/json"


class Graph(object):
    def __init__(self, n):
        self.n = n
        self.graph = {}
        self.graphinfo = {}
        self.visited = set()
        self.in_heap = set()
        self.latlong = {}
        self.pathLatLong = []

    def creategraph(self, edges):
        for edge in edges:
            src, dest, dist = edge[0].lower(), edge[1].lower(), edge[2]
            if src not in self.graph:
                self.graph[src] = {}
            self.graph[src][dest] = dist

            if dest not in self.graph:
                self.graph[dest] = {}
            self.graph[dest][src] = dist

            # setting initial cost to infinite and predecessors null
            if src not in self.graphinfo:
                self.graphinfo[src] = {}
                info = dict(cost=sys.maxsize, pred=[])
                self.graphinfo[src] = info

            if dest not in self.graphinfo:
                self.graphinfo[dest] = {}
                info = dict(cost=sys.maxsize, pred=[])
                self.graphinfo[dest] = info

    def createLatLong(self, edges):
        for edge in edges:
            location, latitude, longitude = edge[0].lower(), edge[1], edge[2]
            if location not in self.latlong:
                self.latlong[location] = {}
                info = dict(lat=latitude, long=longitude)
                self.latlong[location] = info

    def printgraph(self):
        print(len(self.graph))
        print(len(self.latlong))
        print(self.latlong)
        # for key in self.graph:
        #     print(key,"->",self.graph[key])

    def dijkstra(self, src, dest):
        temp = src
        self.graphinfo[temp]["cost"] = 0
        span = len(self.graph) - 1
        if temp not in self.graph:
            raise ValueError(f"The source node '{src}' is not present in the graph.")

        min_heap = []
        for i in range(span):
            print(f"Iteration {i + 1}:")
            print("Selected Node:", temp)
            print(f"Visited: {self.visited}")
            if temp not in self.visited:
                self.visited.add(temp)
                print(f"Visited: {self.visited}")
                for j in self.graph[temp]:
                    cost = self.graphinfo[temp]["cost"] + self.graph[temp][j]
                    if cost < self.graphinfo[j]["cost"]:
                        self.graphinfo[j]["cost"] = cost
                        self.graphinfo[j]["pred"] = self.graphinfo[temp]["pred"] + [
                            temp
                        ]

                    if j not in self.visited and j not in self.in_heap:
                        heappush(min_heap, (self.graphinfo[j]["cost"], j))
                        self.in_heap.add(j)

                if min_heap:
                    heapify(min_heap)
                    print(f"Min Heap before popping: {min_heap}")
                    temp = heappop(min_heap)[1]
                    self.in_heap.remove(temp)
                    print(f"Popped node: {temp}")
                    print(f"Min Heap after popping: {min_heap}")

        result = {
            "shortest_distance": self.graphinfo[dest]["cost"],
            "shortest_path": self.graphinfo[dest]["pred"]+[dest],
            # "path_latlong": self.relateLatitudeLongitude(dest),
        }

        return result

    def relateLatitudeLongitude(self, dest):
        for i in self.graphinfo[dest]["pred"]:
            temp = [self.latlong[i]["lat"], self.latlong[i]["long"]]
            self.pathLatLong.append(temp)
        return self.pathLatLong


@app.route("/pathFinder", methods=["POST"])
def shortest_path():
    src = request.json["source"]
    dest = request.json["destination"]

    g = Graph(3)

    edges = [
        ("Pulchowk", "Ekantakuna", 1.6),
        ("Pulchowk", "Kupondole", 1.5),
        ("Lagankhel", "Satdobato", 2.1),
        ("Ekantakuna", "Satdobato", 3.2),
        ("Ekantakuna", "Balkhu", 3.8),
        ("Satdobato", "Godawari", 7.9),
        ("Pulchowk", "Lagankhel", 2.0),
        ("Satdobato", "Khumaltar", 1),
        ("Khumaltar", "Dhapakhel", 3),
        ("Karyabinayak", "Devichour", 10.2),
        ("Ekantakuna", "Bhaisepati", 2.2),
        ("Bhaisepati", "Karyabinayak", 2.6),
        ("Karyabinayak", "Bajrabarahi", 9.47),
        ("Godawari", "Badegaun", 2.3),
        ("Badegaun", "Bajrabarahi", 3.2),
        ("Bajrabarahi", "Devichour", 11.2),
        ("Devichour", "Ghusel", 6.7),
        ("Ghusel", "Radar station", 6.1),
        ("Radar station", "Burja Chaur", 3.5),
        ("Burja Chaur", "Dhungepani", 3.7),
        ("Dhungepani", "Malta", 7),
        ("Bhattedanda", "Malta", 11.3),
        ("Malta", "Khanikhola ", 10.1),
        ("Khanikhola", "Pyutar", 5.8),
        ("Chappeli", "Bhattedanda", 5.2),
        ("Pyutar", "Chhapeli", 9.1),
        ("Pyutar", "Ikudol", 11),
        ("Ikudol", "Sankhu", 12),
        ("Ikudol", "Bhukhel", 13),
        ("Bhattedanda", "Sankhu", 8.5),
        ("Sankhu", "Bukhel", 11.8),
        ("Sankhu", "Dalchoki", 11.6),
        ("Sankhu", "Choughare", 7.7),
        ("Bukhel", "Manikhel", 10),
        ("Manikhel", "Gotikhel", 13.5),
        ("Manikhel", "Choughare", 13),
        ("Choughare", "Bhardev", 11.9),
        ("Gotikhel", "Chandanpur", 13.2),
        ("Gotikhel", "Kaleshowr", 14),
        ("Gotikhel", "Thuladurlung", 13),
        ("Thuladurlung", "Chandanpur", 13),
        ("Chandanpur", "Kaleshowr", 16),
        ("Manikhel", "Kaleshowr", 14),
        ("Manikhel", "Bhardev", 11.9),
        ("Bhardev", "Nallu", 5.1),
        ("Nallu", "Dalchoki", 6.8),
        ("Nallu", "Bajrabarahi", 12.5),
        ("Bhardev", "Godawari", 17.1),
        ("Godawari", "Mahalaxmi", 8.6),
        ("Mahalaxmi", "Gwarko", 5.6),
        ("Gwarko", "Lagankhel", 1.4),
    ]

    latLongData = [
        
    ("Pulchowk", 27.687222, 85.312778),
    ("Ekantakuna", 27.681944, 85.324722),
    ("Lagankhel", 27.671389, 85.307222),
    ("Satdobato", 27.6625, 85.307222),
    ("Balkhu", 27.674444, 85.340556),
    ("Godawari", 27.651389, 85.323611),
    ("Khumaltar", 27.649444, 85.302222),
    ("Dhapakhel", 27.646389, 85.290556),
    ("Karyabinayak", 27.639722, 85.342778),
    ("Devichour", 27.634167, 85.357222),
    ("Ghusel", 27.6275, 85.375556),
    ("Radar station", 27.621389, 85.390556),
    ("Burja Chaur", 27.615, 85.405556),
    ("Dhungepani", 27.608611, 85.420556),
    ("Malta", 27.5975, 85.435556),
    ("Bhattedanda", 27.586389, 85.450556),
    ("Khanikhola", 27.575, 85.465556),
    ("Pyutar", 27.563611, 85.480556),
    ("Chappeli", 27.552222, 85.495556),
    ("Ikudol", 27.540833, 85.510556),
    ("Sankhu", 27.529444, 85.525556),
    ("Bukhel", 27.518056, 85.540556),
    ("Manikhel", 27.506667, 85.555556),
    ("Choughare", 27.495278, 85.570556),
    ("Bhardev", 27.483889, 85.585556),
    ("Chandanpur", 27.4725, 85.600556),
    ("Kaleshowr", 27.461111, 85.615556),
    ("Thuladurlung", 27.449722, 85.630556),
    ("Nallu", 27.438333, 85.645556),
    ("Dalchoki", 27.426944, 85.660556),
    ("Bajrabarahi", 27.415556, 85.675556),
    ("Mahalaxmi", 27.404167, 85.690556),
    ("Gwarko", 27.392778, 85.705556),
    
    ]

    g.creategraph(edges)
    g.createLatLong(latLongData)
    g.printgraph()
    result = g.dijkstra(src, dest)

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
