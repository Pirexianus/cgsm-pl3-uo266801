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

const earthmapUrl = "../textures/earth.jpg";   // The file used as texture
const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const earthmap = textureLoader.load( earthmapUrl, ( loaded ) => { renderer.render( scene, camera ); });
const earthmaterial = new THREE.MeshPhongMaterial( { map: earthmap } );
const earth = new THREE.Mesh( spheregeometry, earthmaterial );
earth.position.set(0, 0, 0);

const atmospheremapUrl = "../textures/atmosphere.png";   // The file used as texture
const atmospheremap = textureLoader.load( atmospheremapUrl, ( loaded ) => { renderer.render( scene, camera ); });
const atmospherematerial = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, map: atmospheremap, transparent: true } );
const atmosphere = new THREE.Mesh( spheregeometry, atmospherematerial );
atmosphere.position.set(0, 0, 0);

const planet = new THREE.Object3D();
planet.add(earth);
planet.add(atmosphere);
planet.rotation.z = 0.36;


const pointLight = new THREE.PointLight(0xffffff, 15, 10000, 0);
pointLight.position.set(1200, 0, 0);

scene.add(pointLight);
scene.add(planet)

renderer.render( scene, camera );