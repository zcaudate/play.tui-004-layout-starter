import React from 'react'

import chalk from 'chalk'

import k from '../../xt/lang/base-lib'

import r from '../react'

// js.blessed.layout/primaryNormal [17] 
var primaryNormal = {
  "hover":{"fg":"black","bg":"white","bold":false},
  "bold":false,
  "fg":"white",
  "bg":"black"
};

// js.blessed.layout/primarySelected [25] 
var primarySelected = {
  "hover":{"bg":"gray","fg":"yellow","bold":true},
  "bold":true,
  "bg":"black",
  "fg":"yellow"
};

// js.blessed.layout/toggleEngaged [33] 
var toggleEngaged = {"bg":"black","fg":"magenta","bold":false};

// js.blessed.layout/toggleSelected [38] 
var toggleSelected = {
  "bg":"white",
  "fg":"black",
  "hover":{"bg":"black","fg":"white","bold":true},
  "bold":true
};

// js.blessed.layout/toggleNormal [46] 
var toggleNormal = {
  "bg":"black",
  "fg":"white",
  "hover":{"bg":"gray","fg":"white"},
  "bold":false
};

// js.blessed.layout/PrimaryButton [53] 
function PrimaryButton({label,index,selected,route,setRoute,proxy,...rprops}){
  let content = chalk.inverse(" " + index + " ") + "  " + label + "  ";
  return (
    <button
      ref={proxy}
      shrink={true}
      mouse={true}
      keys={true}
      content={content}
      style={selected ? primarySelected : primaryNormal}
      onClick={function (){
        setRoute(route);
      }}
      {...rprops}>
    </button>);
}

// js.blessed.layout/layoutMenu [77] 
function layoutMenu(items){
  let entries = items.filter(function (e){
    return Array.isArray(e.hidden) ? !e.hidden() : !e.hidden;
  });
  let lens = entries.map(function (e){
    return (e.label).length;
  });
  let lefts = lens.reduce(function (acc,l){
    acc.push(acc[acc.length + -1] + l + 8);
    return acc;
  },[0]);
  return entries.map(function (e,i){
    let name = e.route || e.label.toLowerCase();
    let left = lefts[i];
    let width = lefts[i + 1] - left;
    return {...e,left,name,width};
  });
}

// js.blessed.layout/layoutToggles [97] 
function layoutToggles(items){
  let entries = items.filter(function (e){
    return ("function" == (typeof e.hidden)) ? !e.hidden() : !e.hidden;
  });
  let lens = entries.map(function (e){
    return (e.type == "separator") ? 1 : 3;
  });
  let lefts = lens.reduce(function (acc,l){
    acc.push(acc[acc.length + -1] + l);
    return acc;
  },[0]);
  return entries.map(function (e,i){
    let left = lefts[i];
    let width = lefts[i + 1] - left;
    return {...e,left,width};
  });
}

// js.blessed.layout/PrimaryMenu [117] 
function PrimaryMenu({entries,route,setRoute,...rprops}){
  let box = React.useRef(null);
  React.useEffect(function (){
    box.current.onScreenEvent("keypress",function (_,key){
      let e =       (entries.filter(function (e){
              return e.index == key.name;
            }))[0];
      if(e){
        setRoute(e.route);
      };
    });
    return function (){
      box.current.free();
    };
  },[]);
  return (
    <box ref={box} shrink={true} style={{"bg":"black"}} {...rprops}>
      {entries.map(function (e){
        return (
          <PrimaryButton
            key={e.route}
            selected={route == e.route}
            setRoute={setRoute}
            {...e}>
          </PrimaryButton>);
      })}
    </box>);
}

// js.blessed.layout/PrimaryToggle [149] 
function PrimaryToggle({active,setActive,label,...rprops}){
  return (
    <button
      shrink={true}
      mouse={true}
      keys={true}
      width={3}
      style={active ? toggleSelected : toggleNormal}
      content={" " + label + " "}
      onClick={function (){
        if(setActive){
          setActive(!active);
        }
      }}
      {...rprops}>
    </button>);
}

