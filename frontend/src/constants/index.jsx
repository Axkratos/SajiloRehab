import { Healing, FitnessCenter, Timer, Assessment, Group, BarChart } from "@mui/icons-material";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Features", href: "#" },
  { label: "How it Works", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Testimonials", href: "#" },
];

export const testimonials = [
  {
    user: "Anup Adhikari",
    company: "Active Life Clinic",
    image: user1,
    text: "SajiloRehab has transformed the way we approach rehabilitation. The AI-powered exercises and real-time feedback have significantly improved our patients' recovery times.",
  },
  {
    user: "Xing liu",
    company: "Rehab First Center",
    image: user2,
    text: "As a physical therapist, I love how intuitive and personalized SajiloRehab is. It's easy to use and has really helped streamline our patient care.",
  },
  {
    user: "David Johnson",
    company: "MoveWell Physiotherapy",
    image: user3,
    text: "The real-time feedback provided by SajiloRehab has been a game-changer for my recovery. I feel more confident knowing I’m doing my exercises correctly.",
  },
  {
    user: "Ronee Brown",
    company: "Heal & Restore Therapy",
    image: user4,
    text: "Using SajiloRehab was like having a personal therapist guiding me through each session. I saw noticeable improvements in my recovery within weeks!",
  },
  {
    user: "Michael Wilson",
    company: "PhysioPro Clinic",
    image: user5,
    text: "I highly recommend SajiloRehab to anyone recovering from an injury. The personalized plans and progress tracking make the recovery process so much smoother.",
  },
  {
    user: "Emily Davis",
    company: "Peak Performance Physio",
    image: user6,
    text: "The AI-driven features helped me stick to my rehab plan and achieve my goals faster than I expected. It’s a fantastic tool for anyone in recovery!",
  },
];

export const features = [
  {
    icon: <Healing />,
    text: "Injury-Specific Programs",
    description:
      "Receive customized exercise plans tailored to your specific injury for optimal recovery and faster results.",
  },
  {
    icon: <FitnessCenter />,
    text: "Real-Time Form Corrections",
    description:
      "Get instant feedback on your form during exercises, ensuring you’re performing them correctly to avoid further injury.",
  },
  {
    icon: <Timer />,
    text: "Progress Tracking",
    description:
      "Monitor your progress over time with detailed reports on your recovery journey and stay motivated with achievable milestones.",
  },
  {
    icon: <Assessment />,
    text: "Detailed Exercise Guides",
    description:
      "Access easy-to-follow guides for each exercise, complete with step-by-step instructions and video demonstrations.",
  },
  {
    icon: <Group />,
    text: "Collaborative Care",
    description:
      "Share your progress and reports with your healthcare providers or physical therapists for seamless collaboration on your recovery.",
  },
  {
    icon: <BarChart />,
    text: "Data-Driven Insights",
    description:
      "Leverage data analytics to better understand your rehabilitation progress and make adjustments to your program as needed.",
  },
];

export const checklistItems = [
  {
    title: "Personalized Exercise Plans",
    description:
      "Receive AI-generated exercise plans based on your injury, fitness level, and goals, ensuring a faster and safer recovery.",
  },
  {
    title: "Real-Time Feedback",
    description:
      "Get instant corrections on your form and technique to ensure you're doing each exercise correctly and effectively.",
  },
  {
    title: "Track Your Progress",
    description:
      "Stay motivated by tracking your improvements with measurable milestones and detailed progress reports.",
  },
  {
    title: "Collaborative Care",
    description:
      "Share your progress with your therapist, allowing them to adjust your rehab plan based on your performance.",
  },
];

export const pricingOptions = [
  {
    title: "Basic",
    price: "$0",
    features: [
      "Access to basic exercise library",
      "AI-generated rehab plans",
      "Progress tracking",
      "Community support",
    ],
  },
  {
    title: "Pro",
    price: "$15",
    features: [
      "Advanced exercise library",
      "Real-time feedback & form corrections",
      "Detailed analytics & reports",
      "Progress sharing with healthcare providers",
    ],
  },
  {
    title: "Premium",
    price: "$50",
    features: [
      "Unlimited access to all exercises",
      "One-on-one virtual therapist consultations",
      "Personalized rehab plan adjustments",
      "Priority support",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started with SajiloRehab" },
  { href: "#", text: "Exercise Library" },
  { href: "#", text: "Recovery Tips" },
  { href: "#", text: "FAQ" },
  { href: "#", text: "Support" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "AI Technology" },
  { href: "#", text: "User Guide" },
  { href: "#", text: "Updates & Releases" },
];

export const communityLinks = [
  { href: "#", text: "Webinars" },
  { href: "#", text: "Physio Meetups" },
  { href: "#", text: "Health Conferences" },
  { href: "#", text: "Recovery Challenges" },
  { href: "#", text: "Careers" },
];
