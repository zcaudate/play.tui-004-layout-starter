// xt.lang.base-lib/type-native [20] 
function type_native(obj){
  let t = typeof obj;
  if(t == "object"){
    if(Array.isArray(obj)){
      return "array";
    }
    else{
      let tn = obj["constructor"]["name"];
      if(tn == "Object"){
        return "object";
      }
      else{
        return tn;
      }
    }
  }
  else{
    return t;
  };
}

// xt.lang.base-lib/type [26] 
function type(x){
  let ntype = type_native(x);
  if(ntype == "object"){
    return x["::/__type__"] || ntype;
  }
  else{
    return ntype;
  }
}

// xt.lang.base-lib/key-fn [36] 
function key_fn(k){
  return function (x){
    return x[k];
  };
}

// xt.lang.base-lib/inc-fn [43] 
function inc_fn(init){
  let i = init;
  if(null == i){
    i = -1;
  }
  let inc_fn = function (){
    i = (i + 1);
    return i;
  };
  return inc_fn;
}

// xt.lang.base-lib/step-nil [61] 
function step_nil(obj,pair){
  return null;
}

// xt.lang.base-lib/step-thrush [67] 
function step_thrush(x,f){
  return f(x);
}

// xt.lang.base-lib/step-call [73] 
function step_call(f,x){
  return f(x);
}

// xt.lang.base-lib/step-push [79] 
function step_push(arr,e){
  arr.push(e);
  return arr;
}

// xt.lang.base-lib/step-set-key [86] 
function step_set_key(obj,k,v){
  obj[k] = v;
  return obj;
}

// xt.lang.base-lib/step-set-fn [93] 
function step_set_fn(obj,k){
  return function (v){
    return step_set_key(obj,k,v);
  };
}

// xt.lang.base-lib/step-set-pair [99] 
function step_set_pair(obj,e){
  obj[e[0]] = e[1];
  return obj;
}

// xt.lang.base-lib/step-del-key [108] 
function step_del_key(obj,k){
  delete obj[k];
  return obj;
}

// xt.lang.base-lib/starts-with? [120] 
function starts_withp(s,match){
  return s.substring(0,match.length) == match;
}

// xt.lang.base-lib/ends-with? [129] 
function ends_withp(s,match){
  return match == s.substring(s.length - match.length,s.length);
}

// xt.lang.base-lib/capitalize [141] 
function capitalize(s){
  return s.substring(0,1).toUpperCase() + s.substring(1);
}

// xt.lang.base-lib/decapitalize [152] 
function decapitalize(s){
  return s.substring(0,1).toLowerCase() + s.substring(1);
}

// xt.lang.base-lib/pad-left [163] 
function pad_left(s,n,ch){
  let l = n - s.length;
  let out = s;
  for(let i = 0; i < l; i = (i + 1)){
    out = (ch + out);
  };
  return out;
}

// xt.lang.base-lib/pad-right [173] 
function pad_right(s,n,ch){
  let l = n - s.length;
  let out = s;
  for(let i = 0; i < l; i = (i + 1)){
    out = (out + ch);
  };
  return out;
}

// xt.lang.base-lib/pad-lines [183] 
function pad_lines(s,n,ch){
  let lines = s.split("\n");
  let out = "";
  for(let line of lines){
    if(0 < (out).length){
      out = (out + "\n");
    }
    out = (out + pad_left("",n," ") + line);
  };
  return out;
}

// xt.lang.base-lib/mod-pos [200] 
function mod_pos(val,modulo){
  let out = val % modulo;
  return (out < 0) ? (out + modulo) : out;
}

// xt.lang.base-lib/mod-offset [209] 
function mod_offset(pval,nval,modulo){
  let offset = (nval - pval) % modulo;
  if(Math.abs(offset) > (modulo / 2)){
    if(offset > 0){
      return offset - modulo;
    }
    else{
      return offset + modulo;
    }
  }
  else{
    return offset;
  }
}

// xt.lang.base-lib/gcd [225] 
function gcd(a,b){
  return (0 == b) ? a : gcd(b,a % b);
}

// xt.lang.base-lib/lcm [233] 
function lcm(a,b){
  return (a * b) / gcd(a,b);
}

// xt.lang.base-lib/mix [240] 
function mix(x0,x1,v,f){
  if(null == f){
    f = function (x){
      return x;
    };
  }
  return x0 + ((x1 - x0) * f(v));
}

// xt.lang.base-lib/sign [249] 
function sign(x){
  return (x < 0) ? -1 : 1;
}

// xt.lang.base-lib/round [256] 
function round(x){
  return Math.floor(x + 0.5);
}