// js.blessed.layout/PrimaryToggles [170] 
function PrimaryToggles({entries,...rprops}){
  let width = entries.reduce(function (acc,e){
    return acc + e.width;
  },0);
  return (
    <box shrink={true} style={{"bg":"red"}} width={width} {...rprops}>
      {entries.map(function (e,i){
        return (e.type == "separator") ? (
          <box key={i} style={{"bg":"black"}} {...e}></box>) : (
          <PrimaryToggle key={i} {...e}></PrimaryToggle>);
      })}
    </box>);
}

// js.blessed.layout/SecondaryButton [190] 
function SecondaryButton({label,index,setIndex,selected,noIndex,proxy,...rprops}){
  let colorFn = selected ? chalk.yellow : chalk.bold;
  let content = colorFn(
    "" + (!noIndex ? (selected ? chalk.inverse(" " + index + " ") : (" " + index + " ")) : "") + " " + label
  );
  return (
    <button
      ref={proxy}
      content={content}
      width={26}
      shrink={true}
      mouse={true}
      style={{"bg":"black","border":{"fg":"black","bg":"black"}}}
      keys={true}
      border={{}}
      onClick={function (){
        setIndex(index);
      }}
      {...rprops}>
    </button>);
}

// js.blessed.layout/SecondaryMenu [226] 
function SecondaryMenu({items,label,index = 1,noIndex,setIndex,menuContent,menuFooter}){
  items = (Array.isArray(items) ? items : Object.keys(items));
  let entries = items.map(function (e,i){
    return Object.assign({"top":2 + (i * 2),"index":i + 1},e);
  });
  let box = React.useRef(null);
  let MenuContent = menuContent;
  let MenuFooter = menuFooter;
  React.useEffect(function (){
    if(!noIndex){
      box.current.onScreenEvent("keypress",function (_,key){
        let i = Number.parseInt(key.full);
        let sel = entries.filter(function (e){
          return e.index == i;
        });
        if(sel && (0 < (sel).length)){
          setIndex(i);
        };
      });
      return function (){
        box.current.free();
      };
    }
  });
  return (
    <box
      ref={box}
      top={0}
      width={26}
      height="100%"
      shrink={true}
      scrollable={true}
      style={{"bold":true,"bg":"black"}}>
      {entries.map(function (e){
        return (
          <SecondaryButton
            key={e.index}
            selected={index == e.index}
            setIndex={setIndex}
            noIndex={noIndex}
            {...e}>
          </SecondaryButton>);
      })}
      <box
        style={{"bold":true,"bg":"black","fg":"white"}}
        align="left"
        top={0}
        height={1}
        shrink={true}
        width="100%"
        content={chalk.inverse(chalk.yellow(" " + label.toUpperCase() + " "))}>
      </box>
      {MenuContent ? (
        <box
          left={1}
          right={1}
          style={{"bg":"black"}}
          top={4 + (2 * (items).length)}><MenuContent></MenuContent>
        </box>) : null}
      {MenuFooter ? (
        <box height={2} right={0} bottom={0} style={{"bg":"black"}}><MenuFooter></MenuFooter></box>) : null}
    </box>);
}

// js.blessed.layout/LayoutHeaderBlock [301] 
function LayoutHeaderBlock({children}){
  return (
    <box top={0} left={0} right={0} height={1} bg="black">{children}</box>);
}

// js.blessed.layout/LayoutFooterBlock [312] 
function LayoutFooterBlock({children}){
  return (
    <box bottom={0} left={0} right={0} height={1} bg="black">{children}</box>);
}

// js.blessed.layout/LayoutBodyBlock [323] 
function LayoutBodyBlock({children}){
  return (
    <box top={1} bottom={1} width="100%">{children}</box>);
}

// js.blessed.layout/BlankRoute [332] 
function BlankRoute({route}){
  return (
    <box>{"Missing: " + route}</box>);
}

