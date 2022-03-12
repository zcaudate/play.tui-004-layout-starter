import nodeUtil from 'util'

import * as ValtioCore from 'valtio/vanilla'

import * as ValtioUtils from 'valtio/utils'

import * as Valtio from 'valtio'

import React from 'react'

import blessed from 'blessed'

import reactBlessed from 'react-blessed'

import k from '../../xt/lang/base-lib'

import v from '../valtio'

import r from '../react'

// js.blessed.ui/Dimension [18] 
globalThis["js_blessed_ui$$Dimension"] = ValtioCore.proxy({"height":null,"width":null});

// js.blessed.ui/Mouse [21] 
globalThis["js_blessed_ui$$Mouse"] = ValtioCore.proxy({"x":null,"y":null});

// js.blessed.ui/ScreenMouse [24] 
function ScreenMouse(){
  let ref = React.useRef();
  React.useEffect(function (){
    let {screen} = ref.current;
    screen.on("mouse",function ({x,y}){
      Object.assign(globalThis["js_blessed_ui$$Mouse"],{x,y});
    });
  },[]);
  return (
    <box ref={ref} bg="yellow" height={0} width={0}></box>);
}

// js.blessed.ui/ScreenMeasure [39] 
function ScreenMeasure(){
  let ref = React.useRef();
  React.useEffect(function (){
    let {screen} = ref.current;
    let measureFn = function (){
      let {height,width} = screen;
      Object.assign(globalThis["js_blessed_ui$$Dimension"],{height,width});
    };
    screen.on("resize",measureFn);
    measureFn();
  },[]);
  return (
    <box ref={ref} bg="yellow" height={0} width={0}></box>);
}

// js.blessed.ui/useList [56] 
function useList(onChange){
  let ref = React.useRef();
  let curr = ref.current;
  let [selected,setSelected] = React.useState(0);
  let handler = function (){
    let cselected = curr["selected"];
    setTimeout(function (){
      new Promise(function (){
        if(selected != cselected){
          setSelected(cselected);
          if(onChange){
            onChange(cselected);
          }
        }
      });
    },10);
  };
  React.useEffect(function (){
    if(curr){
      curr.on("action",handler);
      curr.on("keypress",handler);
      curr.on("focus",handler);
    }
    return function (){
      if(curr){
        curr.free();
      }
    };
  },[curr]);
  return [ref,selected,setSelected];
}

// js.blessed.ui/copyClipboard [85] 
function copyClipboard(text){
  let copyExec = (process.platform == "darwin") ? "pbcopy" : "xclip";
  let proc = require("child_process").spawn(copyExec);
  proc.stdin.write(text);
  proc.stdin.end();
}

// js.blessed.ui/say [97] 
function say(text){
  let proc = require("child_process").spawn("say");
  proc.stdin.write(text);
  proc.stdin.end();
}

// js.blessed.ui/getLayout [111] 
function getLayout(props){
  return k.obj_pick(props,["width","height","left","right","top","bottom"]);
}

// js.blessed.ui/getTopProps [122] 
function getTopProps(props){
  return Object.assign(getLayout(props),{"bg":"black","shrink":true});
}

// js.blessed.ui/omitLayoutProps [130] 
function omitLayoutProps(props){
  return Object.assign({},props,{"left":null,"right":null,"top":null,"bottom":null});
}

// js.blessed.ui/styleMinimal [146] 
function styleMinimal(color){
  return {
    "bold":false,
    "fg":"white",
    "bg":"black",
    "hover":{
        "bold":false,
        "fg":color,
        "bg":"black",
        "border":{"fg":color,"bg":"black"}
      },
    "border":{"fg":"white","bg":"black"}
  };
}

// js.blessed.ui/styleSmall [161] 
function styleSmall(color){
  return ("gray" == color) ? {
    "bold":false,
    "fg":"blue",
    "bg":"gray",
    "hover":{"bold":true,"bg":"gray","fg":"white"}
  } : {
    "bold":true,
    "fg":"black",
    "bg":color,
    "hover":{"bold":true,"bg":"gray","fg":color}
  };
}

// js.blessed.ui/styleInvert [179] 
function styleInvert(color){
  return ("gray" == color) ? {
    "bold":true,
    "fg":"blue",
    "bg":"gray",
    "hover":{
        "bold":true,
        "fg":"gray",
        "bg":"blue",
        "border":{"fg":"blue","bg":"blue"}
      },
    "border":{"fg":"gray","bg":"gray"}
  } : {
    "bold":true,
    "fg":"gray",
    "bg":color,
    "hover":{
        "bold":true,
        "fg":color,
        "bg":"gray",
        "border":{"fg":"gray","bg":"gray"}
      },
    "border":{"fg":color,"bg":color}
  };
}

// js.blessed.ui/styleInvertBusy [205] 
var styleInvertBusy = {
  "bold":false,
  "fg":"white",
  "bg":"gray",
  "border":{"fg":"gray","bg":"gray"}
};

