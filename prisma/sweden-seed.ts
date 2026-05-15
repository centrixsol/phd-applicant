/**
 * Sweden PhD Programs Seed
 * All positions are fully funded (employment contracts, not scholarships)
 * Stipend: ~28,000–33,000 SEK/month (~$32,000–$38,000/yr)
 * Ranked by QS World University Rankings
 * Primary portal: Varbi (varbi.com/en)
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const swedenUniversities = [
  // ─── QS Rank ~40 (medical/life sciences focus) ───────────────────────────
  {
    name: "Karolinska Institute",
    country: "Sweden",
    city: "Stockholm",
    qsRanking: 40,
    website: "https://ki.se/en",
    portalType: "Varbi",
    programs: [
      {
        name: "PhD in Medical Artificial Intelligence",
        dept: "Department of Medicine",
        stipend: 36000,
        deadline: "Rolling",
        areas: ["AI for Healthcare", "Deep Learning", "Medical Imaging", "Clinical AI"],
        url: "https://varbi.com/ki/what:job/jobID:760000/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Fully funded 4-year PhD position focusing on AI applications in clinical medicine and medical imaging at one of the world's top medical universities.",
      },
      {
        name: "PhD in Computational Neuroscience & AI",
        dept: "Department of Neuroscience",
        stipend: 35000,
        deadline: "Rolling",
        areas: ["Computational Neuroscience", "Machine Learning", "AI for Healthcare", "Neural Modeling"],
        url: "https://varbi.com/ki/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research at the intersection of neuroscience and AI, building computational models of brain function.",
      },
      {
        name: "PhD in Bioinformatics & Machine Learning",
        dept: "Department of Biochemistry & Biophysics",
        stipend: 35000,
        deadline: "Rolling",
        areas: ["Bioinformatics", "Machine Learning", "Genomics AI", "AI for Healthcare"],
        url: "https://varbi.com/ki/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Developing ML methods for genomics, proteomics, and personalized medicine at a world-leading biomedical research institute.",
      },
    ],
  },

  // ─── QS Rank ~76 ─────────────────────────────────────────────────────────
  {
    name: "KTH Royal Institute of Technology",
    country: "Sweden",
    city: "Stockholm",
    qsRanking: 76,
    website: "https://kth.se/en",
    portalType: "Varbi",
    programs: [
      {
        name: "PhD in Machine Learning",
        dept: "Division of Robotics, Perception and Learning",
        stipend: 38000,
        deadline: "Rolling",
        areas: ["Deep Learning", "Machine Learning", "Reinforcement Learning", "Computer Vision"],
        url: "https://varbi.com/kth/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research in machine learning and perception at Sweden's leading technical university, with strong industry collaborations with Ericsson, SAAB, and Scania.",
      },
      {
        name: "PhD in Artificial Intelligence & Robotics",
        dept: "Division of Robotics, Perception and Learning",
        stipend: 38000,
        deadline: "Rolling",
        areas: ["Robotics", "AI Safety", "Autonomous Systems", "Human-Robot Interaction"],
        url: "https://varbi.com/kth/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Cutting-edge research in autonomous robots and AI-driven systems in collaboration with the European Robotics Research Network.",
      },
      {
        name: "PhD in Natural Language Processing",
        dept: "Division of Language Technology",
        stipend: 36000,
        deadline: "Rolling",
        areas: ["Natural Language Processing", "Large Language Models", "Multilingual AI", "Text Mining"],
        url: "https://varbi.com/kth/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research in NLP, speech recognition, and multilingual AI systems at the forefront of Scandinavian computational linguistics.",
      },
      {
        name: "PhD in Computer Vision & Deep Learning",
        dept: "Division of Robotics, Perception and Learning",
        stipend: 38000,
        deadline: "Rolling",
        areas: ["Computer Vision", "Deep Learning", "3D Vision", "Medical Imaging"],
        url: "https://varbi.com/kth/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research on visual perception and deep learning for autonomous driving, industrial inspection, and medical diagnostics.",
      },
      {
        name: "PhD in Sustainable AI & Green Computing",
        dept: "School of Electrical Engineering and Computer Science",
        stipend: 36000,
        deadline: "Rolling",
        areas: ["Sustainable AI", "Optimization", "Energy-Efficient ML", "Green Computing"],
        url: "https://varbi.com/kth/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research on reducing the environmental impact of AI systems and building energy-efficient machine learning models.",
      },
    ],
  },

  // ─── QS Rank ~99 ─────────────────────────────────────────────────────────
  {
    name: "Uppsala University",
    country: "Sweden",
    city: "Uppsala",
    qsRanking: 99,
    website: "https://uu.se/en",
    portalType: "Varbi",
    programs: [
      {
        name: "PhD in Machine Learning & Statistics",
        dept: "Department of Statistics",
        stipend: 34000,
        deadline: "Rolling",
        areas: ["Statistical Learning", "Bayesian ML", "Causal Inference", "Machine Learning"],
        url: "https://varbi.com/uu/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Statistical machine learning research at one of Scandinavia's oldest and most prestigious universities, with focus on Bayesian methods and causal AI.",
      },
      {
        name: "PhD in Computer Science (AI & ML)",
        dept: "Department of Information Technology",
        stipend: 34000,
        deadline: "Rolling",
        areas: ["Machine Learning", "AI Systems", "Deep Learning", "Federated Learning"],
        url: "https://varbi.com/uu/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research in AI systems, distributed ML, and deep learning at a university ranked in the global top 100.",
      },
      {
        name: "PhD in Computational Science & AI",
        dept: "Department of Mathematics",
        stipend: 34000,
        deadline: "Rolling",
        areas: ["Optimization", "Numerical ML", "Scientific AI", "ML Theory"],
        url: "https://varbi.com/uu/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Applying AI and ML to scientific computing challenges including climate modeling, materials discovery, and drug design.",
      },
      {
        name: "PhD in Human-Computer Interaction & AI",
        dept: "Department of Information Technology",
        stipend: 33000,
        deadline: "Rolling",
        areas: ["Human-AI Interaction", "Explainable AI", "UX Research", "Responsible AI"],
        url: "https://varbi.com/uu/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research on responsible AI design, explainability, and human-centered approaches to machine learning systems.",
      },
    ],
  },

  // ─── QS Rank ~100 ────────────────────────────────────────────────────────
  {
    name: "Lund University",
    country: "Sweden",
    city: "Lund",
    qsRanking: 100,
    website: "https://lu.se/en",
    portalType: "Varbi",
    programs: [
      {
        name: "PhD in Artificial Intelligence",
        dept: "Department of Computer Science",
        stipend: 34000,
        deadline: "Rolling",
        areas: ["Machine Learning", "Deep Learning", "AI Safety", "Probabilistic AI"],
        url: "https://varbi.com/lu/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research in AI and machine learning at Lund University, one of Scandinavia's most internationally renowned universities with 40,000 students.",
      },
      {
        name: "PhD in Computer Vision & Autonomous Systems",
        dept: "Centre for Mathematical Sciences",
        stipend: 34000,
        deadline: "Rolling",
        areas: ["Computer Vision", "Autonomous Driving", "Deep Learning", "3D Reconstruction"],
        url: "https://varbi.com/lu/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "World-class research in computer vision at Lund's Centre for Mathematical Sciences, with direct collaboration with Volvo and other automotive leaders.",
      },
      {
        name: "PhD in NLP & Language Technology",
        dept: "Centre for Languages and Literature",
        stipend: 33000,
        deadline: "Rolling",
        areas: ["Natural Language Processing", "Computational Linguistics", "Multilingual NLP", "Text Analytics"],
        url: "https://varbi.com/lu/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research in computational linguistics and NLP with a strong focus on Scandinavian language technology and multilingual systems.",
      },
      {
        name: "PhD in Data Science & Knowledge Discovery",
        dept: "Department of Statistics",
        stipend: 33000,
        deadline: "Rolling",
        areas: ["Data Science", "Statistical ML", "Knowledge Discovery", "Causal Inference"],
        url: "https://varbi.com/lu/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Interdisciplinary data science research combining statistics, machine learning, and domain knowledge for impactful applications.",
      },
    ],
  },

  // ─── QS Rank ~107 ────────────────────────────────────────────────────────
  {
    name: "Stockholm University",
    country: "Sweden",
    city: "Stockholm",
    qsRanking: 107,
    website: "https://su.se/english",
    portalType: "Varbi",
    programs: [
      {
        name: "PhD in Computer and Systems Sciences (ML)",
        dept: "Department of Computer and Systems Sciences",
        stipend: 32000,
        deadline: "Rolling",
        areas: ["Machine Learning", "Data Science", "AI Systems", "Information Retrieval"],
        url: "https://varbi.com/su/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research in machine learning and intelligent systems at Stockholm's flagship research university, located in the heart of the European AI capital.",
      },
      {
        name: "PhD in Computational Linguistics & NLP",
        dept: "Department of Linguistics",
        stipend: 32000,
        deadline: "Rolling",
        areas: ["Computational Linguistics", "NLP", "Language Modeling", "Discourse Analysis"],
        url: "https://varbi.com/su/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research at the intersection of linguistics and AI, building better language models with a focus on Swedish and Nordic languages.",
      },
      {
        name: "PhD in Mathematical Statistics & ML",
        dept: "Department of Mathematics",
        stipend: 32000,
        deadline: "Rolling",
        areas: ["Bayesian ML", "Statistical Learning", "ML Theory", "Probabilistic AI"],
        url: "https://varbi.com/su/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Theoretical foundations of machine learning and statistical methods for modern AI systems.",
      },
    ],
  },

  // ─── QS Rank ~113 ────────────────────────────────────────────────────────
  {
    name: "Chalmers University of Technology",
    country: "Sweden",
    city: "Gothenburg",
    qsRanking: 113,
    website: "https://chalmers.se/en",
    portalType: "Varbi",
    programs: [
      {
        name: "PhD in Machine Learning & AI",
        dept: "Department of Computer Science and Engineering",
        stipend: 36000,
        deadline: "Rolling",
        areas: ["Machine Learning", "Deep Learning", "Probabilistic AI", "Optimization"],
        url: "https://varbi.com/chalmerssek/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research at one of Europe's leading technical universities, with strong links to the Wallenberg AI, Autonomous Systems and Software Program (WASP).",
      },
      {
        name: "PhD in Autonomous Vehicles & Deep Learning",
        dept: "CHAIR Autonomous Systems",
        stipend: 38000,
        deadline: "Rolling",
        areas: ["Autonomous Driving", "Computer Vision", "Deep Learning", "Sensor Fusion"],
        url: "https://varbi.com/chalmerssek/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Industry-funded research in autonomous vehicles and perception systems, collaborating directly with Volvo Cars, Zenseact, and Veoneer.",
      },
      {
        name: "PhD in AI for Sustainable Energy",
        dept: "Department of Space, Earth and Environment",
        stipend: 36000,
        deadline: "Rolling",
        areas: ["Sustainable AI", "Energy Systems AI", "Optimization", "Scientific AI"],
        url: "https://varbi.com/chalmerssek/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Applying AI and machine learning to optimize renewable energy systems, grid management, and climate modeling.",
      },
      {
        name: "PhD in Signal Processing & Machine Learning",
        dept: "Department of Electrical Engineering",
        stipend: 36000,
        deadline: "Rolling",
        areas: ["Signal Processing", "Machine Learning", "Communication Systems", "Deep Learning"],
        url: "https://varbi.com/chalmerssek/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research on signal processing, wireless communications, and machine learning for 6G and beyond, in collaboration with Ericsson.",
      },
      {
        name: "PhD in Explainable AI & Trustworthy ML",
        dept: "Department of Computer Science and Engineering",
        stipend: 35000,
        deadline: "Rolling",
        areas: ["Explainable AI", "AI Safety", "Trustworthy ML", "Fairness in ML"],
        url: "https://varbi.com/chalmerssek/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research on building transparent, fair, and trustworthy AI systems compliant with EU AI Act requirements.",
      },
    ],
  },

  // ─── QS Rank ~209 ────────────────────────────────────────────────────────
  {
    name: "University of Gothenburg",
    country: "Sweden",
    city: "Gothenburg",
    qsRanking: 209,
    website: "https://gu.se/en",
    portalType: "Varbi",
    programs: [
      {
        name: "PhD in Applied Data Science",
        dept: "Department of Applied IT",
        stipend: 32000,
        deadline: "Rolling",
        areas: ["Data Science", "Machine Learning", "Data Mining", "Knowledge Discovery"],
        url: "https://varbi.com/gu/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research in applied data science and ML for societal applications including public health, urban planning, and sustainability.",
      },
      {
        name: "PhD in Natural Language Processing & Digital Humanities",
        dept: "Department of Swedish",
        stipend: 31000,
        deadline: "Rolling",
        areas: ["NLP", "Computational Linguistics", "Digital Humanities", "Text Mining"],
        url: "https://varbi.com/gu/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Interdisciplinary NLP research combining computational methods with humanities scholarship.",
      },
      {
        name: "PhD in AI for Life Sciences",
        dept: "Department of Chemistry and Molecular Biology",
        stipend: 33000,
        deadline: "Rolling",
        areas: ["AI for Healthcare", "Drug Discovery AI", "Molecular ML", "Bioinformatics"],
        url: "https://varbi.com/gu/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Applying ML and AI to drug discovery, protein structure prediction, and molecular simulation.",
      },
    ],
  },

  // ─── QS Rank ~355 ────────────────────────────────────────────────────────
  {
    name: "Linköping University",
    country: "Sweden",
    city: "Linköping",
    qsRanking: 355,
    website: "https://liu.se/en",
    portalType: "Varbi",
    programs: [
      {
        name: "PhD in Machine Learning (WASP)",
        dept: "Department of Computer and Information Science",
        stipend: 34000,
        deadline: "Rolling",
        areas: ["Machine Learning", "Deep Learning", "Probabilistic Graphical Models", "Reinforcement Learning"],
        url: "https://varbi.com/liu/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Part of Sweden's WASP (Wallenberg AI, Autonomous Systems and Software Program) with generous additional funding for conference travel and collaboration.",
      },
      {
        name: "PhD in Computer Vision & Medical Imaging",
        dept: "Center for Medical Image Science and Visualization",
        stipend: 34000,
        deadline: "Rolling",
        areas: ["Computer Vision", "Medical Imaging", "Deep Learning", "AI for Healthcare"],
        url: "https://varbi.com/liu/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research at the CMIV center for medical image analysis, one of the world's leading centers for radiology AI.",
      },
      {
        name: "PhD in AI & Autonomous Systems",
        dept: "Department of Electrical Engineering",
        stipend: 34000,
        deadline: "Rolling",
        areas: ["Autonomous Systems", "AI Safety", "Control Theory", "Machine Learning"],
        url: "https://varbi.com/liu/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research in AI-controlled autonomous systems for aerospace, automotive, and industrial applications in collaboration with SAAB and Airbus.",
      },
      {
        name: "PhD in Human-Centered AI",
        dept: "Department of Computer and Information Science",
        stipend: 32000,
        deadline: "Rolling",
        areas: ["Human-AI Interaction", "Responsible AI", "Explainable AI", "Social Computing"],
        url: "https://varbi.com/liu/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research on designing human-centered AI systems, with focus on ethics, transparency, and social impact.",
      },
    ],
  },

  // ─── QS Rank ~401 ────────────────────────────────────────────────────────
  {
    name: "Umeå University",
    country: "Sweden",
    city: "Umeå",
    qsRanking: 401,
    website: "https://umu.se/en",
    portalType: "Varbi",
    programs: [
      {
        name: "PhD in Computing Science (ML)",
        dept: "Department of Computing Science",
        stipend: 31000,
        deadline: "Rolling",
        areas: ["Machine Learning", "Deep Learning", "Graph Neural Networks", "Optimization"],
        url: "https://varbi.com/umu/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research in machine learning algorithms and applications in a smaller university city known for excellent research culture and quality of life.",
      },
      {
        name: "PhD in AI for Climate & Environment",
        dept: "Department of Ecology and Environmental Sciences",
        stipend: 31000,
        deadline: "Rolling",
        areas: ["Scientific AI", "Climate Modeling", "Environmental ML", "Sustainable AI"],
        url: "https://varbi.com/umu/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Applying ML and AI to climate change modeling, ecosystem monitoring, and environmental prediction.",
      },
      {
        name: "PhD in Biomedical Data Science",
        dept: "Department of Public Health and Clinical Medicine",
        stipend: 31000,
        deadline: "Rolling",
        areas: ["AI for Healthcare", "Bioinformatics", "Statistical ML", "Data Science"],
        url: "https://varbi.com/umu/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research at the intersection of biomedical research and data science, leveraging one of Sweden's largest biobanks.",
      },
    ],
  },

  // ─── QS Rank ~551-600 ────────────────────────────────────────────────────
  {
    name: "Örebro University",
    country: "Sweden",
    city: "Örebro",
    qsRanking: 575,
    website: "https://oru.se/english",
    portalType: "Varbi",
    programs: [
      {
        name: "PhD in Robotics & Artificial Intelligence",
        dept: "Center for Applied Autonomous Sensor Systems (AASS)",
        stipend: 30000,
        deadline: "Rolling",
        areas: ["Robotics", "Autonomous Systems", "Deep Learning", "SLAM"],
        url: "https://varbi.com/oru/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research in service robotics and intelligent autonomous systems at the AASS center, one of Europe's leading centers for applied robotics research.",
      },
      {
        name: "PhD in Machine Learning & Data Analytics",
        dept: "School of Science and Technology",
        stipend: 29000,
        deadline: "Rolling",
        areas: ["Machine Learning", "Data Analytics", "Pattern Recognition", "AI Systems"],
        url: "https://varbi.com/oru/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research in ML and intelligent data analytics with strong emphasis on real-world applications.",
      },
    ],
  },

  // ─── QS Rank ~601-650 ────────────────────────────────────────────────────
  {
    name: "Malmö University",
    country: "Sweden",
    city: "Malmö",
    qsRanking: 625,
    website: "https://mau.se/en",
    portalType: "Varbi",
    programs: [
      {
        name: "PhD in AI & Society",
        dept: "Department of Computer Science and Media Technology",
        stipend: 28000,
        deadline: "Rolling",
        areas: ["Responsible AI", "AI & Society", "Human-AI Interaction", "Social Computing"],
        url: "https://varbi.com/mau/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research on the societal impact of AI systems, focusing on fairness, accountability, and human-centered design.",
      },
      {
        name: "PhD in Computer Vision & Game AI",
        dept: "Department of Computer Science and Media Technology",
        stipend: 28000,
        deadline: "Rolling",
        areas: ["Computer Vision", "Game AI", "Deep Learning", "Interactive AI"],
        url: "https://varbi.com/mau/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research on computer vision and AI for interactive media, gaming, and creative applications.",
      },
    ],
  },

  // ─── QS Rank ~651-700 ────────────────────────────────────────────────────
  {
    name: "Mid Sweden University",
    country: "Sweden",
    city: "Sundsvall",
    qsRanking: 675,
    website: "https://miun.se/en",
    portalType: "Varbi",
    programs: [
      {
        name: "PhD in Information Systems & Machine Learning",
        dept: "Department of Information Systems and Technology",
        stipend: 28000,
        deadline: "Rolling",
        areas: ["Machine Learning", "Information Systems", "Data Science", "IoT AI"],
        url: "https://varbi.com/miun/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research in ML applied to information systems, IoT, and industrial applications in collaboration with regional industry.",
      },
    ],
  },

  // ─── QS Rank ~701-750 ────────────────────────────────────────────────────
  {
    name: "Jönköping University",
    country: "Sweden",
    city: "Jönköping",
    qsRanking: 725,
    website: "https://ju.se/en",
    portalType: "Varbi",
    programs: [
      {
        name: "PhD in Industrial AI & Smart Manufacturing",
        dept: "School of Engineering",
        stipend: 28000,
        deadline: "Rolling",
        areas: ["Industrial AI", "Smart Manufacturing", "Machine Learning", "Optimization"],
        url: "https://varbi.com/ju/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research in AI-driven smart manufacturing and Industry 4.0, with direct collaboration with Swedish manufacturing companies.",
      },
    ],
  },

  // ─── QS Rank ~801-1000 ───────────────────────────────────────────────────
  {
    name: "Halmstad University",
    country: "Sweden",
    city: "Halmstad",
    qsRanking: 900,
    website: "https://hh.se/english",
    portalType: "Varbi",
    programs: [
      {
        name: "PhD in Intelligent Systems & Machine Learning",
        dept: "Center for Applied Intelligent Systems Research (CAISR)",
        stipend: 28000,
        deadline: "Rolling",
        areas: ["Machine Learning", "Intelligent Systems", "Anomaly Detection", "Industrial AI"],
        url: "https://varbi.com/hh/what:job/",
        greRequired: false,
        toeflMin: 90,
        ieltsMin: 6.5,
        description: "Research at the CAISR center with focus on intelligent systems, anomaly detection, and predictive maintenance for industrial applications.",
      },
    ],
  },
];

async function seedSweden() {
  console.log("Seeding Swedish PhD programs...");

  for (const uniData of swedenUniversities) {
    const { programs, ...uniInfo } = uniData;

    let university = await prisma.university.findFirst({
      where: { name: uniInfo.name },
    });

    if (!university) {
      university = await prisma.university.create({
        data: {
          name: uniInfo.name,
          country: uniInfo.country,
          city: uniInfo.city,
          qsRanking: uniInfo.qsRanking,
          website: uniInfo.website,
        },
      });
      console.log(`  Created: ${university.name} (QS #${university.qsRanking})`);
    } else {
      university = await prisma.university.update({
        where: { id: university.id },
        data: { qsRanking: uniInfo.qsRanking, website: uniInfo.website },
      });
      console.log(`  Updated: ${university.name} (QS #${university.qsRanking})`);
    }

    for (const prog of programs) {
      const existing = await prisma.program.findFirst({
        where: { universityId: university.id, name: prog.name },
      });

      const programData = {
        universityId: university.id,
        name: prog.name,
        department: prog.dept,
        degree: "PhD",
        fullyFunded: true,
        stipendUSD: prog.stipend,
        deadline: prog.deadline,
        duration: "4 years",
        greRequired: prog.greRequired,
        toeflMin: prog.toeflMin,
        ieltsMin: prog.ieltsMin,
        applicationUrl: prog.url,
        portalType: uniData.portalType,
        researchAreas: JSON.stringify(prog.areas),
        description: prog.description,
      };

      if (!existing) {
        await prisma.program.create({ data: programData });
        console.log(`    + ${prog.name}`);
      } else {
        await prisma.program.update({ where: { id: existing.id }, data: programData });
        console.log(`    ~ ${prog.name} (updated)`);
      }
    }
  }

  const total = await prisma.program.count({ where: { university: { country: "Sweden" } } });
  console.log(`\nDone! Total Swedish PhD programs in DB: ${total}`);
}

seedSweden()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
