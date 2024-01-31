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
camera.position.set( 0, 0, 800 );

const boxgeometry = new THREE.BoxGeometry( 100, 100, 100 );
const boxmaterial = new THREE.MeshBasicMaterial( );
const box = new THREE.Mesh( boxgeometry, boxmaterial );
box.position.set(-200, 0, 0);
box.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
box.material.color.setHex( 0xff0000 );

const cylindergeometry = new THREE.CylinderGeometry( 75, 75, 75 );
const cylindermaterial = new THREE.MeshLambertMaterial( );
const cylinder = new THREE.Mesh( cylindergeometry, cylindermaterial );
cylinder.position.set(0, -100, 0);
cylinder.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
cylinder.material.color.setHex( 0x0000ff );


const spheregeometry = new THREE.SphereGeometry( 100, 100, 100 );
const spherematerial = new THREE.MeshPhongMaterial( );
const sphere = new THREE.Mesh( spheregeometry, spherematerial );
sphere.position.set(200, 0, 0);
sphere.material.color.setHex( 0x00ff00 );

const housegeometry = new THREE.BufferGeometry();
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
housegeometry.setIndex( indices );
housegeometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 )
);
const housematerial = new THREE.MeshBasicMaterial( );
const house = new THREE.Mesh( housegeometry, housematerial );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
directionalLight.position.set( 0, 400, 400 );
scene.add( directionalLight );
scene.add( box );
scene.add( cylinder);
scene.add(sphere);
scene.add( house );

renderer.render( scene, camera );