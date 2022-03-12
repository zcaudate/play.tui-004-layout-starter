import * as ValtioCore from 'valtio/vanilla'

import * as ValtioUtils from 'valtio/utils'

import * as Valtio from 'valtio'

import k from '../xt/lang/base-lib'

// js.valtio/make [42] 
function make(m){
  let out = ValtioCore.proxy();
  let val_fn = function (){
    return ("function" == (typeof m)) ? m() : k.clone_nested(m);
  };
  let __reset__ = function (){
    for(let k of Object.keys(out)){
      delete out[k];
    };
    Object.assign(out,val_fn());
  };
  Object.defineProperty(out,"__reset__",{"value":__reset__,"writable":false});
  __reset__(out);
  return out;
}

// js.valtio/reset [59] 
function reset(pobj,m){
  let {__reset__} = pobj;
  if("function" == (typeof __reset__)){
    __reset__();
  }
  else{
    for(let k of Object.keys(pobj)){
      delete pobj[k];
    };
  }
  return Object.assign(pobj,m);
}

// js.valtio/useVal [68] 
function useVal(pobj,f = function (x){
  return x;
}){
  let snap = Valtio.useSnapshot(pobj);
  return ("function" == (typeof f)) ? f(snap) : (Array.isArray(f) ? f.reduce(function (acc,k){
    return acc[k];
  },snap) : snap);
}

// js.valtio/getAccessors [105] 
function getAccessors(pobj){
  let getFn = function (){
    return Valtio.useSnapshot(pobj);
  };
  let setFn = function (m){
    return Object.assign(pobj,m);
  };
  let resetFn = function (m){
    for(let k of Object.keys(pobj)){
      del(value,k);
    };
    Object.assign(pobj,m);
  };
  return [getFn,setFn,resetFn,pobj];
}

// js.valtio/getFieldAccessors [119] 
function getFieldAccessors(pobj,field){
  let getFVal = function (){
    return Valtio.useSnapshot(pobj)[field];
  };
  let setFVal = function (v){
    pobj[field] = v;
  };
  let resetFVal = function (m){
    
  };
  return [getFVal,setFVal,resetFVal,pobj];
}

// js.valtio/useProxy [137] 
function useProxy(pobj){
  let [getFn,setVal,resetVal] = getAccessors(pobj);
  return [getFn(),setVal,resetVal];
}

// js.valtio/useProxyField [146] 
function useProxyField(pobj,field){
  let [getFVal,setFVal,resetFVal] = getFieldAccessors(pobj,field);
  return [getFVal(),setFVal,resetFVal];
}

// js.valtio/wrapProxyField [155] 
function wrapProxyField(Component,[getter,setter]){
  return function ({record,field,callbacks = [],...rprops}){
    let [value,setValue] = useProxyField(record,field);
    let tprops = Object.assign({
      [getter]:value,
      [setter]:function (out){
            setValue(out);
            callbacks.map(function (f){
              return f(out);
            });
          }
    },rprops);
    return (
      <Component {...tprops}></Component>);
  };
}

var MODULE = {
  "make":make,
  "reset":reset,
  "useVal":useVal,
  "getAccessors":getAccessors,
  "getFieldAccessors":getFieldAccessors,
  "useProxy":useProxy,
  "useProxyField":useProxyField,
  "wrapProxyField":wrapProxyField
};

export default MODULE