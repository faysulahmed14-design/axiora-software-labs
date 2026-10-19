"use client";

import React, { useEffect, useRef } from "react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
  isCore?: boolean;
}

interface Signal {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

interface FloatingToken {
  x: number;
  y: number;
  z: number;
  vy: number;
  text: string;
  alpha: number;
}

export default function AiNeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = 0;
    let mouseY = 0;
    let cursorScreenX = width / 2;
    let cursorScreenY = height / 2;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;

    const shockwaves: Shockwave[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      cursorScreenX = e.clientX;
      cursorScreenY = e.clientY;
      mouseX = (e.clientX - width / 2) / (width / 2);
      mouseY = (e.clientY - height / 2) / (height / 2);
      targetRotY = mouseX * 0.6;
      targetRotX = -mouseY * 0.45;
    };

    const handleClick = (e: MouseEvent) => {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        maxRadius: Math.max(width, height) * 0.4,
        alpha: 0.8,
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    // Neural Nodes Generation
    const NODE_COUNT = 90;
    const SPHERE_RADIUS = Math.min(width, height) * 0.48;
    const colors = [
      "rgba(56, 189, 248, ",   // Electric Cyan
      "rgba(99, 102, 241, ",   // Neon Indigo
      "rgba(192, 132, 252, ",  // Radiant Violet
      "rgba(244, 114, 182, ",  // Magenta accent
    ];

    const nodes: Node3D[] = [];

    // 1. Surrounding Neural Web Nodes
    for (let i = 0; i < NODE_COUNT; i++) {
      const theta = Math.acos(1 - (2 * (i + 0.5)) / NODE_COUNT);
      const phi = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const r = SPHERE_RADIUS * (0.55 + Math.random() * 0.65);

      nodes.push({
        x: r * Math.sin(theta) * Math.cos(phi),
        y: r * Math.sin(theta) * Math.sin(phi),
        z: r * Math.cos(theta),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.4 + 1.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    // 2. Central 3D AI Quantum Polyhedron Nucleus (Icosahedron / Tensor Core)
    const CORE_RADIUS = SPHERE_RADIUS * 0.28;
    const phiRatio = (1 + Math.sqrt(5)) / 2;
    const coreVertices = [
      [-1, phiRatio, 0], [1, phiRatio, 0], [-1, -phiRatio, 0], [1, -phiRatio, 0],
      [0, -1, phiRatio], [0, 1, phiRatio], [0, -1, -phiRatio], [0, 1, -phiRatio],
      [phiRatio, 0, -1], [phiRatio, 0, 1], [-phiRatio, 0, -1], [-phiRatio, 0, 1],
    ];

    const coreStartIndex = nodes.length;
    coreVertices.forEach((v) => {
      const mag = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
      nodes.push({
        x: (v[0] / mag) * CORE_RADIUS,
        y: (v[1] / mag) * CORE_RADIUS,
        z: (v[2] / mag) * CORE_RADIUS,
        vx: 0,
        vy: 0,
        vz: 0,
        radius: 3.2,
        color: "rgba(56, 189, 248, ",
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.04,
        isCore: true,
      });
    });

    // Neural Synapse Signals
    const signals: Signal[] = [];
    const MAX_SIGNALS = 36;
    const spawnSignal = (fromIdx: number, toIdx: number) => {
      if (signals.length < MAX_SIGNALS && Math.random() < 0.04) {
        signals.push({
          fromNode: fromIdx,
          toNode: toIdx,
          progress: 0,
          speed: 0.015 + Math.random() * 0.025,
          color: Math.random() > 0.5 ? "rgba(56, 189, 248, " : "rgba(192, 132, 252, ",
        });
      }
    };

    // Ambient Floating AI Tokens (Tensor math & weights)
    const aiKeywords = [
      "W · x + b",
      "Softmax",
      "dim: 4096",
      "qkv_proj",
      "attn_loss: 0.0012",
      "latent_dim: 1536",
      "AdamW",
      "LayerNorm",
      "Transformer",
      "Agent Swarm",
    ];

    const tokens: FloatingToken[] = [];
    for (let i = 0; i < 14; i++) {
      tokens.push({
        x: (Math.random() - 0.5) * width * 0.9,
        y: Math.random() * height,
        z: (Math.random() - 0.5) * 600,
        vy: -(0.3 + Math.random() * 0.5),
        text: aiKeywords[Math.floor(Math.random() * aiKeywords.length)],
        alpha: 0.15 + Math.random() * 0.35,
      });
    }

    const focalLength = 520;
    let baseAngleY = 0;
    let coreAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Dynamic Ambient Neon Aurora Mesh
      const grad1 = ctx.createRadialGradient(
        width * 0.25 + Math.sin(baseAngleY) * 60,
        height * 0.3 + Math.cos(baseAngleY) * 60,
        0,
        width * 0.25,
        height * 0.3,
        width * 0.45
      );
      grad1.addColorStop(0, "rgba(2, 132, 199, 0.08)");
      grad1.addColorStop(0.6, "rgba(99, 102, 241, 0.03)");
      grad1.addColorStop(1, "rgba(1, 2, 6, 0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.75 + Math.cos(baseAngleY * 0.8) * 80,
        height * 0.65 + Math.sin(baseAngleY * 0.8) * 80,
        0,
        width * 0.75,
        height * 0.65,
        width * 0.4
      );
      grad2.addColorStop(0, "rgba(168, 85, 247, 0.07)");
      grad2.addColorStop(0.6, "rgba(56, 189, 248, 0.02)");
      grad2.addColorStop(1, "rgba(1, 2, 6, 0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Interactive Cursor Glow Field
      const cursorGlow = ctx.createRadialGradient(
        cursorScreenX,
        cursorScreenY,
        0,
        cursorScreenX,
        cursorScreenY,
        220
      );
      cursorGlow.addColorStop(0, "rgba(56, 189, 248, 0.12)");
      cursorGlow.addColorStop(0.5, "rgba(99, 102, 241, 0.04)");
      cursorGlow.addColorStop(1, "rgba(1, 2, 6, 0)");
      ctx.fillStyle = cursorGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Render Click Shockwaves
      for (let w = shockwaves.length - 1; w >= 0; w--) {
        const sw = shockwaves[w];
        sw.radius += 8;
        sw.alpha *= 0.94;

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${sw.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        if (sw.alpha < 0.01 || sw.radius > sw.maxRadius) {
          shockwaves.splice(w, 1);
        }
      }

      // Smooth 3D Rotations
      baseAngleY += 0.0025;
      coreAngle += 0.006;
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY + baseAngleY - rotY) * 0.05;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // 3. Project 3D Nodes
      const projectedNodes = nodes.map((node, idx) => {
        // If not core, slow natural drift
        if (!node.isCore) {
          node.x += node.vx;
          node.y += node.vy;
          node.z += node.vz;

          const dist = Math.sqrt(node.x * node.x + node.y * node.y + node.z * node.z);
          if (dist > SPHERE_RADIUS * 1.25 || dist < SPHERE_RADIUS * 0.35) {
            node.vx *= -1;
            node.vy *= -1;
            node.vz *= -1;
          }
        }

        // 3D Matrix Rotation
        const x1 = node.x * cosY + node.z * sinY;
        const z1 = -node.x * sinY + node.z * cosY;

        const y2 = node.y * cosX - z1 * sinX;
        const z2 = node.y * sinX + z1 * cosX;

        // Perspective projection
        const depth = z2 + 650;
        const scale = depth > 20 ? focalLength / depth : 0;
        const projX = width / 2 + x1 * scale;
        const projY = height / 2 + y2 * scale;

        node.pulse += node.pulseSpeed;
        const pulseFactor = Math.sin(node.pulse) * 0.35 + 1;

        // Magnetic Attraction / Excitement to Cursor
        const distToCursor = Math.hypot(projX - cursorScreenX, projY - cursorScreenY);
        let cursorInfluence = 0;
        if (distToCursor < 180) {
          cursorInfluence = (1 - distToCursor / 180) * 0.6;
        }

        return {
          projX,
          projY,
          scale,
          z2,
          radius: (node.radius + cursorInfluence * 3) * scale * pulseFactor,
          color: node.color,
          alpha: Math.min(1, Math.max(0.12, (z2 + 400) / 750) + cursorInfluence),
          isCore: node.isCore,
        };
      });

      // 4. Draw Core Polyhedron Wireframe (Central AI Quantum Core)
      ctx.beginPath();
      for (let i = coreStartIndex; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const c1 = projectedNodes[i];
          const c2 = projectedNodes[j];
          const dist = Math.hypot(c1.projX - c2.projX, c1.projY - c2.projY);
          if (dist < 110) {
            ctx.moveTo(c1.projX, c1.projY);
            ctx.lineTo(c2.projX, c2.projY);
          }
        }
      }
      ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
      ctx.lineWidth = 1;
      ctx.shadowColor = "rgba(56, 189, 248, 0.8)";
      ctx.shadowBlur = 6;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 5. Draw Synaptic Connections (Neural Axons)
      const maxConnDist = 150;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const n1 = projectedNodes[i];
          const n2 = projectedNodes[j];

          const dx = n1.projX - n2.projX;
          const dy = n1.projY - n2.projY;
          const dist2D = Math.sqrt(dx * dx + dy * dy);

          if (dist2D < maxConnDist) {
            const lineAlpha = (1 - dist2D / maxConnDist) * Math.min(n1.alpha, n2.alpha) * 0.42;

            ctx.beginPath();
            ctx.moveTo(n1.projX, n1.projY);
            ctx.lineTo(n2.projX, n2.projY);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = Math.max(0.4, (n1.scale + n2.scale) * 0.55);
            ctx.stroke();

            spawnSignal(i, j);
          }
        }
      }

      // 6. Draw Neural Impulse Signals (Electric pulses)
      for (let s = signals.length - 1; s >= 0; s--) {
        const sig = signals[s];
        sig.progress += sig.speed;

        if (sig.progress >= 1) {
          signals.splice(s, 1);
          continue;
        }

        const from = projectedNodes[sig.fromNode];
        const to = projectedNodes[sig.toNode];

        const sigX = from.projX + (to.projX - from.projX) * sig.progress;
        const sigY = from.projY + (to.projY - from.projY) * sig.progress;
        const sigAlpha = Math.sin(sig.progress * Math.PI) * Math.min(from.alpha, to.alpha) * 0.95;

        ctx.beginPath();
        ctx.arc(sigX, sigY, Math.max(2, 3.5 * from.scale), 0, Math.PI * 2);
        ctx.fillStyle = `${sig.color}${sigAlpha})`;
        ctx.shadowColor = sig.color.includes("56") ? "rgba(56, 189, 248, 0.9)" : "rgba(192, 132, 252, 0.9)";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 7. Draw Neural Nodes (Neurons with multi-layer glow)
      for (let i = 0; i < projectedNodes.length; i++) {
        const p = projectedNodes[i];
        if (p.scale <= 0) continue;

        // Radiant Outer Glow
        const gradient = ctx.createRadialGradient(
          p.projX,
          p.projY,
          0,
          p.projX,
          p.projY,
          p.radius * 3.8
        );
        gradient.addColorStop(0, `${p.color}${p.alpha * 0.95})`);
        gradient.addColorStop(0.35, `${p.color}${p.alpha * 0.35})`);
        gradient.addColorStop(1, `${p.color}0)`);

        ctx.beginPath();
        ctx.arc(p.projX, p.projY, p.radius * 3.8, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // High-Intensity Core
        ctx.beginPath();
        ctx.arc(p.projX, p.projY, Math.max(1.4, p.radius * 0.85), 0, Math.PI * 2);
        ctx.fillStyle = p.isCore
          ? `rgba(255, 255, 255, ${p.alpha * 0.95})`
          : `rgba(240, 249, 255, ${p.alpha * 0.9})`;
        ctx.fill();
      }

      // 8. Draw Floating AI Mathematical & Token Stream
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      for (let t = 0; t < tokens.length; t++) {
        const tok = tokens[t];
        tok.y += tok.vy;
        if (tok.y < -30) {
          tok.y = height + 20;
          tok.x = (Math.random() - 0.5) * width * 0.9;
        }

        const screenX = width / 2 + tok.x;
        const screenY = tok.y;

        ctx.fillStyle = `rgba(148, 163, 184, ${tok.alpha * 0.7})`;
        ctx.fillText(tok.text, screenX, screenY);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 3D Neural & Aurora Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-80 transition-opacity duration-1000"
      />

      {/* Cybernetic Perspective Grid (Horizon Floor) */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-[linear-gradient(to_bottom,transparent_0%,rgba(1,2,6,0.95)_100%),linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:linear-gradient(to_bottom,transparent,black_70%)] [transform:perspective(500px)_rotateX(60deg)] origin-bottom pointer-events-none opacity-40" />


    </div>
  );
}