// js.blessed.ui/styleInvertDisabled [213] 
var styleInvertDisabled = {
  "bold":false,
  "bg":"gray",
  "fg":"white",
  "hover":{
    "bold":false,
    "bg":"gray",
    "fg":"black",
    "border":{"bg":"gray","fg":"black"}
  },
  "border":{"bg":"gray","fg":"black"}
};

// js.blessed.ui/styleListView [225] 
function styleListView(color){
  return {
    "border":{"fg":"black"},
    "bg":"black",
    "selected":{"bg":color,"fg":"gray"},
    "scrollbar":{"fg":color}
  };
}

// js.blessed.ui/styleScrollBar [235] 
var styleScrollBar = {"style":{"bg":"gray","fg":"gray"},"track":true};

// js.blessed.ui/SmallLabel [244] 
function SmallLabel(props){
  return (
    <text bg="black" shrink={true} fg="yellow" {...props}></text>);
}

// js.blessed.ui/MinimalButton [259] 
function MinimalButton(props){
  let tprops = getTopProps(props);
  let {busy,color,content,disabled,hidden,onClick} = props;
  return (
    <box {...tprops}>
      <button
        shrink={true}
        hidden={hidden || disabled || busy}
        mouse={true}
        style={styleMinimal(color)}
        content={content}
        onClick={onClick}>
      </button>
      <box
        shrink={true}
        hidden={hidden || !(disabled || busy)}
        style={{"fg":"gray","bg":"black"}}
        content={content}>
      </box>
    </box>);
}

// js.blessed.ui/SmallButton [278] 
function SmallButton(props){
  let tprops = getTopProps(props);
  let {busy,color,content,disabled,onClick} = props;
  return (
    <box {...tprops}>
      <button
        shrink={true}
        bold={true}
        height={1}
        hidden={disabled || busy}
        mouse={true}
        style={styleSmall(color)}
        content={" " + content + " "}
        onClick={onClick}>
      </button>
      <box
        shrink={true}
        height={1}
        hidden={!(disabled || busy)}
        style={{"bg":"black","fg":"gray"}}
        content={" " + content + " "}>
      </box>
    </box>);
}

// js.blessed.ui/BigButton [300] 
function BigButton(props){
  let tprops = getTopProps(props);
  let {busy,color,content,disabled,onClick} = props;
  return (
    <box {...tprops}>
      <button
        bold={true}
        content={" " + content + " "}
        shrink={true}
        mouse={true}
        style={styleInvert(color)}
        hidden={disabled || busy}
        border={{}}
        onClick={onClick}
        height={3}>
      </button>
      <button
        shrink={true}
        height={3}
        border={{}}
        hidden={!disabled && !busy}
        style={disabled ? styleInvertDisabled : styleInvertBusy}
        content={" " + content + " "}>
      </button>
    </box>);
}

// js.blessed.ui/BigCheckBox [327] 
function BigCheckBox(props){
  let tprops = getTopProps(props);
  let {borderColor,color,onChange,selected,setSelected} = props;
  let [internal,setInternal] = React.useState(selected || false);
  let toggleFn = function (){
    let val = !internal;
    setInternal(val);
    if(setSelected){
      setSelected(val);
    }
    if(onChange){
      onChange(val);
    };
  };
  React.useEffect(function (){
    if(("boolean" == (typeof selected)) && (internal != selected)){
      setInternal(selected);
    }
  });
  return (
    <button
      inputOnFocus={true}
      bottom={props.bottom}
      top={props.top}
      content={internal ? " ■ " : "   "}
      shrink={true}
      mouse={true}
      style={{
        "fg":color,
        "bg":"black",
        "border":{"fg":borderColor || color,"bg":"black"}
      }}
      right={props.right}
      border={{"type":"line"}}
      onClick={toggleFn}
      left={props.left}>
    </button>);
}

// js.blessed.ui/Toggle [367] 
function Toggle(props){
  let {color,disabled,initial,onChange,reverse,selected,setSelected,textOff,textOn} = props;
  textOn = (textOn || "on");
  textOff = (textOff || "off");
  let tprops = getTopProps(props);
  let [internal,setInternal] = React.useState(selected || false);
  let display = null;
  if(reverse){
    display = !internal;
  }
  else{
    display = internal;
  }
  let toggleFn = function (){
    let val = !internal;
    setInternal(val);
    if(setSelected){
      setSelected(val);
    }
    if(onChange){
      onChange(val);
    };
  };
  React.useEffect(function (){
    if(("boolean" == (typeof selected)) && (internal != selected)){
      setInternal(selected);
    }
  });
  return (
    <box {...tprops}>
      <button
        shrink={true}
        mouse={true}
        style={display ? styleInvertDisabled : styleSmall("white")}
        content={" " + textOff + " "}
        onClick={toggleFn}>
      </button>
      <button
        left={2 + textOff.length}
        shrink={true}
        mouse={true}
        style={display ? styleSmall(color) : styleInvertDisabled}
        content={" " + textOn + " "}
        onClick={toggleFn}>
      </button>
    </box>);
}

