  'use strict';

  // Global variables that are set and used
  // across the application
  let pressed;
  let gl;
  // GLSL programs
  let program;
  // VAOs for the objects
  var sphere1 = null;
  var sphere2 = null;
  var square = null;
  var square2 = null;
  var square3 = null;
  var square4 = null;
  var cone1 = null;
  var sphere3 = null;
  var sphere4 = null;
  // textures
  let worldTexture;
  let metalTexture;

  // rotation
 
//
// create shapes and VAOs for objects.
// Note that you will need to bindVAO separately for each object / program based
// upon the vertex attributes found in each program
//
function createShapes() {
  sphere1 = new Sphere(20, 20);
  sphere1.VAO = bindVAO(sphere1, program);

  sphere2 = new Sphere(20, 20);
  sphere2.VAO = bindVAO(sphere2, program);

  square = new Cube(2);
  square.VAO = bindVAO(square, program);

  square2 = new Cube(2);
  square2.VAO = bindVAO(square2, program);

  square3 = new Cube(2);
  square3.VAO = bindVAO(square3, program);

  square4 = new Cube(2);
  square4.VAO = bindVAO(square4, program);

  cone1 = new Cone(20, 10);
  cone1.VAO = bindVAO(cone1, program);

  sphere3 = new Sphere(20, 20);
  sphere3.VAO = bindVAO(sphere3, program);

  sphere4 = new Sphere(20, 20);
  sphere4.VAO = bindVAO(sphere4, program);

}


//
// Here you set up your camera position, orientation, and projection
// Remember that your projection and view matrices are sent to the vertex shader
// as uniforms, using whatever name you supply in the shaders
//
function setUpCamera() {
    
  // gl.useProgram (program);
  // set up your projection
  // defualt is orthographic projection
  let projMatrix = glMatrix.mat4.create();
  // glMatrix.mat4.ortho(projMatrix, -5, 5, -5, 5, 1.0, 300.0);
  glMatrix.mat4.perspective(projMatrix, -5, 1, 1.0, 300.0);
  gl.uniformMatrix4fv (program.uProjT, false, projMatrix);

  
  // set up your view
  // defaut is at (0,0,-5) looking at the origin
  let viewMatrix = glMatrix.mat4.create();
  glMatrix.mat4.lookAt(viewMatrix, [0, 3, -7], [0, 0, 0], [0, 1, 0]);
  // glMatrix.mat4.lookAt(viewMatrix, [0, 0, -5], [0, 0, 0], [0, 1, 0]);
  gl.uniformMatrix4fv (program.uViewT, false, viewMatrix);
}


//
// load up the textures you will use in the shader(s)
// The setup for the globe texture is done for you
// Any additional images that you include will need to
// set up as well.
//
function setUpTextures(){
    
    // flip Y for WebGL
    gl.pixelStorei (gl.UNPACK_FLIP_Y_WEBGL, true);
    
    // get some texture space from the gpu
    worldTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, worldTexture);
    
    // load the actual image
    var worldImage = document.getElementById ('world-texture')
    worldImage.crossOrigin = "";

    worldImage.onload = () =>{
        
      // bind the texture so we can perform operations on it
      gl.bindTexture (gl.TEXTURE_2D, worldTexture);
          
      // load the texture data
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, worldImage.width, worldImage.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, worldImage);
          
      // set texturing parameters
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }

    metalTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, metalTexture);
    
    // load the actual image
    var metalImage = document.getElementById ('metal')
    metalImage.crossOrigin = "";

    metalImage.onload = () =>{
        
      // bind the texture so we can perform operations on it
      gl.bindTexture (gl.TEXTURE_2D, metalTexture);
          
      // load the texture data
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, metalImage.width, metalImage.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, metalImage);
          
      // set texturing parameters
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }


    
    // bind the texture so we can perform operations on it
        
    // load the texture data
        
    // set texturing parameters
}

