import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { Store } from 'redux';

// import * as $ from 'jquery'; // Webpack complains and output error
declare var $;

import * as _ from 'lodash';
import * as moment from 'moment';
import * as Raphael from 'raphael';

import { genGuid } from '../utilites/gen-guid';

import {
  ActivityConnectionData, ActivityNodeData, ActivityNodeDataObj,
} from '../models/flow-data-def';

import { AppStore } from '../app-store';

import {
  ActivityNodeDataActions,
  ActivityConnectionDataActions
} from '../actions';

import {
  AppState,
} from '../reducers';

class ActivityConnectionDraw { // 节点间连线绘图对象
  guid?: string;
  name?: string;
  element?: RaphaelElement;
  obj1: any; // 为DragProcessor.drag_end作此妥协
  obj2: RaphaelElement;

  // 绘制(并创建)节点间连线绘图对象
  static drawConnection(obj: ActivityConnectionDraw, drawingPaper: DrawingPaper) {
    // when draw the first time, need validate it 为简单起见两个节点间的同一方向连线不能超过两条
    if (!obj.element && _.filter(drawingPaper.connections, (c) => {
      return c.obj1 == obj.obj1 && c.obj2 == obj.obj2;
    }).length >= 2) {
      notie.alert(3, "两个节点间的同一方向连线不能超过两条!", 3);
      return null;
    }

    let _connectionsBefore = _.take(drawingPaper.connections,
      obj.element ? _.findIndex(drawingPaper.connections, { guid: obj.guid }) :
        drawingPaper.connections.length);
    let _conIndex = _.filter(_connectionsBefore, (c) => {
      return ( // c.guid != obj.guid && 
        ((c.obj1 == obj.obj1 && c.obj2 == obj.obj2)
          || (c.obj1 == obj.obj2 && c.obj2 == obj.obj1)));
    }).length;
    let pointsPair = ActivityConnectionDraw.getStartEnd(obj.obj1, obj.obj2, _conIndex);
    let _path = ActivityConnectionDraw.getConnection(pointsPair.start.x, pointsPair.start.y,
      pointsPair.end.x, pointsPair.end.y);
    if (obj.element) { // redraw
      obj.element.attr({ path: _path });
    } else { // draw the first time, need initialize it
      obj.guid = obj.guid || genGuid();
      obj.name = obj.name || '未命名连接' + Date.now().toString();
      obj.element = drawingPaper.paper.path(_path);
      obj.element.click(drawingPaper.clickProcessor.connection_click);
      obj.element.hover(
        function (e) {
          e.currentTarget.style.cursor = "hand";
        },
        function (e) {
          e.currentTarget.style.cursor = "pointer";
        }
      );
      drawingPaper.connections.push(obj);

    }
    obj.element.attr({ 'stroke-dasharray': '', stroke: 'blue', 'stroke-width': 2 });
    obj.element.data('guid', obj.guid);
    obj.element.toBack();
    return obj;
  };

  // 获取连接起始与结束对象的连线的起始Point与结束Point
  static getStartEnd(obj1: RaphaelElement, obj2: RaphaelElement, index: number = 0): Point2Point {
    var bb1 = obj1.getBBox(),
      bb2 = obj2.getBBox();
    var p = [
      { x: bb1.x + bb1.width / 2, y: bb1.y - 1 }, // top
      { x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1 }, // bottom
      { x: bb1.x - 1, y: bb1.y + bb1.height / 2 }, // left
      { x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2 }, // right
      { x: bb1.x - 1, y: bb1.y - 1 }, // top-left
      { x: bb1.x + bb1.width + 1, y: bb1.y - 1 }, // top-right
      { x: bb1.x - 1, y: bb1.y + bb1.height + 1 }, // bottom-left
      { x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height + 1 }, // bottom-right

      { x: bb2.x + bb2.width / 2, y: bb2.y - 1 }, // top
      { x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1 },// bottom
      { x: bb2.x - 1, y: bb2.y + bb2.height / 2 },// left
      { x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2 },// right
      { x: bb2.x - 1, y: bb2.y - 1 }, // top-left
      { x: bb2.x + bb2.width + 1, y: bb2.y - 1 }, // top-right
      { x: bb2.x - 1, y: bb2.y + bb2.height + 1 }, // bottom-left
      { x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height + 1 }, // bottom-right
    ];

    let disArray = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 8; j < 16; j++) {
        disArray.push({
          distance: Math.abs(p[i].x - p[j].x) + Math.abs(p[i].y - p[j].y),
          start: p[i], end: p[j]
        });
      }
    }
    let result: Point2Point = _.sortBy(disArray, 'distance')[index];
    return result;
  }

  // 获取组成箭头的三条线段的路径数组
  static getConnection(x1: number, y1: number, x2: number, y2: number, size: number = 10): any[] {
    var closeAngle = 20
    var angle = Raphael.angle(x1, y1, x2, y2); // 得到两点之间的角度
    var aClose1 = Raphael.rad(angle - closeAngle); // 角度转换成弧度
    var aClose2 = Raphael.rad(angle + closeAngle);
    var x2a = x2 + Math.cos(aClose1) * size;
    var y2a = y2 + Math.sin(aClose1) * size;
    var x2b = x2 + Math.cos(aClose2) * size;
    var y2b = y2 + Math.sin(aClose2) * size;
    var result = ["M", x1, y1, "L", x2, y2, "L", x2a, y2a, "M", x2, y2, "L", x2b, y2b];
    return result;
  }
}

