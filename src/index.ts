import { AmbientLight, BoxGeometry, DirectionalLight, Mesh, MeshBasicMaterial, MeshPhongMaterial, PerspectiveCamera, RingGeometry, Scene, WebGLRenderer, XRFrame, XRHitTestSource, XRReferenceSpace } from "three";
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';



/**
 * https://github.com/mrdoob/three.js/blob/master/examples/webxr_ar_hittest.html
 * 
 * 
 * WebXR Concepts
 *  - session
 *  - referenceSpace
 *  - controller
 */




const canvasContainer = document.getElementById('canvasContainer') as HTMLDivElement;
const gameCanvas = document.getElementById('gameCanvas') as HTMLCanvasElement;

const renderer = new WebGLRenderer({
    canvas: gameCanvas,
    antialias: true,
    alpha: true
});
renderer.xr.enabled = true;
canvasContainer.appendChild(ARButton.createButton(renderer, {
    optionalFeatures: [ 'dom-overlay', 'dom-overlay-for-handheld-ar' ],
	domOverlay: { root: document.body }
}));

const scene = new Scene();

const camera = new PerspectiveCamera();
camera.position.z = 5;
camera.position.y = 3;
camera.lookAt(0, 0, 0);

const cube = new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshPhongMaterial({
        color: 'red'
    })
);
scene.add(cube);


const light = new DirectionalLight();
light.translateX(2);
light.translateY(2);
scene.add(light);


function doRender(timeStamp:  number, frame: XRFrame | undefined) {
    if (frame) {
        cube.rotateX(0.01);
        cube.rotateY(0.01);
        renderer.render(scene, camera);
    }
}
renderer.setAnimationLoop(doRender);



const controller = renderer.xr.getController(0);
controller.addEventListener( 'select', (args) => {
    console.log(args);
});
scene.add(controller);

// const reticle = new Mesh(
//     new RingGeometry( 0.15, 0.2, 32 ).rotateX( - Math.PI / 2 ),
//     new MeshBasicMaterial()
// );
// reticle.matrixAutoUpdate = false;
// reticle.visible = false;
// scene.add(reticle);


// const referenceSpace = renderer.xr.getReferenceSpace();

// function getHitTestSource(): Promise<XRHitTestSource | void> {
//     const session = renderer.xr.getSession();
//     return session.requestReferenceSpace('viewer').then((referenceSpace: XRReferenceSpace) => {
//         session.requestHitTestSource({space: referenceSpace}).then((source: XRHitTestSource) => {
//            return source; 
//         });
//     });
// }


// const r = getHitTestSource().then(v => {
//     if (v) {
//         const hitTestResults = frame
//     }
// })