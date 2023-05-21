<template>
  <div id="container" class="container"></div>
</template>
<script setup>
import { onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

var controls, scene, camera, renderer, ambientLight, pointLight, stats;
// 初始化
const init = () => {
  // 创建场景
  scene = new THREE.Scene();
  // 创建相机
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(50, 0, 50);
  // 创建渲染器
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.getElementById("container").appendChild(renderer.domElement);
  // 创建平面
  const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(0, -2, 0);
  plane.receiveShadow = true;
  scene.add(plane);
  // 创建环境光
  ambientLight = new THREE.AmbientLight(0xeeeeee, 0.5);
  scene.add(ambientLight);
  // 创建点光源
  pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.castShadow = true;
  pointLight.position.set(20, 20, 20);
  scene.add(pointLight);
  const sphereSize = 1;
  const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
  scene.add(pointLightHelper);

  // 创建几何体
  const geometry = new THREE.BoxGeometry(3, 3, 3);

  // 创建材质
  const material = new THREE.MeshLambertMaterial({ color: 0xccffdd });
  // 创建网格
  const cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  scene.add(cube);
  camera.position.z = 5;

  // 球体
  const sphereGeometry = new THREE.SphereGeometry(3, 50, 50);
  const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x7777ff });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(20, 4, 2);
  sphere.castShadow = true;
  scene.add(sphere);

  // 创建控制器
  controls = new OrbitControls(camera, renderer.domElement);
  // 创建性能监控器
  stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position = "absolute";
  stats.domElement.style.left = "0px";
  stats.domElement.style.top = "0px";
  document.body.appendChild(stats.domElement);
};
// 渲染
const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  stats.update();
};
onMounted(() => {
  init();
  animate();
});
</script>
<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
}
</style>