class DragProcessor { // 拖动事件处理器,用于处理 1.拖动节点; 2.拖动生成形成节点间的连线
  static drawingPaper: DrawingPaper;
  // 拖动节点开始时的事件
  drag_start(x, y, e): Object {
    if (DragProcessor.drawingPaper.drawActivityType == '_connection') {// 连线模式
      this.ox = e.offsetX;
      this.oy = e.offsetY;
      this.attr({ 'stroke-width': 1, 'stroke-dasharray': '.' });
    }
    else {// 拖动节点模式
      this.ox = this.attr("x");
      this.oy = this.attr("y");
      this.attr({ 'stroke-width': 3, 'stroke-dasharray': '-' });
    }
    return this;
  };

  // 拖动事件
  drag_move(dx, dy, x, y, e): Object {
    if (DragProcessor.drawingPaper.drawActivityType == '_connection') {// 连线模式
      DragProcessor.drawingPaper.removeDrawingTempPath();
      DragProcessor.drawingPaper.drawingTempPath = DragProcessor.drawingPaper.paper.path(["M", this.ox, this.oy, "L", e.offsetX, e.offsetY]);
      DragProcessor.drawingPaper.drawingTempPath.attr({ 'stroke-width': 2, 'stroke-dasharray': '-' });
    }
    else {// 拖动节点模式
      let att = { x: this.ox + dx, y: this.oy + dy };
      this.attr(att); // 即时根据拖动的位移改动节点位置
      if (!this.attr("src")) { // 非图片型的节点需要同时移动其文本位置
        const txtX = att.x + 32, txtY = att.y + 20;
        DragProcessor.drawingPaper.findNodeDrawByGuid(this.data('guid')).
          textElement.attr({ x: txtX, y: txtY });
      }

      // 筛选出需要重绘的节点间连接并执行重绘
      let _connectionsNeedRedraw = _.filter(DragProcessor.drawingPaper.connections, (con) => {
        return (con.obj2.data('guid') == this.data('guid') || con.obj1.data('guid') == this.data('guid'));
      });
      _connectionsNeedRedraw.forEach((con) => {
        ActivityConnectionDraw.drawConnection(con, DragProcessor.drawingPaper);
      });
    }
    return this;
  };

  // 拖动结束后的事件
  drag_end(e): Object {
    if (DragProcessor.drawingPaper.drawActivityType == '_connection') {// 连线模式
      this.attr({ 'stroke-width': 1, 'stroke-dasharray': '' });
      var _shape = _.find(DragProcessor.drawingPaper.nodeDrawElements, (_shapeEle) => {
        var _bbox = _shapeEle.element.getBBox();
        return (_bbox.x <= e.offsetX && e.offsetX <= _bbox.x2 &&
          _bbox.y <= e.offsetY && e.offsetY <= _bbox.y2);
      });

      if (_shape && _shape.element.id !== this.id) { // 需要创建节点间连线
        let drawObj = ActivityConnectionDraw.drawConnection({
          obj1: this,
          obj2: _shape.element
        }, DragProcessor.drawingPaper);

        if (drawObj) { //连线能够成功创建才更新
          DragProcessor.drawingPaper.store.dispatch(
            ActivityConnectionDataActions.CreateConnectionData(
              DragProcessor.drawingPaper.addConnection(drawObj)));
        }
      }
      DragProcessor.drawingPaper.removeDrawingTempPath();

    }
    else { // 拖动节点模式
      this.attr({ 'stroke-width': 1, 'stroke-dasharray': '' });
      const nodeData = DragProcessor.drawingPaper.findNodeDataByGuid(this.data('guid'));
      DragProcessor.drawingPaper.store.dispatch(ActivityNodeDataActions.UpdateNodeData(
        Object.assign({}, nodeData, { position: [this.attr("x"), this.attr("y")] })
      ));
      DragProcessor.drawingPaper.unselectConnection();
    }

    // 将画板获取焦点,否则DEL键响应失效.
    $("#FlowChart").trigger("focus");

    return this;
  };