// js.blessed.ui/Spinner [415] 
function Spinner(props){
  let {bgColor,borderColor,color,decimal,initial,max,min,onChange,pad,setValue,step,textColor,value,vertical,width} = props;
  let [internal,setInternal] = React.useState(initial || min || 0);
  let incIdx = function (){
    let ninternal = internal + (step || 1);
    if(("number" == (typeof max)) && (ninternal > max)){
      null;
    }
    else{
      setInternal(ninternal);
      if(setValue){
        setValue(ninternal);
      }
      if(onChange){
        onChange(ninternal);
      }
    };
  };
  let decIdx = function (){
    let ninternal = internal - (step || 1);
    if(("number" == (typeof min)) && (ninternal < min)){
      null;
    }
    else{
      setInternal(ninternal);
      if(setValue){
        setValue(ninternal);
      }
      if(onChange){
        onChange(ninternal);
      }
    };
  };
  React.useEffect(function (){
    if(("number" == (typeof value)) && (internal != value)){
      setInternal(value);
    }
  });
  let bprops = k.obj_assign_nested({
    "mouse":true,
    "border":{"type":"line"},
    "shrink":true,
    "height":3,
    "style":{
        "border":{"bg":bgColor || "black","fg":borderColor || "gray"},
        "fg":textColor || "white",
        "bg":bgColor || "black",
        "bold":true
      },
    "content":((null != decimal) ? internal.toFixed(decimal) : ("" + internal)).padStart(pad || 0)
  },getLayout(props));
  let decProps = Object.assign({
    "shrink":true,
    "mouse":true,
    "style":styleSmall(color),
    "onClick":decIdx,
    "content":" - "
  },vertical ? {"top":1,"right":1} : {"top":0,"right":0});
  let incProps = Object.assign({
    "shrink":true,
    "mouse":true,
    "onClick":incIdx,
    "style":styleSmall(color),
    "content":" + "
  },vertical ? {"top":-1,"right":1} : {"top":0,"right":4});
  return (
    <box {...bprops}>
      <button {...incProps}></button>
      <button {...decProps}></button>
    </box>);
}

// js.blessed.ui/EnumBox [486] 
function EnumBox(props){
  let {borderColor,color,index,items,onChange,pad,setIndex,textColor} = props;
  let [internal,setInternal] = React.useState(index || 0);
  let incIdx = function (){
    let ni = ((items).length + (internal + 1)) % (items).length;
    setInternal(ni);
    if(onChange){
      onChange(ni);
    }
    if(setIndex){
      setIndex(ni);
    };
  };
  let decIdx = function (){
    let ni = ((items).length + (internal - 1)) % (items).length;
    setInternal(ni);
    if(onChange){
      onChange(ni);
    }
    if(setIndex){
      setIndex(ni);
    };
  };
  React.useEffect(function (){
    if(("number" == (typeof index)) && (internal != index)){
      setInternal(index);
    }
  });
  let bprops = k.obj_assign_nested({
    "mouse":true,
    "border":{"type":"line"},
    "shrink":true,
    "style":{
        "border":{"bg":"black","fg":borderColor || "gray"},
        "fg":textColor || "white",
        "bg":"black",
        "bold":true
      },
    "onClick":incIdx,
    "content":items[internal].padStart(pad || 0)
  },getLayout(props));
  return (
    <button {...bprops}>
      <button
        shrink={true}
        top={0}
        right={4}
        mouse={true}
        style={styleSmall(color)}
        onClick={decIdx}
        content=" < ">
      </button>
      <button
        top={0}
        right={0}
        shrink={true}
        mouse={true}
        onClick={incIdx}
        style={styleSmall(color)}
        content=" > ">
      </button>
    </button>);
}

// js.blessed.ui/EnumTabsView [549] 
function EnumTabsView(props){
  let {checkIndex,color,format,height,index,items,layout,onChange,setIndex} = props;
  let [internal,setInternal] = React.useState(index || 0);
  if(!format){
    format = function (x){
      return x;
    };
  }
  let lefts = (layout == "vertical") ? Array((items).length).fill(0) : items.reduce(function (acc,item){
    let prev = acc[acc.length + -1];
    let curr = prev + 1 + format(item)["length"];
    acc.push(curr);
    return acc;
  },[0]);
  let tops = (layout == "vertical") ? items.map(function (e,i){
    return i * (height || 1);
  }) : Array((items).length).fill(0);
  let tprops = getTopProps(props);
  React.useEffect(function (){
    if(("number" == (typeof index)) && (internal != index)){
      setInternal(index);
    }
  });
  return (
    <box {...tprops}>
      {items.map(function (item,i){
        let text = format(item);
        return (
          <button
            key={item}
            top={tops[i]}
            content={text}
            width={(text).length}
            shrink={true}
            mouse={true}
            style={((i == internal) && (checkIndex ? checkIndex(i) : true)) ? styleSmall(color) : styleInvertDisabled}
            onClick={function (){
              setInternal(i);
              if(setIndex){
                setIndex(i);
              }
              if(onChange){
                onChange(items[i]);
              }
            }}
            height={height || 1}
            left={lefts[i]}>
          </button>);
      })}
    </box>);
}

