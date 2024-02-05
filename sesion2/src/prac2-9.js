import * as THREE from 'three';

import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';

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

const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 18000 );
camera.position.set( 0, 0, 800 );

const earthgeometry = new THREE.SphereGeometry( 200, 200, 200 );
const moongeometry = new THREE.SphereGeometry( 54, 54, 54 );
const sungeometry = new THREE.SphereGeometry( 1000, 1000, 1000 );
const textureLoader = new THREE.TextureLoader( );  // The object used to load textures

const earthmapUrl = "../textures/earth.jpg";   // The file used as texture
const earthmap = textureLoader.load( earthmapUrl, ( loaded ) => { renderer.render( scene, camera ); });
const earthmaterial = new THREE.MeshPhongMaterial( { map: earthmap } );
const earth = new THREE.Mesh( earthgeometry, earthmaterial );
earth.position.set(0, 0, 0);

const atmospheremapUrl = "../textures/atmosphere.png";   // The file used as texture
const atmospheremap = textureLoader.load( atmospheremapUrl, ( loaded ) => { renderer.render( scene, camera ); });
const atmospherematerial = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, map: atmospheremap, transparent: true } );
const atmosphere = new THREE.Mesh( earthgeometry, atmospherematerial );
atmosphere.position.set(0, 0, 0);

const moonmapUrl = "../textures/moon.jpg";   // The file used as texture
const moonmap = textureLoader.load( moonmapUrl, ( loaded ) => { renderer.render( scene, camera ); });
const moonmaterial = new THREE.MeshLambertMaterial( { map: moonmap, color: 0x888888 } );
const moon = new THREE.Mesh( moongeometry, moonmaterial );
const distance = 10000000;
moon.position.set( Math.sqrt( distance / 2 ), 0, -Math.sqrt( distance / 2 ) );
moon.rotation.y = Math.PI;

const earthGroup = new THREE.Object3D();
earthGroup.add(earth);
earthGroup.add(atmosphere);
earthGroup.rotation.z = 0.36;

const moonGroup = new THREE.Object3D( );
moonGroup.add( moon );
moonGroup.rotation.x = 0.089;
moonGroup.add(earthGroup);

const modelUrl = "../models/models/iss.dae";
let iss;

const loadingManager = new THREE.LoadingManager( ( ) => {

    scene.add( iss );
    console.log( 'Model loaded' );
} );

const loader = new ColladaLoader( loadingManager );
loader.load( modelUrl, ( collada ) => {

    iss = collada.scene;
    iss.scale.x = iss.scale.y = iss.scale.z = 0.3;
    iss.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
    iss.position.set( 400, 0, 0 );
    iss.updateMatrix( );
} );
//iss.position.set( 400, 0, 0 );
moonGroup.add(iss);

const NOISEMAP = '../textures/cloud.png';
const SUNMAP = '../textures/lavatile.jpg';
const uniforms = {
    "fogDensity": { value: 0 },
    "fogColor": { value: new THREE.Vector3( 0, 0, 0 ) },
    "time": { value: 1.0 },
    "uvScale": { value: new THREE.Vector2( 3.0, 1.0 ) },
    "texture1": { value: textureLoader.load( NOISEMAP ) },
    "texture2": { value: textureLoader.load( SUNMAP ) }
};
const vertexShader = require( '../shaders/vertex.glsl' );
const fragmentShader = require( '../shaders/fragment.glsl' );
const sunMaterial = new THREE.ShaderMaterial( {
    uniforms,
    vertexShader,
    fragmentShader
} );

uniforms[ "texture1" ].value.wrapS = uniforms[ "texture1" ].value.wrapT = THREE.RepeatWrapping;
uniforms[ "texture2" ].value.wrapS = uniforms[ "texture2" ].value.wrapT = THREE.RepeatWrapping;

//const sunmapUrl = "../textures/earth.jpg";   // The file used as texture
//const earthmap = textureLoader.load( earthmapUrl, ( loaded ) => { renderer.render( scene, camera ); });
const sun = new THREE.Mesh( sungeometry, sunMaterial );
sun.position.set(800, 0, -5000);

const pointLight = new THREE.PointLight(0xffffff, 15, 100000, 0);
//pointLight.position.set(8000, 0, -15000);
pointLight.position.set(1000, 0, 0);

scene.add(pointLight);
scene.add(sun);
scene.add(moonGroup);

const clock = new THREE.Clock( );
function animate( ) {

    const delta = clock.getDelta( ); // Elapsed time in seconds

    // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME
    const earthRotation = ( delta * Math.PI * 2 ) / 24;
    earth.rotation.y += earthRotation;
    atmosphere.rotation.y += earthRotation * 0.95;

    const moonRotation = (delta * Math.PI * 2) / (24*28);
    moon.rotation.y += moonRotation; 
    moonGroup.rotation.y += moonRotation;

    if ( iss ) {
        iss.rotation.y += 0.01;
    }

    uniforms[ "time" ].value += 0.2 * delta;

    // Render the scene
    renderer.render( scene, camera );

    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );
};
animate(); 

//renderer.render( scene, camera );