<template>
  <div id="container" class="container"></div>
</template>
<script setup>
import { onMounted, render } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as d3geo from "d3-geo";
import MapData from "@/utils/mapData.json";
import jiaxing from "@/utils/jiaxing.json";
var controls,
  scene,
  camera,
  renderer,
  map,
  ambientLight,
  pointLight,
  stats,
  datGui,
  gui,
  sphere;
// 初始化
const init = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(50, 0, 50);
  camera.lookAt(0, 0, 0);

  map = new THREE.Object3D();
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.getElementById("container").appendChild(renderer.domElement);
  controls = new OrbitControls(camera, renderer.domElement);

  // 光源
  const ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  // 平面
  const planeGeometry = new THREE.PlaneGeometry(150, 150);
  const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = Math.PI / 2;
  plane.receiveShadow = true;
  scene.add(plane);
};

const initMap = () => {
  let newMapData = JSON.parse(MapData);
  const projection = d3geo
    .geoMercator()
    .center([120.75, 30.75])
    .scale(10000)
    .translate([0, 0]);
  newMapData.features.forEach((item) => {
    const province = new THREE.Object3D();
    const coordinates = item.geometry.coordinates;
    coordinates.forEach((polygon) => {
      // console.log(polygon);
      const shape = new THREE.Shape();
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
      });
      const lineGeometry = new THREE.Geometry();
      for (let i = 0; i < polygon[0].length; i++) {
        const [x, y] = projection(polygon[0][i]);
        if (i === 0) {
          shape.moveTo(x, -y);
        }
        shape.lineTo(x, -y);
        lineGeometry.vertices.push(new THREE.Vector3(x, -y, 1.01));
      }
      const extrudeSettings = {
        depth: 1,
        bevelEnabled: false,
      };
      // const faceMaterial = new THREE.MeshBasicMaterial({
      //   map: texture,
      //   opacity: .4,
      //   side: THREE.DoubleSide,
      // })
      // console.log(shape);
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      assignUVs(geometry);
      const material = new THREE.MeshBasicMaterial({
        color: "#d13a34",
        transparent: true,
        opacity: 0.6,
      });
      const mesh = new THREE.Mesh(geometry, [material, material, material]);
      const line = new THREE.Line(lineGeometry, lineMaterial);
      province.add(mesh);
      province.add(line);
    });
    province.properties = item.properties;
    if (item.properties.centroid) {
      const [x, y] = projection(item.properties.centroid);
      province.properties._centroid = [x, -y];
    }
    province.rotation.x = -Math.PI / 2;
    province.position.set(-15, 0, -15);
    map.add(province);
  });
  scene.add(map);
  console.log(scene);
};

function assignUVs(geometry) {
  geometry.computeBoundingBox();
  var max = geometry.boundingBox.max,
    min = geometry.boundingBox.min;
  var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
  var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
  var faces = geometry.faces;
  geometry.faceVertexUvs[0] = [];
  for (var i = 0; i < faces.length; i++) {
    var v1 = geometry.vertices[faces[i].a],
      v2 = geometry.vertices[faces[i].b],
      v3 = geometry.vertices[faces[i].c];
    geometry.faceVertexUvs[0].push([
      new THREE.Vector2(
        (v1.x + offset.x) / range.x,
        (v1.y + offset.y) / range.y
      ),
      new THREE.Vector2(
        (v2.x + offset.x) / range.x,
        (v2.y + offset.y) / range.y
      ),
      new THREE.Vector2(
        (v3.x + offset.x) / range.x,
        (v3.y + offset.y) / range.y
      ),
    ]);
  }
  geometry.uvsNeedUpdate = true;
}

const animate = () => {
  // renderer.autoClear = false;
  // renderer.clear();
  // renderer.clearDepth();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

onMounted(() => {
  init();
  initMap();
  animate();
});
// console.log(jiaxing);
// console.log(JSON.parse(MapData));
</script>
<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
}
</style>