// js.blessed.ui/EnumTabs [606] 
function EnumTabs(props){
  let {data,setValue,value,valueFn} = props;
  data = (data || []);
  if(!valueFn){
    valueFn = function (x){
      return x;
    };
  }
  let forwardFn = function (idx){
    return valueFn(data[idx]);
  };
  let reverseFn = function (label){
    return k.arr_map(data,valueFn).indexOf(label);
  };
  let setIndex = function (idx){
    setValue(forwardFn(idx));
  };
  let index = reverseFn(value);
  let items = k.arr_map(data,valueFn);
  let lprops = Object.assign({index,items,setIndex},props);
  return (
    <EnumTabsView {...lprops}></EnumTabsView>);
}

// js.blessed.ui/displayDropdown [632] 
function displayDropdown(ref,modal,items,opts){
  let {lpos,screen} = ref.current;
  let closeFn = function (){
    modal.current.destroy();
    modal.current = null;
  };
  if(modal.current){
    return;
  }
  let prompt = blessed.list({
    "inputOnFocus":true,
    "parent":screen,
    "top":lpos.yl - 2,
    "width":lpos.xl - lpos.xi,
    "mouse":true,
    "style":{
        "bg":"gray",
        "selected":{"bg":opts["color"] || "yellow","fg":"black"}
      },
    "keys":true,
    "padding":{"left":1,"right":1},
    "items":items,
    "height":(items).length,
    "left":lpos.xi
  });
  prompt.on("select",function (e,i){
    opts.select(e,i);
    closeFn();
  });
  prompt.focus();
  modal.current = prompt;
}

// js.blessed.ui/Dropdown [662] 
function Dropdown(props){
  let {borderColor,color,format,index,items,onChange,pad,setIndex,textColor} = props;
  let [internal,setInternal] = React.useState(index || 0);
  let formatFn = function (val){
    return format ? format(val) : val.padStart(pad || 0);
  };
  let modal = React.useRef();
  let ref = React.useRef();
  let displayFn = function (){
    displayDropdown(ref,modal,k.arr_map(items,formatFn),{
      "color":color,
      "select":function (e,i){
            setInternal(i);
            if(setIndex){
              setIndex(i);
            }
            if(onChange){
              onChange(i);
            }
          }
    });
  };
  let tprops = getTopProps(props);
  let content = formatFn(items[internal]);
  React.useEffect(function (){
    if(("number" == (typeof index)) && (internal != index)){
      setInternal(index);
    }
  });
  return (
    <box {...tprops}>
      <button
        inputOnFocus={true}
        ref={ref}
        content={content}
        mouse={true}
        style={{
          "border":{"bg":"black","fg":borderColor || "gray"},
          "fg":textColor || "white",
          "bg":"black",
          "bold":true
        }}
        keys={true}
        border={{"type":"line"}}
        onClick={displayFn}
        height={3}>
        <button
          top={0}
          right={0}
          height={1}
          shrink={true}
          mouse={true}
          onClick={displayFn}
          style={styleSmall(color)}
          content=" ▼ ">
        </button>
      </button>
    </box>);
}

// js.blessed.ui/TextBox [726] 
function TextBox(props){
  let {bold,borderColor,censor,color,content,disabled,error,initial,onChange,proxy,setContent,textColor,width} = props;
  let [internal,setInternal] = React.useState(initial || "");
  let tprops = getTopProps(props);
  let style = {
    "border":{"bg":"black","fg":borderColor || "gray"},
    "fg":textColor || "white",
    "bg":"black",
    "bold":bold
  };
  let ref = proxy || React.useRef();
  React.useEffect(function (){
    if(initial){
      ref.current.setValue(initial);
    }
  },[]);
  React.useEffect(function (){
    if(ref.current && (internal != content)){
      ref.current.setValue(content);
      setInternal(content);
    }
  },[content]);
  return (
    <box {...tprops}>
      <textbox
        inputOnFocus={true}
        ref={ref}
        width={width}
        shrink={true}
        mouse={true}
        onKeypress={function (e){
          let curr = ref.current;
          setTimeout(function (){
            new Promise(function (){
              if(curr){
                let val = curr["value"];
                if(setContent){
                  setContent(val);
                }
                if(onChange){
                  onChange(val);
                }
                setInternal(val);
              }
            });
          },5);
        }}
        style={style}
        keys={true}
        hidden={disabled}
        border={{"type":"line"}}
        censor={censor}>
      </textbox>
      <box
        hidden={!disabled}
        border={{"type":"line"}}
        shrink={true}
        style={{
          "bg":"black",
          "fg":"gray",
          "bold":bold,
          "border":{"bg":"black","fg":"gray"}
        }}
        width={width}
        content={censor ? "" : content}>
      </box>
      {error ? (
        <box
          top={0}
          align="right"
          width={2 + error["message"]()}
          right={1}
          shrink={true}
          style={{"bg":"black","fg":"red"}}
          content={" " + error["message"] + " "}>
        </box>) : null}
    </box>);
}