// xt.lang.base-lib/sym-full [266] 
function sym_full(ns,id){
  return ns + "/" + id;
}

// xt.lang.base-lib/sym-name [272] 
function sym_name(sym){
  let idx = sym.indexOf("/");
  return sym.substring(idx - -1);
}

// xt.lang.base-lib/sym-ns [280] 
function sym_ns(sym){
  let idx = sym.indexOf("/");
  if(0 < idx){
    return sym.substring(0,idx - 0);
  }
  else{
    return null;
  }
}

// xt.lang.base-lib/sym-pair [289] 
function sym_pair(sym){
  return [sym_ns(sym),sym_name(sym)];
}

// xt.lang.base-lib/not-empty? [302] 
function not_emptyp(res){
  if(null == res){
    return false;
  }
  else if("string" == (typeof res)){
    return 0 < res.length;
  }
  else if(Array.isArray(res)){
    return 0 < (res).length;
  }
  else if((null != res) && ("object" == (typeof res)) && !Array.isArray(res)){
    for(let [k,v] of Object.entries(res)){
      return true;
    };
    return false;
  }
  else{
    throw "Invalid type.";
  }
}

// xt.lang.base-lib/is-empty? [317] 
function is_emptyp(res){
  if(null == res){
    return true;
  }
  else if("string" == (typeof res)){
    return 0 == res.length;
  }
  else if(Array.isArray(res)){
    return 0 == (res).length;
  }
  else if((null != res) && ("object" == (typeof res)) && !Array.isArray(res)){
    for(let [k,v] of Object.entries(res)){
      return false;
    };
    return true;
  }
  else{
    throw "Invalid type.";
  }
}

// xt.lang.base-lib/arr-lookup [332] 
function arr_lookup(arr){
  let out = {};
  for(let k of arr){
    out[k] = true;
  };
  return out;
}

// xt.lang.base-lib/arr-every [341] 
function arr_every(arr,pred){
  for(let i = 0; i < arr.length; ++i){
    let v = arr[i];
    if(!pred(v)){
      return false;
    }
  };
  return true;
}

// xt.lang.base-lib/arr-some [350] 
function arr_some(arr,pred){
  for(let i = 0; i < arr.length; ++i){
    let v = arr[i];
    if(pred(v)){
      return true;
    }
  };
  return false;
}

// xt.lang.base-lib/arr-each [359] 
function arr_each(arr,f){
  for(let e of arr){
    f(e);
  };
  return true;
}

// xt.lang.base-lib/arr-reverse [366] 
function arr_reverse(arr){
  let out = [];
  for(let i = arr.length; i > 0; i = (i + -1)){
    out.push(arr[i + -1]);
  };
  return out;
}

// xt.lang.base-lib/arr-zip [377] 
function arr_zip(ks,vs){
  let out = {};
  for(let i = 0; i < ks.length; ++i){
    let k = ks[i];
    out[k] = vs[i];
  };
  return out;
}

// xt.lang.base-lib/arr-map [386] 
function arr_map(arr,f){
  let out = [];
  for(let e of arr){
    out.push(f(e));
  };
  return out;
}

// xt.lang.base-lib/arr-clone [395] 
function arr_clone(arr){
  let out = [];
  for(let e of arr){
    out.push(e);
  };
  return out;
}

// xt.lang.base-lib/arr-append [404] 
function arr_append(arr,other){
  for(let e of other){
    arr.push(e);
  };
  return arr;
}

// xt.lang.base-lib/arr-slice [412] 
function arr_slice(arr,start,finish){
  let out = [];
  for(let i = start; i < finish; i = (i + 1)){
    out.push(arr[i]);
  };
  return out;
}

// xt.lang.base-lib/arr-rslice [421] 
function arr_rslice(arr,start,finish){
  let out = [];
  for(let i = start; i < finish; i = (i + 1)){
    out.unshift(arr[i]);
  };
  return out;
}

// xt.lang.base-lib/arr-tail [430] 
function arr_tail(arr,n){
  let t = (arr).length;
  return arr_rslice(arr,Math.max(t - n,0),t);
}

// xt.lang.base-lib/arr-mapcat [437] 
function arr_mapcat(arr,f){
  let out = [];
  for(let e of arr){
    let res = f(e);
    if(null != res){
      for(let v of res){
        out.push(v);
      };
    }
  };
  return out;
}

// xt.lang.base-lib/arr-partition [449] 
function arr_partition(arr,n){
  let out = [];
  let i = 0;
  let sarr = [];
  for(let e of arr){
    if(i == n){
      out.push(sarr);
      i = 0;
      sarr = [];
    }
    sarr.push(e);
    i = (i + 1);
  };
  if(0 < sarr.length){
    out.push(sarr);
  }
  return out;
}

