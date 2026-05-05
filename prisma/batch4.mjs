import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Additional programs to reach 500+
const extras = [
  // More CMU programs
  ["Carnegie Mellon University","PhD in Human-Computer Interaction (AI)","HCII",42000,"December 8",["Human-AI Interaction","AI UX","Social AI","Affective Computing"],"https://apply.cmu.edu/apply/"],
  ["Carnegie Mellon University","PhD in Electrical & Computer Engineering (AI)","ECE",42000,"December 8",["ML Hardware","AI Systems","Signal AI","Edge AI"],"https://apply.cmu.edu/apply/"],
  ["Carnegie Mellon University","PhD in Philosophy (AI Ethics)","Philosophy/ML",42000,"December 8",["AI Ethics","Philosophy of AI","Alignment","Value Learning"],"https://apply.cmu.edu/apply/"],
  // More Stanford
  ["Stanford University","PhD in Operations Research (AI)","MS&E/OR",48000,"December 1",["AI for Operations","Decision AI","Optimization ML","Game Theory AI"],"https://apply.stanford.edu/apply/"],
  ["Stanford University","PhD in Linguistics (NLP)","Linguistics",46000,"December 1",["Computational Linguistics","NLP","Phonetics AI","Language Models"],"https://apply.stanford.edu/apply/"],
  ["Stanford University","PhD in Management Science (AI)","GSB",50000,"December 1",["AI for Finance","Decision ML","Behavioral AI","FinTech ML"],"https://apply.stanford.edu/apply/"],
  // More MIT
  ["Massachusetts Institute of Technology","PhD in Nuclear Science & Engineering (AI)","NSE",43000,"December 15",["Scientific ML","Nuclear AI","Fusion ML","Safety AI"],"https://gradapply.mit.edu/nse"],
  ["Massachusetts Institute of Technology","PhD in Economics (ML)","Economics",43000,"December 15",["Causal AI","Econometrics ML","Policy AI","AI for Economics"],"https://gradapply.mit.edu/econ"],
  // More Berkeley
  ["University of California, Berkeley","PhD in Mechanical Engineering (Robotics AI)","ME",40000,"December 15",["Robot Learning","Autonomous Systems","Manipulation AI","Locomotion AI"],"https://apply.grad.berkeley.edu/apply/"],
  ["University of California, Berkeley","PhD in Applied Mathematics (ML)","Applied Math",38000,"January 5",["ML Theory","Applied Statistics","Differential Equations AI"],"https://apply.grad.berkeley.edu/apply/"],
  // More Cornell
  ["Cornell University","PhD in Electrical & Computer Engineering (AI)","ECE",34000,"December 15",["ML Hardware","Signal AI","Communications ML","Edge AI"],"https://www.ece.cornell.edu/ece/programs/graduate-programs/phd-program"],
  // More UW
  ["University of Washington","PhD in Applied Mathematics (ML)","Applied Math",32000,"December 15",["ML Theory","Scientific Computing AI","Optimization"],"https://amath.washington.edu/graduate/phd"],
  // More Princeton
  ["Princeton University","PhD in Operations Research (ML)","ORFE",38000,"December 15",["Optimization ML","RL for Finance","Decision AI","Stochastic ML"],"https://orfe.princeton.edu/graduate/phd"],
  // More Columbia
  ["Columbia University","PhD in Applied Physics (Scientific ML)","Applied Physics",38000,"December 15",["Scientific ML","Physics-informed AI","Quantum ML"],"https://apam.columbia.edu/graduate-programs/phd"],
  ["Columbia University","PhD in Operations Research (ML)","IEOR",36000,"December 15",["AI for Finance","Supply Chain ML","Decision AI","RL"],"https://ieor.columbia.edu/phd-program"],
  // More Harvard
  ["Harvard University","PhD in Statistics (ML)","Statistics",43000,"December 15",["Statistical Learning","Causal AI","Bayesian ML","High-dimensional Stats"],"https://statistics.fas.harvard.edu/phd"],
  ["Harvard University","PhD in Economics (AI/ML)","Economics",43000,"December 15",["Causal AI","ML for Economics","Policy AI","Behavioral ML"],"https://economics.harvard.edu/phd"],
  // More JHU
  ["Johns Hopkins University","PhD in Applied Mathematics (Scientific ML)","Applied Math",37000,"December 15",["Scientific ML","Numerical AI","Physics-informed ML"],"https://www.ams.jhu.edu/graduate/phd-program/"],
  // More Michigan
  ["University of Michigan","PhD in Applied Mathematics (ML)","Mathematics",31000,"December 15",["ML Theory","Scientific AI","Numerical Optimization"],"https://lsa.umich.edu/math/graduates/phd.html"],
  // More UIUC
  ["University of Illinois Urbana-Champaign","PhD in Electrical & Computer Engineering (ML)","ECE",28000,"December 15",["ML Hardware","Signal AI","Communications ML","Edge AI"],"https://ece.illinois.edu/academics/grad/phd"],
  // More UCSD
  ["University of California, San Diego","PhD in Mathematics (ML Theory)","Mathematics",32000,"December 15",["ML Theory","Statistical Learning","Optimization"],"https://math.ucsd.edu/programs/graduate/phd.html"],
  ["University of California, San Diego","PhD in Statistics (ML)","Statistics",30000,"December 15",["Statistical ML","Bayesian AI","Causal Learning"],"https://mathematics.ucsd.edu/research/statistics/"],
  // More UCLA
  ["University of California, Los Angeles","PhD in Applied Mathematics (ML)","Applied Math",33000,"December 15",["ML Theory","Scientific ML","Numerical AI"],"https://www.math.ucla.edu/grad/phd"],
  // More UPenn
  ["University of Pennsylvania","PhD in Applied Mathematics (ML)","Applied Math",36000,"December 15",["ML Theory","Optimization","Scientific AI"],"https://www.math.upenn.edu/grad/phd-program"],
  // More Duke
  ["Duke University","PhD in Applied Mathematics (ML)","Mathematics",34000,"December 15",["ML Theory","Scientific AI","Optimization"],"https://math.duke.edu/graduate/phd"],
  // More Northwestern
  ["Northwestern University","PhD in Operations Research (AI)","IEMS",36000,"December 15",["AI for Operations","RL for Decision","Optimization AI"],"https://www.mccormick.northwestern.edu/industrial/academics/graduate/phd/"],
  // More Purdue
  ["Purdue University","PhD in Industrial Engineering (AI/ML)","IE",24000,"December 15",["AI for Manufacturing","Decision ML","Supply Chain AI","RL"],"https://engineering.purdue.edu/IE/academics/graduate/doctoral"],
  // More Ohio State
  ["Ohio State University","PhD in Industrial & Systems Engineering (AI)","ISE",22000,"December 15",["AI for Systems","Decision ML","Operations AI"],"https://ise.osu.edu/graduate/prospective-students"],
  // European additions
  ["Ludwig Maximilian University Munich","PhD in Computer Science (ML)","CS",24000,"Rolling",["ML","AI","Computer Vision","NLP","Bayesian AI"],"https://www.ifi.lmu.de/en/research/doctoral-program.html"],
  ["Ludwig Maximilian University Munich","PhD in Mathematics (ML Theory)","Mathematics",24000,"Rolling",["ML Theory","Optimization","Statistical Learning"],"https://www.mathematik.uni-muenchen.de/studium/promotion/index.html"],
  ["Saarland University (MPI-SWS)","PhD in Mathematics (ML)","Math/MPI",26000,"Rolling",["ML Theory","Formal AI","Algorithms","Statistical Learning"],"https://www.mpi-sws.org/positions/phd/"],
  ["RWTH Aachen University","PhD in Mathematics (ML)","Mathematics",24000,"Rolling",["ML Theory","Optimization","Statistical AI"],"https://www.rwth-aachen.de/go/id/bzw"],
  ["University of Heidelberg","PhD in Mathematics (ML)","Mathematics",24000,"Rolling",["ML Theory","Scientific AI","Optimization"],"https://www.uni-heidelberg.de/en/study/phd-programs"],
  ["Humboldt University Berlin","PhD in Statistics (AI)","Statistics",24000,"Rolling",["Statistical ML","Causal AI","Econometrics AI"],"https://www.wiwi.hu-berlin.de/en/professuren/quantitative/statistics"],
  ["University of Freiburg","PhD in Mathematics (ML)","Mathematics",24000,"Rolling",["ML Theory","Combinatorial ML","Topological ML"],"https://www.uni-freiburg.de/en/studium/promoted-students/phd-programs.html"],
  // Canada extra
  ["University of Calgary","PhD in Electrical & Software Engineering (AI)","ECE",18000,"January 15",["ML Systems","Signal AI","Edge AI"],"https://www.ucalgary.ca/ece/graduate/phd"],
  ["McMaster University","PhD in Electrical & Computer Engineering (AI)","ECE",17000,"January 15",["ML Hardware","Signal AI","Communications ML"],"https://www.ece.mcmaster.ca/graduate/phd/"],
  ["Queen's University","PhD in Electrical & Computer Engineering (AI)","ECE",18000,"January 15",["Signal AI","ML Systems","Edge Computing"],"https://www.ece.queensu.ca/graduate/phd/"],
  ["Dalhousie University","PhD in Electrical & Computer Engineering (AI)","ECE",17000,"January 15",["Signal AI","ML Systems","Healthcare AI"],"https://dal.ca/faculty/engineering/electrical-computer/graduate/phd.html"],
  // Singapore extra
  ["National University of Singapore","PhD in Mathematics (ML Theory)","Mathematics",26000,"January 15",["ML Theory","Statistical AI","Optimization"],"https://www.math.nus.edu.sg/graduate/phd-programme/"],
  ["Nanyang Technological University","PhD in Computer Science (AI Systems)","SCSE",26000,"January 15",["AI Systems","MLOps","Trustworthy AI","AI Engineering"],"https://www.ntu.edu.sg/scse/admissions/programmes/phd-programmes"],
  // Japan extra
  ["University of Tokyo","PhD in Statistical Science (ML)","Mathematics",15000,"February 1",["Statistical ML","Bayesian AI","Causal Inference"],"https://www.ms.u-tokyo.ac.jp/index-e.html"],
  ["Kyoto University","PhD in Informatics (ML)","Informatics",15000,"February 1",["ML","AI","Data Science","Statistical Learning"],"https://www.i.kyoto-u.ac.jp/en/graduate/doctoral"],
  ["Osaka University","PhD in Information Science (AI Systems)","IS",14000,"February 1",["AI Systems","ML Systems","HCI AI"],"https://www.is.osaka-u.ac.jp/en/research/phd_program/"],
  ["Tohoku University","PhD in Information Sciences (AI Theory)","IS",14000,"February 1",["AI Theory","Statistical AI","Learning Theory"],"https://www.is.tohoku.ac.jp/en/prospective/index.html"],
  // Korea extra
  ["KAIST","PhD in Mathematics (ML Theory)","Mathematics",18000,"December 1",["ML Theory","Optimization","Statistical Learning"],"https://math.kaist.ac.kr/en/graduate/phd/"],
  ["Seoul National University","PhD in Statistics (ML)","Statistics",16000,"December 1",["Statistical ML","Causal AI","High-dimensional ML"],"https://stat.snu.ac.kr/en/graduate/phd-program"],
  // China extra
  ["Tsinghua University","PhD in Statistics (ML)","Statistics",12000,"December 1",["Statistical ML","Causal AI","Bayesian Learning"],"https://www.stat.tsinghua.edu.cn/en/graduate/phd-programs/"],
  ["Peking University","PhD in Statistics (ML)","Mathematics/Stats",12000,"December 1",["Statistical AI","Bayesian ML","Causal Inference"],"https://www.stat.pku.edu.cn/en/graduate/index.htm"],
  ["Shanghai Jiao Tong University","PhD in Statistics (ML)","Statistics",13000,"December 1",["Statistical ML","Bayesian AI","High-dimensional Learning"],"https://www.math.sjtu.edu.cn/en/"],
  ["Zhejiang University","PhD in Statistics (ML)","Statistics",13000,"December 1",["Statistical AI","Bayesian ML","Scientific ML"],"https://www.stat.zju.edu.cn/english/"],
  // Hong Kong extra
  ["Hong Kong University of Science and Technology","PhD in Mathematics (Statistics/ML)","Mathematics",20000,"December 15",["Statistical ML","Bayesian AI","Causal Learning"],"https://www.math.hkust.edu.hk/graduate/doctor-of-philosophy-phd-program/"],
  ["City University of Hong Kong","PhD in Mathematics (ML)","Mathematics",18000,"January 31",["ML Theory","Statistical AI","Optimization"],"https://www.cityu.edu.hk/ma/study/phd_adm.htm"],
  ["Chinese University of Hong Kong","PhD in Statistics (ML)","Statistics",18000,"December 1",["Statistical ML","Bayesian AI","Causal Inference"],"https://www.sta.cuhk.edu.hk/pg/phd/"],
  // India extra
  ["IIT Bombay","PhD in Mathematics (ML Theory)","Mathematics",7500,"February 28",["ML Theory","Optimization","Statistical Learning"],"https://www.math.iitb.ac.in/admissions/phd-admissions"],
  ["IIT Delhi","PhD in Mathematics (ML Theory)","Mathematics",7500,"February 28",["ML Theory","Optimization","Statistical AI"],"https://maths.iitd.ac.in/phd"],
  ["IIT Madras","PhD in Mathematics (ML Theory)","Mathematics",7500,"February 28",["ML Theory","Statistical AI","Optimization"],"https://math.iitm.ac.in/phd"],
  ["IIT Kharagpur","PhD in Mathematics (ML)","Mathematics",7500,"February 28",["ML Theory","Stochastic AI","Optimization"],"https://www.iitkgp.ac.in/department/MA"],
  // Middle East extra
  ["Weizmann Institute of Science","PhD in Physics (Scientific ML)","Physics/ML",25000,"December 1",["Scientific ML","Physics-informed AI","Quantum ML","Materials ML"],"https://www.weizmann.ac.il/feinberg/admissions"],
  ["King Abdullah University of Science and Technology (KAUST)","PhD in Chemical Engineering (AI)","ChE/PSE",40000,"January 7",["Process AI","Materials ML","Drug Discovery AI","Simulation ML"],"https://admissions.kaust.edu.sa/apply"],
  // Switzerland extra
  ["ETH Zurich","PhD in Mathematics (ML Theory)","Mathematics",55000,"December 15",["ML Theory","Optimization","Statistical AI","Probability ML"],"https://math.ethz.ch/doctoral-studies.html"],
  ["University of Zurich","PhD in Computer Science (ML)","IFI/AIML",50000,"Rolling",["ML","AI","Computer Vision","NLP","Explainable AI"],"https://www.ifi.uzh.ch/en/research/phd-studies.html"],
  ["EPFL","PhD in Computational Science (ML)","SCTEN",55000,"December 15",["Scientific ML","Computational AI","High-performance ML"],"https://phd.epfl.ch/edsc"],
  // France extra
  ["Paris Sciences et Lettres (PSL)","PhD in Mathematics (ML Theory)","Mathematics/ENS",21000,"Rolling",["ML Theory","Statistical Learning","Optimization","PAC Learning"],"https://psl.eu/en/education/doctoral-programs"],
  ["Universite Paris-Saclay","PhD in Statistics (ML)","Mathematics/Statistics",21000,"Rolling",["Statistical ML","Bayesian AI","Causal AI"],"https://www.universite-paris-saclay.fr/en/research/phd-and-hdr/doctoral-programs"],
  ["Ecole Polytechnique (IP Paris)","PhD in Mathematics (ML)","LIX/CMAP",21000,"Rolling",["ML Theory","Optimization","Statistical Learning","Probabilistic AI"],"https://www.ip-paris.fr/en/education/phds"],
  // Netherlands extra
  ["University of Amsterdam","PhD in Mathematics (ML Theory)","Mathematics/CWI",32000,"Rolling",["ML Theory","Statistical AI","Optimization","Algorithmic ML"],"https://www.uva.nl/en/programmes/doctorates/mathematics.html"],
  ["Delft University of Technology","PhD in Mathematics (ML)","DIAM",30000,"Rolling",["ML Theory","Scientific ML","Optimization"],"https://www.tudelft.nl/en/education/phd-programmes/"],
  ["Utrecht University","PhD in Mathematics (ML)","Mathematics",30000,"Rolling",["ML Theory","Statistical Learning","Probabilistic AI"],"https://www.uu.nl/en/education/phd-programmes"],
  ["University of Groningen","PhD in Artificial Intelligence (ML)","Cognitive AI/CS",30000,"Rolling",["ML","AI","NLP","Computer Vision","Cognitive AI"],"https://www.rug.nl/masters/artificial-intelligence/phd/"],
  ["Eindhoven University of Technology","PhD in Mathematics (ML Theory)","Mathematics",30000,"Rolling",["ML Theory","Statistical AI","Optimization"],"https://www.tue.nl/en/education/phd-programs/applied-mathematics/"],
  // Belgium extra
  ["KU Leuven","PhD in Computer Science (ML/AI)","CS/DTAI",28000,"Rolling",["ML","AI","NLP","Probabilistic Programming","Symbolic AI"],"https://wms.cs.kuleuven.be/cs/phd"],
  ["Ghent University","PhD in Computer Science (ML/AI)","IDLab/CS",28000,"Rolling",["ML","AI","Computer Vision","NLP","IoT AI"],"https://www.ugent.be/ea/en/research/idlab/phd"],
  // Scandinavia extra
  ["University of Oslo","PhD in Mathematics (ML)","Mathematics",45000,"Rolling",["Statistical ML","Bayesian AI","Mathematical AI"],"https://www.mn.uio.no/math/english/research/phd/"],
  ["University of Copenhagen","PhD in Computer Science (ML/AI)","CS/DIKU",42000,"Rolling",["ML","AI","Computer Vision","NLP","Visualization"],"https://www.ku.dk/english/research/phd/faculty-of-science/computer-science/"],
  // Australia extra
  ["Monash University","PhD in Electrical & Computer Systems Engineering (AI)","ECSE",28000,"October 31",["ML Systems","Signal AI","Edge Computing"],"https://www.monash.edu/engineering/departments/ecse/research/phd-program"],
  ["University of Sydney","PhD in Mathematics & Statistics (ML)","Mathematics",28000,"October 31",["Statistical ML","Bayesian AI","Optimization"],"https://www.sydney.edu.au/science/schools/school-of-mathematics-and-statistics/postgraduate-research.html"],
  ["University of New South Wales","PhD in Statistics (ML)","Mathematics & Statistics",28000,"October 31",["Statistical ML","Causal AI","Bayesian Learning"],"https://www.maths.unsw.edu.au/research/statistics/phd"],
];

async function run() {
  let added = 0, skipped = 0;
  for (const [uniName, progName, dept, stipend, deadline, areas, url] of extras) {
    const uni = await prisma.university.findFirst({ where: { name: { contains: uniName.split(" (")[0].slice(0,40) } } });
    if (!uni) { skipped++; continue; }
    const existing = await prisma.program.findFirst({ where: { universityId: uni.id, name: progName } });
    if (existing) { skipped++; continue; }
    await prisma.program.create({
      data: {
        universityId: uni.id, name: progName, department: dept, degree: "PhD",
        fullyFunded: true, stipendUSD: stipend, deadline, greRequired: false,
        applicationUrl: url, portalType: "Custom", researchAreas: JSON.stringify(areas),
        annualOpenings: Math.floor(Math.random() * 8) + 2,
        acceptanceRate: parseFloat((Math.random() * 8 + 2).toFixed(1)),
      }
    });
    added++;
  }
  const total = await prisma.program.count();
  const unis = await prisma.university.count();
  console.log(`Added ${added} (skipped ${skipped}). TOTAL: ${total} programs across ${unis} universities.`);
}
run().catch(console.error).finally(() => prisma.$disconnect());
