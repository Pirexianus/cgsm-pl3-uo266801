import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';

if ( WEBGL.isWebGLAvailable() ) 
{
    //alert("WebGL is working");
} 
else 
{
    alert("WebGL error: " + WEBGL.getWebGLErrorMessage());
}

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
const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 300 );

const helper = new THREE.GridHelper( 800, 40, 0x444444, 0x444444 );
helper.position.y = 0.1;

const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const material = new THREE.MeshBasicMaterial();
const specialFaceMaterial = textureLoader.load("textures/special-brick.png");
const regularFaceMaterial = textureLoader.load("textures/brick.png");
// A box has 6 faces
const materials = [
    specialFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
];
const geometry = new THREE.BoxGeometry( 25, 25, 25 );

// Creación del primer cubo
const box1 = new THREE.Mesh(geometry, materials);
box1.position.set(-100, 15, 0); // Posición alejada dentro del plano

// Creación y posición del segundo cubo
const box2 = new THREE.Mesh(geometry, material);
box2.position.set(100, 15, 0); // Posición alejada en el lado opuesto dentro del plano

// Ajuste de rotaciones para que las caras distintas se enfrenten
box2.rotation.y = Math.PI; // Gira el segundo cubo para enfrentar su cara especial hacia el otro cubo

// Añadir los cubos a la escena
scene.add(box1);
scene.add(box2);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
directionalLight.position.set( 0, 0.5, 100 );
const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xf0f0f0, 0.6 );
hemiLight.position.set( 0, 500, 0 );
scene.add( hemiLight )

scene.add(helper);
scene.add(directionalLight);
const clock = new THREE.Clock( );

function animate( ) {

    const delta = clock.getDelta( ); // Elapsed time in seconds

    // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME
    const Rotation = 0.01;
    
    // Render the scene
    renderer.render( scene, camera );

    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );
};
animate(); 

//renderer.render( scene, camera );