// xt.lang.base-lib/arr-filter [467] 
function arr_filter(arr,pred){
  let out = [];
  for(let e of arr){
    if(pred(e)){
      out.push(e);
    }
  };
  return out;
}

// xt.lang.base-lib/arr-keep [477] 
function arr_keep(arr,f){
  let out = [];
  for(let e of arr){
    let v = f(e);
    if(null != v){
      out.push(v);
    }
  };
  return out;
}

// xt.lang.base-lib/arr-keepf [488] 
function arr_keepf(arr,pred,f){
  let out = [];
  for(let e of arr){
    if(pred(e)){
      out.push(f(e));
    }
  };
  return out;
}

// xt.lang.base-lib/arr-juxt [498] 
function arr_juxt(arr,key_fn,val_fn){
  let out = {};
  for(let e of arr){
    out[key_fn(e)] = val_fn(e);
  };
  return out;
}

// xt.lang.base-lib/arr-foldl [508] 
function arr_foldl(arr,f,init){
  let out = init;
  for(let e of arr){
    out = f(out,e);
  };
  return out;
}

// xt.lang.base-lib/arr-foldr [517] 
function arr_foldr(arr,f,init){
  let out = init;
  for(let i = arr.length; i > 0; i = (i + -1)){
    out = f(out,arr[i + -1]);
  };
  return out;
}

// xt.lang.base-lib/arr-pipel [528] 
function arr_pipel(arr,e){
  return arr_foldl(arr,step_thrush,e);
}

// xt.lang.base-lib/arr-piper [534] 
function arr_piper(arr,e){
  return arr_foldr(arr,step_thrush,e);
}

// xt.lang.base-lib/arr-group-by [540] 
function arr_group_by(arr,key_fn,view_fn){
  let out = {};
  for(let e of arr){
    let g = key_fn(e);
    let garr = out[g] || [];
    out[g] = [];
    garr.push(view_fn(e));
    out[g] = garr;
  };
  return out;
}

// xt.lang.base-lib/arr-range [553] 
function arr_range(x){
  let arr = Array.isArray(x) ? x : [x];
  let arrlen = arr.length;
  let start = (1 < arrlen) ? arr[0] : 0;
  let finish = (1 < arrlen) ? arr[1] : arr[0];
  let step = (2 < arrlen) ? arr[2] : 1;
  let out = [start];
  let i = step + start;
  if((0 < step) && (start < finish)){
    while(i < finish){
      out.push(i);
      i = (i + step);
    }
  }
  else if((0 > step) && (finish < start)){
    while(i > finish){
      out.push(i);
      i = (i + step);
    }
  }
  else{
    return [];
  }
  return out;
}

// xt.lang.base-lib/arr-intersection [579] 
function arr_intersection(arr,other){
  let lu = {};
  for(let k of arr){
    lu[k] = true;
  };
  let out = [];
  for(let e of other){
    if(lu[e] != null){
      out.push(e);
    }
  };
  return out;
}

// xt.lang.base-lib/arr-difference [590] 
function arr_difference(arr,other){
  let lu = {};
  for(let k of arr){
    lu[k] = true;
  };
  let out = [];
  for(let e of other){
    if(!(lu[e] != null)){
      out.push(e);
    }
  };
  return out;
}

// xt.lang.base-lib/arr-union [601] 
function arr_union(arr,other){
  let lu = {};
  for(let e of arr){
    lu[e] = e;
  };
  for(let e of other){
    lu[e] = e;
  };
  let out = [];
  for(let v of Object.values(lu)){
    out.push(v);
  };
  return out;
}

// xt.lang.base-lib/arr-sort [616] 
function arr_sort(arr,key_fn,comp_fn){
  let out = Array.from(arr);
  out.sort(function (a,b){
    return comp_fn(key_fn(a),key_fn(b)) ? -1 : 1;
  });
  return out;
}

// xt.lang.base-lib/arr-shuffle [624] 
function arr_shuffle(arr){
  let tmp_val = null;
  let tmp_idx = null;
  let total = (arr).length;
  for(let i = 0; i < total; i = (i + 1)){
    tmp_idx = (0 + Math.floor(Math.random() * total));
    tmp_val = arr[tmp_idx];
    arr[tmp_idx] = arr[i];
    arr[i] = tmp_val;
  };
  return arr;
}

// xt.lang.base-lib/arr-pushl [638] 
function arr_pushl(arr,v,n){
  arr.push(v);
  if(arr.length > n){
    arr.shift();
  }
  return arr;
}

// xt.lang.base-lib/arr-pushr [647] 
function arr_pushr(arr,v,n){
  arr.unshift(v);
  if(arr.length > n){
    arr.pop();
  }
  return arr;
}