//
//  This function draws all of the shapes required for your scene
//
    function drawShapes() {
      var texture = worldTexture;
      var texture2 = metalTexture;
      gl.useProgram(program);
  
      let modelMatrix2 = glMatrix.mat4.create();

      gl.activeTexture (gl.TEXTURE0);
      gl.bindTexture (gl.TEXTURE_2D, texture);
      gl.uniform1i (program.uTheTexture, 0);
      glMatrix.mat4.translate(modelMatrix2, modelMatrix2, [0, -5 ,0,]);
      glMatrix.mat4.scale(modelMatrix2, modelMatrix2, [20, 1, 5,])
      gl.uniformMatrix4fv (program.uModelT, false, modelMatrix2);
      gl.uniform1f(program.urValue, 1.0);
      gl.uniform1f(program.ugValue, 0.843);
      gl.uniform1f(program.ubValue, 0.0);
      gl.uniform1i(program.udecision, 2);
      gl.bindVertexArray(square.VAO);
      gl.drawElements(gl.TRIANGLES, square.indices.length, gl.UNSIGNED_SHORT, 0);

      let modelMatrix = glMatrix.mat4.create();
      glMatrix.mat4.translate(modelMatrix, modelMatrix, [-3, -3 ,-1,]);
      glMatrix.mat4.scale(modelMatrix, modelMatrix,[1, 1,1,]);
      gl.uniformMatrix4fv (program.uModelT, false, modelMatrix);
      gl.uniform1i(program.udecision, 3);

      gl.uniform3f(program.ambientLight, 0.8, 0.8, 0.5);
      gl.uniform3f(program.lightPosition, -0.35, 0.25, -1.75);
      gl.uniform3f(program.lightColor, 0.8, 0.8, 0.5);
          
      gl.uniform3f(program.baseColor, 1, 0.03, 0.03);
      gl.uniform3f(program.specHighlightColor, 0.8, 0.8, 0.5);
  
      gl.uniform1f(program.ka, 0.5);
      gl.uniform1f(program.kd, 0.8);
      gl.uniform1f(program.ks, 0.8);
      gl.uniform1f(program.ke, 20.0);

      gl.bindVertexArray(sphere1.VAO);
      gl.drawElements(gl.TRIANGLES, sphere1.indices.length, gl.UNSIGNED_SHORT, 0);

      let modelMatrix3 = glMatrix.mat4.create();

      gl.activeTexture (gl.TEXTURE);
      gl.bindTexture (gl.TEXTURE_2D, texture2);
      gl.uniform1i (program.uTheTexture, 0);

      glMatrix.mat4.translate(modelMatrix3, modelMatrix3, [2, -3 ,-0.75,]);
      glMatrix.mat4.scale(modelMatrix3, modelMatrix3,[1.5, 0.5, 1.5,]);
      gl.uniformMatrix4fv (program.uModelT, false, modelMatrix3);
      gl.uniform1i(program.udecision, 2);
      gl.uniform1f(program.urValue, 1.0);
      gl.uniform1f(program.ugValue, 1.0);
      gl.uniform1f(program.ubValue, 1.0);

      gl.bindVertexArray(square2.VAO);
      gl.drawElements(gl.TRIANGLES, square2.indices.length, gl.UNSIGNED_SHORT, 0);

      let modelMatrix4 = glMatrix.mat4.create();
      gl.activeTexture (gl.TEXTURE0);
      gl.bindTexture (gl.TEXTURE_2D, texture2);
      gl.uniform1i (program.uTheTexture, 0);

      glMatrix.mat4.translate(modelMatrix4, modelMatrix4, [2, -1 ,-1,]);
      glMatrix.mat4.scale(modelMatrix4, modelMatrix4,[0.25, 3, 0.25,]);
      gl.uniformMatrix4fv (program.uModelT, false, modelMatrix4);
      gl.uniform1i(program.udecision, 2);
      gl.uniform1f(program.urValue, 1.0);
      gl.uniform1f(program.ugValue, 1.0);
      gl.uniform1f(program.ubValue, 1.0);

      gl.bindVertexArray(square3.VAO);
      gl.drawElements(gl.TRIANGLES, square3.indices.length, gl.UNSIGNED_SHORT, 0);


      let modelMatrix5 = glMatrix.mat4.create();

      gl.activeTexture (gl.TEXTURE0);
      gl.bindTexture (gl.TEXTURE_2D, texture2);
      gl.uniform1i (program.uTheTexture, 0);
      glMatrix.mat4.rotateZ(modelMatrix5,  modelMatrix5, radians(-20.0));
      glMatrix.mat4.translate(modelMatrix5, modelMatrix5, [1, 1 ,-1,]);
      glMatrix.mat4.scale(modelMatrix5, modelMatrix5,[1.5, 0.25, 0.25,]);
      gl.uniformMatrix4fv (program.uModelT, false, modelMatrix5);
      gl.uniform1i(program.udecision, 2);
      gl.uniform1f(program.urValue, 1.0);
      gl.uniform1f(program.ugValue, 1.0);
      gl.uniform1f(program.ubValue, 1.0);
      

      gl.bindVertexArray(square4.VAO);
      gl.drawElements(gl.TRIANGLES, square4.indices.length, gl.UNSIGNED_SHORT, 0);



      let modelMatrix6 = glMatrix.mat4.create();

      gl.activeTexture (gl.TEXTURE0);
      gl.bindTexture (gl.TEXTURE_2D, texture2);
      gl.uniform1i (program.uTheTexture, 0);
      glMatrix.mat4.rotateZ(modelMatrix6,  modelMatrix6, radians(-35.0));
      glMatrix.mat4.translate(modelMatrix6, modelMatrix6, [-0.1, 0.9 , -1.15,]);
      glMatrix.mat4.scale(modelMatrix6, modelMatrix6,[2, 0.8, 1,]);
      gl.uniformMatrix4fv (program.uModelT, false, modelMatrix6);
      gl.uniform1i(program.udecision, 2);
      gl.uniform1f(program.urValue, 1.0);
      gl.uniform1f(program.ugValue, 1.0);
      gl.uniform1f(program.ubValue, 1.0);
      

      gl.bindVertexArray(cone1.VAO);
      gl.drawElements(gl.TRIANGLES, cone1.indices.length, gl.UNSIGNED_SHORT, 0);

      let modelMatrix7 = glMatrix.mat4.create();
      glMatrix.mat4.rotateZ(modelMatrix7,  modelMatrix7, radians(-35.0));
      glMatrix.mat4.translate(modelMatrix7, modelMatrix7, [-0.15, 0.5 , -1.5,]);
      glMatrix.mat4.scale(modelMatrix7, modelMatrix7,[1.0, 0.5, 1.0,]);
      gl.uniformMatrix4fv (program.uModelT, false, modelMatrix7);
      gl.uniform1i(program.udecision, 3);

      gl.uniform3f(program.ambientLight, 0.8, 0.8, 0.5);
      gl.uniform3f(program.lightPosition, -0.35, 0.25, -1.75);
      gl.uniform3f(program.lightColor, 0.8, 0.8, 0.5);
          
      gl.uniform3f(program.baseColor, 0.8, 0.8, 0.5);
      gl.uniform3f(program.specHighlightColor, 0.8, 0.8, 0.8);
  
      gl.uniform1f(program.ka, 1.0);
      gl.uniform1f(program.kd, 1.0);
      gl.uniform1f(program.ks, 1.0);
      gl.uniform1f(program.ke, 20.0);

      

      gl.bindVertexArray(sphere3.VAO);
      gl.drawElements(gl.TRIANGLES, sphere3.indices.length, gl.UNSIGNED_SHORT, 0);

      let modelMatrix8 = glMatrix.mat4.create();
      glMatrix.mat4.translate(modelMatrix8, modelMatrix8, [-1, -3 ,-1,]);
      glMatrix.mat4.scale(modelMatrix8, modelMatrix8,[1.5, 1.5,1.5,]);
      gl.uniformMatrix4fv (program.uModelT, false, modelMatrix8);
      gl.uniform1i(program.udecision, 3);

      gl.uniform3f(program.ambientLight, 0.8, 0.8, 0.5);
      gl.uniform3f(program.lightPosition, -0.35, 0.25, -1.75);
      gl.uniform3f(program.lightColor, 0.8, 0.8, 0.5);
          
      gl.uniform3f(program.baseColor, 0.5, 0.8, 0.8);
      gl.uniform3f(program.specHighlightColor, 0.8, 0.8, 0.5);
  
      gl.uniform1f(program.ka, 1.0);
      gl.uniform1f(program.kd, 1.0);
      gl.uniform1f(program.ks, 1.0);
      gl.uniform1f(program.ke, 30.0);

      gl.bindVertexArray(sphere1.VAO);
      gl.drawElements(gl.TRIANGLES, sphere1.indices.length, gl.UNSIGNED_SHORT, 0);
    }


  //
  // Use this function to create all the programs that you need
  // You can make use of the auxillary function initProgram
  // which takes the name of a vertex shader and fragment shader
  //
  // Note that after successfully obtaining a program using the initProgram
  // function, you will beed to assign locations of attribute and unifirm variable
  // based on the in variables to the shaders.   This will vary from program
  // to program.
  //
  function initPrograms(vertexid, fragmentid) {
    const vertexShader = getShader(vertexid);
    const fragmentShader = getShader(fragmentid);

    // Create a program
    let program = gl.createProgram();
    
    // Attach the shaders to this program
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Could not initialize shaders');
    }

    // Use this program instance
    gl.useProgram(program);
    program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    program.aNormal = gl.getAttribLocation(program, 'aNormal');
    program.aUV = gl.getAttribLocation(program, "aUV");
  
    program.uModelT = gl.getUniformLocation (program, 'modelT');
    program.uViewT = gl.getUniformLocation (program, 'viewT');
    program.uProjT = gl.getUniformLocation (program, 'projT');
    program.urValue = gl.getUniformLocation(program, 'rValue');
    program.ugValue = gl.getUniformLocation(program, 'gValue');
    program.ubValue = gl.getUniformLocation(program, 'bValue');

    program.uTheTexture = gl.getUniformLocation (program, 'theTexture');

    program.udecision = gl.getUniformLocation(program, 'decision');

    // uniforms
    program.uModelT = gl.getUniformLocation (program, 'modelT');
    program.uViewT = gl.getUniformLocation (program, 'viewT');
    program.uProjT = gl.getUniformLocation (program, 'projT');
    program.ambientLight = gl.getUniformLocation (program, 'ambientLight');
    program.lightPosition = gl.getUniformLocation (program, 'lightPosition');
    program.lightColor = gl.getUniformLocation (program, 'lightColor');
    program.baseColor = gl.getUniformLocation (program, 'baseColor');
    program.specHighlightColor = gl.getUniformLocation (program, 'specHighlightColor');
    program.ka = gl.getUniformLocation (program, 'ka');
    program.kd = gl.getUniformLocation (program, 'kd');
    program.ks = gl.getUniformLocation (program, 'ks');
    program.ke = gl.getUniformLocation (program, 'ke');
    return program;
  }

  function setUpPhong() {
    

    // Recall that you must set the program to be current using
    // the gl useProgram function
    gl.useProgram (program);
    
    //
    // set values for all your uniform variables
    // including the model transform
    // but not your view and projection transforms as
    // they are set in setUpCamera()
    //


    gl.uniform3f(program.ambientLight, 0.5, 0, 0);
    gl.uniform3f(program.lightPosition, 20, 5, 10);
    gl.uniform3f(program.lightColor, 0.6, 0, 0);
        
    gl.uniform3f(program.baseColor, 1, 0.03, 0.03);
    gl.uniform3f(program.specHighlightColor, 1.0, 0.03, 0.03);

    gl.uniform1f(program.ka, 0.5);
    gl.uniform1f(program.kd, 0.8);
    gl.uniform1f(program.ks, 0.8);
    gl.uniform1f(program.ke, 20.0);

    // set up your model transform...Add transformations
    // if you are moiving, scaling, or rotating the object.
    // Default is no transformations at all (identity matrix).
    //
    // let modelMatrix = glMatrix.mat4.create();
    // glMatrix.mat4.scale(modelMatrix, modelMatrix, [1.5, 1.5, 1.5,]);
    // gl.uniformMatrix4fv (program.uModelT, false, modelMatrix);
  
}


  // creates a VAO and returns its ID
  function bindVAO (shape, program) {
      //create and bind VAO
      let theVAO = gl.createVertexArray();
      gl.bindVertexArray(theVAO);
      
      // create and bind vertex buffer
      let myVertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, myVertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.points), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(program.aVertexPosition);
      gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

            // create, bind, and fill buffer for normal values
      // normals can be obtained from the normals member of the
      // shape object.  3 floating point values (x,y,z) per vertex are
      // stored in this array.
      let myNormalBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, myNormalBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.normals), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(program.aNormal);
      gl.vertexAttribPointer(program.aNormal, 3, gl.FLOAT, false, 0, 0);
      
      // add code for any additional vertex attribute
      let uvBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.uv), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(program.aUV);
      gl.vertexAttribPointer(program.aUV, 2, gl.FLOAT, false, 0, 0);
      
      // Setting up the IBO
      let myIndexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, myIndexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(shape.indices), gl.STATIC_DRAW);

      // Clean
      gl.bindVertexArray(null);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      
      return theVAO;
  }