  /// 以下的实例属性与方法用于欺骗TypeScript编译检查
  ox: number;
  oy: number;
  id: string;
  data(name: string): any { }
  attr(attr: any): any { }
  /// 欺骗内容结束
}

class ClickProcessor { // 点击事件处理器
  static drawingPaper: DrawingPaper;

  // Warning: these event handlers will not be triggered for 
  // the conflict with DragProcessor
  node_click(e) {
    ClickProcessor.drawingPaper.selectNode(this.data('guid'));
  }

  connection_click = function (e) {
    ClickProcessor.drawingPaper.selectConnection(this.data('guid'));
  }

  /// 以下的实例属性与方法用于欺骗TypeScript编译检查
  data(attr: any): any {
  }
  /// 欺骗内容结束
}

class DblClickProcessor { // 双击事件处理器
  static drawingPaper: DrawingPaper;
  currentEditingNodeGuid: string = null;

  text_dbl_click(e) {
    /// 在事件处理器里this并不是类实例本身,而是触发事件的源对象
    DblClickProcessor.drawingPaper.startNodeTextEditing(
      <RaphaelElement><any>this);
  }
}

class ActivityNodeDraw { // 节点绘图对象
  guid: string;
  element: RaphaelElement;
  textElement?: RaphaelElement; // 开始结束节点无文本显示
  drawingPaper: DrawingPaper;
  constructor(guid: string, element: RaphaelElement, drawingPaper: DrawingPaper) {
    this.guid = guid;
    this.element = element;
    this.drawingPaper = drawingPaper;
  }

  static getNodeNameShortVersion(name: string) {
    return name.length > 6 ? name.substr(0, 4) + "..." : name;
  }

  // 绘制节点
  static drawFromNodeData(nodeData: ActivityNodeData, drawingPaper: DrawingPaper): ActivityNodeDraw {
    let result: ActivityNodeDraw, ele: RaphaelElement, txtElement: RaphaelElement;
    const x = nodeData.position[0], y = nodeData.position[1];
    const txtX = x + 32, txtY = y + 20;
    const imgHeight = 40, imgWidth = 40;
    const rectHeight = 40, rectWidth = 80, rectRadius = 5;
    const nodeNameDisplayed = ActivityNodeDraw.getNodeNameShortVersion(nodeData.name);
    switch (nodeData.type) {
      case 'st-start':
        ele = drawingPaper.paper.image("assets/images/flow_start.png", x, y, imgWidth, imgHeight);
        break;
      case 'st-end':
        ele = drawingPaper.paper.image("assets/images/flow_end.png", x, y, imgWidth, imgHeight);
        break;
      case 'st-singleHumanActivity':
        ele = drawingPaper.paper.rect(x, y, rectWidth, rectHeight, rectRadius);
        ele.attr({ fill: '#43C8F7', title: nodeData.name });
        txtElement = drawingPaper.paper.text(txtX, txtY, nodeNameDisplayed);
        break;
      case 'st-multiHumanActivity':
        ele = drawingPaper.paper.rect(x, y, rectWidth, rectHeight, rectRadius);
        ele.attr({ fill: '#F1C8F7', title: nodeData.name });
        txtElement = drawingPaper.paper.text(txtX, txtY, nodeNameDisplayed);
        break;
      case 'st-autoActivity':
        ele = drawingPaper.paper.rect(x, y, rectWidth, rectHeight, rectRadius);
        ele.attr({ fill: '#F1F10D', title: nodeData.name });
        txtElement = drawingPaper.paper.text(txtX, txtY, nodeNameDisplayed);
        break;
      default:
        console.info(`No drawing handler for type'` + nodeData.type + "'");
        return null;
    }

    ele.data('guid', nodeData.guid);
    result = new ActivityNodeDraw(nodeData.guid, ele, drawingPaper);
    if (txtElement) {
      txtElement.data("guid", nodeData.guid);
      txtElement.dblclick(drawingPaper.dblClickProcessor.text_dbl_click);
      result.textElement = txtElement;
    }
    result.element.drag(drawingPaper.dragProcessor.drag_move, drawingPaper.dragProcessor.drag_start, drawingPaper.dragProcessor.drag_end);
    result.element.click(drawingPaper.clickProcessor.node_click);
    result.element.hover(function (e) { e.currentTarget.style.cursor = "hand"; }, function (e) { e.currentTarget.style.cursor = "pointer"; });
    drawingPaper.nodeDrawElements.push(result);

    return result;
  }
}

