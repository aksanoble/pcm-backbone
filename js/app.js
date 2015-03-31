var data = {

          topics: [
            {topic: "data structures", levelZero: "Doesn't know the difference between Array and LinkedList", levelOne: "Able to explain and use Arrays, LinkedLists, Dictionaries etc in practical programming tasks", levelTwo: "Knows space and time tradeoffs of the basic data structures, Arrays vs LinkedLists, Able to explain how hashtables can be implemented and can handle collisions, Priority queues and ways to implement them etc", levelThree: "Knowledge of advanced data structures like B-trees, binomial and fibonacci heaps, AVL/Red Black trees, Splay Trees, Skip Lists, tries etc."},
            {topic: "algorithms", levelZero: "Unable to find the average of numbers in an array.", levelOne: "Basic sorting, searching and data structure traversal and retrieval algorithms", levelTwo: "Tree, Graph, simple greedy and divide and conquer algorithms, is able to understand the relevance of the levels of this matrix.", levelThree: "Able to recognize and code dynamic programming solutions, good knowledge of graph algorithms, good knowledge of numerical computation algorithms, able to identify NP problems etc."},
            {topic: "systems programming", levelZero: "Doesn't know what a compiler, linker or interpreter is.", levelOne: "Basic understanding of compilers, linker and interpreters. Understands what assembly code is and how things work at the hardware level. Some knowledge of virtual memory and paging.", levelTwo: "Understands kernel mode vs. user mode, multi-threading, synchronization primitives and how they're implemented, able to read assembly code. Understands how networks work, understanding of network protocols and socket level programming.", levelThree: "Understands the entire programming stack, hardware (CPU + Memory + Cache + Interrupts + microcode), binary code, assembly, static and dynamic linking, compilation, interpretation, JIT compilation, garbage collection, heap, stack, memory addressing..."}
          ]
        };

var source = $("#template").html();
var template = Handlebars.compile($("#template").html());
var html = template(data);
$(html).insertAfter($("thead"));

var table = $("#pcm-table").tableToJSON;

var matrix = JSON.parse(localStorage.getItem('matrixKey')) || [];
      if (matrix.length === 0) {
          localStorage.setItem('matrixKey', JSON.stringify(matrix));
      }
//Click on cells retrieved from local storage
$(function() {
   $.map(matrix, function(n){
  ($("td")[n]).click();
  });
});

//Click Event Handler
$("td").click(function(e){                                    //add click event to td elements
  $(e.target).nextAll().removeClass("checked");               //remove checked for subsequent cells
  $(e.target).prevAll().addBack().addClass("checked");        //checked class upto and including target
  cellIndex = $("td").index(e.target);                        //get cell index
  matrix[Math.floor(cellIndex/5)] = cellIndex;                //array indexed mapped to row index for unique mapping
  localStorage.setItem('matrixKey', JSON.stringify(matrix));  //update local storage
});
