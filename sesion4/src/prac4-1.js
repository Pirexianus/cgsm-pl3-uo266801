import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

if ( WEBGL.isWebGLAvailable() ) 
{
    //alert("WebGL is working");
} 
else 
{
    alert("WebGL error: " + WEBGL.getWebGLErrorMessage());
}

// Common boilerpalte code
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
window.addEventListener( 'resize', ( ) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}, false );

// Camera
const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 10, 300 );

// Audio
const listener = new THREE.AudioListener();
camera.add( listener );

// Controls
const controls = new FirstPersonControls( camera, renderer.domElement );
controls.movementSpeed = 70;
controls.lookSpeed = 0.05;
controls.noFly = false;
controls.lookVertical = false;

// GRID
const helper = new THREE.GridHelper( 800, 40, 0x444444, 0x444444 );
helper.position.y = 0.1;

// Textures
const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const specialmapUrl = "../textures/special-brick.png";  
const regularmapUrl = "../textures/brick.png";  
const specialmap = textureLoader.load( specialmapUrl, ( loaded ) => { renderer.render( scene, camera ); } );
const regularmap = textureLoader.load( regularmapUrl, ( loaded ) => { renderer.render( scene, camera ); } );
const specialFaceMaterial = new THREE.MeshPhongMaterial( { 
    map: specialmap,
    bumpMap: textureLoader.load( "../textures/special-brick-map.png" ) } ); // Material for a face
const regularFaceMaterial = new THREE.MeshPhongMaterial( {
     map: regularmap,
     bumpMap: textureLoader.load( "../textures/brick-map.jpg") } );  // Material for the rest of the faces
const materials = [// A box has 6 faces
    specialFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
];

// Boxes
const geometry = new THREE.BoxGeometry( 25, 25, 25 );
const box1 = new THREE.Mesh(geometry, materials);
box1.position.set(-100, 12.5, 0);
const box2 = new THREE.Mesh(geometry, materials);
box2.position.set(100, 12.5, 0);
box2.rotation.y = Math.PI;

// Sounds
const audioLoader = new THREE.AudioLoader();
const sound1 = new THREE.PositionalAudio( listener );
audioLoader.load( "../videos/dog.ogg", ( buffer ) => {
    sound1.setBuffer( buffer );
    sound1.setRefDistance( 20 );
    sound1.setLoop( true );
    sound1.setRolloffFactor( 1 );
    //sound.play(); // Modern browsers do not allow sound to start without user interaction
});
box1.add( sound1 );
const sound2 = new THREE.PositionalAudio( listener );
audioLoader.load( "../videos/376737_Skullbeatz___Bad_Cat_Maste.ogg", ( buffer ) => {
    sound1.setBuffer( buffer );
    sound1.setRefDistance( 20 );
    sound1.setLoop( true );
    sound1.setRolloffFactor( 1 );
    //sound.play(); // Modern browsers do not allow sound to start without user interaction
});
box2.add( sound2 );



// Lights
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
directionalLight.position.set( 0, 0.5, 100 );
const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xf0f0f0, 0.6 );
hemiLight.position.set( 0, 500, 0 );

scene.add(helper);
scene.add(box1);
scene.add(box2);
scene.add(directionalLight);
scene.add( hemiLight )

const clock = new THREE.Clock( );
function animate( ) {

    const delta = clock.getDelta( ); // Elapsed time in seconds

    // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME
    controls.update( delta );
    
    // Render the scene
    renderer.render( scene, camera );

    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );
};
animate(); 

//renderer.render( scene, camera );