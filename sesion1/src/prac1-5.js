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

const geometry = new THREE.BufferGeometry();

const inner = 50;
const outer = 100;

const vertices = new Float32Array([
    // Base square vertices
    -50, -50, 0,  // 0: bottom-left
     50, -50, 0,  // 1: bottom-right
     50,  50, 0,  // 2: top-right
    -50,  50, 0,  // 3: top-left

    // Roof vertices
    -50,  50, 0,  // 4: same as 3
     50,  50, 0,  // 5: same as 2
     0,  100, 0   // 6: peak of the roof
]);
// Faces (indices of vertices)
const indices = [
    // Base square (two triangles)
    0, 1, 2,
    2, 3, 0,

    // Roof (one triangle)
    4, 5, 6
];

geometry.setIndex( indices );
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 )
);

const material = new THREE.MeshBasicMaterial( );
const house = new THREE.Mesh( geometry, material );
scene.add( house );

renderer.render( scene, camera );