// xt.lang.base-lib/arr-join [656] 
function arr_join(arr,s){
  return arr.join(s);
}

// xt.lang.base-lib/arr-repeat [662] 
function arr_repeat(x,n){
  let out = [];
  for(let i = 0; i < (n - 0); i = (i + 1)){
    out.push(("function" == (typeof x)) ? x() : x);
  };
  return out;
}

// xt.lang.base-lib/arr-random [673] 
function arr_random(arr){
  let idx = Math.floor(arr.length * Math.random());
  return arr[idx];
}

// xt.lang.base-lib/obj-empty? [684] 
function obj_emptyp(obj){
  for(let k of Object.keys(obj)){
    return false;
  };
  return true;
}

// xt.lang.base-lib/obj-not-empty? [692] 
function obj_not_emptyp(obj){
  for(let k of Object.keys(obj)){
    return true;
  };
  return false;
}

// xt.lang.base-lib/obj-first-key [700] 
function obj_first_key(obj){
  for(let k of Object.keys(obj)){
    return k;
  };
  return null;
}

// xt.lang.base-lib/obj-first-val [708] 
function obj_first_val(obj){
  for(let v of Object.values(obj)){
    return v;
  };
  return null;
}

// xt.lang.base-lib/obj-keys [716] 
function obj_keys(obj){
  let out = [];
  for(let k of Object.keys(obj)){
    out.push(k);
  };
  return out;
}

// xt.lang.base-lib/obj-vals [725] 
function obj_vals(obj){
  let out = [];
  for(let v of Object.values(obj)){
    out.push(v);
  };
  return out;
}

// xt.lang.base-lib/obj-pairs [734] 
function obj_pairs(obj){
  let out = [];
  for(let [k,v] of Object.entries(obj)){
    out.push([k,v]);
  };
  return out;
}

// xt.lang.base-lib/obj-clone [743] 
function obj_clone(obj){
  let out = {};
  for(let [k,v] of Object.entries(obj)){
    out[k] = v;
  };
  return out;
}

// xt.lang.base-lib/obj-assign [752] 
function obj_assign(obj,m){
  if(null != m){
    for(let [k,v] of Object.entries(m)){
      obj[k] = v;
    };
  }
  return obj;
}

// xt.lang.base-lib/obj-assign-nested [761] 
function obj_assign_nested(obj,m){
  if(null != m){
    for(let [k,mv] of Object.entries(m)){
      let v = obj[k];
      if(((null != mv) && ("object" == (typeof mv)) && !Array.isArray(mv)) && ((null != v) && ("object" == (typeof v)) && !Array.isArray(v))){
        obj[k] = obj_assign_nested(v,mv);
      }
      else{
        obj[k] = mv;
      }
    };
  }
  return obj;
}

// xt.lang.base-lib/obj-assign-with [776] 
function obj_assign_with(obj,m,f){
  if(null != m){
    let input = m || {};
    for(let [k,mv] of Object.entries(input)){
      obj[k] = ((obj[k] != null) ? f(obj[k],mv) : mv);
    };
  }
  return obj;
}

// xt.lang.base-lib/obj-from-pairs [790] 
function obj_from_pairs(pairs){
  let out = {};
  for(let pair of pairs){
    out[pair[0]] = pair[1];
  };
  return out;
}

// xt.lang.base-lib/obj-del [801] 
function obj_del(obj,ks){
  for(let k of ks){
    delete obj[k];
  };
  return obj;
}

// xt.lang.base-lib/obj-del-all [809] 
function obj_del_all(obj){
  for(let k of obj_keys(obj)){
    delete obj[k];
  };
  return obj;
}

// xt.lang.base-lib/obj-pick [818] 
function obj_pick(obj,ks){
  let out = {};
  for(let k of ks){
    let v = obj[k];
    if(null != v){
      out[k] = v;
    }
  };
  return out;
}

// xt.lang.base-lib/obj-omit [829] 
function obj_omit(obj,ks){
  let out = {};
  let lu = {};
  for(let k of ks){
    lu[k] = true;
  };
  for(let [k,v] of Object.entries(obj)){
    if(!(lu[k] != null)){
      out[k] = v;
    }
  };
  return out;
}

// xt.lang.base-lib/obj-transpose [842] 
function obj_transpose(obj){
  let out = {};
  for(let [k,v] of Object.entries(obj)){
    out[v] = k;
  };
  return out;
}

// xt.lang.base-lib/obj-nest [851] 
function obj_nest(arr,v){
  let idx = arr.length;
  let out = v;
  while(true){
    if(idx == 0){
      return out;
    }
    let nested = {};
    let k = arr[idx + -1];
    nested[k] = out;
    out = nested;
    idx = (idx - 1);
  }
}