// js.blessed.layout/LayoutBody [338] 
function LayoutBody({console,consoleHeight,index,items,label,menuContent,menuFooter,menuHide,menuWidth,setIndex}){
  let {name,props,view} = items[index - 1];
  let Component = view || BlankRoute;
  let rightOffset = !menuHide ? (menuWidth || 28) : null;
  let bottomOffset = console ? (consoleHeight || 20) : 1;
  let Console = console;
  return (
    <LayoutBodyBlock>
      <box right={0} height="100%" width={rightOffset} bg="black">
        {!menuHide ? (
          <box left={1} bg="black">
            <SecondaryMenu
              label={label}
              index={index}
              setIndex={setIndex}
              items={items}
              menuContent={menuContent}
              menuFooter={menuFooter}>
            </SecondaryMenu>
          </box>) : null}
      </box>
      <box
        top={1}
        left={1}
        bottom={bottomOffset + 1}
        right={rightOffset + 1}>
        <r.Try
          fallback={function (){
            return (
              <box>ERRORED</box>);
          }}><Component route={name}></Component>
        </r.Try>
      </box>
      {Console ? (
        <box height={bottomOffset} bg="black" bottom={0}><Console></Console></box>) : null}
    </LayoutBodyBlock>);
}

// js.blessed.layout/LayoutStatus [390] 
function LayoutStatus({
  busy,
  setBusy,
  status = {"content":"","type":"info"},
  setStatus,
  autoClear,
  ...rprops
}){
  let {content,type} = status;
  let width = Math.min([content ? (content).length : 0,50]);
  let clearFn = function (){
    return setStatus({"content":"","type":"info"});
  };
  React.useEffect(function (){
    if(autoClear){
      let id = setTimeout(function (){
        new Promise(function (){
          setStatus({"content":"","type":"info"});
        });
      },2500);
      return function (){
        return clearTimeout(id);
      };
    }
  },[]);
  return (
    <box height={1} shrink={true} bg="black" {...rprops}>
      <button
        style={busy ? {"bg":"yellow","fg":"gray","bold":true} : {"bg":"gray","fg":"white","bold":true}}
        left={0}
        width={3}
        mouse={true}
        onClick={function (){
          setBusy(false);
        }}
        content={busy ? " ! " : " * "}>
      </button>
      {content ? (
        <button
          style={{
            "bg":{"info":"black","warn":"yellow","error":"yellow"}[type] || "blue",
            "fg":(type == "info") ? "white" : "black",
            "bold":type != "info"
          }}
          mouse={true}
          onClick={function (){
            setStatus({"content":"","type":"info"});
          }}
          left={3}
          content={" " + content + " "}>
        </button>) : null}
    </box>);
}

// js.blessed.layout/LayoutNotify [444] 
function LayoutNotify({
  setNotify,
  notify = {"content":"","type":"info","show":false,"layout":{}}
}){
  let {type,content,show,layout = {}} = notify;
  let style = (type == "error") ? {"bg":"red","fg":"white"} : {
    "bg":"blue",
    "fg":"white",
    "bold":true,
    "border":{"bg":"blue","fg":"white"}
  };
  return (
    <box
      transparent={true}
      draggable={true}
      mouse={true}
      hidden={!show}
      width={60}
      height={20}
      style={style}
      {...layout}>
      <box
        transparent={true}
        content={content}
        mouse={true}
        style={style}
        keys={true}
        right={1}
        scrollable={true}
        height={8}
        left={1}>
      </box>
      <button
        inputOnFocus={true}
        top={0}
        content=" x "
        width={3}
        mouse={true}
        style={k.set_in(k.clone_nested(style),["hover"],{"bg":"white","fg":"grey"})}
        keys={true}
        right={0}
        onClick={function (){
          setNotify({"content":"","type":"info","show":false,"layout":{}});
        }}
        height={3}>
      </button>
    </box>);
}

// js.blessed.layout/LayoutHeader [500] 
function LayoutHeader({header,route,setRoute}){
  let items = header["menu"];
  let entries = layoutMenu(items);
  return (
    <LayoutHeaderBlock>
      <PrimaryMenu setRoute={setRoute} entries={entries} route={route}></PrimaryMenu>
    </LayoutHeaderBlock>);
}

