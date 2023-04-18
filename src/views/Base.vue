<template>
  <div id="container" class="container"></div>
</template>
<script setup>
import { onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

var controls, scene, camera, renderer, ambientLight, pointLight;
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
  // 创建渲染器
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("container").appendChild(renderer.domElement);

  // 创建环境光
  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  // 创建点光源
  pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.castShadow = true;
  pointLight.position.set(100, 100, 100);
  scene.add(pointLight);

  // 创建几何体
  const geometry = new THREE.BoxGeometry();
  // 创建材质
  const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
  // 创建网格
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 5;
  // 创建控制器
  controls = new OrbitControls(camera, renderer.domElement);
};
// 渲染
const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
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