// xt.lang.base-lib/obj-map [866] 
function obj_map(obj,f){
  let out = {};
  for(let [k,v] of Object.entries(obj)){
    out[k] = f(v);
  };
  return out;
}

// xt.lang.base-lib/obj-filter [875] 
function obj_filter(obj,pred){
  let out = {};
  for(let [k,v] of Object.entries(obj)){
    if(pred(v)){
      out[k] = v;
    }
  };
  return out;
}

// xt.lang.base-lib/obj-keep [885] 
function obj_keep(obj,f){
  let out = {};
  for(let [k,e] of Object.entries(obj)){
    let v = f(e);
    if(null != v){
      out[k] = v;
    }
  };
  return out;
}

// xt.lang.base-lib/obj-keepf [896] 
function obj_keepf(obj,pred,f){
  let out = {};
  for(let [k,e] of Object.entries(obj)){
    if(pred(e)){
      out[k] = f(e);
    }
  };
  return out;
}

// xt.lang.base-lib/obj-intersection [906] 
function obj_intersection(obj,other){
  let out = [];
  for(let k of Object.keys(other)){
    if(obj[k] != null){
      out.push(k);
    }
  };
  return out;
}

// xt.lang.base-lib/obj-difference [916] 
function obj_difference(obj,other){
  let out = [];
  for(let k of Object.keys(other)){
    if(!(obj[k] != null)){
      out.push(k);
    }
  };
  return out;
}

// xt.lang.base-lib/to-flat [930] 
function to_flat(obj){
  let out = [];
  if((null != obj) && ("object" == (typeof obj)) && !Array.isArray(obj)){
    for(let [k,v] of Object.entries(obj)){
      out.push(k);
      out.push(v);
    };
  }
  else if(Array.isArray(obj)){
    for(let e of obj){
      out.push(e[0]);
      out.push(e[1]);
    };
  }
  return out;
}

// xt.lang.base-lib/from-flat [946] 
function from_flat(arr,f,init){
  let out = init;
  let k = null;
  for(let i = 0; i < arr.length; ++i){
    let e = arr[i];
    if(0 == (i % 2)){
      k = e;
    }
    else{
      out = f(out,k,e);
    }
  };
  return out;
}

// xt.lang.base-lib/get-in [958] 
function get_in(obj,arr){
  if(null == obj){
    return null;
  }
  else if(0 == arr.length){
    return obj;
  }
  else if(1 == arr.length){
    return obj[arr[0]];
  }
  else{
    let total = arr.length;
    let i = 0;
    let curr = obj;
    while(i < total){
      let k = arr[i];
      curr = curr[k];
      if(null == curr){
        return null;
      }
      else{
        i = (i + 1);
      }
    }
    return curr;
  }
}

// xt.lang.base-lib/set-in [983] 
function set_in(obj,arr,v){
  if(0 == (arr || []).length){
    return obj;
  }
  else if(!((null != obj) && ("object" == (typeof obj)) && !Array.isArray(obj))){
    return obj_nest(arr,v);
  }
  else{
    let k = arr[0];
    let narr = Array.from(arr);
    narr.shift();
    let child = obj[k];
    if(0 == narr.length){
      obj[k] = v;
    }
    else{
      obj[k] = set_in(child,narr,v);
    }
    return obj;
  }
}

// xt.lang.base-lib/memoize-key [1003] 
function memoize_key(f){
  let cache = {};
  let cache_fn = function (key){
    let res = f(key);
    cache[key] = res;
    return res;
  };
  return function (key){
    return cache[key] || cache_fn(key);
  };
}

// xt.lang.base-lib/eq-nested-loop [1020] 
function eq_nested_loop(src,dst,eq_obj,eq_arr,cache){
  if(((null != src) && ("object" == (typeof src)) && !Array.isArray(src)) && ((null != dst) && ("object" == (typeof dst)) && !Array.isArray(dst))){
    if(cache && cache.get(src) && cache.get(dst)){
      return true;
    }
    else{
      return eq_obj(src,dst,eq_obj,eq_arr,cache || new WeakMap());
    }
  }
  else if(Array.isArray(src) && Array.isArray(dst)){
    if(cache && cache.get(src) && cache.get(dst)){
      return true;
    }
    else{
      return eq_arr(src,dst,eq_obj,eq_arr,cache || new WeakMap());
    }
  }
  else{
    return src == dst;
  }
}