// js.blessed.ui/ListView [802] 
function ListView(props){
  let {color,format,height,index,initial,items,onChange,proxy,setIndex} = props;
  if(!format){
    format = function (x){
      return x;
    };
  }
  if(!initial){
    initial = index;
  }
  proxy = (proxy || React.useRef());
  let [internal,setInternal] = React.useState(initial || 0);
  let tprops = getTopProps(props);
  let handler = function (e){
    setTimeout(function (){
      new Promise(function (){
        let curr = proxy.current;
        if(curr){
          let val = curr["selected"];
          if(setIndex){
            setIndex(val);
          }
          if(onChange){
            onChange(val);
          }
          setInternal(val);
        };
      });
    },10);
  };
  let [init] = r.useStep(function (setDone){
    let curr = proxy.current;
    if(("number" == (typeof initial)) && curr){
      curr.select(initial);
      setInternal(index);
      setDone(true);
    };
  });
  React.useEffect(function (){
    let curr = proxy.current;
    if(("number" == (typeof index)) && curr && (internal != index)){
      curr.select(index);
      setInternal(index);
    };
  });
  React.useEffect(function (){
    let curr = proxy.current;
    if(curr){
      curr.on("mouse",handler);
      curr.on("action",handler);
      curr.on("keypress",handler);
    }
    return function (){
      if(curr){
        curr.free();
      }
    };
  },[init]);
  return (
    <box {...tprops}>
      <list
        inputOnFocus={true}
        interactive={true}
        ref={proxy}
        mouse={true}
        style={styleListView(color)}
        keys={true}
        items={k.arr_map(items,format)}
        scrollable={true}
        height={height}>
      </list>
    </box>);
}

// js.blessed.ui/List [866] 
function List(props){
  let {data,setValue,value,valueFn} = props;
  if(!valueFn){
    valueFn = function (x){
      return x;
    };
  }
  let forwardFn = function (idx){
    return valueFn(data && data[idx]);
  };
  let reverseFn = function (label){
    return k.arr_map(data,valueFn).indexOf(label);
  };
  let setIndex = function (idx){
    setValue(forwardFn(idx));
  };
  let index = reverseFn(value);
  let items = k.arr_map(data,valueFn);
  let lprops = Object.assign({index,items,setIndex},props);
  return (
    <ListView {...lprops}></ListView>);
}

// js.blessed.ui/displayNumberGrid [891] 
function displayNumberGrid(ref,modal,opts){
  let {lpos,screen} = ref.current;
  let {colCount,colWidth,color,end,format,start,step} = opts;
  if(modal.current){
    return;
  }
  let numbers = k.arr_range([start,end + step,step]);
  color = (color || "yellow");
  let grid = blessed.box({
    "inputOnFocus":true,
    "parent":screen,
    "top":lpos.yl - 2,
    "width":1 + (colCount * (1 + colWidth)),
    "mouse":true,
    "style":{"bg":"gray","selected":{"bg":color,"fg":"black"}},
    "keys":true,
    "height":Math.ceil((numbers).length / colCount),
    "left":lpos.xi
  });
  let gridItems = k.arr_map(numbers,function (n,i){
    let button = blessed.box({
      "inputOnFocus":true,
      "parent":grid,
      "top":Math.floor(i / colCount),
      "content":format(n),
      "width":colWidth,
      "mouse":true,
      "style":{
            "fg":color,
            "bg":"gray",
            "hover":{"fg":color,"bg":"black"},
            "selected":{"bg":color,"fg":"black"}
          },
      "keys":true,
      "height":1,
      "left":1 + ((i % colCount) * (1 + colWidth))
    });
    button.on("click",function (){
      opts.select(i);
      closeFn();
    });
  });
  let closeFn = function (){
    modal.current.destroy();
    modal.current = null;
  };
  modal.current = grid;
}

// js.blessed.ui/NumberGridBox [937] 
function NumberGridBox(props){
  let {borderColor,colCount,colWidth,color,end,format,onChange,setValue,start,step,textColor,textFn,value,width} = props;
  start = (start || 0);
  step = (step || 1);
  let forwardFn = function (internal){
    return (internal * step) + (start || 0);
  };
  let reverseFn = function (value){
    return Math.round((value - (start || 0)) / step);
  };
  let [internal,setInternal] = React.useState(0);
  let formatFn = format || function (x){
    return "" + x;
  };
  let modal = React.useRef();
  let ref = React.useRef();
  let displayFn = function (){
    displayNumberGrid(ref,modal,{
      "start":start,
      "step":step,
      "end":end,
      "color":color,
      "format":formatFn,
      "colCount":colCount,
      "colWidth":colWidth,
      "select":function (i){
            setInternal(i);
            if(setValue){
              setValue(forwardFn(i));
            }
            if(onChange){
              onChange(forwardFn(i));
            }
          }
    });
  };
  React.useEffect(function (){
    if(("number" == (typeof value)) && (internal != reverseFn(value))){
      setInternal(reverseFn(value));
    }
  });
  let tprops = getTopProps(props);
  return (
    <box {...tprops}>
      <button
        inputOnFocus={true}
        ref={ref}
        content={formatFn(start + (step * internal))}
        width={width}
        shrink={true}
        mouse={true}
        style={{
          "border":{"bg":"black","fg":borderColor || "gray"},
          "fg":textColor || "white",
          "bg":"black",
          "bold":true
        }}
        keys={true}
        border={{"type":"line"}}
        onClick={displayFn}>
        <button
          top={0}
          right={0}
          height={1}
          shrink={true}
          mouse={true}
          onClick={displayFn}
          style={styleSmall(color)}
          content=" ▼ ">
        </button>
      </button>
    </box>);
}

