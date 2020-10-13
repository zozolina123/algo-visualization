import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import dijkstra from'./dijkstra';
import dfs from'./dfs';
import bfs from'./bfs';
import asharp from'./asharp';
import _ from 'lodash';

class Search extends Component {
  constructor(){
    super();
    this.columns = 20;
    this.rows = 20;
    this.state = {sketch: dijkstra, walls: this.generateWallsArray()};
  }

   generateWallsArray = () => {
    const walls = _.map(new Array(this.rows), () => []);
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
            walls[i][j] = Math.random() > 0.7;
        }
    }
    return walls;
  }

  render() {
    return (
      <div className="wrapper">
        <div className="controls">
          <button onClick={() => this.setState({walls: this.generateWallsArray(), key: Math.random()})}>New Maze</button>
          <button className={this.state.sketch===dijkstra ? 'active' : ''} onClick={() => this.setState({sketch: dijkstra, key: Math.random()})}>Dijkstra</button>
          <button className={this.state.sketch===asharp ? 'active' : ''} onClick={() => this.setState({sketch: asharp, key: Math.random()})}>A*</button>
          <button className={this.state.sketch===dfs ? 'active' : ''} onClick={() => this.setState({sketch: dfs, key: Math.random()})}>DFS</button>
          <button className={this.state.sketch===bfs ? 'active' : ''} onClick={() => this.setState({sketch: bfs, key: Math.random()})}>BFS</button>
        </div>
        <div className="sketch">
          <P5Wrapper 
            columns={20}
            rows={20}
            walls={this.state.walls}
            sketch={this.state.sketch} 
            key = {this.state.key}
            />
        </div>
      </div>
    );
  }
}

export default Search;