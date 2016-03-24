var scene, camera, controls, renderer, light;
var alpha = 0.000;
var mousePos = {};
var boxLoc = [];
var boxCount = 0;
var REGION_SCALE = 50;
var slow = false;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );

  try{
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1);
  }
  catch(e){
    console.log('dang');
    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor(0x000000, 1);
  }

  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement ); //apply renderer to body

  light = new THREE.DirectionalLight( 0xFFFFFF );
  light.position.set( 1, 1, 1 );
  scene.add( light );

  light = new THREE.AmbientLight( 0x424242 );
  scene.add( light );
  camera.position.z =  0;

  $('body').mousemove(function(e){
    move(e.pageX, e.pageY);
  });

  //document.addEventListener( 'mousemove', move, false );
  window.addEventListener( 'resize', onWindowResize, false );
  render();
}

var myloader = new THREE.OBJLoader(); //defaultloadingmanager
myloader.load(
  // model resource
  'eames/mpm_F06.obj',
  function ( object ){
    object.scale.set(.3,.3,.3);

     scene.add( object );
  }
);

function move( x, y ) { //update to use Orbital
  //change to move the camera based on mouse
  if(mousePos.x){
    camera.rotation.y += (x - mousePos.x) / 100;
    camera.rotation.x += (y - mousePos.y) / 100;
  }
  mousePos.x = x;
  mousePos.y = y;
}

function render() {
  requestAnimationFrame( render );
  renderer.render( scene, camera );
  if($('#info-panel').hasClass('hide') && alpha > .0001){
    camera.rotation.x += alpha;
    camera.rotation.y += alpha;
  }
}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2,
	windowHalfY = window.innerHeight / 2,
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}