interface Point {
  x: number;
  y: number;
}
interface Point2Point {
  start: Point;
  end: Point;
}

class DrawingPaper {
  constructor(paper: RaphaelPaper) {
    this.paper = paper;
  }
  paper: RaphaelPaper;
  store: Store<AppState>;

  dragProcessor: DragProcessor = null;
  clickProcessor: ClickProcessor = null;
  dblClickProcessor: DblClickProcessor = null;

  drawActivityType: string = "_";
  isNodeTextEditing: boolean = false; // 是否正在编辑节点名称的文本
  drawingTempPath: RaphaelElement = null;// 正在画的临时连接Path
  //selectedConnection :ActivityConnectionDraw = null; // 正在被选中的连接
  selectedConnectionGuid: string = ""; // 正在被选中的连接GUID
  selectedNodeGuid: string = ""; // 正在被选中的节点GUID

  connectionsData: ActivityConnectionData[] = []; // 节点间连线数据对象数组
  connections: ActivityConnectionDraw[] = []; // 节点间连线绘图对象数组
  nodesData: ActivityNodeData[] = []; // 节点数据对象数组
  nodeDrawElements: ActivityNodeDraw[] = [] // 节点绘图对象数组

  workflowTemplateName: string = "";

  // 根据节点数据对象数组和节点间连线数据对象数组绘制流程图
  render(needRedrawNodes = true, needRedrawConnections = true) {
    if (needRedrawNodes) { // 绘制节点
      this.clearNodes();
      _.each(this.nodesData, (n) => {
        ActivityNodeDraw.drawFromNodeData(n, this);
      });
    }

    if (needRedrawConnections) { // 绘制节点间连接线与箭头
      this.clearConnections();
      _.each(this.connectionsData, (con) => {
        ActivityConnectionDraw.drawConnection({
          obj1: this.findNodeDrawByGuid(con.fromGuid).element,
          obj2: this.findNodeDrawByGuid(con.toGuid).element,
          guid: con.guid,
        }, this);
      });
    }

    this.decorateSelectedNode(this.selectedNodeGuid);
    this.decorateSelectedConnection(this.selectedConnectionGuid);
  }

  removeDrawingTempPath() {
    if (this.drawingTempPath) {
      this.drawingTempPath.remove();
      this.drawingTempPath = null;
    }
  }

  selectConnection(guid: string) {
    this.finishNodeTextEditing(false);
    if (guid) this.unselectNode();
    this.store.dispatch(ActivityConnectionDataActions.SetCurrentConnectionData(guid));
  }

  decorateSelectedConnection(guid: string) {
    if (!guid) return null;

    let _con = _.find(this.connections, { guid: guid });
    if (_con) {
      _con.element.attr({ 'stroke-dasharray': '-', stroke: 'red' });
    } else {
      console.error("Cannot find connection " + guid);
    }
    return _con;
  }

  unselectConnection() {
    this.selectConnection(null);
  }

  selectNode(guid: string) {
    if (guid) this.unselectConnection();
    this.store.dispatch(ActivityNodeDataActions.SetCurrentNodeData(guid));
  }

  decorateSelectedNode(guid: string): ActivityNodeDraw {
    if (!guid) return null;

    let _node = _.find(this.nodeDrawElements, { guid: guid });
    if (_node) {
      //this.selectedNodeElement = _node;
      _node.element.attr({ 'stroke-dasharray': '-' });
      let imgSrc = <string>_node.element.attr('src');
      if (imgSrc && imgSrc.indexOf('selected') < 0) {
        _node.element.attr({ src: imgSrc.replace('.png', '_selected.png') });
      }
    } else {
      console.error("Cannot find node " + guid);
    }
    return _node;
  }

