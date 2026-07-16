import { useState } from "react";

// ---------------------------------------------------------------
// WebAiGen Academy — Courses grid
// Anatomy per card: SVG cover (procedural, brand-teal) + rating
// badge + live pill · title · level · learners · CTA.
// Swap `courses` with data from data/lessons.ts in the real app.
// ---------------------------------------------------------------

const BRAND = {
  primary: "#0E5C58",
  deep: "#003334",
  mint: "#85D7CE",
  tint: "#E7F4F2",
  amber: "#B45309",
};

type CoverVariant = "tree" | "split" | "wave" | "nodes" | "grid" | "bars";

type Course = {
  id: string;
  title: string;
  level: string;
  learners: string;
  rating: number;
  live: boolean;
  cover: CoverVariant;
};

const courses: Course[] = [
  {
    id: "ml-fundamentals",
    title: "Machine Learning Fundamentals",
    level: "Beginner to Advanced",
    learners: "12 lessons · hands-on labs",
    rating: 4.8,
    live: true,
    cover: "tree",
  },
  {
    id: "decision-trees",
    title: "Decision Trees, Deep Dive",
    level: "Beginner friendly",
    learners: "Gini, entropy & forests",
    rating: 4.7,
    live: true,
    cover: "split",
  },
  {
    id: "classification",
    title: "Classification Models in Practice",
    level: "Intermediate",
    learners: "Real medical dataset",
    rating: 4.7,
    live: false,
    cover: "wave",
  },
  {
    id: "genai",
    title: "Generative AI Training Program",
    level: "Beginner to Advanced",
    learners: "Prompting to production",
    rating: 4.6,
    live: true,
    cover: "nodes",
  },
  {
    id: "nextjs",
    title: "Full-Stack AI Apps with Next.js",
    level: "Intermediate and Advanced",
    learners: "Auth, Postgres, deploys",
    rating: 4.9,
    live: false,
    cover: "grid",
  },
  {
    id: "data-analytics",
    title: "Complete Data Analytics with AI",
    level: "Beginner to Advanced",
    learners: "From spreadsheets to models",
    rating: 4.5,
    live: false,
    cover: "bars",
  },
];