/////////////////////////////////////////////////////////////////////////////
//
//  You shouldn't have to edit anything below this line...but you can
//  if you find the need
//
/////////////////////////////////////////////////////////////////////////////

// Given an id, extract the content's of a shader script
// from the DOM and return the compiled shader
function getShader(id) {
  const script = document.getElementById(id);
  const shaderString = script.text.trim();

  // Assign shader depending on the type of shader
  let shader;
  if (script.type === 'x-shader/x-vertex') {
    shader = gl.createShader(gl.VERTEX_SHADER);
  }
  else if (script.type === 'x-shader/x-fragment') {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  }
  else {
    return null;
  }

  // Compile the shader using the supplied shader code
  gl.shaderSource(shader, shaderString);
  gl.compileShader(shader);

  // Ensure the shader is valid
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Compiling shader " + id + " " + gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}


  //
  // compiles, loads, links and returns a program (vertex/fragment shader pair)
  //
  // takes in the id of the vertex and fragment shaders (as given in the HTML file)
  // and returns a program object.
  //
  // will return null if something went wrong
  //
  function initProgram(vertex_id, fragment_id) {
    const vertexShader = getShader(vertex_id);
    const fragmentShader = getShader(fragment_id);

    // Create a program
    let program = gl.createProgram();
      
    // Attach the shaders to this program
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Could not initialize shaders');
      return null;
    }
      
    return program;
  }


  //
  // We call draw to render to our canvas
  //
  function draw() {
    // Clear the scene
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      
    // draw your shapes
    drawShapes();

    // Clean
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

  // Entry point to our application
  function init() {
      
    // Retrieve the canvas
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) {
      console.error(`There is no canvas with id ${'webgl-canvas'} on this page.`);
      return null;
    }

    // deal with keypress
    window.addEventListener('keydown', gotKey ,false);

    // Retrieve a WebGL context2
    gl = canvas.getContext('webgl2');
    if (!gl) {
        console.error(`There is no WebGL 2.0 context`);
        return null;
      }
      
    // deal with keypress
    window.addEventListener('keydown', gotKey ,false);
      
    // Set the clear color to be black
    gl.clearColor(0, 0, 0, 1);
      
    // some GL initialization
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    gl.clearColor(0.0,0.0,0.0,1.0)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)

    // Read, compile, and link your shaders
    program = initPrograms('wireframe-V', 'wireframe-F');
    
    // create and bind your current object
    createShapes();   
    // setUpPhong();

    setUpTextures();
    
    setUpCamera();

    // do a draw2
    if(pressed == 1){
      draw();
    }
  }
