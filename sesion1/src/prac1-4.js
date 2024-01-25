import * as THREE from 'three';

import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';

if ( WEBGL.isWebGLAvailable() ) {
    // WebGL is available
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

const cylindergeometry = new THREE.CylinderGeometry( 100, 100, 100 );
const cylindermaterial = new THREE.MeshBasicMaterial( );
const cylinder = new THREE.Mesh( cylindergeometry, cylindermaterial );
cylinder.position.set(200, 0, 0);

const spheregeometry = new THREE.SphereGeometry( 100, 100, 100 );
const spherematerial = new THREE.MeshBasicMaterial( );
const sphere = new THREE.Mesh( spheregeometry, spherematerial );
sphere.position.set(0,200,0);


box.rotation.set( Math.PI / 5, Math.PI / 5, 0 );

scene.add( box );
scene.add( cylinder);
scene.add(sphere);

renderer.render( scene, camera );