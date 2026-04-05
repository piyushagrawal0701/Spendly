import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { useTransactions } from "../Context/TransactionContext";

const MagicBox = () => {
  const sceneRef = useRef(null);
  const { transactions } = useTransactions();

  useEffect(() => {
    const {
      Engine,
      Render,
      Runner,
      World,
      Bodies,
      Mouse,
      MouseConstraint,
      Events,
      Body,
    } = Matter;

    const engine = Engine.create();
    const world = engine.world;

    engine.world.gravity.y = 1;

    const isMobile = window.innerWidth < 640;
    const width = sceneRef.current.offsetWidth;
    const height = isMobile ? 320 : 350;

    const render = Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent", // ✅ keep old working bg
      },
    });

    const runner = Runner.create();
    Runner.run(runner, engine);

    // 🧱 WALLS (same as before)
    const padding = isMobile ? 30 : 40;

    const walls = [
      Bodies.rectangle(width / 2, height + 50, width, 100, { isStatic: true }),
      Bodies.rectangle(width / 2, -50, width, 100, { isStatic: true }),
      Bodies.rectangle(-50, height / 2, 100, height, { isStatic: true }),
      Bodies.rectangle(width + 50, height / 2, 100, height, { isStatic: true }),
    ];

    // 🎨 COLORS
    const incomeColor = "#22c55e";
    const expenseColor = "#ef4444";
    const balanceColor = "#8b5cf6";

    const radius = 18;

    // 📊 BALANCE
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((a, t) => a + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((a, t) => a + t.amount, 0);

    const balance = totalIncome - totalExpense;

    // 📦 SIZES
    const boxWidth = isMobile ? 120 : 150;
    const boxHeight = isMobile ? 40 : 50;
    const balanceWidth = isMobile ? 150 : 200;
    const balanceHeight = isMobile ? 50 : 60;

    // 📦 CREATE BOX
    const createBox = (x, y, w, h, color, label) => {
      const body = Bodies.rectangle(x, y, w, h, {
        chamfer: { radius },
        render: { fillStyle: color },
        restitution: 0.4,
        friction: 0.3,
        frictionAir: 0.02,
      });

      body.labelText = label;
      return body;
    };

    // ✅ FIXED POSITIONING (NO OVERFLOW)
    const safeX = (index) => {
      const cols = isMobile ? 2 : 3;
      const spacing = width / (cols + 1);
      return spacing * ((index % cols) + 1);
    };

    const displayTransactions = isMobile
      ? transactions.slice(0, 6)
      : transactions;

    const boxes = displayTransactions.map((tx, index) => {
      const color = tx.type === "income" ? incomeColor : expenseColor;

      return createBox(
        safeX(index),
        -50 - index * 30,
        boxWidth,
        boxHeight,
        color,
        `${tx.title} ₹${tx.amount}`
      );
    });

    // 💜 BALANCE
    const balanceBox = createBox(
      width / 2,
      -100,
      balanceWidth,
      balanceHeight,
      balanceColor,
      `Balance ₹${balance}`
    );

    World.add(world, [...walls, balanceBox, ...boxes]);

    // 🖱 MOUSE
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });

    World.add(world, mouseConstraint);
    render.mouse = mouse;

    // 🔒 KEEP INSIDE
    Events.on(engine, "beforeUpdate", () => {
      [...boxes, balanceBox].forEach((body) => {
        const { x, y } = body.position;

        Body.setPosition(body, {
          x: Math.min(Math.max(x, padding), width - padding),
          y: Math.min(Math.max(y, padding), height - padding),
        });
      });
    });

    // ✍️ TEXT WRAP
    Events.on(render, "afterRender", () => {
      const ctx = render.context;

      ctx.font = isMobile ? "12px Inter" : "14px Inter";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const wrapText = (text, maxWidth) => {
        const words = text.split(" ");
        const lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
          const word = words[i];
          const width = ctx.measureText(currentLine + " " + word).width;

          if (width < maxWidth - 20) {
            currentLine += " " + word;
          } else {
            lines.push(currentLine);
            currentLine = word;
          }
        }
        lines.push(currentLine);
        return lines;
      };

      [...boxes, balanceBox].forEach((body) => {
        const maxWidth = body.bounds.max.x - body.bounds.min.x;

        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);

        const lines = wrapText(body.labelText, maxWidth);
        const lineHeight = isMobile ? 14 : 16;

        lines.forEach((line, index) => {
          ctx.fillText(
            line,
            0,
            index * lineHeight - ((lines.length - 1) * lineHeight) / 2
          );
        });

        ctx.restore();
      });
    });

    Engine.run(engine);
    Render.run(render);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(world);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, [transactions]);

  return (
    <div className="my-10 rounded-2xl bg-gradient-to-b from-purple-900/40 to-black p-1">
      <div
        ref={sceneRef}
        className="w-full h-[300px] sm:h-[350px] rounded-2xl overflow-hidden"
      />
    </div>
  );
};

export default MagicBox;