// xt.lang.base-lib/eq-nested-obj [1041] 
function eq_nested_obj(src,dst,eq_obj,eq_arr,cache){
  cache.set(src,src);
  cache.set(dst,dst);
  let ks_src = obj_keys(src);
  let ks_dst = obj_keys(dst);
  if(ks_src.length != ks_dst.length){
    return false;
  }
  for(let k of ks_src){
    if(!eq_nested_loop(src[k],dst[k],eq_obj,eq_arr,cache)){
      return false;
    }
  };
  return true;
}

// xt.lang.base-lib/eq-nested-arr [1060] 
function eq_nested_arr(src_arr,dst_arr,eq_obj,eq_arr,cache){
  cache.set(src_arr,src_arr);
  cache.set(dst_arr,dst_arr);
  if(src_arr.length != dst_arr.length){
    return false;
  }
  for(let i = 0; i < src_arr.length; ++i){
    let v = src_arr[i];
    if(!eq_nested_loop(v,dst_arr[i],eq_obj,eq_arr,cache)){
      return false;
    }
  };
  return true;
}

// xt.lang.base-lib/eq-nested [1077] 
function eq_nested(obj,m){
  return eq_nested_loop(obj,m,eq_nested_obj,eq_nested_arr,null);
}

// xt.lang.base-lib/obj-diff [1087] 
function obj_diff(obj,m){
  if(null == m){
    return {};
  }
  if(null == obj){
    return m;
  }
  let out = {};
  for(let [k,v] of Object.entries(m)){
    if(!eq_nested(obj[k],m[k])){
      out[k] = v;
    }
  };
  return out;
}

// xt.lang.base-lib/obj-diff-nested [1100] 
function obj_diff_nested(obj,m){
  if(null == m){
    return {};
  }
  if(null == obj){
    return m;
  }
  let out = {};
  let ks = obj_keys(m);
  for(let k of ks){
    let v = obj[k];
    let mv = m[k];
    if(((null != v) && ("object" == (typeof v)) && !Array.isArray(v)) && ((null != mv) && ("object" == (typeof mv)) && !Array.isArray(mv))){
      let dv = obj_diff_nested(v,mv);
      if(obj_not_emptyp(dv)){
        out[k] = dv;
      }
    }
    else if(!eq_nested(v,mv)){
      out[k] = mv;
    }
  };
  return out;
}

// xt.lang.base-lib/sort [1119] 
function sort(arr){
  return arr_sort(arr,function (x){
    return x;
  },function (a,b){
    return a < b;
  });
}

// xt.lang.base-lib/sort-edges-build [1125] 
function sort_edges_build(nodes,edge){
  let n_from = edge[0];
  let n_to = edge[1];
  if(!(nodes[n_from] != null)){
    nodes[n_from] = {"id":n_from,"links":[]};
  }
  if(!(nodes[n_to] != null)){
    nodes[n_to] = {"id":n_to,"links":[]};
  }
  let links = nodes[n_from]["links"];
  links.push(n_to);
}

// xt.lang.base-lib/sort-edges-visit [1140] 
function sort_edges_visit(nodes,visited,sorted,id,ancestors){
  if(visited[id]){
    return;
  }
  let node = nodes[id];
  if(!node){
    throw "Not available: " + id;
  }
  ancestors = (ancestors || []);
  ancestors.push(id);
  visited[id] = true;
  let input = node["links"];
  for(let aid of input){
    sort_edges_visit(nodes,visited,sorted,aid,Array.from(ancestors));
  };
  sorted.unshift(id);
}

// xt.lang.base-lib/sort-edges [1157] 
function sort_edges(edges){
  let nodes = {};
  let sorted = [];
  let visited = {};
  for(let e of edges){
    sort_edges_build(nodes,e);
  };
  for(let id of Object.keys(nodes)){
    sort_edges_visit(nodes,visited,sorted,id,null);
  };
  return sorted;
}

// xt.lang.base-lib/sort-topo [1170] 
function sort_topo(input){
  let edges = [];
  for(let link of input){
    let root = link[0];
    let deps = link[1];
    for(let d of deps){
      edges.push([root,d]);
    };
  };
  return sort_edges(edges).slice().reverse();
}

// xt.lang.base-lib/clone-nested-loop [1183] 
function clone_nested_loop(obj,cache){
  if(null == obj){
    return obj;
  }
  let cached_output = cache.get(obj);
  if(cached_output){
    return cached_output;
  }
  else if((null != obj) && ("object" == (typeof obj)) && !Array.isArray(obj)){
    let out = {};
    cache.set(obj,out);
    for(let [k,v] of Object.entries(obj)){
      out[k] = clone_nested_loop(v,cache);
    };
    return out;
  }
  else if(Array.isArray(obj)){
    let out = [];
    cache.set(obj,out);
    for(let e of obj){
      out.push(clone_nested_loop(e,cache));
    };
    return out;
  }
  else{
    return obj;
  }
}

