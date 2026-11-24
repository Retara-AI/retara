export const APP_URL = "https://app.retara.com";
export const GITHUB_URL = "https://github.com/retara-project";
export const FIGMA_URL = "";
export const CONTACT_EMAIL = "contact@retara.com";

export const SITE_METADATA = {
  name: "Retara",
  tagline: "AI-Powered Eye Screening & Care Handoff",
  disclaimer:
    "Retara provides preliminary screening assistance only. It is not a medical device and does not provide clinical diagnosis. Always consult a qualified eye care professional for evaluation and treatment.",
};

export const NAV_LINKS = [
  { label: "The Problem", href: "#problem" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Product", href: "#screens" },
  { label: "Who It's For", href: "#roles" },
  { label: "Safety", href: "#safety" },
  { label: "FAQ", href: "#faq" },
];

/* ═══════════════════════════════════════
   Problem
   ═══════════════════════════════════════ */

export const PROBLEM_SECTION = {
  badge: "The Problem",
  title: "Millions Risk Preventable Vision Loss Every Year",
  subtitle:
    "Most sight-threatening conditions show no symptoms until it's too late. Early screening changes outcomes.",
  cards: [
    {
      title: "Silent Progression",
      description:
        "Conditions like diabetic retinopathy and glaucoma develop without pain or visual symptoms in early stages — when treatment is most effective.",
      icon: "eye-off" as const,
    },
    {
      title: "Limited Specialist Access",
      description:
        "Ophthalmologists and retinal imaging equipment are concentrated in major hospitals, leaving primary clinics and rural communities underserved.",
      icon: "map-pin" as const,
    },
    {
      title: "Broken Referral Chains",
      description:
        "Even when screening flags a concern, patients struggle to find the right specialist, leading to missed follow-ups and delayed care.",
      icon: "unlink" as const,
    },
  ],
};

/* ═══════════════════════════════════════
   How It Works
   ═══════════════════════════════════════ */

export const HOW_IT_WORKS_SECTION = {
  badge: "How It Works",
  title: "From Image to Insight in Three Steps",
  subtitle:
    "A streamlined workflow from retinal image capture to verified specialist referral.",
  steps: [
    {
      step: "01",
      title: "Upload & Validate",
      description:
        "Upload a retinal fundus or external eye photograph. Retara checks image quality, focus, and field of view before proceeding.",
      detail:
        "Automated quality checks prevent low-quality images from producing unreliable results.",
    },
    {
      step: "02",
      title: "AI Screening & Explainability",
      description:
        "Dual deep-learning models cross-analyze the image and produce risk indicators with Grad-CAM heatmaps showing exactly what the AI flagged.",
      detail:
        "Visual heatmaps let clinicians verify exactly which regions the model identified.",
    },
    {
      step: "03",
      title: "Connect to Care",
      description:
        "When concerns are flagged, Retara helps patients find nearby verified eye specialists and generates a downloadable preliminary report.",
      detail:
        "Seamless booking, specialist consultation, and longitudinal record tracking.",
    },
  ],
};

/* ═══════════════════════════════════════
   Features
   ═══════════════════════════════════════ */

export const FEATURES_SECTION = {
  badge: "Features",
  title: "Everything Your Clinic Needs for Intelligent Eye Screening",
  subtitle:
    "A complete platform covering image capture, AI analysis, care coordination, and patient follow-up.",
  features: [
    {
      title: "Fundus & Anterior Eye Screening",
      description:
        "Screen both posterior retinal fundus images and anterior segment photographs through dedicated analysis pipelines.",
      tag: "Screening",
      icon: "eye" as const,
    },
    {
      title: "Automated Image Quality Checks",
      description:
        "Before any analysis runs, images are assessed for blur, glare, and anatomical alignment to ensure reliable results.",
      tag: "Quality",
      icon: "shield-check" as const,
    },
    {
      title: "Explainable AI Heatmaps",
      description:
        "Grad-CAM overlays highlight exactly which retinal regions contributed to the screening result — no black boxes.",
      tag: "Explainability",
      icon: "layers" as const,
    },
    {
      title: "Clinical AI Assistant",
      description:
        "An integrated guidance tool that surfaces relevant ophthalmic references and educational context alongside results.",
      tag: "Guidance",
      icon: "message-circle" as const,
    },
    {
      title: "Doctor Discovery & Booking",
      description:
        "Patients can search for nearby ophthalmologists by location and availability, then book directly from the platform.",
      tag: "Referral",
      icon: "search" as const,
    },
    {
      title: "Pharmacy & Prescription Tracking",
      description:
        "Track prescribed medications, receive refill reminders, and verify prescription status at connected pharmacies.",
      tag: "Pharmacy",
      icon: "pill" as const,
    },
    {
      title: "Scan History & Progress Tracking",
      description:
        "Every screening result is archived with timestamps, letting patients and doctors track changes over time.",
      tag: "Records",
      icon: "clock" as const,
    },
  ],
};

/* ═══════════════════════════════════════
   Roles
   ═══════════════════════════════════════ */

export const ROLES_SECTION = {
  badge: "Who It's For",
  title: "Built for Your Entire Clinic",
  subtitle:
    "Every person in the care chain gets a dedicated, purpose-built experience.",
  roles: [
    {
      role: "Patients",
      headline: "Take charge of your eye health",
      icon: "heart-pulse" as const,
      benefits: [
        "Upload retinal scans and understand results with visual heatmaps",
        "Find and book verified ophthalmologists nearby",
        "Track screening history and medication reminders",
      ],
    },
    {
      role: "Doctors",
      headline: "Review AI-assisted screenings with confidence",
      icon: "stethoscope" as const,
      benefits: [
        "Audit AI heatmaps and confidence scores before making decisions",
        "Add clinical notes and manage patient consultations",
        "Access full patient screening history in one place",
      ],
    },
    {
      role: "Clinics",
      headline: "Streamline your screening operations",
      icon: "building-2" as const,
      benefits: [
        "Onboard doctors and manage practitioner schedules",
        "Monitor screening volume and triage queues",
        "Coordinate multi-doctor workflows from a single dashboard",
      ],
    },
    {
      role: "Pharmacies",
      headline: "Close the loop on prescriptions",
      icon: "pill" as const,
      benefits: [
        "Receive and verify digital prescription orders",
        "Track dispensing status and patient pickup",
        "Get inventory alerts for critical eye medications",
      ],
    },
  ],
};

/* ═══════════════════════════════════════
   Safety
   ═══════════════════════════════════════ */

export const SAFETY_SECTION = {
  badge: "Trust & Safety",
  title: "Security and Privacy at Every Layer",
  subtitle:
    "Your patients' data is protected by strict access controls, full audit trails, and transparent consent workflows.",
  points: [
    {
      title: "Screening, Not Diagnosis",
      description:
        "Retara outputs are risk indicators designed to prompt formal clinical evaluation. They are not medical diagnoses.",
      icon: "shield-alert" as const,
    },
    {
      title: "Informed Consent Built In",
      description:
        "Patients provide explicit digital consent before any image is captured or processed, with clear data handling explanations.",
      icon: "file-check-2" as const,
    },
    {
      title: "Strict Access Controls",
      description:
        "Medical records and imaging data are partitioned so only authorized clinical staff assigned to a patient can view their records.",
      icon: "lock" as const,
    },
    {
      title: "Complete Audit Trail",
      description:
        "Every data access event, screening request, and clinical note is timestamped and logged for full traceability.",
      icon: "scroll-text" as const,
    },
  ],
};

/* ═══════════════════════════════════════
   FAQ
   ═══════════════════════════════════════ */

export const FAQ_SECTION = {
  badge: "FAQ",
  title: "Frequently Asked Questions",
  subtitle:
    "Common questions about how Retara works, what it does, and what it doesn't.",
  faqs: [
    {
      question: "Is Retara a certified medical device?",
      answer:
        "No. Retara is a preliminary screening tool and is not approved by the FDA, CE, or any regulatory body. It should not be used as a substitute for professional clinical diagnosis. Always consult a qualified ophthalmologist.",
    },
    {
      question: "What conditions does the screening cover?",
      answer:
        "The screening pipeline focuses on signs associated with diabetic retinopathy and common structural anomalies in fundus photographs, as well as basic anterior segment checks. All outputs are model predictions, not clinical findings.",
    },
    {
      question: "How does image quality validation work?",
      answer:
        "Before running any AI analysis, Retara checks each image for clarity, blur, dynamic range, and field of view. Images that don't meet quality thresholds are flagged for recapture to prevent unreliable results.",
    },
    {
      question: "What are the explainability heatmaps?",
      answer:
        "Retara uses Grad-CAM (Gradient-weighted Class Activation Mapping) to produce visual overlays showing which regions of the retinal image most influenced the model's screening result.",
    },
    {
      question: "How is patient data protected?",
      answer:
        "Data is protected with strict access controls, encrypted storage, HTTPS transmission, and comprehensive audit logs. Imaging is processed only with explicit patient consent.",
    },
    {
      question: "Can patients book appointments with doctors?",
      answer:
        "Yes. The platform includes a doctor discovery module where patients can search for nearby specialists, check available time slots, and share their screening report directly with the clinician.",
    },
  ],
};

/* ═══════════════════════════════════════
   Screen Gallery
   ═══════════════════════════════════════ */

export type ScreenRole = "all" | "patient" | "doctor" | "clinic" | "pharmacy";

export interface Screen {
  src: string;
  alt: string;
  role: ScreenRole;
  caption: string;
}

export const SCREENS_SECTION = {
  badge: "Product",
  title: "See Retara in Action",
  subtitle:
    "Explore the platform screens for every workflow — from patient signup to pharmacy fulfillment.",
};

export const screens: Screen[] = [
  {
    src: "/screens/pid01.webp",
    alt: "Secure login screen for all Retara users",
    role: "all",
    caption: "Sign in securely to your personalized dashboard",
  },
  {
    src: "/screens/pid02.webp",
    alt: "Password change screen with security verification",
    role: "all",
    caption: "Update your credentials with built-in security checks",
  },
  {
    src: "/screens/pid03.webp",
    alt: "Patient registration form with guided onboarding",
    role: "patient",
    caption: "Create your patient account in under a minute",
  },
  {
    src: "/screens/pid04.webp",
    alt: "Email verification step during patient onboarding",
    role: "patient",
    caption: "Verify your email to activate your secure health profile",
  },
  {
    src: "/screens/pid05.webp",
    alt: "Administrative dashboard for onboarding clinics and pharmacies",
    role: "clinic",
    caption: "Onboard new clinics and pharmacies from a single control center",
  },
  {
    src: "/screens/pid06.webp",
    alt: "Account creation form for registering new healthcare partners",
    role: "clinic",
    caption: "Register new healthcare partners with guided account setup",
  },
  {
    src: "/screens/pid07.webp",
    alt: "Clinic operations dashboard with screening volume and staff management",
    role: "clinic",
    caption: "Monitor screening volume and manage your clinical team",
  },
  {
    src: "/screens/pid08.webp",
    alt: "Doctor onboarding form for clinic administrators",
    role: "clinic",
    caption: "Add new practitioners to your clinic in seconds",
  },
  {
    src: "/screens/pid09.webp",
    alt: "Doctor dashboard with patient queue and screening results",
    role: "doctor",
    caption: "Manage your patient queue and review AI-assisted screenings",
  },
  {
    src: "/screens/pid10.webp",
    alt: "Doctor profile editor for credentials and availability",
    role: "doctor",
    caption: "Keep your profile and availability up to date for patients",
  },
  {
    src: "/screens/pid11.webp",
    alt: "Patient home dashboard showing screening history and quick actions",
    role: "patient",
    caption: "Your personal eye health dashboard at a glance",
  },
  {
    src: "/screens/pid12.webp",
    alt: "Doctor search interface with location and availability filters",
    role: "patient",
    caption: "Find verified ophthalmologists near you instantly",
  },
  {
    src: "/screens/pid13.webp",
    alt: "Doctor profile page showing credentials and booking options",
    role: "patient",
    caption: "Review specialist credentials and book your appointment",
  },
];
