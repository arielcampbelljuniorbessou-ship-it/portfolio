"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import type { SkillItem } from "@/data/portfolio";
import { localizeSkill, type Locale, messages } from "@/data/localization";

type InteractiveSkillsGlobeProps = {
  skills: SkillItem[];
  selectedName: string;
  locale: Locale;
  onSelect: (name: string) => void;
};

function createEarthTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d");

  if (context) {
    context.fillStyle = "#0a2820";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const continents: Array<Array<[number, number]>> = [
      [[8, 18], [14, 12], [21, 13], [25, 17], [31, 18], [33, 24], [29, 29], [28, 35], [25, 38], [24, 44], [19, 49], [17, 43], [14, 39], [13, 33], [10, 30]],
      [[24, 47], [29, 44], [34, 47], [35, 52], [32, 58], [33, 64], [30, 72], [28, 80], [26, 89], [24, 80], [23, 71], [21, 64], [20, 56]],
      [[43, 21], [46, 17], [51, 17], [54, 20], [53, 25], [49, 27], [46, 25]],
      [[47, 29], [52, 28], [57, 31], [59, 37], [57, 44], [56, 51], [53, 59], [50, 56], [48, 48], [46, 42], [45, 35]],
      [[54, 20], [60, 15], [68, 13], [75, 15], [82, 14], [89, 18], [94, 23], [91, 28], [86, 31], [82, 29], [78, 34], [73, 33], [69, 37], [65, 33], [61, 32], [58, 28]],
      [[62, 36], [66, 37], [68, 42], [66, 46], [64, 43]],
      [[69, 37], [73, 36], [77, 40], [80, 43], [78, 46], [75, 43], [72, 41]],
      [[78, 54], [83, 52], [88, 55], [89, 60], [85, 64], [80, 62], [77, 58]],
      [[91, 43], [94, 42], [96, 46], [94, 49], [91, 48]]
    ];

    context.fillStyle = "#1c563f";
    context.strokeStyle = "rgba(117, 204, 145, 0.55)";
    context.lineWidth = 2;
    for (const continent of continents) {
      context.beginPath();
      continent.forEach(([x, y], index) => {
        const px = (x / 100) * canvas.width;
        const py = (y / 100) * canvas.height;
        if (index === 0) context.moveTo(px, py);
        else context.lineTo(px, py);
      });
      context.closePath();
      context.fill();
      context.stroke();
    }

    context.strokeStyle = "rgba(115, 205, 165, 0.13)";
    context.lineWidth = 1;
    for (let longitude = 0; longitude < 360; longitude += 30) {
      const x = (longitude / 360) * canvas.width;
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, canvas.height);
      context.stroke();
    }
    for (let latitude = 1; latitude < 6; latitude += 1) {
      const y = (latitude / 6) * canvas.height;
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(canvas.width, y);
      context.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createSkillLabel(name: string, fontFamily: string) {
  const canvas = document.createElement("canvas");
  const width = Math.max(176, Math.min(300, name.length * 15 + 48));
  canvas.width = width;
  canvas.height = 72;
  const context = canvas.getContext("2d");

  if (context) {
    context.fillStyle = "rgba(3, 15, 11, 0.92)";
    context.strokeStyle = "rgba(103, 255, 154, 0.72)";
    context.lineWidth = 3;
    context.beginPath();
    context.roundRect(2, 2, width - 4, 68, 20);
    context.fill();
    context.stroke();
    context.fillStyle = "#e9fff0";
    context.font = `600 34px ${fontFamily}, Georgia, serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(name, width / 2, 37, width - 28);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return { texture, aspect: width / canvas.height };
}

function pointOnSphere(index: number, count: number) {
  const y = count === 1 ? 0 : 1 - (index / (count - 1)) * 2;
  const radius = Math.sqrt(1 - y * y);
  const angle = Math.PI * (3 - Math.sqrt(5)) * index;
  return new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
}

function addGlobeGrid(group: THREE.Group, radius: number) {
  const material = new THREE.LineBasicMaterial({
    color: 0x7be4bd,
    transparent: true,
    opacity: 0.25,
    depthWrite: false
  });

  for (let latitude = -60; latitude <= 60; latitude += 20) {
    const points: THREE.Vector3[] = [];
    const phi = THREE.MathUtils.degToRad(latitude);
    for (let step = 0; step <= 96; step += 1) {
      const theta = (step / 96) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          radius * Math.cos(phi) * Math.cos(theta),
          radius * Math.sin(phi),
          radius * Math.cos(phi) * Math.sin(theta)
        )
      );
    }
    const line = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(points),
      material
    );
    group.add(line);
  }

  for (let longitude = 0; longitude < 180; longitude += 30) {
    const points: THREE.Vector3[] = [];
    const theta = THREE.MathUtils.degToRad(longitude);
    for (let step = 0; step <= 64; step += 1) {
      const phi = -Math.PI / 2 + (step / 64) * Math.PI;
      points.push(
        new THREE.Vector3(
          radius * Math.cos(phi) * Math.cos(theta),
          radius * Math.sin(phi),
          radius * Math.cos(phi) * Math.sin(theta)
        )
      );
    }
    group.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        material
      )
    );
  }
}

export function InteractiveSkillsGlobe({
  skills,
  selectedName,
  locale,
  onSelect
}: InteractiveSkillsGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedNameRef = useRef(selectedName);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    selectedNameRef.current = selectedName;
  }, [selectedName]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || skills.length === 0) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.touchAction = "none";
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x92ffbf, 2.1));
    const keyLight = new THREE.DirectionalLight(0xd9fff0, 3.2);
    keyLight.position.set(-3, 3, 5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x39d9b1, 9, 8);
    rimLight.position.set(3, -1.5, -2);
    scene.add(rimLight);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const globeRadius = 1.12;
    const globeTexture = createEarthTexture();
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(globeRadius, 80, 80),
      new THREE.MeshStandardMaterial({
        map: globeTexture,
        roughness: 0.82,
        metalness: 0.08,
        emissive: 0x0a271d,
        emissiveIntensity: 0.34
      })
    );
    globeGroup.add(globe);
    addGlobeGrid(globeGroup, globeRadius + 0.006);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(globeRadius * 1.045, 48, 48),
      new THREE.MeshBasicMaterial({
        color: 0x50eac0,
        transparent: true,
        opacity: 0.075,
        side: THREE.BackSide,
        depthWrite: false
      })
    );
    globeGroup.add(atmosphere);

    const orbitRing = new THREE.Mesh(
      new THREE.TorusGeometry(globeRadius * 1.2, 0.003, 8, 160),
      new THREE.MeshBasicMaterial({
        color: 0x63e6ff,
        transparent: true,
        opacity: 0.42
      })
    );
    orbitRing.rotation.set(1.12, 0.2, -0.24);
    globeGroup.add(orbitRing);

    const pickTargets: THREE.Object3D[] = [];
    const skillMarkers: Array<{
      name: string;
      labelText: string;
      marker: THREE.Mesh;
      label: THREE.Sprite;
    }> = [];

    let isDisposed = false;

    skills.forEach((skill, index) => {
      const position = pointOnSphere(index, skills.length);
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 16, 16),
        new THREE.MeshStandardMaterial({
          color: 0x88ffc0,
          emissive: 0x37cb8a,
          emissiveIntensity: 0.6,
          roughness: 0.35
        })
      );
      marker.position.copy(position.clone().multiplyScalar(globeRadius + 0.025));
      marker.userData.skillName = skill.name;
      marker.userData.baseScale = 1;
      globeGroup.add(marker);
      pickTargets.push(marker);

      const labelText = localizeSkill(skill, locale).name;
      const { texture, aspect } = createSkillLabel(labelText, "Georgia");
      const label = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          depthTest: true,
          depthWrite: false,
          sizeAttenuation: true
        })
      );
      label.position.copy(position.clone().multiplyScalar(globeRadius + 0.17));
      label.scale.set(aspect * 0.34, 0.34, 1);
      label.userData.skillName = skill.name;
      globeGroup.add(label);
      pickTargets.push(label);
      skillMarkers.push({ name: skill.name, labelText, marker, label });
    });

    void document.fonts
      .load('600 34px "Cormorant Garamond"')
      .then(() => {
        if (isDisposed) return;
        for (const skillMarker of skillMarkers) {
          const { texture, aspect } = createSkillLabel(
            skillMarker.labelText,
            '"Cormorant Garamond"'
          );
          const material = skillMarker.label.material as THREE.SpriteMaterial;
          material.map?.dispose();
          material.map = texture;
          material.needsUpdate = true;
          skillMarker.label.scale.x = aspect * 0.34;
        }
      })
      .catch(() => undefined);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let activePointer: number | null = null;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    let dragged = false;
    let frameId: number | null = null;
    let lastSelectedName = "";
    let isInView = false;

    const updatePointer = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const selectedSkillAtPointer = () => {
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects([globe, ...pickTargets], false)[0];
      return hit?.object.userData.skillName as string | undefined;
    };

    const onPointerDown = (event: PointerEvent) => {
      activePointer = event.pointerId;
      startX = lastX = event.clientX;
      startY = lastY = event.clientY;
      dragged = false;
      renderer.domElement.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (activePointer === event.pointerId) {
        const deltaX = event.clientX - lastX;
        const deltaY = event.clientY - lastY;
        if (Math.hypot(event.clientX - startX, event.clientY - startY) > 5) {
          dragged = true;
        }
        if (dragged) {
          globeGroup.rotation.y += deltaX * 0.008;
          globeGroup.rotation.x += deltaY * 0.008;
        }
        lastX = event.clientX;
        lastY = event.clientY;
        return;
      }

      updatePointer(event);
      renderer.domElement.style.cursor = selectedSkillAtPointer() ? "pointer" : "grab";
    };

    const onPointerUp = (event: PointerEvent) => {
      if (activePointer !== event.pointerId) return;
      if (!dragged) {
        updatePointer(event);
        const skillName = selectedSkillAtPointer();
        if (skillName) onSelect(skillName);
      }
      if (renderer.domElement.hasPointerCapture(event.pointerId)) {
        renderer.domElement.releasePointerCapture(event.pointerId);
      }
      activePointer = null;
      renderer.domElement.style.cursor = "grab";
    };

    const onPointerCancel = (event: PointerEvent) => {
      if (activePointer === event.pointerId) activePointer = null;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const rotation = 0.12;
      if (event.key === "ArrowLeft") globeGroup.rotation.y -= rotation;
      else if (event.key === "ArrowRight") globeGroup.rotation.y += rotation;
      else if (event.key === "ArrowUp") globeGroup.rotation.x -= rotation;
      else if (event.key === "ArrowDown") globeGroup.rotation.x += rotation;
      else return;
      event.preventDefault();
    };

    const canvas = renderer.domElement;
    canvas.style.cursor = "grab";
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerCancel);
    canvas.addEventListener("keydown", onKeyDown);

    const resizeObserver = new ResizeObserver(() => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    const renderFrame = () => {
      frameId = null;
      if (!isInView || document.hidden) return;

      if (!shouldReduceMotion && activePointer === null) {
        globeGroup.rotation.y += 0.0006;
      }

      if (lastSelectedName !== selectedNameRef.current) {
        lastSelectedName = selectedNameRef.current;
        for (const skillMarker of skillMarkers) {
          const selected = skillMarker.name === lastSelectedName;
          const material = skillMarker.marker.material as THREE.MeshStandardMaterial;
          material.color.setHex(selected ? 0x9ffff0 : 0x88ffc0);
          material.emissiveIntensity = selected ? 1.5 : 0.6;
          skillMarker.marker.scale.setScalar(selected ? 1.55 : 1);
          (skillMarker.label.material as THREE.SpriteMaterial).opacity = selected ? 1 : 0.86;
        }
      }

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(renderFrame);
    };

    const startRendering = () => {
      if (frameId === null && isInView && !document.hidden) {
        frameId = window.requestAnimationFrame(renderFrame);
      }
    };

    const stopRendering = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isInView = entries.some((entry) => entry.isIntersecting);
        if (isInView) startRendering();
        else stopRendering();
      },
      { rootMargin: "100px" }
    );
    intersectionObserver.observe(container);

    const onVisibilityChange = () => {
      if (document.hidden) stopRendering();
      else startRendering();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      isDisposed = true;
      stopRendering();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerCancel);
      canvas.removeEventListener("keydown", onKeyDown);
      scene.traverse((object) => {
        const renderable = object as THREE.Mesh | THREE.Line | THREE.Sprite;
        (renderable as THREE.Mesh).geometry?.dispose();
        const material = renderable.material;
        if (material) {
          const materials = Array.isArray(material) ? material : [material];
          for (const item of materials) {
            const withMap = item as THREE.MeshStandardMaterial | THREE.SpriteMaterial;
            withMap.map?.dispose();
            item.dispose();
          }
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [locale, onSelect, shouldReduceMotion, skills]);

  return (
    <div className="relative mx-auto grid aspect-square w-full max-w-[640px] place-items-center">
      <div
        ref={containerRef}
        role="application"
        aria-label={messages[locale].skills.globeLabel}
        tabIndex={0}
        className="aspect-square h-[calc(100%-24px)] w-[calc(100%-24px)] max-h-[560px] max-w-[560px] outline-none focus-visible:rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon"
      />
      <div className="sr-only" aria-label={messages[locale].skills.keyboardSelection}>
        {skills.map((skill) => (
          <button
            key={skill.name}
            type="button"
            aria-pressed={selectedName === skill.name}
            onClick={() => onSelect(skill.name)}
          >
            {localizeSkill(skill, locale).name}
          </button>
        ))}
      </div>
    </div>
  );
}