// xt.lang.base-lib/clone-nested [1210] 
function clone_nested(obj){
  if(!(((null != obj) && ("object" == (typeof obj)) && !Array.isArray(obj)) || Array.isArray(obj))){
    return obj;
  }
  else{
    return clone_nested_loop(obj,new WeakMap());
  }
}

// xt.lang.base-lib/get-spec-loop [1221] 
function get_spec_loop(obj,path,cache){
  let cached_path = cache.get(obj);
  let inner_fn = function (k){
    Array.from(path).push(k);
    let npath = Array.from(path);
    return get_spec_loop(obj[k],npath,cache);
  };
  if(cached_path){
    return ["<ref>",cached_path];
  }
  else if(null == obj){
    return obj;
  }
  else if((null != obj) && ("object" == (typeof obj)) && !Array.isArray(obj)){
    cache.set(obj,path);
    return arr_juxt(obj_keys(obj),function (x){
      return x;
    },inner_fn);
  }
  else{
    return type(obj);
  }
}

// xt.lang.base-lib/get-spec [1248] 
function get_spec(obj){
  if(!(((null != obj) && ("object" == (typeof obj)) && !Array.isArray(obj)) || Array.isArray(obj))){
    return obj;
  }
  else{
    return get_spec_loop(obj,[],new WeakMap());
  }
}

// xt.lang.base-lib/wrap-callback [1257] 
function wrap_callback(callbacks,key){
  callbacks = (callbacks || {});
  let result_fn = function (result){
    let f = callbacks[key];
    if(null != f){
      return f(result);
    }
    else{
      return result;
    }
  };
  return result_fn;
}

// xt.lang.base-lib/walk [1270] 
function walk(obj,pre_fn,post_fn){
  obj = pre_fn(obj);
  if(null == obj){
    return post_fn(obj);
  }
  else if((null != obj) && ("object" == (typeof obj)) && !Array.isArray(obj)){
    let out = {};
    for(let [k,v] of Object.entries(obj)){
      out[k] = walk(v,pre_fn,post_fn);
    };
    return post_fn(out);
  }
  else if(Array.isArray(obj)){
    let out = [];
    for(let e of obj){
      out.push(walk(e,pre_fn,post_fn));
    };
    return post_fn(out);
  }
  else{
    return post_fn(obj);
  }
}

// xt.lang.base-lib/split-long [1298] 
function split_long(s,lineLen){
  if(is_emptyp(s)){
    return "";
  }
  lineLen = (lineLen || 50);
  let total = (s).length;
  let lines = Math.ceil(total / lineLen);
  let out = [];
  for(let i = 0; i < lines; i = (i + 1)){
    let line = s.substring(i * lineLen,(i + 1) * lineLen);
    if(0 < line.length){
      out.push(line);
    }
  };
  return out;
}

// xt.lang.base-lib/with-delay [1320] 
function with_delay(thunk,ms){
  setTimeout(function (){
    new Promise(function (resolve,reject){
      resolve(thunk());
    });
  },ms);
}

// xt.lang.base-lib/trace-log [1330] 
function trace_log(){
  if(!(null == globalThis["TRACE"])){
    return globalThis["TRACE"];
  }
  else{
    globalThis["TRACE"] = [];
    return globalThis["TRACE"];
  }
}

// xt.lang.base-lib/trace-log-clear [1339] 
function trace_log_clear(){
  globalThis["TRACE"] = [];
  return globalThis["TRACE"];
}

// xt.lang.base-lib/trace-log-add [1346] 
function trace_log_add(data,tag,opts){
  let log = trace_log();
  let m = obj_assign({"tag":tag,"data":data,"time":Date.now()},opts);
  log.push(m);
  return log.length;
}

// xt.lang.base-lib/trace-filter [1359] 
function trace_filter(tag){
  return arr_filter(trace_log(),function (e){
    return tag == e["tag"];
  });
}

// xt.lang.base-lib/trace-last-entry [1365] 
function trace_last_entry(tag){
  let log = trace_log();
  if(null == tag){
    return log[log.length + -1];
  }
  else{
    let tagged = trace_filter(tag);
    return tagged[tagged.length + -1];
  }
}

// xt.lang.base-lib/trace-data [1375] 
function trace_data(tag){
  return arr_map(trace_log(),function (e){
    return e["data"];
  });
}

// xt.lang.base-lib/trace-last [1381] 
function trace_last(tag){
  return (trace_last_entry(tag))["data"];
}

// xt.lang.base-lib/trace-run [1397] 
function trace_run(f){
  trace_log_clear();
  f();
  return trace_log();
}

