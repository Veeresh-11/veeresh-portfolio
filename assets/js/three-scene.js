/* ===================================================================
   THREE.JS / 3D INTERACTIVE DIGITAL TWIN CANVAS
   Veeresh Babu V K - Interactive Digital Twin Node Simulation
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('three-canvas-container');
  if (!container) return;

  // Check if THREE is loaded
  if (typeof THREE !== 'undefined') {
    initThreeJS(container);
  } else {
    initCanvasFallback(container);
  }
});

function initThreeJS(container) {
  const width = container.clientWidth || 400;
  const height = container.clientHeight || 360;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0c0f14);

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 4.2;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Group for the 3D Digital Twin
  const group = new THREE.Group();
  scene.add(group);

  // 1. Outer Wireframe Geodesic Sphere (Digital Twin Surface)
  const geomOuter = new THREE.IcosahedronGeometry(1.6, 2);
  const matOuter = new THREE.MeshBasicMaterial({
    color: 0x1e293b,
    wireframe: true,
    transparent: true,
    opacity: 0.4
  });
  const meshOuter = new THREE.Mesh(geomOuter, matOuter);
  group.add(meshOuter);

  // 2. Inner Glowing Core
  const geomInner = new THREE.IcosahedronGeometry(1.0, 1);
  const matInner = new THREE.MeshBasicMaterial({
    color: 0xff4400,
    wireframe: true,
    transparent: true,
    opacity: 0.75
  });
  const meshInner = new THREE.Mesh(geomInner, matInner);
  group.add(meshInner);

  // 3. Floating Telemetry Particles
  const particleCount = 70;
  const particleGeom = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = 1.3 + Math.random() * 0.8;

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Cyan/Green and Orange accents
    if (i % 4 === 0) {
      colors[i * 3] = 1.0;
      colors[i * 3 + 1] = 0.27;
      colors[i * 3 + 2] = 0.0; // Orange
    } else {
      colors[i * 3] = 0.0;
      colors[i * 3 + 1] = 0.95;
      colors[i * 3 + 2] = 0.7; // Cyan-Green
    }
  }

  particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.06,
    vertexColors: true,
    transparent: true,
    opacity: 0.9
  });

  const particleSystem = new THREE.Points(particleGeom, particleMat);
  group.add(particleSystem);

  // Interactive mouse tracking
  let mouseX = 0;
  let mouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;
  let isDragging = false;
  let prevMousePos = { x: 0, y: 0 };

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
    mouseY = -(((e.clientY - rect.top) / height) * 2 - 1);
    targetRotationY = mouseX * 0.6;
    targetRotationX = -mouseY * 0.6;
  });

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMousePos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mouseup', () => { isDragging = false; });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - prevMousePos.x;
    const deltaY = e.clientY - prevMousePos.y;
    group.rotation.y += deltaX * 0.01;
    group.rotation.x += deltaY * 0.01;
    prevMousePos = { x: e.clientX, y: e.clientY };
  });

  // Resize handler
  window.addEventListener('resize', () => {
    const newW = container.clientWidth;
    const newH = container.clientHeight;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  });

  // Render loop
  function animate() {
    requestAnimationFrame(animate);

    if (!isDragging) {
      group.rotation.y += 0.005;
      meshInner.rotation.x -= 0.008;
      meshInner.rotation.z += 0.004;

      // Soft damping towards mouse
      group.rotation.x += (targetRotationX - group.rotation.x) * 0.04;
    }

    renderer.render(scene, camera);
  }

  animate();
}

// Fallback HTML5 Canvas if Three.js is not loaded
function initCanvasFallback(container) {
  const canvas = document.createElement('canvas');
  canvas.id = 'three-canvas';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = container.clientWidth * window.devicePixelRatio;
    canvas.height = container.clientHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  resize();
  window.addEventListener('resize', resize);

  const numNodes = 40;
  const nodes = [];
  const w = container.clientWidth;
  const h = container.clientHeight;

  for (let i = 0; i < numNodes; i++) {
    nodes.push({
      x: (Math.random() - 0.5) * 220,
      y: (Math.random() - 0.5) * 220,
      z: (Math.random() - 0.5) * 220,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      vz: (Math.random() - 0.5) * 0.3,
      color: i % 4 === 0 ? '#ff4400' : '#00ffaa'
    });
  }

  let angleY = 0;
  let angleX = 0;

  function render() {
    ctx.fillStyle = '#0c0f14';
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    angleY += 0.008;
    angleX += 0.004;

    const projected = nodes.map(n => {
      // Rotate around Y
      let x1 = n.x * Math.cos(angleY) - n.z * Math.sin(angleY);
      let z1 = n.z * Math.cos(angleY) + n.x * Math.sin(angleY);

      // Rotate around X
      let y2 = n.y * Math.cos(angleX) - z1 * Math.sin(angleX);
      let z2 = z1 * Math.cos(angleX) + n.y * Math.sin(angleX);

      const fov = 260;
      const scale = fov / (fov + z2 + 180);
      return {
        x: cx + x1 * scale,
        y: cy + y2 * scale,
        scale,
        color: n.color
      };
    });

    // Draw connecting lines
    ctx.lineWidth = 0.6;
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const dx = projected[i].x - projected[j].x;
        const dy = projected[i].y - projected[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 75) {
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.35 * (1 - dist / 75)})`;
          ctx.beginPath();
          ctx.moveTo(projected[i].x, projected[i].y);
          ctx.lineTo(projected[j].x, projected[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw dots
    projected.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(1.5, 3.5 * p.scale), 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}
