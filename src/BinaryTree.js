import * as d3 from 'd3';

const WIDTH = 1000;
const HEIGHT = 700;

const PADDING = 20;

class BinaryTree {
  constructor(divId) {
    this.treeNodes = [];

    this.svg = d3.select(divId).append('svg')
      .attr('width', WIDTH)
      .attr('height', HEIGHT);

    this.setScales();

    this.draw();
  }

  setScales = () => {
    this.xScale = d3.scaleLinear()
      .domain([-100, 100])
      .range([PADDING, WIDTH - PADDING]);

    this.levels = 1;

    this.yScale = d3.scaleLinear()
      .domain([0, this.levels + 1])
      .range([PADDING, HEIGHT - PADDING]);
  }

  draw = () => {
    this.clearCanvas();
    this.startTree();

    this.drawBranches();
    this.drawNodes();
    this.drawText();

    window.requestAnimationFrame(this.draw);
  }

  drawBranches = () => {
    this.branches.selectAll('line')
      .data(this.treeNodes)
      .enter()
      .append('line')
      .attr('x1', d => this.xScale(d.parent ? d.parent.x : d.x))
      .attr('y1', d => this.yScale(d.parent ? d.parent.y : d.y))
      .attr('x2', d => this.xScale(d.x))
      .attr('y2', d => this.yScale(d.y));
  }

  drawNodes = () => {
    this.nodes.selectAll('circle')
      .data(this.treeNodes)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('cx', d => this.xScale(d.x))
      .attr('cy', d => this.yScale(d.y));
  }

  drawText = () => {
    this.text.selectAll('text')
      .data(this.treeNodes)
      .enter()
      .append('text')
      .text(d => d.value)
      .attr('x', d => this.xScale(d.x))
      .attr('y', d => this.yScale(d.y) + 4);
  }

  clearCanvas = () => {
    this.svg.selectAll('*').remove();
  }

  startTree = () => {
    this.branches = this.svg.append('g')
      .attr('id', 'branches');

    this.nodes = this.svg.append('g')
      .attr('id', 'nodes');

    this.text = this.svg.append('g')
      .attr('id', 'text');
  }

  clearTree = () => {
    this.treeNodes = [];
    this.setScales();
  }

  insertNode = (node) => {
    if (this.levels < node.y) {
      this.levels = node.y;
      this.yScale = d3.scaleLinear()
        .domain([0, node.y + 1])
        .range([PADDING, HEIGHT - PADDING]);
    }
    this.treeNodes.push(node);
  }
}

export default BinaryTree;