var MODULE = {
  "type_native":type_native,
  "type":type,
  "key_fn":key_fn,
  "inc_fn":inc_fn,
  "step_nil":step_nil,
  "step_thrush":step_thrush,
  "step_call":step_call,
  "step_push":step_push,
  "step_set_key":step_set_key,
  "step_set_fn":step_set_fn,
  "step_set_pair":step_set_pair,
  "step_del_key":step_del_key,
  "starts_withp":starts_withp,
  "ends_withp":ends_withp,
  "capitalize":capitalize,
  "decapitalize":decapitalize,
  "pad_left":pad_left,
  "pad_right":pad_right,
  "pad_lines":pad_lines,
  "mod_pos":mod_pos,
  "mod_offset":mod_offset,
  "gcd":gcd,
  "lcm":lcm,
  "mix":mix,
  "sign":sign,
  "round":round,
  "sym_full":sym_full,
  "sym_name":sym_name,
  "sym_ns":sym_ns,
  "sym_pair":sym_pair,
  "not_emptyp":not_emptyp,
  "is_emptyp":is_emptyp,
  "arr_lookup":arr_lookup,
  "arr_every":arr_every,
  "arr_some":arr_some,
  "arr_each":arr_each,
  "arr_reverse":arr_reverse,
  "arr_zip":arr_zip,
  "arr_map":arr_map,
  "arr_clone":arr_clone,
  "arr_append":arr_append,
  "arr_slice":arr_slice,
  "arr_rslice":arr_rslice,
  "arr_tail":arr_tail,
  "arr_mapcat":arr_mapcat,
  "arr_partition":arr_partition,
  "arr_filter":arr_filter,
  "arr_keep":arr_keep,
  "arr_keepf":arr_keepf,
  "arr_juxt":arr_juxt,
  "arr_foldl":arr_foldl,
  "arr_foldr":arr_foldr,
  "arr_pipel":arr_pipel,
  "arr_piper":arr_piper,
  "arr_group_by":arr_group_by,
  "arr_range":arr_range,
  "arr_intersection":arr_intersection,
  "arr_difference":arr_difference,
  "arr_union":arr_union,
  "arr_sort":arr_sort,
  "arr_shuffle":arr_shuffle,
  "arr_pushl":arr_pushl,
  "arr_pushr":arr_pushr,
  "arr_join":arr_join,
  "arr_repeat":arr_repeat,
  "arr_random":arr_random,
  "obj_emptyp":obj_emptyp,
  "obj_not_emptyp":obj_not_emptyp,
  "obj_first_key":obj_first_key,
  "obj_first_val":obj_first_val,
  "obj_keys":obj_keys,
  "obj_vals":obj_vals,
  "obj_pairs":obj_pairs,
  "obj_clone":obj_clone,
  "obj_assign":obj_assign,
  "obj_assign_nested":obj_assign_nested,
  "obj_assign_with":obj_assign_with,
  "obj_from_pairs":obj_from_pairs,
  "obj_del":obj_del,
  "obj_del_all":obj_del_all,
  "obj_pick":obj_pick,
  "obj_omit":obj_omit,
  "obj_transpose":obj_transpose,
  "obj_nest":obj_nest,
  "obj_map":obj_map,
  "obj_filter":obj_filter,
  "obj_keep":obj_keep,
  "obj_keepf":obj_keepf,
  "obj_intersection":obj_intersection,
  "obj_difference":obj_difference,
  "to_flat":to_flat,
  "from_flat":from_flat,
  "get_in":get_in,
  "set_in":set_in,
  "memoize_key":memoize_key,
  "eq_nested_loop":eq_nested_loop,
  "eq_nested_obj":eq_nested_obj,
  "eq_nested_arr":eq_nested_arr,
  "eq_nested":eq_nested,
  "obj_diff":obj_diff,
  "obj_diff_nested":obj_diff_nested,
  "sort":sort,
  "sort_edges_build":sort_edges_build,
  "sort_edges_visit":sort_edges_visit,
  "sort_edges":sort_edges,
  "sort_topo":sort_topo,
  "clone_nested_loop":clone_nested_loop,
  "clone_nested":clone_nested,
  "get_spec_loop":get_spec_loop,
  "get_spec":get_spec,
  "wrap_callback":wrap_callback,
  "walk":walk,
  "split_long":split_long,
  "with_delay":with_delay,
  "trace_log":trace_log,
  "trace_log_clear":trace_log_clear,
  "trace_log_add":trace_log_add,
  "trace_filter":trace_filter,
  "trace_last_entry":trace_last_entry,
  "trace_data":trace_data,
  "trace_last":trace_last,
  "trace_run":trace_run
};

export default MODULE