import adapter from 'webrtc-adapter';

//Definición de variables
const video = document.querySelector( 'video' );
const constraints = {
    audio: false,
    video: true
};

//Solicita la captura de los flujos multimedia
navigator.mediaDevices.getUserMedia( constraints )
    // Called when we get the requested streams
    .then( ( stream ) => {

        // Video tracks (usually only one)
        const videoTracks = stream.getVideoTracks( );
        console.log( 'Stream characteristics: ', constraints );
        console.log( 'Using device: ' + videoTracks[0].label );

        // End of stream handler
        stream.onended = () => {

            console.log( 'End of stream' );
        };

        // Bind the stream to the html video element
        video.srcObject = stream;
})
    // Called in case of error
    .catch( ( error ) => {

        if ( error.name === 'ConstraintNotSatisfiedError' ) {

            console.error( 'The resolution ' + constraints.video.width.exact + 'x' +
                          constraints.video.width.exact + ' px is not supported by the camera.' );
        } else if ( error.name === 'PermissionDeniedError' ) {

            console.error( 'The user has not allowed the access to the camera and the microphone.' );
        }
        console.error( ' Error in getUserMedia: ' + error.name, error );
});