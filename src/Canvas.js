import React from 'react';
import BinaryTreeCanvas from './BinaryTreeCanvas';
import TreeForm from './TreeForm';
import NodeForm from './NodeForm';

import ClearForm from './ClearForm';
import './Canvas.css';

class Canvas extends React.Component {
  startNewTree = (data) => {
    this.refs['binaryTree'].clearTree();
    this.addNewNodes(data.map(node => node.value));
  }

  addNewNodes = (values) => {
    values.forEach((value, index) => {
      setTimeout(() => this.refs['binaryTree'].addNewNode(value), 200*index);
    });
  }

  clearTree = () => {
    this.refs['binaryTree'].clearTree();
  }

  render() {
    return (
      <div id='app-view' class="divo">


       <BinaryTreeCanvas ref='binaryTree' />
       <div class="top">
       </div>
       <div class="divo2">
        <div class="col ">
       
         <NodeForm addNewNodes={this.addNewNodes} />
        
        <div class="topp">
       </div>
       <TreeForm startNewTree={this.startNewTree} />
        
        <div class="topp">
       </div>
        
        <ClearForm clearTree={this.clearTree} />
        </div>
        </div>
      </div>
    );
  }
}

export default Canvas;