  unselectNode() {
    this.selectNode(null);
  }

  addNode(x: number, y: number): ActivityNodeData {
    if (this.drawActivityType && this.drawActivityType != '_') {
      console.log(this.drawActivityType);
      let activityNodeData = new ActivityNodeDataObj(this.drawActivityType, [x, y]);
      let activityNodeDraw = ActivityNodeDraw.drawFromNodeData(activityNodeData, this);
      return activityNodeData;
    }
    return null;
  }

  removeNode(guid: string) {
    // 需要先调用removeConnection删除进出该节点的所有连接
    let _connectionsData = _.filter(this.connectionsData, (c) => {
      return (c.fromGuid == guid || c.toGuid == guid);
    });
    _.each(_connectionsData, (c) => { this.removeConnection(c.guid); });

    let _node = _.find(this.nodeDrawElements, { guid: guid });
    if (_node) {
      this.store.dispatch(ActivityNodeDataActions.DeleteNodeData(guid));
    }
  }

  clearNodes() {
    _.each(this.nodeDrawElements, (node) => {
      node.element.remove();
      node.textElement && node.textElement.remove();
    });
    this.nodeDrawElements = [];
  }

  addConnection(connection: ActivityConnectionDraw): ActivityConnectionData {
    return <ActivityConnectionData>
      {
        guid: connection.guid,
        name: connection.name,
        fromGuid: connection.obj1.data('guid'),
        toGuid: connection.obj2.data('guid')
      };
  }

  removeConnection(guid: string) {
    let _c = _.find(this.connections, { guid: guid });
    if (_c) {
      this.store.dispatch(ActivityConnectionDataActions.DeleteConnectionData(guid));
    }
  }

  clearConnections() {
    _.each(this.connections, (con) => { con.element.remove(); });
    this.connections = [];
  }

  findNodeDrawByGuid(guid: string): ActivityNodeDraw {
    return _.find(this.nodeDrawElements, (n) => { return n.guid == guid; });
  }

  findNodeDataByGuid(guid: string): ActivityNodeData {
    return _.find(this.nodesData, (n) => { return n.guid == guid; });
  }

  startNodeTextEditing(textElement: RaphaelElement) {
    const guid: string = textElement.data('guid');
    $('#InputActivityNodeName').css(
      { left: textElement.attr('x') - 30, top: textElement.attr('y') - 10, display: "block" });
    $('#InputActivityNodeName').val(DblClickProcessor.drawingPaper.findNodeDataByGuid(guid).name);
    const _nodeDraw: ActivityNodeDraw = DblClickProcessor.drawingPaper.findNodeDrawByGuid(guid);

    DblClickProcessor.drawingPaper.dblClickProcessor.currentEditingNodeGuid = guid;
    DblClickProcessor.drawingPaper.isNodeTextEditing = true;
    $('#InputActivityNodeName').keypress((e) => {// 按下回车键则确认修改,并退出编辑模式
      if (e.keyCode == 13) {
        DblClickProcessor.drawingPaper.finishNodeTextEditing(false);
      }
    });
    DblClickProcessor.drawingPaper.unselectNode();
    DblClickProcessor.drawingPaper.unselectConnection();
  }

  finishNodeTextEditing(cancel: boolean = true) {
    if (this.isNodeTextEditing && !cancel) { // 非取消编辑,需要确认修改,并退出编辑模式
      const _newName = $('#InputActivityNodeName').val();
      const _guid = this.dblClickProcessor.currentEditingNodeGuid;
      const _nodeData = Object.assign({}, this.findNodeDataByGuid(_guid), { name: _newName });
      this.store.dispatch(ActivityNodeDataActions.UpdateNodeData(_nodeData));
    }
    $('#InputActivityNodeName').css({ display: "none" });
    this.isNodeTextEditing = false;
  }
}

@Component({
  selector: 'app-flow-chart-parent',
  template: `
    <div id="FlowChart" tabindex="0">
      <span id="TemplateNameNote" class="text-note">{{drawingPaper.workflowTemplateName}}</span>
    </div>
    <input id="InputActivityNodeName" type="text">
  `
})
export class FlowChartParentComponent implements OnInit {
  private drawingPaper: DrawingPaper;

  constructor( @Inject(AppStore) private store: Store<AppState>) {
    store.subscribe(() => this.updateStoreState());
  }

