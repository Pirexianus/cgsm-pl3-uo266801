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

const spheregeometry = new THREE.SphereGeometry( 200, 200, 200 );
const mapUrl = "../textures/earth.jpg";   // The file used as texture
const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const map = textureLoader.load( mapUrl, ( loaded ) => { renderer.render( scene, camera ); });
const spherematerial = new THREE.MeshPhongMaterial( { map: map } );
const sphere = new THREE.Mesh( spheregeometry, spherematerial );
sphere.position.set(0, 0, 0);

const pointLight = new THREE.PointLight(0xffffff, 11, 1000, 0);
pointLight.position.set(800, 0, 0);
scene.add(pointLight);

scene.add(sphere);

renderer.render( scene, camera );