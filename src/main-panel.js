import React from 'react'

// play.tui-004-layout-starter.main-panel/Starter1Panel [23] 
function Starter1Panel(){
  return (
    <box border={{"type":"none"}} style={{"border":{"fg":"clear"}}}><box>Starter 1</box></box>);
}

// play.tui-004-layout-starter.main-panel/Starter2Panel [29] 
function Starter2Panel(){
  return (
    <box border={{"type":"none"}} style={{"border":{"fg":"clear"}}}><box>Starter 2</box></box>);
}

// play.tui-004-layout-starter.main-panel/Starter3Panel [35] 
function Starter3Panel(){
  return (
    <box border={{"type":"none"}} style={{"border":{"fg":"clear"}}}><box>Starter 3</box></box>);
}

// play.tui-004-layout-starter.main-panel/StarterItems [41] 
var StarterItems = [
  {"label":"Starter 1","name":"section-1","view":Starter1Panel},
  {"label":"Starter 2","name":"section-2","view":Starter2Panel},
  {"label":"Starter 3","name":"section-3","view":Starter3Panel}
];

// play.tui-004-layout-starter.main-panel/Alt1Panel [51] 
function Alt1Panel(){
  return (
    <box border={{"type":"none"}} style={{"border":{"fg":"clear"}}}><box>Alt 1</box></box>);
}

// play.tui-004-layout-starter.main-panel/Alt2Panel [57] 
function Alt2Panel(){
  return (
    <box border={{"type":"none"}} style={{"border":{"fg":"clear"}}}><box>Alt 2</box></box>);
}

// play.tui-004-layout-starter.main-panel/Alt3Panel [63] 
function Alt3Panel(){
  return (
    <box border={{"type":"none"}} style={{"border":{"fg":"clear"}}}><box>Alt 3</box></box>);
}

// play.tui-004-layout-starter.main-panel/AltItems [69] 
var AltItems = [
  {"label":"Alt 1","name":"section-1","view":Alt1Panel},
  {"label":"Alt 2","name":"section-2","view":Alt2Panel},
  {"label":"Alt 3","name":"section-3","view":Alt3Panel}
];

var MODULE = {
  "Starter1Panel":Starter1Panel,
  "Starter2Panel":Starter2Panel,
  "Starter3Panel":Starter3Panel,
  "StarterItems":StarterItems,
  "Alt1Panel":Alt1Panel,
  "Alt2Panel":Alt2Panel,
  "Alt3Panel":Alt3Panel,
  "AltItems":AltItems
};

export default MODULE