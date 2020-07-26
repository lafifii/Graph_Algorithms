# Graph Algorithms

[Try here](https://lafifii.github.io/Graph_Algorithms/)

Web Visualizer of some main Graph Algorithms, these are:

* **Depth First Search**: This algorithm finds the lexicographical first path in the graph from a source vertex u to each vertex. It will also find the shortest paths in a tree (because there only exists one simple path), but on general graphs this is not the case. The algorithm can be implemented in many ways, here you will find one that works in *O(m+n)* time where *n* is the number of vertices and *m* is the number of edges.

* **Breadth First Search**: As a result of how the algorithm works, the path found by breadth first search to any node is the shortest path to that node, i.e the path that contains the smallest number of edges in unweighted graphs. The algorithm can be implemented in many ways, here you will find one that works in *O(m+n)* time where *n* is the number of vertices and *m* is the number of edges, which uses a queue with *O(1)* removal.

* **Dijkstra Algorithm**: An Algorithm for solving the single-source shortest paths problem. The algorithm can be implemented in many ways, here you will find one that works in *O(nlogn + m)* time where *n* is the number of vertices and *m* is the number of edges, which uses a priority queue with *O(1)* removal and *O(logn)* addition.

* **Kruskal's Algorithm**: Given a weighted undirected graph. We want to find a subtree of this graph which connects all vertices and has the least weight of all possible spanning trees. This spanning tree is called a minimum spanning tree. The algorithm can be implemented in many ways, here you will find one that works in *O(mlogn)* time where *n* is the number of vertices and *m* is the number of edges, which uses the data structure Disjoint Set Union.
