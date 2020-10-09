import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import quick from './quick';
import bubble from './bubble';
import insertion from './insertion';
import selection from './selection';
import ReactSlider from 'react-slider';


class Sort extends Component {
  constructor(){
    super();
    this.state = {values: this.generateRandomArray(10),sketch: quick, size: 10, speed: 20, start:true, nextStep:false, key: Math.random()};
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
    this.setState({
      values: this.generateRandomArray(size),
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
        </div>
        <button onClick={() => this.shuffleArray(this.state.size)}>Shuffle Array</button>
        <button className={this.state.speed===20 ? 'active' : ''} onClick={() => this.setSpeed(20)}>x20</button>
        <button className={this.state.speed===5 ? 'active' : ''} onClick={() => this.setSpeed(5)}>x5</button>
        <button className={this.state.speed===1 ? 'active' : ''} onClick={() => this.setSpeed(1)}>x1</button>
        <button className={this.state.sketch===quick ? 'active' : ''} onClick={() => this.setState({sketch: quick, key: Math.random()})}>QuickSort</button>
        <button className={this.state.sketch===bubble ? 'active' : ''} onClick={() => this.setState({sketch: bubble, key: Math.random()})}>BubbleSort</button>
        <button className={this.state.sketch===insertion ? 'active' : ''} onClick={() => this.setState({sketch: insertion, key: Math.random()})}>InsertionSort</button>
        <button className={this.state.sketch===selection ? 'active' : ''} onClick={() => this.setState({sketch: selection, key: Math.random()})}>SelectionSort</button>
        <button onClick={() => this.setState({start: !this.state.start})}>{this.state.start ? 'Stop' : 'Start'}</button>
        {!this.state.start && <button onClick={() => this.setState({nextStep: !this.state.nextStep})}>Next Step</button>}
        </div>
        <div className="sketch">
        <P5Wrapper 
          key={this.state.key} 
          speed={this.state.speed} 
          values={this.state.values.slice()} 
          start={this.state.start}
          sketch={this.state.sketch} 
          nextStep={this.state.nextStep}></P5Wrapper>
        </div>
      </div>
    );
  }
}

export default Sort;