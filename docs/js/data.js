// Curated YouTube sketching lessons.
// Each lesson bundles a couple of short, beginner-friendly pencil or ink
// tutorials around one theme. fallbackTitle/fallbackChannel are shown until
// the real title/channel/duration load live from YouTube in the browser.

const LESSONS = [
  {
    id: "line-control",
    order: 1,
    track: "Foundations",
    medium: "pencil",
    title: "Warm-Up & Line Control",
    blurb: "Loosen up your hand and learn to lay down confident, steady strokes — every sketch starts here.",
    materials: ["HB or 2B pencil", "Any smooth paper", "Eraser"],
    practice: "Fill a page with straight lines, curves, and circles, trying to keep each stroke smooth and confident rather than sketchy. 5–10 minutes.",
    videos: [
      { id: "VrbtxbX9OwE", fallbackTitle: "3 Drawing Exercises to Improve Control & Precision", fallbackChannel: "" },
      { id: "XvYu4hoMQ0c", fallbackTitle: "Basic Drawing Technique — How to Control Your Drawing Pencil", fallbackChannel: "" }
    ]
  },
  {
    id: "basic-shapes",
    order: 2,
    track: "Foundations",
    medium: "pencil",
    title: "Basic Shapes & 3D Forms",
    blurb: "Almost everything you'll ever draw breaks down into cubes, spheres, cylinders, and cones. Learn to build them.",
    materials: ["HB or 2B pencil", "Paper", "Eraser"],
    practice: "Draw a cube, a cylinder, and a sphere from a couple of different angles. Don't worry about shading yet — just the outlines.",
    videos: [
      { id: "9EJ5N1PQwjQ", fallbackTitle: "How to Draw 3D Cubes for Beginners: Overlapping Shapes", fallbackChannel: "" },
      { id: "NlaG6ecO3JQ", fallbackTitle: "How To Draw a Sphere, Cylinder, Cone, Cube", fallbackChannel: "" }
    ]
  },
  {
    id: "perspective-basics",
    order: 3,
    track: "Foundations",
    medium: "pencil",
    title: "Perspective Basics",
    blurb: "Give your sketches depth with simple one- and two-point perspective — the trick behind objects that look 3D.",
    materials: ["Pencil", "Ruler (optional)", "Paper"],
    practice: "Pick one vanishing point and sketch a simple box or road receding into the distance from it.",
    videos: [
      { id: "08E0IfhLfcQ", fallbackTitle: "How to Draw Circles in Perspective for Beginners", fallbackChannel: "Circle Line Art School" },
      { id: "wZbTBgUSn7o", fallbackTitle: "How to Draw a House using Two Point Perspective for Beginners", fallbackChannel: "Circle Line Art School" }
    ]
  },
  {
    id: "pencil-shading",
    order: 4,
    track: "Foundations",
    medium: "pencil",
    title: "Pencil Shading & Values",
    blurb: "Turn flat outlines into forms that look solid by learning how light, shadow, and gradients work in pencil.",
    materials: ["A range of pencils (2H–6B) or one HB", "Blending stump or tissue (optional)", "Paper"],
    practice: "Draw a value scale from lightest to darkest, then shade one of the 3D forms from Lesson 2 using it.",
    videos: [
      { id: "tGx4sypoPjY", fallbackTitle: "Pencil Shading Techniques: Introduction", fallbackChannel: "" },
      { id: "-WR-FyUQc6I", fallbackTitle: "How to Shade with Pencil for Beginners", fallbackChannel: "" }
    ]
  },
  {
    id: "ink-hatching",
    order: 5,
    track: "Ink Techniques",
    medium: "ink",
    title: "Ink Hatching & Cross-Hatching",
    blurb: "No eraser, no gradients — just lines. Learn how ink artists build up tone and shadow entirely from strokes.",
    materials: ["Fineliner or dip pen", "Ink (if using a dip pen)", "Paper"],
    practice: "Draw three squares and fill them with light, medium, and dark tone using only hatching and cross-hatching.",
    videos: [
      { id: "rIIpEuLxsiI", fallbackTitle: "Pen and Ink Crosshatching: A Simple Introduction", fallbackChannel: "Alphonso Dunn" },
      { id: "DtPS4Ei-MwE", fallbackTitle: "Beginners Introduction to Crosshatching & Basic Strokes", fallbackChannel: "" }
    ]
  },
  {
    id: "ink-stippling",
    order: 6,
    track: "Ink Techniques",
    medium: "ink",
    title: "Ink Stippling",
    blurb: "Build tone out of nothing but dots. It's slow and meditative, and one of the most forgiving ink techniques to start with.",
    materials: ["Fineliner (fine tip)", "Paper"],
    practice: "Shade a single circle using only dots — packed tightly for dark areas, spread out for light ones.",
    videos: [
      { id: "tMYI1wT0mB8", fallbackTitle: "How To Stipple", fallbackChannel: "" },
      { id: "pE5JgjgOw7M", fallbackTitle: "How to Draw & Shade with Stippling", fallbackChannel: "" }
    ]
  },
  {
    id: "gesture-sketching",
    order: 7,
    track: "Putting It Together",
    medium: "pencil",
    title: "Gesture & Quick Sketching",
    blurb: "Learn to capture the energy of a pose or object fast, without worrying about details — great for loosening up.",
    materials: ["Pencil", "Paper", "A timer"],
    practice: "Set a 60-second timer and sketch the same object or pose 3 times, focusing only on the overall motion and shape.",
    videos: [
      { id: "KVXOIBRdzPw", fallbackTitle: "Beginner Gesture Drawing: How to Draw Expressively Through Powerful Exercises", fallbackChannel: "" },
      { id: "ZIq78eJ9lJ0", fallbackTitle: "Gesture Drawing Simplified", fallbackChannel: "" }
    ]
  },
  {
    id: "still-life-basics",
    order: 8,
    track: "Putting It Together",
    medium: "pencil",
    title: "Simple Still Life Objects",
    blurb: "Bring shapes, perspective, and shading together to sketch a real object from life, like an apple or a mug.",
    materials: ["Pencil", "Paper", "Eraser", "One simple object (apple, mug, etc.)"],
    practice: "Set a simple object in front of you with a single light source and sketch it, blocking in basic shapes before adding shading.",
    videos: [
      { id: "eB9k6wT7maU", fallbackTitle: "Realistic Apple Sketch with Pencil: Still Life Drawing Tutorial for Beginners", fallbackChannel: "" },
      { id: "z-TKCMB_ZmU", fallbackTitle: "Object Still Life Drawing Easy Step by Step for Beginners", fallbackChannel: "" }
    ]
  }
];

const MAX_LESSON_MINUTES = 15;
