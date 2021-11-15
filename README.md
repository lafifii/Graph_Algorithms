# Graph Algorithms

[Try here](https://lafifii.github.io/Graph_Algorithms/)

Graph Algorithms implemented so far:

| Algorithm | Description | Extra Data Structures Implemented | Time Complexity
| :---:        |     ---      |     ---      |   :---:
| [Depth First Search](https://lafifii.github.io/Graph_Algorithms/dfs/index.html)   | The aim of BFS algorithm is to traverse the graph as close as possible to the root node. |  | *O(m+n)*
| [Breadth First Search](https://lafifii.github.io/Graph_Algorithms/bfs/index.html) | The aim of BFS algorithm is to traverse the graph as close as possible to the root node. The implementation here accepts one or many starting nodes. | Queue | *O(m+n)*  
| [Dijkstra's](https://lafifii.github.io/Graph_Algorithms/dijkstra/index.html) | An Algorithm for solving the single-source shortest paths problem in a graph with non-negative weights. The implementation here accepts one or many starting nodes. | Priority Queue | *O(nlogn + m)*
| [Kruskal's](https://lafifii.github.io/Graph_Algorithms/kruskal/index.html)  | Given a weighted undirected graph. We want to find a subtree of this graph which connects all vertices and has the least weight of all possible spanning trees. This spanning tree is called a minimum spanning tree. | Disjoint Set Union  | *O(mlogn)* |
| [Bellman Ford](https://lafifii.github.io/Graph_Algorithms/bford/index.html) | An Algorithm for solving the single-source shortest paths problem in a graph, accepts negative weights. It can also find one negative cycle from the starting node. |   | *O(mn)* |
| [Korasaju's](https://lafifii.github.io/Graph_Algorithms/korasaju/index.html)  | An Algorithm for finding the Strongly Connected Components (SCC) of an undirected graph. |   | *O(m + n)* |
| [A* Search](https://lafifii.github.io/Graph_Algorithms/astar/index.html)  | A graph traversal and path search informed algorithm | Priority Queue  |  <img src="https://render.githubusercontent.com/render/math?math=O(b^d)"> |

Variables:
- ***n*** : number of nodes 
- ***m*** : number of edges in the graph
- **b** : the branching factor (the average number of successors per state).

For more information about these algorithms you can go [here](https://cp-algorithms.com/) !
