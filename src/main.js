import React from 'react'

import * as ValtioCore from 'valtio/vanilla'

import * as ValtioUtils from 'valtio/utils'

import chalk from 'chalk'

import v from './js/valtio'

import b from './js/blessed'

import layout from './js/blessed/layout'

import main_panel from './main-panel'

// play.tui-004-layout-starter.main/Route [14] 
globalThis["play_tui_004_layout_starter_main$$Route"] = v.make({"current":"starter"});

// play.tui-004-layout-starter.main/RouteIndex [17] 
globalThis["play_tui_004_layout_starter_main$$RouteIndex"] = v.make({});

// play.tui-004-layout-starter.main/App [20] 
function App(){
  let [route,setRoute] = v.useProxyField(
    globalThis["play_tui_004_layout_starter_main$$Route"],
    "current"
  );
  let [index,setIndex] = v.useProxyField(
    globalThis["play_tui_004_layout_starter_main$$RouteIndex"],
    route
  );
  return (
    <layout.LayoutMain
      route={route}
      setRoute={setRoute}
      index={index}
      setIndex={setIndex}
      header={{
        "menu":[
              {"index":"f1","route":"starter","label":"Starter"},
              {"index":"f2","route":"alt","label":"Alt"}
            ]
      }}
      footer={{
        "menu":[
              {"index":"f1","route":"starter","label":"Starter"},
              {"index":"f2","route":"alt","label":"Alt","hidden":true}
            ],
        "toggle":[
              {"label":"D","active":true},
              {"label":"T","active":true},
              {"label":"G","active":true},
              {"type":"separator"},
              {"label":"C"}
            ]
      }}
      sections={{
        "starter":{"items":main_panel.StarterItems,"label":"Starter"},
        "alt":{"items":main_panel.AltItems,"label":"Alt"}
      }}>
    </layout.LayoutMain>);
}

// play.tui-004-layout-starter.main/__init__ [56] 
// 0ce9f4a2-79e2-4643-bc46-877180ee2ef3
b.run((
  <App></App>),"Js Blessed Starter Demo");