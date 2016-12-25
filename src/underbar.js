(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var x=array.length;
    var y=x-n;
    return n === undefined ? array[x-1] :( n>x ? array : array.slice(y,x));
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if(Array.isArray(collection)){
     for(var i=0;i<collection.length;i++){
      iterator(collection[i],i,collection);
    } }
    else{ for(var k in collection){
      iterator(collection[k],k,collection);
    } 
  }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var arr=[];
     _.each(collection,function(val,i){
           if(test(val,i)){
            arr.push(val)
          }     
    })
     return arr;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection,function(val,i){
      return !test(val,i);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var arr=[];
    _.each(array,function(val,i){
      if(_.indexOf(arr,val)===-1){
        arr.push(val);
      }
    })
    return arr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var arr=[];
    _.each(collection,function(val,i){
      arr.push(iterator(val,i));
    })
    return arr;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    var acc=accumulator;
    if(acc===undefined){
      acc=collection[0];
      collection=collection.slice(1);
    }
    _.each(collection,function(val,i){
      acc=iterator(acc,val,i);
    })
    return acc;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
  if(collection.length!==0 && iterator!==undefined){
     var x=_.filter(collection,function(val,i){
     return iterator(val,i);
     })
     if(x.length===collection.length){return true;}
     return false;
}
else if(iterator===undefined){
  return _.reduce(collection,function(acc,x,i){
    return acc&&x;
  },true)
}
return true;
// if(collection.length===0 ){return true;}
//  return _.reduce(collection,function(acc,x,i){
//   if(iterator===undefined){
//   acc=true;
//   return acc&&x;
// }
//  return acc&&itreator(acc,x);
//   },false)
 

  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    iterator = iterator || _.identity;
 
     return !_.every(collection, function(item) {
       return !iterator(item);
    });
       };



  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    return _.reduce(arguments,function(acc,arg,k){
      for(var k in arg){
        acc[k]=arg[k];
      }
     return  acc;
    },obj)
  
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
   return _.reduce(arguments,function(acc,arg,k){
      for(var k in arg){
        if(!acc.hasOwnProperty(k)){
        acc[k]=arg[k];
      }
      }
     return  acc;
    },obj)
  
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */
  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // tht the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var obj={};
   var arg=Array.prototype.slice.call(arguments,1);
   //var f=JSON.stringify(arguments);
     return function(){
      var f=JSON.stringify(arguments);
      if (obj[f]===undefined){
          obj[f]=func.apply(this,arguments);
          }
           return obj[f];
        }  
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var arg=Array.prototype.slice.call(arguments);
    if(arg.length>2){return setTimeout(func.apply(this,arg.slice(2)),wait)}
      return setTimeout(func,wait)
    
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var result=[];
    var l=array.length;
    var rand=[];
    for(var i=0;i<l;i++){
        var r =Math.floor(Math.random()*l)
        if(_.indexOf(rand,r)){
          rand[i]=r;
        }
        else{--i;}
    }
    _.each(array,function(ele,i){
      result[rand[i]]=ele;
    })
    return result;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var res=[];
    
   _.each(collection, function (ele, key) {
      if(typeof functionOrKey==="function"){
      res.push(functionOrKey.apply(ele,args));
    }
   else{//var func=JSON.parse(functionOrKey);
   // console.log(eval(functionOrKey));
    res.push(ele[functionOrKey].apply(ele,args))
    }
   })
   // talk about that...
   //http://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string
   return res;
  };
  

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var arr=[];
    if(typeof iterator==="function"){
      arr=_.filter(collection,function(val,k){
        return iterator(val,k);
      })
    }else{
      arr=_.pluck(collection, iterator);
      //arr.sort(function(a,b){return a.length-b.length;})
    }
     
    if(arr.length!==collection.length){
      var x=collection.length-arr.length;
      for(var i=0;i<x;i++){
        arr.push(undefined);
      } 
    }
    if(typeof arr[0]==="string"){
      return arr.sort(function(a,b){return a.length-b.length;})
    }
      return arr.sort();
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var arr=[];
    var arr1=Array.from(arguments).sort(function(a,b){return b.length-a.length});
    var arr0=arr1[0];
    arr1=arr1.slice(1);
    _.each(arr0,function(ele,j){
      var ar=[ele];
      for(var i=0;i<arr1.length;i++){
             ar.push(arr1[i][j]); 
           }
           arr.push(ar);
      })
    return arr;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var arr=[];
    function nested(x){
      if(x===undefined || x.length==0){
        return "";
      }
      else if(typeof x[0]==="number"){
        arr.push(x[0]);
        x=x.slice(1);
      }
      return nested(x[0]) ;
    }
    //nested(nestedArray)
    _.each(nestedArray,function(val,i){
      if(Array.isArray(val)){
        nested(val); 
      }
      else{
        arr.push(val);
      }
    })
    return arr;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var result=[],f=false;
    var arr=Array.from(arguments);
    _.each(arr,function(arg,i){
        _.each(arg,function(val,j){
           for(var x = 0; x <arr.length; x++) {
            if(x!==i){
              if(_.indexOf(arr[x],val)>-1){
                f=true;
              }
              else{f=false;
               break;}
            }
          }
          if(f && _.indexOf(result,val)===-1){
          result.push(val);
          }
        })
    })
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var arr=Array.from(arguments).slice(1);
    var f;
    return _.reduce(array,function(acc,val,i){
            f=true;
      _.each(arr,function(arg,j){
        if(_.indexOf(arg,val)!==-1){
          f=false;
         // break;
          }
      })
      if(f){
        acc.push(val);
      }
      return acc;
    },[])

  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