  updateStoreState() {
    // console.info("Store State Updated");
    const state = this.store.getState();
    let needRedrawNodes = false, needRedrawConnections = false;
    this.drawingPaper.drawActivityType = state.activityTools.currentActivityTool;
    if (this.drawingPaper.nodesData != state.activityDataNodes.activityNodeDatas) {
      this.drawingPaper.nodesData = state.activityDataNodes.activityNodeDatas;
      needRedrawNodes = true;
    }
    if (this.drawingPaper.connectionsData != state.activityConnections.activityConnectionDatas) {
      this.drawingPaper.connectionsData = state.activityConnections.activityConnectionDatas;
      needRedrawConnections = true;
    }

    this.drawingPaper.selectedNodeGuid = state.activityDataNodes.currentNodeGuid;
    this.drawingPaper.selectedConnectionGuid = state.activityConnections.currentConnectionGuid;
    this.drawingPaper.workflowTemplateName = state.flowData.flowData.basicInfo.name;

    this.drawingPaper.render();
  }

  ngOnInit() {
    // 创建绘图板对象
    let raphael = Raphael("FlowChart", $('FlowChart').width(), $('FlowChart').height());
    this.drawingPaper = DragProcessor.drawingPaper
      = ClickProcessor.drawingPaper
      = DblClickProcessor.drawingPaper
      = new DrawingPaper(raphael);
    // 初始化↑并创建拖动处理器对象;
    let dragProcessor = new DragProcessor();
    this.drawingPaper.dragProcessor = dragProcessor;
    // 初始化↑并创建点击事件处理器;
    let clickProcessor = new ClickProcessor();
    this.drawingPaper.clickProcessor = clickProcessor;
    // 初始化↑并创建双击事件处理器;
    let dblClickProcessor = new DblClickProcessor();
    this.drawingPaper.dblClickProcessor = dblClickProcessor;

    // 绘图板对象可以访问用来发送数据state变更通知
    this.drawingPaper.store = this.store;

    // 绘图板对象进行流程图绘制(通过store)
    this.updateStoreState();

    // DEL,ESC键的事件处理设置
    $("#FlowChart").keydown((e) => {
      if (this.drawingPaper.selectedConnectionGuid) {// 目前有被选中的连接,
        switch (e.keyCode) {
          case 46:// 删除键
            this.drawingPaper.removeConnection(this.drawingPaper.selectedConnectionGuid)
            break;
          case 27:// ESC
            this.drawingPaper.unselectConnection();
            break;
          default:
        }
      }
      if (this.drawingPaper.selectedNodeGuid) {// 目前有被选中的节点
        switch (e.keyCode) {
          case 46:// 删除键
            this.drawingPaper.removeNode(this.drawingPaper.selectedNodeGuid);
            this.drawingPaper.selectedNodeGuid = null;
            break;
          case 27:// ESC
            this.drawingPaper.unselectNode();
            break;
          default:
        }
      }
      if (this.drawingPaper.isNodeTextEditing) {// 目前有正在编辑的节点文本输入框
        if (e.keyCode == 27) {// ESC则取消编辑
          this.drawingPaper.finishNodeTextEditing(true);
        }
      }
    });

    // 在设计区点击后增加新节点或连接的操作设置
    $('#FlowChartParent').click((e) => {
      if (e.target.nodeName === 'svg') {
        if (this.drawingPaper.drawActivityType && this.drawingPaper.drawActivityType != "_") {
          if (this.drawingPaper.drawActivityType == '_connection') {// 增加节点间连接操作
            //notie.alert(2,"请从处理节点开始点击",3);
          }
          else {// 增加节点操作
            const _nodeData = this.drawingPaper.addNode(e.offsetX, e.offsetY);
            if (_nodeData) {
              this.store.dispatch(ActivityNodeDataActions.CreateNodeData(
                this.drawingPaper.addNode(e.offsetX, e.offsetY)));
            } else { //不能创建节点,可能是点击空白处,则取消当前选中的活动节点和连接
              this.store.dispatch(ActivityNodeDataActions.SetCurrentNodeData(""));
            }
          }
        }
        else {
          this.drawingPaper.unselectConnection();
          this.drawingPaper.unselectNode();
        }
        if (this.drawingPaper.isNodeTextEditing) {
          this.drawingPaper.finishNodeTextEditing(false);
        }
      } else {
      }
    });
  }
}