// js.blessed.ui/TimePicker [1000] 
function TimePicker(props){
  let {color,hour,hourLabel,minute,minuteHidden,minuteLabel,minuteQuarters,setHour,setMinute} = props;
  let tprops = getTopProps(props);
  let formatFn = function (n){
    return ("" + n).padStart(2,"0").padEnd(4);
  };
  hourLabel = (hourLabel || "HH");
  minuteLabel = (minuteLabel || "mm");
  let minuteProps = Object.assign({
    "format":formatFn,
    "colWidth":4,
    "color":color,
    "key":"0",
    "value":minute,
    "width":10,
    "setValue":setMinute,
    "colCount":6,
    "left":2 + 10 + (hourLabel).length
  },minuteQuarters ? {"start":0,"step":15,"end":45,"colCount":4} : {"start":0,"step":1,"end":59});
  return (
    <box {...tprops}>
      <NumberGridBox
        format={formatFn}
        colWidth={4}
        color={color}
        value={hour}
        width={10}
        start={0}
        setValue={setHour}
        colCount={6}
        end={23}
        left={0}>
      </NumberGridBox>
      <box
        left={11}
        top={1}
        shrink={true}
        style={{"bg":"black","fg":color}}
        content={hourLabel}>
      </box>
      {!minuteHidden ? [
        (
        <NumberGridBox {...minuteProps}></NumberGridBox>),
        (
        <box
          key="1"
          left={3 + 20 + (hourLabel).length}
          top={1}
          style={{"bg":"black","fg":color}}
          shrink={true}
          content={minuteLabel}>
        </box>)
      ] : null}
    </box>);
}

// js.blessed.ui/FromNowPicker [1063] 
function FromNowPicker(props){
  let {color,day,dayLabel,hourLabel,minuteLabel,setDay,width} = props;
  let tprops = getTopProps(props);
  let formatFn = function (n){
    return ("" + n).padStart(2," ").padEnd(4);
  };
  dayLabel = (dayLabel || "days");
  hourLabel = (hourLabel || "hrs");
  minuteLabel = (minuteLabel || "mins");
  let hprops = Object.assign(
    omitLayoutProps(props),
    {"width":width ? (width - 10) : null},
    {hourLabel,minuteLabel}
  );
  return (
    <box {...tprops}>
      <NumberGridBox
        format={formatFn}
        colWidth={4}
        color={color}
        value={day}
        width={10}
        start={0}
        setValue={setDay}
        colCount={4}
        end={31}
        left={0}>
      </NumberGridBox>
      <box
        left={11}
        top={1}
        shrink={true}
        style={{"bg":"black","fg":color}}
        content={dayLabel}>
      </box>
      <box style={{"bg":"black"}} left={2 + 10 + (dayLabel).length}><TimePicker {...hprops}></TimePicker></box>
    </box>);
}

// js.blessed.ui/DatePicker [1108] 
function DatePicker(props){
  let {color,day,dayLabel,month,monthLabel,setDay,setMonth,setYear,year,yearLabel} = props;
  let tprops = Object.assign({"bg":"black"},getTopProps(props));
  dayLabel = (dayLabel || "D");
  monthLabel = (monthLabel || "M");
  yearLabel = (yearLabel || "Y");
  return (
    <box {...tprops}>
      <NumberGridBox
        format={function (s){
          return ("" + s).padStart(3," ");
        }}
        colWidth={4}
        color={color}
        value={day}
        width={10}
        start={1}
        setValue={setDay}
        colCount={5}
        end={[1,3,5,7,8,10,12].some(function (x){
          return x == month;
        }) ? 31 : ([4,6,9,11].some(function (x){
          return x == month;
        }) ? 30 : ((0 == (year % 4)) ? 29 : 28))}
        left={0}>
      </NumberGridBox>
      <box
        left={11}
        top={1}
        shrink={true}
        style={{"bg":"black","fg":color}}
        content={dayLabel}>
      </box>
      <NumberGridBox
        format={function (i){
          return   ([
              "JAN",
              "FEB",
              "MAR",
              "APR",
              "MAY",
              "JUN",
              "JUL",
              "AUG",
              "SEP",
              "OCT",
              "NOV",
              "DEC"
            ])[i - 1].padStart(4);
        }}
        colWidth={5}
        color={color}
        value={month}
        width={10}
        start={1}
        setValue={setMonth}
        colCount={3}
        end={12}
        left={2 + (dayLabel).length + 10}>
      </NumberGridBox>
      <box
        left={2 + (dayLabel).length + 20}
        top={0}
        height={3}
        width={3}
        bg="black">
        <box
          top={1}
          left={1}
          shrink={true}
          style={{"bg":"black","fg":color}}
          content={monthLabel}>
        </box>
      </box>
      <Spinner
        left={4 + (dayLabel).length + (monthLabel).length + 20}
        value={year}
        setValue={setYear}
        pad={4}
        color={color}
        width={15}>
      </Spinner>
      <box
        left={4 + (dayLabel).length + (monthLabel).length + 35}
        top={0}
        height={3}
        width={3}
        bg="black">
        <box
          left={1}
          top={1}
          shrink={true}
          style={{"bg":"black","fg":color}}
          content={yearLabel}>
        </box>
      </box>
    </box>);
}