// js.blessed.layout/LayoutFooter [515] 
function LayoutFooter({busy,footer,header,route,setBusy,setRoute,setStatus,status}){
  let items = footer["menu"] || [];
  let ientries = layoutMenu(items);
  let toggles = footer["toggle"] || [];
  let tentries = layoutToggles(toggles);
  let ioffset = tentries.reduce(function (acc,e){
    return acc + e.width;
  },0);
  let soffset = ientries.reduce(function (acc,e){
    return acc + e.width;
  },ioffset);
  return (
    <LayoutFooterBlock>
      <PrimaryMenu
        entries={ientries}
        right={ioffset}
        setRoute={setRoute}
        route={route}>
      </PrimaryMenu>
      <LayoutStatus
        right={soffset}
        left={0}
        setStatus={setStatus}
        setBusy={setBusy}
        busy={busy}
        status={status}>
      </LayoutStatus>
      <PrimaryToggles entries={tentries} right={0}></PrimaryToggles>
    </LayoutFooterBlock>);
}

// js.blessed.layout/LayoutMain [555] 
function LayoutMain({
  header = {"menu":[],"toggle":null,"user":null},
  footer = {"menu":[],"toggle":null},
  init,
  route,
  setRoute,
  index,
  setIndex,
  sections,
  status,
  setStatus,
  busy,
  setBusy,
  notify,
  setNotify,
  menuWidth,
  menuContent,
  menuFooter,
  menuHide,
  console,
  consoleHeight
}){
  let [__route,__setRoute] = setRoute ? [route,setRoute] : React.useState(init);
  let [__index,__setIndex] = setIndex ? [index,setIndex] : React.useState(0);
  let section = Object.assign({},sections[__route || init],{
    "route":__route || init,
    "index":__index || 1,
    "setIndex":__setIndex
  });
  let [__status,__setStatus] = setStatus ? [status,setStatus] : React.useState(status || {});
  let [__busy,__setBusy] = setBusy ? [busy,setBusy] : React.useState(busy);
  let [__notify,__setNotify] = setNotify ? [notify,setNotify] : React.useState(notify || {});
  return (
    <box>
      <LayoutHeader route={__route || init} setRoute={__setRoute} header={header}></LayoutHeader>
      <LayoutBody
        console={console}
        menuHide={menuHide}
        menuFooter={menuFooter}
        consoleHeight={consoleHeight}
        menuWidth={menuWidth}
        menuContent={menuContent}
        {...section}>
      </LayoutBody>
      <LayoutFooter
        route={__route || init}
        setRoute={__setRoute}
        setStatus={__setStatus}
        status={__status}
        setBusy={__setBusy}
        busy={__busy}
        footer={footer}>
      </LayoutFooter>
      <LayoutNotify notify={__notify} setNotify={__setNotify}></LayoutNotify>
    </box>);
}

var MODULE = {
  "primaryNormal":primaryNormal,
  "primarySelected":primarySelected,
  "toggleEngaged":toggleEngaged,
  "toggleSelected":toggleSelected,
  "toggleNormal":toggleNormal,
  "PrimaryButton":PrimaryButton,
  "layoutMenu":layoutMenu,
  "layoutToggles":layoutToggles,
  "PrimaryMenu":PrimaryMenu,
  "PrimaryToggle":PrimaryToggle,
  "PrimaryToggles":PrimaryToggles,
  "SecondaryButton":SecondaryButton,
  "SecondaryMenu":SecondaryMenu,
  "LayoutHeaderBlock":LayoutHeaderBlock,
  "LayoutFooterBlock":LayoutFooterBlock,
  "LayoutBodyBlock":LayoutBodyBlock,
  "BlankRoute":BlankRoute,
  "LayoutBody":LayoutBody,
  "LayoutStatus":LayoutStatus,
  "LayoutNotify":LayoutNotify,
  "LayoutHeader":LayoutHeader,
  "LayoutFooter":LayoutFooter,
  "LayoutMain":LayoutMain
};

export default MODULE