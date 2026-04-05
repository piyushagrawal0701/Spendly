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

    const width = sceneRef.current.offsetWidth;
    const height = 350;

    const render = Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
      },
    });

    const runner = Runner.create();
    Runner.run(runner, engine);

    // 🧱 INVISIBLE SAFE BOUNDARY (NO UI BORDER)
    const padding = 40;

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

    // 📊 CALCULATE BALANCE
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);

    const balance = totalIncome - totalExpense;

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

    // 📦 TRANSACTION BOXES
    const boxes = transactions.map((tx, index) => {
      const color = tx.type === "income" ? incomeColor : expenseColor;

      return createBox(
        120 + (index % 3) * 130,
        -50 - index * 30,
        150,
        50,
        color,
        `${tx.title} ₹${tx.amount}`
      );
    });

    // 💜 BALANCE BOX (CENTER)
    const balanceBox = createBox(
      width / 2,
      -100,
      200,
      60,
      balanceColor,
      `Balance ₹${balance}`
    );

    World.add(world, [...walls, balanceBox, ...boxes]);

    // 🖱 MOUSE
    const mouse = Mouse.create(render.canvas);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    World.add(world, mouseConstraint);
    render.mouse = mouse;

    // 🔒 KEEP INSIDE (NO ESCAPE)
    Events.on(engine, "beforeUpdate", () => {
      [...boxes, balanceBox].forEach((body) => {
        const { x, y } = body.position;

        Body.setPosition(body, {
          x: Math.min(Math.max(x, padding), width - padding),
          y: Math.min(Math.max(y, padding), height - padding),
        });
      });
    });

    // ✍️ TEXT
    Events.on(render, "afterRender", () => {
      const ctx = render.context;

      ctx.font = "14px Inter, sans-serif";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      [...boxes, balanceBox].forEach((body) => {
        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);
        ctx.fillText(body.labelText, 0, 0);
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
    <div
    className="my-10"
      ref={sceneRef}
      style={{
        width: "100%",
        height: "350px",
        borderRadius: "20px", // ✅ GOOD UI BORDER
        overflow: "hidden",
        background: "#0f172a", // match your UI
      }}
    />
  );
};

export default MagicBox;