// js.blessed.ui/CopyButton [1215] 
function CopyButton(props){
  let {color,input,onClick} = props;
  let [clicked,setClicked] = React.useState();
  let bprops = k.obj_assign_nested({
    "shrink":true,
    "content":clicked ? "  OK  " : " COPY ",
    "mouse":true,
    "disabled":clicked,
    "onClick":function (){
        copyClipboard(nodeUtil.inspect(input,{"colors":false}));
        setClicked(true);
        setTimeout(function (){
          new Promise(function (){
            setClicked(false);
          });
        },1000);
        if(onClick){
          onClick();
        }
      },
    "style":styleSmall(clicked ? "gray" : color)
  },props);
  return (
    <button {...bprops}></button>);
}

// js.blessed.ui/TextDisplay [1241] 
function TextDisplay(props){
  let bprops = k.obj_assign_nested({
    "bg":"black",
    "mouse":true,
    "scrollable":true,
    "scrollbar":styleScrollBar
  },props);
  return (
    <box {...bprops}></box>);
}

// js.blessed.ui/GridLayout [1253] 
function GridLayout(props){
  let {bg,color,display,items} = props;
  let {center,height,keyFn,viewFn,width} = Object.assign({
    "height":15,
    "width":40,
    "keyFn":function (item,i){
        return i;
      },
    "viewFn":function (item){
        return item;
      }
  },display);
  items = (items || []);
  let [full,setFull] = React.useState(0);
  let row_count = Math.max(1,Math.floor(full / width));
  let dims = v.useVal(globalThis["js_blessed_ui$$Dimension"]);
  let grid = React.useRef({});
  React.useEffect(function (){
    let curr = grid.current;
    let width = curr["width"];
    if(curr && (width != full)){
      setFull(width);
    };
  });
  let bopts = {
    "keys":true,
    "mouse":true,
    "scrollable":true,
    "style":{"bg":bg},
    "scrollbar":{
        "style":{"bg":color || "gray","fg":color || "gray"},
        "track":true
      }
  };
  let bprops = k.obj_assign_nested(getLayout(props),bopts);
  return (
    <box {...bprops}>
      <box bottom={0} height={1} content={nodeUtil.inspect(dims)}></box>
      <box
        ref={grid}
        style={{"bg":bg}}
        height={Math.ceil((items).length / row_count) * height}
        left={0}
        right={1}>
        {items.map(function (item,i){
          let view = viewFn(item);
          return (
            <box
              key={keyFn(item,i)}
              height={height}
              width={width}
              style={{"bg":bg}}
              top={Math.floor(i / row_count) * height}
              left={(row_count == 1) ? 0 : (width * (i % row_count))}>{view}
            </box>);
        })}
      </box>
    </box>);
}

// js.blessed.ui/KeyListPane [1310] 
function KeyListPane({displayFn,formatFn,keysFn,keysWidth,targetFn,tree}){
  keysFn = (keysFn || function (tree){
    return k.sort(k.obj_keys(tree));
  });
  targetFn = (targetFn || function (tree,key){
    return k.get_in(tree,[key]);
  });
  formatFn = (formatFn || function (x){
    return x;
  });
  let keys = keysFn(tree);
  let [key,setKey] = React.useState(keys[0]);
  let target = (tree && key) ? targetFn(tree,key) : null;
  keysWidth = (keysWidth || 24);
  displayFn = (displayFn || function (target){
    return (
      <TextDisplay content={nodeUtil.inspect(target,{"color":true,"depth":4})}></TextDisplay>);
  });
  return (
    <box>
      <box
        width={keysWidth}
        height={1}
        style={{"fg":"green","bold":true}}
        content="%">
      </box>
      <List
        top={1}
        value={key}
        setValue={setKey}
        width={keysWidth}
        color="green"
        data={keys}>
      </List>
      <box
        left={keysWidth + 1}
        height={1}
        style={{"fg":"green","bold":true}}
        content={"" + key}>
      </box>
      <box top={1} left={1 + keysWidth}>{displayFn(target)}</box>
    </box>);
}

