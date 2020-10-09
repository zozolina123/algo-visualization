import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import ReactSlider from 'react-slider';
import linear from'./linear';
import binary from'./binary';
import fibbonaci from'./fibbonaci';

class Search extends Component {
  constructor(){
    super();
    const arr =this.generateRandomArray(10);
    this.state = {values: arr,sketch: linear,targetElement : arr[Math.round((10 -1)*Math.random())], size: 10, speed: 20, start:true, nextStep:false, key: Math.random()};
    this.shuffleArray = this.shuffleArray.bind(this);
    this.setSpeed = this.setSpeed.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.size !== prevState.size){
      this.shuffleArray(this.state.size);
    }
  }

  generateRandomArray(size) {
    const values = [];
    for(let i=0; i< size;i++) {
      values[i] = Math.round(94*Math.random()) + 6;
    }
    return values;
  }

  shuffleArray(size){
    const arr = this.generateRandomArray(size);
    this.setState({
      values: arr,
      targetElement : arr[Math.round((size -1)*Math.random())],
      key: Math.random()
    })
  }

  setSpeed(speed) {
    this.setState({
      speed
    });
  }
  
  render() {
    return (
      <div className="wrapper">
        <div className="controls">
        <div className="sort-controls">
        <p>Array size</p>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            min={10}
            max={100}
            onAfterChange={val => this.setState({size: val})}
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          />
          <p className="target">Target: {this.state.targetElement}</p>
        </div>
        <button onClick={() => this.shuffleArray(this.state.size)}>Shuffle Array</button>
        <button className={this.state.speed===20 ? 'active' : ''} onClick={() => this.setSpeed(20)}>x20</button>
        <button className={this.state.speed===5 ? 'active' : ''} onClick={() => this.setSpeed(5)}>x5</button>
        <button className={this.state.speed===1 ? 'active' : ''} onClick={() => this.setSpeed(1)}>x1</button>
        <button className={this.state.sketch===linear ? 'active' : ''} onClick={() => this.setState({sketch: linear, key: Math.random()})}>LinearSearch</button>
        <button className={this.state.sketch===binary ? 'active' : ''} onClick={() => this.setState({sketch: binary, key: Math.random()})}>BinarySearch</button>
        <button className={this.state.sketch===fibbonaci ? 'active' : ''} onClick={() => this.setState({sketch: fibbonaci, key: Math.random()})}>FibbonaciSearch</button>
        <button onClick={() => this.setState({start: !this.state.start})}>{this.state.start ? 'Stop' : 'Start'}</button>
        {!this.state.start && <button onClick={() => this.setState({nextStep: !this.state.nextStep})}>Next Step</button>}
        </div>
        <div className="sketch">
        <P5Wrapper 
          key={this.state.key} 
          speed={this.state.speed} 
          values={this.state.values.slice()} 
          targetElement={this.state.targetElement}
          start={this.state.start}
          sketch={this.state.sketch} 
          nextStep={this.state.nextStep}></P5Wrapper>
        </div>
      </div>
    );
  }
}

export default Search;