// ---- Procedural SVG covers (no stock art) ----------------------
function Cover({ variant }: { variant: CoverVariant }) {
  const common = {
    width: "100%",
    height: "100%",
    preserveAspectRatio: "xMidYMid slice",
  };
  const stroke = BRAND.mint;

  if (variant === "tree" || variant === "split") {
    // decision-tree motif
    const mirror = variant === "split";
    return (
      <svg viewBox="0 0 400 220" {...common} aria-hidden="true">
        <rect width="400" height="220" fill={BRAND.deep} />
        <g
          stroke={stroke}
          strokeWidth="1.5"
          opacity="0.9"
          transform={mirror ? "translate(400,0) scale(-1,1)" : undefined}
        >
          <line x1="200" y1="50" x2="120" y2="110" />
          <line x1="200" y1="50" x2="280" y2="110" />
          <line x1="120" y1="110" x2="80" y2="170" />
          <line x1="120" y1="110" x2="160" y2="170" />
          <line x1="280" y1="110" x2="240" y2="170" />
          <line x1="280" y1="110" x2="320" y2="170" />
        </g>
        <g transform={mirror ? "translate(400,0) scale(-1,1)" : undefined}>
          <circle cx="200" cy="50" r="14" fill={BRAND.primary} stroke={stroke} strokeWidth="2" />
          <circle cx="120" cy="110" r="11" fill={BRAND.primary} stroke={stroke} strokeWidth="2" />
          <circle cx="280" cy="110" r="11" fill={BRAND.primary} stroke={stroke} strokeWidth="2" />
          {[80, 160, 240, 320].map((x, i) => (
            <circle key={x} cx={x} cy="170" r="8" fill={i % 2 ? BRAND.mint : BRAND.primary} stroke={stroke} strokeWidth="1.5" />
          ))}
        </g>
      </svg>
    );
  }

  if (variant === "wave") {
    return (
      <svg viewBox="0 0 400 220" {...common} aria-hidden="true">
        <rect width="400" height="220" fill={BRAND.deep} />
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M0 ${90 + i * 30} C 100 ${60 + i * 30}, 180 ${130 + i * 26}, 400 ${80 + i * 30}`}
            fill="none"
            stroke={stroke}
            strokeWidth="1.5"
            opacity={0.85 - i * 0.18}
          />
        ))}
        <circle cx="300" cy="72" r="26" fill={BRAND.primary} opacity="0.9" />
      </svg>
    );
  }

  if (variant === "nodes") {
    return (
      <svg viewBox="0 0 400 220" {...common} aria-hidden="true">
        <rect width="400" height="220" fill={BRAND.deep} />
        <g stroke={stroke} strokeWidth="1" opacity="0.7">
          <line x1="80" y1="60" x2="200" y2="110" />
          <line x1="200" y1="110" x2="320" y2="70" />
          <line x1="200" y1="110" x2="140" y2="170" />
          <line x1="200" y1="110" x2="290" y2="165" />
          <line x1="80" y1="60" x2="140" y2="170" />
        </g>
        {[
          [80, 60, 10],
          [320, 70, 12],
          [200, 110, 16],
          [140, 170, 9],
          [290, 165, 11],
        ].map(([x, y, r]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r={r} fill={BRAND.primary} stroke={stroke} strokeWidth="2" />
        ))}
      </svg>
    );
  }

  if (variant === "bars") {
    return (
      <svg viewBox="0 0 400 220" {...common} aria-hidden="true">
        <rect width="400" height="220" fill={BRAND.deep} />
        {[50, 110, 170, 230, 290].map((x, i) => (
          <rect
            key={x}
            x={x}
            y={170 - (i + 1) * 22}
            width="36"
            height={(i + 1) * 22 + 10}
            rx="4"
            fill={i === 3 ? BRAND.mint : BRAND.primary}
            stroke={stroke}
            strokeWidth="1"
            opacity="0.95"
          />
        ))}
      </svg>
    );
  }

  // grid
  return (
    <svg viewBox="0 0 400 220" {...common} aria-hidden="true">
      <rect width="400" height="220" fill={BRAND.deep} />
      <g stroke={stroke} strokeWidth="0.75" opacity="0.35">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={40 + i * 40} y1="0" x2={40 + i * 40} y2="220" />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={30 + i * 40} x2="400" y2={30 + i * 40} />
        ))}
      </g>
      <rect x="120" y="70" width="160" height="80" rx="10" fill={BRAND.primary} stroke={stroke} strokeWidth="2" />
      <polygon points="185,95 185,125 215,110" fill={BRAND.mint} />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true">
      <path d="M12 2l2.9 6.6 7.1.7-5.4 4.8 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.3l7.1-.7L12 2z" />
    </svg>
  );
}

function CourseCard({ course }: { course: Course }) {
  const [hover, setHover] = useState(false);

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-200"
      style={{
        border: `1px solid ${hover ? BRAND.primary : "#E5E7EB"}`,
        boxShadow: hover
          ? "0 12px 28px rgba(14, 92, 88, 0.16)"
          : "0 1px 3px rgba(0, 0, 0, 0.06)",
        transform: hover ? "translateY(-4px)" : "none",
      }}
    >
      {/* Cover */}
      <div className="relative h-40 w-full overflow-hidden">
        <Cover variant={course.cover} />

        {/* Rating badge */}
        <span
          className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold text-white"
          style={{ backgroundColor: "rgba(0, 51, 52, 0.85)", backdropFilter: "blur(4px)" }}
        >
          <StarIcon />
          {course.rating}
        </span>

        {/* Live pill */}
        {course.live && (
          <span
            className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-white"
            style={{ backgroundColor: BRAND.primary }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: BRAND.mint }}
            />
            Live course
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold leading-snug text-gray-900">
          {course.title}
        </h3>

        <p className="flex items-center gap-2 text-sm text-gray-500">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 20h4V10H4v10zM10 20h4V4h-4v16zM16 20h4v-7h-4v7z" />
          </svg>
          {course.level}
        </p>

        {/* Footer row */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: BRAND.primary }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 17l6-6 4 4 8-8" />
              <path d="M14 7h7v7" />
            </svg>
            {course.learners}
          </span>

          <button
            className="rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors duration-150"
            style={{
              color: hover ? "#ffffff" : BRAND.primary,
              backgroundColor: hover ? BRAND.primary : BRAND.tint,
            }}
          >
            Explore now
          </button>
        </div>
      </div>
    </article>
  );
}

export default function CoursesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12" style={{ backgroundColor: "#FAFAF9" }}>
      {/* Section header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight" style={{ color: BRAND.deep }}>
          Courses
        </h2>
        <button
          className="rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors"
          style={{ borderColor: BRAND.primary, color: BRAND.primary }}
        >
          View all
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}