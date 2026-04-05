import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { useTransactions } from "../Context/TransactionContext";

const MagicBox = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);

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
    engineRef.current = engine;

    const world = engine.world;
    engine.world.gravity.y = 1;

    const container = sceneRef.current;

    let width = container.offsetWidth;
    let height = window.innerWidth < 640 ? 380 : 350;

    const render = Render.create({
      element: container,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio,
      },
    });

    renderRef.current = render;

    const runner = Runner.create();
    Runner.run(runner, engine);

    // WALLS FUNCTION (dynamic)
    let walls = [];
    const createWalls = () => {
      const wallSize = 100;

      walls = [
        Bodies.rectangle(width / 2, height + wallSize / 2, width, wallSize, { isStatic: true }),
        Bodies.rectangle(width / 2, -wallSize / 2, width, wallSize, { isStatic: true }),
        Bodies.rectangle(-wallSize / 2, height / 2, wallSize, height, { isStatic: true }),
        Bodies.rectangle(width + wallSize / 2, height / 2, wallSize, height, { isStatic: true }),
      ];

      World.add(world, walls);
    };

    createWalls();

    // COLORS
    const incomeColor = "#22c55e";
    const expenseColor = "#ef4444";
    const balanceColor = "#8b5cf6";

    const radius = 18;

    const totalIncome = transactions.filter(t => t.type === "income").reduce((a, t) => a + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === "expense").reduce((a, t) => a + t.amount, 0);
    const balance = totalIncome - totalExpense;

    const isMobile = window.innerWidth < 640;

    const boxWidth = isMobile ? 110 : 150;
    const boxHeight = isMobile ? 40 : 50;

    const balanceWidth = isMobile ? 160 : 200;

    const createBox = (x, y, w, h, color, label) => {
      const body = Bodies.rectangle(x, y, w, h, {
        chamfer: { radius },
        render: { fillStyle: color },
      });

      body.labelText = label;
      return body;
    };

    const boxes = transactions.slice(0, isMobile ? 6 : transactions.length).map((tx, i) => {
      const color = tx.type === "income" ? incomeColor : expenseColor;

      return createBox(
        width / 2,
        -50 - i * 40,
        boxWidth,
        boxHeight,
        color,
        `${tx.title} ₹${tx.amount}`
      );
    });

    const balanceBox = createBox(
      width / 2,
      -120,
      balanceWidth,
      60,
      balanceColor,
      `Balance ₹${balance}`
    );

    World.add(world, [...boxes, balanceBox]);

    // MOUSE
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });

    World.add(world, mouseConstraint);
    render.mouse = mouse;

    // 🔒 HARD CLAMP (always use latest width)
    Events.on(engine, "beforeUpdate", () => {
      [...boxes, balanceBox].forEach((body) => {
        const halfW = (body.bounds.max.x - body.bounds.min.x) / 2;
        const halfH = (body.bounds.max.y - body.bounds.min.y) / 2;

        Body.setPosition(body, {
          x: Math.max(halfW, Math.min(width - halfW, body.position.x)),
          y: Math.max(halfH, Math.min(height - halfH, body.position.y)),
        });
      });
    });

    // TEXT
 Events.on(render, "afterRender", () => {
  const ctx = render.context;

  ctx.font = isMobile ? "12px Inter" : "14px Inter";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const wrapText = (text, maxWidth) => {
    const words = text.split(" ");
    const lines = [];
    let line = "";

    words.forEach((word) => {
      const testLine = line ? line + " " + word : word;
      const width = ctx.measureText(testLine).width;

      // 👇 thoda extra padding diya so kabhi overflow na ho
      if (width < maxWidth - 20) {
        line = testLine;
      } else {
        if (line) lines.push(line);
        line = word;
      }
    });

    if (line) lines.push(line);

    return lines.slice(0, 2); // max 2 lines
  };

  [...boxes, balanceBox].forEach((body) => {
    const maxWidth = body.bounds.max.x - body.bounds.min.x;

    ctx.save();
    ctx.translate(body.position.x, body.position.y);
    ctx.rotate(body.angle);

    const lines = wrapText(body.labelText, maxWidth);
    const lineHeight = isMobile ? 13 : 15;

    lines.forEach((line, i) => {
      ctx.fillText(
        line,
        0,
        i * lineHeight - ((lines.length - 1) * lineHeight) / 2
      );
    });

    ctx.restore();
  });
});

    Engine.run(engine);
    Render.run(render);

    // 🔥 RESIZE OBSERVER (MAIN FIX)
    const resizeObserver = new ResizeObserver(() => {
      width = container.offsetWidth;
      height = window.innerWidth < 640 ? 380 : 350;

      Render.setSize(render, width, height);

      render.canvas.style.width = width + "px";
      render.canvas.style.height = height + "px";
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
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
        className="w-full h-[380px] sm:h-[350px] rounded-2xl overflow-hidden"
      />
    </div>
  );
};

export default MagicBox;