// js.blessed.ui/TreeEnumPane [1357] 
function TreeEnumPane({branchesFn,branchesWidth,displayFn,formatFn,leavesFn,targetFn,tree}){
  branchesFn = (branchesFn || function (tree){
    return k.sort(k.obj_keys(tree));
  });
  leavesFn = (leavesFn || function (tree,branch){
    return k.sort(k.obj_keys(tree[branch] || {}));
  });
  targetFn = (targetFn || function (tree,branch,leaf){
    return k.get_in(tree,[branch,leaf]);
  });
  formatFn = (formatFn || function (x){
    return x;
  });
  displayFn = (displayFn || function (target){
    return nodeUtil.inspect(target,{"color":true,"depth":4});
  });
  let branches = branchesFn(tree);
  let [branch,setBranch] = React.useState(branches[0]);
  let leaves = leavesFn(tree,branch);
  let [leaf,setLeaf] = React.useState(leaves[0]);
  let target = (tree && branch && leaf) ? targetFn(tree,branch,leaf) : null;
  branchesWidth = (branchesWidth || 24);
  return (
    <box>
      <box
        width={branchesWidth}
        height={1}
        style={{"fg":"green","bold":true}}
        content="%">
      </box>
      <List
        top={1}
        value={branch}
        setValue={setBranch}
        width={branchesWidth}
        color="green"
        data={branches}>
      </List>
      <box
        left={branchesWidth + 1}
        height={1}
        style={{"fg":"green","bold":true}}
        content={"" + branch}>
      </box>
      <TextDisplay top={1} left={1 + branchesWidth} content={displayFn(target)}></TextDisplay>
      <box bottom={0} height={1} left={1 + branchesWidth}>
        <EnumTabs
          value={leaf}
          setValue={setLeaf}
          data={leaves}
          format={function (s){
            return " " + s + " ";
          }}>
        </EnumTabs>
      </box>
    </box>);
}

// js.blessed.ui/TreeListPane [1419] 
function TreeListPane({branchesFn,branchesLabel,branchesWidth,displayFn,formatFn,leavesFn,leavesLabel,leavesWidth,targetFn,tree}){
  branchesFn = (branchesFn || function (tree){
    return k.sort(k.obj_keys(tree));
  });
  leavesFn = (leavesFn || function (tree,branch){
    return k.sort(k.obj_keys(tree[branch] || {}));
  });
  targetFn = (targetFn || function (tree,branch,leaf){
    return k.get_in(tree,[branch,leaf]);
  });
  formatFn = (formatFn || function (x){
    return x;
  });
  displayFn = (displayFn || function (target){
    return nodeUtil.inspect(target,{"color":true,"depth":4});
  });
  branchesWidth = (branchesWidth || 24);
  leavesWidth = (leavesWidth || 24);
  let branches = branchesFn(tree);
  let [branch,setBranch] = React.useState(branches[0]);
  let leaves = leavesFn(tree,branch);
  let [leaf,setLeaf] = React.useState(leaves[0]);
  let target = (tree && branch && leaf) ? targetFn(tree,branch,leaf) : null;
  return (
    <box>
      <box
        width={branchesWidth}
        height={1}
        style={{"fg":"green","bold":true}}
        content="%">
      </box>
      <List
        top={1}
        value={branch}
        setValue={setBranch}
        width={branchesWidth}
        color="green"
        data={branches}>
      </List>
      <box
        left={branchesWidth + 1}
        width={leavesWidth}
        height={1}
        style={{"fg":"green","bold":true}}
        content={branch}>
      </box>
      <List
        key={leaf}
        top={1}
        left={1 + branchesWidth}
        value={leaf}
        setValue={setLeaf}
        width={leavesWidth}
        color="green"
        data={leaves}>
      </List>
      <box
        left={2 + branchesWidth + leavesWidth}
        height={1}
        style={{"fg":"green","bold":true}}
        content={leaf}>
      </box>
      <TextDisplay
        top={1}
        left={2 + branchesWidth + leavesWidth}
        content={displayFn(target)}>
      </TextDisplay>
    </box>);
}

var MODULE = {
  "ScreenMouse":ScreenMouse,
  "ScreenMeasure":ScreenMeasure,
  "useList":useList,
  "copyClipboard":copyClipboard,
  "say":say,
  "getLayout":getLayout,
  "getTopProps":getTopProps,
  "omitLayoutProps":omitLayoutProps,
  "styleMinimal":styleMinimal,
  "styleSmall":styleSmall,
  "styleInvert":styleInvert,
  "styleInvertBusy":styleInvertBusy,
  "styleInvertDisabled":styleInvertDisabled,
  "styleListView":styleListView,
  "styleScrollBar":styleScrollBar,
  "SmallLabel":SmallLabel,
  "MinimalButton":MinimalButton,
  "SmallButton":SmallButton,
  "BigButton":BigButton,
  "BigCheckBox":BigCheckBox,
  "Toggle":Toggle,
  "Spinner":Spinner,
  "EnumBox":EnumBox,
  "EnumTabsView":EnumTabsView,
  "EnumTabs":EnumTabs,
  "displayDropdown":displayDropdown,
  "Dropdown":Dropdown,
  "TextBox":TextBox,
  "ListView":ListView,
  "List":List,
  "displayNumberGrid":displayNumberGrid,
  "NumberGridBox":NumberGridBox,
  "TimePicker":TimePicker,
  "FromNowPicker":FromNowPicker,
  "DatePicker":DatePicker,
  "CopyButton":CopyButton,
  "TextDisplay":TextDisplay,
  "GridLayout":GridLayout,
  "KeyListPane":KeyListPane,
  "TreeEnumPane":TreeEnumPane,
  "TreeListPane":TreeListPane
};

export default MODULE