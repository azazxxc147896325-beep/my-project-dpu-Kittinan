import React, { useState, useEffect, useRef } from "react";

export default function Game() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // References for game state inside animation loop
  const gameState = useRef({
    player: { x: 170, y: 405, width: 40, height: 40, speed: 5 },
    bullets: [],
    enemies: [],
    enemyBullets: [],
    particles: [],
    keys: { left: false, right: false, space: false },
    lastEnemySpawn: 0,
    lastShotTime: 0,
    playerInvulnerableUntil: 0,
    score: 0,
    lives: 3,
    running: false,
  });

  const startGame = () => {
    gameState.current = {
      player: { x: 170, y: 405, width: 40, height: 40, speed: 5 },
      bullets: [],
      enemies: [],
      enemyBullets: [],
      particles: [],
      keys: { left: false, right: false, space: false },
      lastEnemySpawn: Date.now(),
      lastShotTime: 0,
      playerInvulnerableUntil: 0,
      score: 0,
      lives: 3,
      running: true,
    };
    setScore(0);
    setLives(3);
    setGameOver(false);
    setGameStarted(true);
  };

  const shootBullet = () => {
    const state = gameState.current;
    if (!state.running) return;
    const now = Date.now();
    if (now - state.lastShotTime < 240) return; // Fire rate limit
    state.lastShotTime = now;

    state.bullets.push({
      x: state.player.x + state.player.width / 2 - 3,
      y: state.player.y - 8,
      width: 6,
      height: 12,
      speed: 7,
    });
  };

  // Keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameState.current.running) return;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        gameState.current.keys.left = true;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        gameState.current.keys.right = true;
      }
      if (e.key === " " || e.key === "ArrowUp") {
        e.preventDefault();
        shootBullet();
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        gameState.current.keys.left = false;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        gameState.current.keys.right = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Main Canvas Game Loop
  useEffect(() => {
    let animationId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const loop = () => {
      const state = gameState.current;
      const now = Date.now();

      // Clear canvas
      ctx.fillStyle = "#1e293b"; // Slate-800 dark arena
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines on battlefield
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 38) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 38) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      if (state.running) {
        // Player movement
        if (state.keys.left && state.player.x > 5) {
          state.player.x -= state.player.speed;
        }
        if (state.keys.right && state.player.x < canvas.width - state.player.width - 5) {
          state.player.x += state.player.speed;
        }

        // Spawn enemy tanks
        if (now - state.lastEnemySpawn > 1300) {
          state.lastEnemySpawn = now;
          const enemyWidth = 36;
          const randomX = Math.random() * (canvas.width - enemyWidth - 20) + 10;
          state.enemies.push({
            x: randomX,
            y: -40,
            width: enemyWidth,
            height: 36,
            speed: 1.5 + Math.random() * 0.9,
            burstRemaining: 3, // ยิงชุดละ 3 นัดต่อเนื่อง
            lastShotTime: 0,
            burstInterval: 240, // หน่วงเวลาระหว่างนัดในชุด 240ms
            nextBurstTime: 0,
            burstCooldown: 1800, // หน่วงเวลาระหว่างชุด 1.8 วินาที
          });
        }

        // Update Player Bullets
        for (let i = state.bullets.length - 1; i >= 0; i--) {
          const b = state.bullets[i];
          b.y -= b.speed;
          if (b.y < -15) {
            state.bullets.splice(i, 1);
          }
        }

        // Enemies shoot back in 3-round bursts and move
        for (let i = state.enemies.length - 1; i >= 0; i--) {
          const enemy = state.enemies[i];
          enemy.y += enemy.speed;

          // Enemy shoots 3-round burst starting immediately when emerging from the border (y >= 0)
          if (enemy.y >= 0 && enemy.y < 360) {
            if (enemy.burstRemaining > 0) {
              if (now - enemy.lastShotTime >= enemy.burstInterval) {
                enemy.lastShotTime = now;
                enemy.burstRemaining -= 1;

                state.enemyBullets.push({
                  x: enemy.x + enemy.width / 2 - 3,
                  y: enemy.y + enemy.height + 4,
                  width: 6,
                  height: 12,
                  speed: 4.4,
                });

                if (enemy.burstRemaining === 0) {
                  enemy.nextBurstTime = now + enemy.burstCooldown;
                }
              }
            } else if (now >= enemy.nextBurstTime) {
              // Reload 3-round burst
              enemy.burstRemaining = 3;
            }
          }

          // Check enemy hit by player bullet
          for (let j = state.bullets.length - 1; j >= 0; j--) {
            const bullet = state.bullets[j];
            if (
              bullet.x < enemy.x + enemy.width &&
              bullet.x + bullet.width > enemy.x &&
              bullet.y < enemy.y + enemy.height &&
              bullet.y + bullet.height > enemy.y
            ) {
              // Create explosion particles
              for (let p = 0; p < 10; p++) {
                state.particles.push({
                  x: enemy.x + enemy.width / 2,
                  y: enemy.y + enemy.height / 2,
                  vx: (Math.random() - 0.5) * 6,
                  vy: (Math.random() - 0.5) * 6,
                  life: 18,
                  color: "#f59e0b",
                });
              }

              state.enemies.splice(i, 1);
              state.bullets.splice(j, 1);
              state.score += 100;
              setScore(state.score);
              break;
            }
          }

          // Enemy tank reached bottom
          if (enemy && enemy.y > canvas.height) {
            state.enemies.splice(i, 1);
            state.lives -= 1;
            setLives(state.lives);
            if (state.lives <= 0) {
              state.running = false;
              setGameOver(true);
            }
          }
        }

        // Update Enemy Bullets & Check Hit on Player
        for (let i = state.enemyBullets.length - 1; i >= 0; i--) {
          const eb = state.enemyBullets[i];
          eb.y += eb.speed;

          // Check collision with player bullets (Bullet vs Bullet cancel)
          for (let j = state.bullets.length - 1; j >= 0; j--) {
            const pb = state.bullets[j];
            if (
              pb.x < eb.x + eb.width &&
              pb.x + pb.width > eb.x &&
              pb.y < eb.y + eb.height &&
              pb.y + pb.height > eb.y
            ) {
              // Bullet collision sparks
              for (let p = 0; p < 4; p++) {
                state.particles.push({
                  x: eb.x + 3,
                  y: eb.y + 6,
                  vx: (Math.random() - 0.5) * 4,
                  vy: (Math.random() - 0.5) * 4,
                  life: 10,
                  color: "#ffffff",
                });
              }
              state.bullets.splice(j, 1);
              state.enemyBullets.splice(i, 1);
              break;
            }
          }

          // Check collision with player tank
          if (state.enemyBullets[i]) {
            const p = state.player;
            if (
              now > state.playerInvulnerableUntil &&
              eb.x < p.x + p.width &&
              eb.x + eb.width > p.x &&
              eb.y < p.y + p.height &&
              eb.y + eb.height > p.y
            ) {
              state.enemyBullets.splice(i, 1);
              state.lives -= 1;
              setLives(state.lives);
              state.playerInvulnerableUntil = now + 1200; // 1.2s flash immunity

              // Explosion on player
              for (let pt = 0; pt < 12; pt++) {
                state.particles.push({
                  x: p.x + p.width / 2,
                  y: p.y + p.height / 2,
                  vx: (Math.random() - 0.5) * 7,
                  vy: (Math.random() - 0.5) * 7,
                  life: 20,
                  color: "#ef4444",
                });
              }

              if (state.lives <= 0) {
                state.running = false;
                setGameOver(true);
              }
            } else if (eb.y > canvas.height + 15) {
              state.enemyBullets.splice(i, 1);
            }
          }
        }

        // Update explosion particles
        for (let i = state.particles.length - 1; i >= 0; i--) {
          const p = state.particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 1;
          if (p.life <= 0) {
            state.particles.splice(i, 1);
          }
        }
      }

      // Draw Player Tank (Green - Flash when invulnerable)
      const p = state.player;
      const isInvulnerable = now < state.playerInvulnerableUntil;
      const isVisible = !isInvulnerable || Math.floor(now / 100) % 2 === 0;

      if (isVisible) {
        ctx.fillStyle = "#10b981"; // Tank Body
        ctx.fillRect(p.x, p.y + 8, p.width, p.height - 8);

        // Tank Tracks (Dark Green)
        ctx.fillStyle = "#065f46";
        ctx.fillRect(p.x - 3, p.y + 6, 6, p.height - 4);
        ctx.fillRect(p.x + p.width - 3, p.y + 6, 6, p.height - 4);

        // Tank Turret
        ctx.fillStyle = "#059669";
        ctx.beginPath();
        ctx.arc(p.x + p.width / 2, p.y + p.height / 2 + 2, 9, 0, Math.PI * 2);
        ctx.fill();

        // Tank Cannon (pointing UP)
        ctx.strokeStyle = "#047857";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(p.x + p.width / 2, p.y + p.height / 2);
        ctx.lineTo(p.x + p.width / 2, p.y - 6);
        ctx.stroke();
      }

      // Draw Enemy Tanks (Red)
      state.enemies.forEach((enemy) => {
        ctx.fillStyle = "#ef4444"; // Enemy Body
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height - 8);

        // Enemy Tracks
        ctx.fillStyle = "#991b1b";
        ctx.fillRect(enemy.x - 2, enemy.y, 5, enemy.height - 6);
        ctx.fillRect(enemy.x + enemy.width - 3, enemy.y, 5, enemy.height - 6);

        // Enemy Turret
        ctx.fillStyle = "#dc2626";
        ctx.beginPath();
        ctx.arc(enemy.x + enemy.width / 2, enemy.y + 16, 8, 0, Math.PI * 2);
        ctx.fill();

        // Enemy Cannon (pointing DOWN)
        ctx.strokeStyle = "#b91c1c";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(enemy.x + enemy.width / 2, enemy.y + 16);
        ctx.lineTo(enemy.x + enemy.width / 2, enemy.y + enemy.height + 4);
        ctx.stroke();
      });

      // Draw Player Bullets (Yellow)
      ctx.fillStyle = "#facc15";
      state.bullets.forEach((b) => {
        ctx.fillRect(b.x, b.y, b.width, b.height);
      });

      // Draw Enemy Bullets (Red / Orange)
      ctx.fillStyle = "#f97316"; // Bright Orange
      state.enemyBullets.forEach((eb) => {
        ctx.fillRect(eb.x, eb.y, eb.width, eb.height);
      });

      // Draw Particles
      state.particles.forEach((pt) => {
        ctx.fillStyle = pt.color;
        ctx.fillRect(pt.x, pt.y, 3, 3);
      });

      // Draw overlay if game not started or over
      if (!state.running && !gameOver && !gameStarted) {
        ctx.fillStyle = "rgba(15, 23, 42, 0.8)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 18px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("เกมรถถังประจัญบาน", canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = "13px sans-serif";
        ctx.fillStyle = "#cbd5e1";
        ctx.fillText("กดปุ่ม เริ่มเล่นเกม ด้านล่าง", canvas.width / 2, canvas.height / 2 + 10);
      } else if (gameOver) {
        ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ef4444";
        ctx.font = "bold 22px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("จบเกม (Game Over)", canvas.width / 2, canvas.height / 2 - 25);
        ctx.fillStyle = "#ffffff";
        ctx.font = "16px sans-serif";
        ctx.fillText(`คะแนนรวม: ${state.score} คะแนน`, canvas.width / 2, canvas.height / 2 + 10);
      }

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [gameOver, gameStarted]);

  return (
    <div className="relative z-10 max-w-lg mx-auto p-4 text-center">
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          หน้า Game รถถัง
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          บังคับรถถัง หลบกระสุนและยิงสวนรถถังศัตรู
        </p>

        {/* Game Stats Bar */}
        <div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-xl mb-3 text-sm font-semibold text-gray-700">
          <div>
            คะแนน: <span className="text-indigo-600 font-bold">{score}</span>
          </div>
          <div>
            พลังชีวิต:{" "}
            <span className={`font-bold ${lives <= 1 ? "text-red-500" : "text-emerald-600"}`}>
              {lives} / 3
            </span>
          </div>
        </div>

        {/* Canvas Arena */}
        <div className="flex justify-center mb-4">
          <canvas
            ref={canvasRef}
            width={380}
            height={460}
            className="rounded-xl shadow-inner border border-gray-300 w-full max-w-[380px] h-[460px] bg-slate-800"
          />
        </div>

        {/* Action Controls */}
        {!gameStarted || gameOver ? (
          <button
            onClick={startGame}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold rounded-xl shadow-sm transition-all text-sm mb-3"
          >
            {gameOver ? "เริ่มเล่นใหม่อีกครั้ง" : "เริ่มเล่นเกม"}
          </button>
        ) : (
          /* Mobile / Onscreen Controls */
          <div className="grid grid-cols-3 gap-2 mb-3">
            <button
              onMouseDown={() => { gameState.current.keys.left = true; }}
              onMouseUp={() => { gameState.current.keys.left = false; }}
              onTouchStart={() => { gameState.current.keys.left = true; }}
              onTouchEnd={() => { gameState.current.keys.left = false; }}
              className="py-3 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-xl font-bold text-sm text-gray-800 select-none border border-gray-300"
            >
              เลี้ยวซ้าย
            </button>

            <button
              onClick={shootBullet}
              className="py-3 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold rounded-xl shadow-sm text-sm select-none"
            >
              ยิงกระสุน
            </button>

            <button
              onMouseDown={() => { gameState.current.keys.right = true; }}
              onMouseUp={() => { gameState.current.keys.right = false; }}
              onTouchStart={() => { gameState.current.keys.right = true; }}
              onTouchEnd={() => { gameState.current.keys.right = false; }}
              className="py-3 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-xl font-bold text-sm text-gray-800 select-none border border-gray-300"
            >
              เลี้ยวขวา
            </button>
          </div>
        )}

        <div className="text-left bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs text-gray-600">
          <p className="font-semibold text-gray-700 mb-1">วิธีเล่น & ฟังก์ชันใหม่:</p>
          <p>• <strong>ศัตรูยิงชุด 3 นัด:</strong> รถถังศัตรูจะยิงกระสุนต่อเนื่อง 3 นัดทันทีที่โผล่ออกมาจากขอบจอ</p>
          <p>• <strong>ยิงทำลายกระสุน:</strong> สามารถยิงกระสุนของเราไปชนกระสุนศัตรูเพื่อสกัดกั้นได้</p>
          <p>• <strong>การควบคุม:</strong> ใช้ปุ่มลูกศร ซ้าย/ขวา + Spacebar หรือกดปุ่มสัมผัสด้านล่าง</p>
        </div>
      </div>
    </div>
  );
}
