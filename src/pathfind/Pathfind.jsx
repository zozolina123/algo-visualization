import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import dijkstra from'./dijkstra';
import dfs from'./dfs';
import bfs from'./bfs';
import asharp from'./asharp';

class Search extends Component {
  render() {
    return (
        <P5Wrapper 
          sketch={bfs} 
          />
    );
  }
}

export default Search;