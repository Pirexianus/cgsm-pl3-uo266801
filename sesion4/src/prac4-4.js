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
const rayCaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let intersectedObject = null;
document.body.addEventListener( 'mousemove', ( event ) => 
{
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}, false );
document.body.addEventListener( 'keydown', ( event ) => 
{

    // Space key code
    const spaceKeyCode = 32;

    // Space pressed and intersected object
    if ( event.keyCode === spaceKeyCode && intersectedObject ) 
    {
        if (intersectedObject.name === "box1")
        {
            if ( sound1.isPlaying === true )
            {
                console.log("Pausing sound1");
                sound1.pause();
                box1.material[ 0 ] = specialFaceMaterial;
                box1.material.needsUpdate = true;
            }
            else
            {
                console.log("Playing sound1");
                sound1.play();
                box1.material[ 0 ] = primeFaceMaterial;
                box1.material.needsUpdate = true;
            }
        }
        else if (intersectedObject.name === "box2")
        {
            if ( sound2.isPlaying === true )
            {
                console.log("Pausing sound2");
                sound2.pause();
                box2.material[ 0 ] = specialFaceMaterial;
                box2.material.needsUpdate = true;
            }
            else
            {
                console.log("Playing sound2");
                sound2.play();
                box2.material[ 0 ] = primeFaceMaterial;
                box2.material.needsUpdate = true;
            }
        }
    }
}, false );

// Camera
const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 10, 300 );
const movements = [
    new THREE.Vector3(0, 0, 1),   // Forward
    new THREE.Vector3(1, 0, 1),   // Forward-left
    new THREE.Vector3(1, 0, 0),   // Left
    new THREE.Vector3(1, 0, -1),  // Backward-left
    new THREE.Vector3(0, 0, -1),  // Backward
    new THREE.Vector3(-1, 0, -1), // Backward-right
    new THREE.Vector3(-1, 0, 0),  // Right
    new THREE.Vector3(-1, 0, 1)   // Forward-right
];
let collisions;
const distance = 20; // Maximum distance of a collision

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
const regularmapUrl = "../textures/brick.jpg";  
const primemapUrl = "../textures/special-brick-prime.png";
const specialmap = textureLoader.load( specialmapUrl, ( loaded ) => { renderer.render( scene, camera ); } );
const regularmap = textureLoader.load( regularmapUrl, ( loaded ) => { renderer.render( scene, camera ); } );
const primemap = textureLoader.load( primemapUrl, ( loaded ) => { renderer.render( scene, camera ); } );
const specialFaceMaterial = new THREE.MeshPhongMaterial( { 
    map: specialmap,
    bumpMap: textureLoader.load( "../textures/special-brick-map.png" ) } ); // Material for a face
const regularFaceMaterial = new THREE.MeshPhongMaterial( {
     map: regularmap,
     bumpMap: textureLoader.load( "../textures/brick-map.jpg") } );  // Material for the rest of the faces
const primeFaceMaterial = new THREE.MeshPhongMaterial( {
    map: primemap,
    bumpMap: textureLoader.load( "../textures/brick-map.jpg") } );  // Material for the TRIGGERED face
    const materials1 = [// A box has 6 faces
    specialFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
];
const materials2 = [// A box has 6 faces
    specialFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
];

// Boxes
const geometry = new THREE.BoxGeometry( 25, 25, 25 );
const box1 = new THREE.Mesh(geometry, materials1);
box1.name = "box1";
box1.position.set(-100, 12.5, 0);
const box2 = new THREE.Mesh(geometry, materials2);
box2.name = "box2";
box2.position.set(100, 12.5, 0);
box2.rotation.y = Math.PI;

// Sounds
const audioLoader = new THREE.AudioLoader();
const sound1 = new THREE.PositionalAudio( listener );
audioLoader.load( "../videos/AUGH.wav", ( buffer ) => {
    sound1.setBuffer( buffer );
    sound1.setRefDistance( 20 );
    sound1.setLoop( true );
    sound1.setRolloffFactor( 1 );
    //sound.play(); // Modern browsers do not allow sound to start without user interaction
});
box1.add( sound1 );
const sound2 = new THREE.PositionalAudio( listener );
audioLoader.load( "../videos/Architects - Discourse Is Dead.mp3", ( buffer ) => {
    sound2.setBuffer( buffer );
    sound2.setRefDistance( 20 );
    sound2.setLoop( true );
    sound2.setRolloffFactor( 1 );
    //sound.play(); // Modern browsers do not allow sound to start without user interaction
});
box2.add( sound2 );



// Lights
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
directionalLight.position.set( 0, 0.5, 100 );
const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xf0f0f0, 0.6 );
hemiLight.position.set( 0, 500, 0 );
const ambientLight = new THREE.AmbientLight( 0x404040, 100 );


scene.add(helper);
scene.add(box1);
scene.add(box2);
scene.add(directionalLight);
scene.add( hemiLight )
//scene.add( ambientLight );

const clock = new THREE.Clock( );
/*
function animate( ) 
{
    const delta = clock.getDelta( ); // Elapsed time in seconds

    // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME
    controls.update( delta );
    rayCaster.setFromCamera( mouse, camera );

    // Look for all the intersected objects
    const intersects = rayCaster.intersectObjects( scene.children );
    if ( intersects.length > 0 ) 
    {
        // Sorted by Z (close to the camera)
        if ( intersectedObject != intersects[ 0 ].object ) 
        {
            intersectedObject = intersects[ 0 ].object;
            console.log( 'New intersected object: ' + intersectedObject.name );
        }
    } 
    else 
    {
        intersectedObject = null;
    }

    // Collision detection
    rayCaster.set( camera.position, direction );
    collisions = rayCaster.intersectObjects( scene.children );
    if ( collisions.length > 0 && collisions[0].distance <= distance ) {

        controls.update( -delta );
    }
    
    // Render the scene
    renderer.render( scene, camera );

    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );
};
*/
function animate() {
    const delta = clock.getDelta(); // Elapsed time in seconds

    // Actualización de los controles
    controls.update(delta);

    // Preparar para detectar colisiones
    let collisionDetected = false;

    // Iterar sobre todas las direcciones posibles de movimiento
    movements.forEach((direction) => {
        // Asegurar que la dirección esté normalizada
        direction.normalize();

        // Calcular la dirección del mundo basada en la orientación actual de la cámara
        const worldDirection = direction.clone().applyQuaternion(camera.quaternion);

        // Configurar el Raycaster para esta dirección
        rayCaster.set(camera.position, worldDirection);

        // Realizar la detección de colisiones
        const collisions = rayCaster.intersectObjects(scene.children, true); // El segundo parámetro 'true' para revisar todos los descendientes

        // Verificar si hay alguna colisión dentro de la distancia específica
        if (collisions.length > 0 && collisions[0].distance <= distance) {
            collisionDetected = true;
            console.log(`Colisión detectada hacia ${direction.toString()} a distancia ${collisions[0].distance}`);
        }
    });

    // Manejar las colisiones deteniendo o ajustando el movimiento
    if (collisionDetected) {
        // Aquí podrías ajustar el movimiento del usuario o detener la actualización de los controles
        // Por ejemplo, invertir un poco el movimiento para evitar que el usuario atraviese el objeto
        // Esto es un placeholder, debes implementar tu lógica basada en cómo manejas los controles/movimiento
        controls.update(-delta);
    }

    // Renderizar la escena
    renderer.render(scene, camera);

    // Solicitar el próximo ciclo de animación
    requestAnimationFrame(animate);
}

animate();


animate(); 

//renderer.render( scene, camera );