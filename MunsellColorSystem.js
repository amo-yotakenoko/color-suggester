//https://ics.media/entry/14771/
// window.addEventListener('DOMContentLoaded', init);
var canvas;

  // レンダラーを作成
  canvas = document.querySelector('#munsellColorSystemCanvas');
  const renderer = new THREE.WebGLRenderer({ canvas });
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  renderer.setSize(width, height);
  // シーンを作成
const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 0, 100);

  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.2;

  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(300, 300, 300),
    new THREE.MeshNormalMaterial());
// scene.add(mesh);



  tick();

// 毎フレーム時に実行されるループイベントです
function tick() {
  // レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
var colorObjects=[]
function addColorMesh(colorcode, H, V, C) {
  // console.log([colorcode, H, S, C])
   let rad = (H / 40.0)  *2 * Math.PI;
    let x=Math.sin(rad) * C;
 let y=Math.cos(rad) * C;
  let z = V * 5-20;
   material= new THREE.MeshBasicMaterial({ color: colorcode })
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  material);
  sphere.position.set(y, z, x);
  scene.add(sphere)
  colorObjects.push([sphere,colorcode,[H,V,C]])
} 