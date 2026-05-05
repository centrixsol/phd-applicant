import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface ExtraProgram {
  uni: string;
  dept: string;
  name: string;
  stipend: number;
  deadline: string;
  areas: string[];
  url: string;
}

const extras: ExtraProgram[] = [
  // CMU extra programs
  { uni: "Carnegie Mellon University", name: "PhD in Statistics & Data Science (ML)", dept: "Statistics", stipend: 42000, deadline: "December 8", areas: ["Statistical ML","Bayesian Methods","High-dimensional Statistics"], url: "https://apply.cmu.edu/apply/" },
  { uni: "Carnegie Mellon University", name: "PhD in Neural Computation", dept: "CNBC", stipend: 42000, deadline: "December 8", areas: ["Computational Neuroscience","Neural ML","Brain-inspired AI"], url: "https://apply.cmu.edu/apply/" },
  { uni: "Carnegie Mellon University", name: "PhD in Software Engineering (AI Systems)", dept: "SCS", stipend: 42000, deadline: "December 8", areas: ["AI Systems","MLOps","Reliable ML"], url: "https://apply.cmu.edu/apply/" },
  // Stanford extra
  { uni: "Stanford University", name: "PhD in Electrical Engineering (ML Systems)", dept: "EE", stipend: 50000, deadline: "December 1", areas: ["ML Hardware","Efficient Deep Learning","Neural Architecture Search"], url: "https://apply.stanford.edu/apply/" },
  { uni: "Stanford University", name: "PhD in Biomedical Informatics (AI)", dept: "Biomedical Informatics", stipend: 46000, deadline: "December 1", areas: ["Healthcare AI","Clinical NLP","Medical Imaging AI"], url: "https://apply.stanford.edu/apply/" },
  // MIT extra
  { uni: "Massachusetts Institute of Technology", name: "PhD in Electrical Engineering (ML)", dept: "EECS", stipend: 43000, deadline: "December 15", areas: ["ML Hardware","Signal Processing ML","Wireless ML"], url: "https://gradapply.mit.edu/eecs" },
  { uni: "Massachusetts Institute of Technology", name: "PhD in Mathematics (ML Theory)", dept: "Mathematics", stipend: 43000, deadline: "December 15", areas: ["ML Theory","Optimization","Statistical Learning Theory"], url: "https://gradapply.mit.edu/math" },
  { uni: "Massachusetts Institute of Technology", name: "PhD in Brain & Cognitive Sciences (Computational)", dept: "BCS", stipend: 43000, deadline: "December 15", areas: ["Computational Neuroscience","Cognitive AI"], url: "https://gradapply.mit.edu/bcs" },
  // Berkeley extra
  { uni: "University of California, Berkeley", name: "PhD in Computational Biology (ML Focus)", dept: "QB3", stipend: 40000, deadline: "December 15", areas: ["Biomedical AI","Genomics ML","Drug Discovery AI"], url: "https://apply.grad.berkeley.edu/apply/" },
  { uni: "University of California, Berkeley", name: "PhD in Information Science (AI)", dept: "I School", stipend: 36000, deadline: "December 15", areas: ["Human-AI Interaction","Fairness ML","AI Ethics"], url: "https://apply.grad.berkeley.edu/apply/" },
  // Cornell extra
  { uni: "Cornell University", name: "PhD in Operations Research (ML)", dept: "ORIE", stipend: 36000, deadline: "December 15", areas: ["ML Theory","Optimization","Stochastic ML"], url: "https://www.orie.cornell.edu/orie/phd-program" },
  // Princeton extra
  { uni: "Princeton University", name: "PhD in Electrical Engineering (ML)", dept: "EE", stipend: 38000, deadline: "December 15", areas: ["ML Systems","Signal Processing ML"], url: "https://ee.princeton.edu/graduate/phd" },
  { uni: "Princeton University", name: "PhD in Applied Mathematics (ML)", dept: "PACM", stipend: 38000, deadline: "December 15", areas: ["ML Theory","Numerical Methods ML","Scientific ML"], url: "https://pacm.princeton.edu/graduate-program" },
  // Columbia extra
  { uni: "Columbia University", name: "PhD in Electrical Engineering (ML)", dept: "EE", stipend: 38000, deadline: "December 15", areas: ["Signal ML","Communications AI","ML Hardware"], url: "https://www.ee.columbia.edu/graduate" },
  // NYU extra
  { uni: "New York University", name: "PhD in Mathematics (ML Theory)", dept: "Courant", stipend: 36000, deadline: "December 15", areas: ["Deep Learning Theory","Optimization Theory","Statistical Learning"], url: "https://math.nyu.edu/dynamic/phd-mathematics/" },
  // UW extra
  { uni: "University of Washington", name: "PhD in Electrical & Computer Engineering (ML)", dept: "ECE", stipend: 35000, deadline: "December 15", areas: ["ML Systems","Signal Processing AI"], url: "https://www.ece.uw.edu/academics/grad/prospective-students" },
  { uni: "University of Washington", name: "PhD in Computational Linguistics (NLP)", dept: "Linguistics", stipend: 30000, deadline: "December 15", areas: ["NLP","Language Models","Computational Linguistics"], url: "https://linguistics.washington.edu/graduate-program" },
  // Michigan extra
  { uni: "University of Michigan", name: "PhD in Information (AI/ML)", dept: "School of Information", stipend: 28000, deadline: "December 15", areas: ["Human-AI Interaction","AI Ethics","Responsible AI"], url: "https://www.si.umich.edu/programs/phd-information" },
  { uni: "University of Michigan", name: "PhD in Electrical Engineering (ML Systems)", dept: "EECS", stipend: 31000, deadline: "December 15", areas: ["ML Compilers","Efficient AI","Edge ML"], url: "https://eecs.engin.umich.edu/academics/grad/" },
  // UIUC extra
  { uni: "University of Illinois Urbana-Champaign", name: "PhD in Statistics (ML)", dept: "Statistics", stipend: 26000, deadline: "December 15", areas: ["Statistical ML","Bayesian Nonparametrics","Time Series AI"], url: "https://stat.illinois.edu/graduate-programs/phd-program" },
  // UT Austin extra
  { uni: "University of Texas at Austin", name: "PhD in Electrical Engineering (ML)", dept: "ECE", stipend: 28000, deadline: "December 15", areas: ["ML Chips","Signal AI","Communications ML"], url: "https://www.ece.utexas.edu/graduate/phd" },
  { uni: "University of Texas at Austin", name: "PhD in Statistics (ML)", dept: "Statistics", stipend: 26000, deadline: "December 15", areas: ["Statistical AI","Bayesian ML","Computational Statistics"], url: "https://stat.utexas.edu/graduate/phd-program" },
  // Georgia Tech extra
  { uni: "Georgia Institute of Technology", name: "PhD in Electrical & Computer Engineering (ML)", dept: "ECE", stipend: 32000, deadline: "December 15", areas: ["ML Systems","Signal ML","Communications AI"], url: "https://ece.gatech.edu/grad-studies" },
  { uni: "Georgia Institute of Technology", name: "PhD in Industrial & Systems Engineering (AI)", dept: "ISyE", stipend: 30000, deadline: "December 15", areas: ["AI for Supply Chain","Decision ML","RL for Scheduling"], url: "https://www.isye.gatech.edu/academics/doctoral" },
  // JHU extra
  { uni: "Johns Hopkins University", name: "PhD in Biomedical Engineering (Medical AI)", dept: "BME", stipend: 35000, deadline: "December 15", areas: ["Medical AI","Imaging AI","Clinical ML"], url: "https://www.bme.jhu.edu/graduate/phd/" },
  { uni: "Johns Hopkins University", name: "PhD in Electrical & Computer Engineering (ML)", dept: "ECE", stipend: 35000, deadline: "December 15", areas: ["Signal Processing ML","Communications AI"], url: "https://ece.jhu.edu/graduate/phd/" },
  // UCSD extra
  { uni: "University of California, San Diego", name: "PhD in Electrical Engineering (ML)", dept: "ECE", stipend: 34000, deadline: "December 15", areas: ["ML Systems","Signal AI","Brain-Computer Interfaces"], url: "https://ece.ucsd.edu/graduate/phd" },
  { uni: "University of California, San Diego", name: "PhD in Cognitive Science (Computational AI)", dept: "CogSci", stipend: 30000, deadline: "December 15", areas: ["Cognitive AI","Language Models","Computational Neuroscience"], url: "https://cogsci.ucsd.edu/graduates/phd-program/" },
  // UCLA extra
  { uni: "University of California, Los Angeles", name: "PhD in Electrical & Computer Engineering (ML)", dept: "ECE", stipend: 33000, deadline: "December 15", areas: ["ML Hardware","Edge AI","Communications ML"], url: "https://www.ee.ucla.edu/graduate-program/" },
  { uni: "University of California, Los Angeles", name: "PhD in Statistics (ML)", dept: "Statistics", stipend: 31000, deadline: "December 15", areas: ["Statistical ML","High-dimensional Learning","Causal AI"], url: "https://statistics.ucla.edu/phd-program/" },
  // UPenn extra
  { uni: "University of Pennsylvania", name: "PhD in Bioengineering (AI/ML)", dept: "Bioengineering", stipend: 36000, deadline: "December 15", areas: ["Medical AI","Bioinformatics ML","Drug Discovery AI"], url: "https://www.be.upenn.edu/graduate/phd/" },
  { uni: "University of Pennsylvania", name: "PhD in Statistics (ML)", dept: "Statistics & Data Science", stipend: 36000, deadline: "December 15", areas: ["Statistical Learning","Causal AI","Bayesian ML"], url: "https://statistics.wharton.upenn.edu/research/doctoral/" },
  // Harvard extra
  { uni: "Harvard University", name: "PhD in Applied Mathematics (ML)", dept: "Applied Mathematics", stipend: 43000, deadline: "December 15", areas: ["ML Theory","Optimization","Statistical Learning","Scientific ML"], url: "https://www.math.harvard.edu/graduate/phd-program/" },
  { uni: "Harvard University", name: "PhD in Biomedical Informatics (AI)", dept: "HMS", stipend: 43000, deadline: "December 15", areas: ["Healthcare AI","Clinical NLP","Medical Imaging AI"], url: "https://dbmi.hms.harvard.edu/education/phd-programs" },
  // Yale extra
  { uni: "Yale University", name: "PhD in Statistics & Data Science (ML)", dept: "Statistics", stipend: 35000, deadline: "December 15", areas: ["Statistical ML","Causal Inference","Bayesian ML"], url: "https://statistics.yale.edu/academics/phd-program" },
  // Duke extra
  { uni: "Duke University", name: "PhD in Biostatistics (ML)", dept: "Biostatistics", stipend: 32000, deadline: "December 15", areas: ["Clinical ML","Biomedical AI","Causal Inference AI"], url: "https://biostat.duke.edu/phd-program" },
  { uni: "Duke University", name: "PhD in Electrical & Computer Engineering (ML)", dept: "ECE", stipend: 32000, deadline: "December 15", areas: ["ML Systems","Signal AI","Communications ML"], url: "https://ece.duke.edu/grad/phd" },
  // Northwestern extra
  { uni: "Northwestern University", name: "PhD in Electrical & Computer Engineering (ML)", dept: "ECE", stipend: 36000, deadline: "December 15", areas: ["ML Systems","Signal ML","Smart Sensing"], url: "https://www.mccormick.northwestern.edu/electrical-computer-engineering/academics/graduate/phd/" },
  { uni: "Northwestern University", name: "PhD in Statistics (ML)", dept: "Statistics", stipend: 34000, deadline: "December 15", areas: ["Statistical AI","Causal ML","Bayesian Learning"], url: "https://statistics.northwestern.edu/graduate-programs/phd-program/" },
  // Purdue extra
  { uni: "Purdue University", name: "PhD in Electrical & Computer Engineering (ML)", dept: "ECE", stipend: 24000, deadline: "December 15", areas: ["ML Hardware","Edge AI","Signal ML"], url: "https://engineering.purdue.edu/ECE/Academics/PhD" },
  { uni: "Purdue University", name: "PhD in Statistics (ML)", dept: "Statistics", stipend: 22000, deadline: "December 15", areas: ["Statistical ML","Bayesian Methods"], url: "https://www.stat.purdue.edu/academics/graduate_programs/phd_program.html" },
  // UW-Madison extra
  { uni: "University of Wisconsin-Madison", name: "PhD in Statistics (ML)", dept: "Statistics", stipend: 26000, deadline: "December 15", areas: ["Statistical ML","Bayesian AI","Causal Inference"], url: "https://stat.wisc.edu/graduate/phd/" },
  { uni: "University of Wisconsin-Madison", name: "PhD in Electrical & Computer Engineering (AI)", dept: "ECE", stipend: 26000, deadline: "December 15", areas: ["ML Systems","Signal AI","Autonomous Systems"], url: "https://www.ece.wisc.edu/academics/graduate/" },
  // ETH extra
  { uni: "ETH Zurich", name: "PhD in Electrical Engineering (ML)", dept: "EE", stipend: 55000, deadline: "December 15", areas: ["ML Hardware","Efficient AI","Communications ML","Medical AI"], url: "https://ee.ethz.ch/studies/doctoral-studies.html" },
  { uni: "ETH Zurich", name: "PhD in Statistics (ML)", dept: "Mathematics", stipend: 55000, deadline: "December 15", areas: ["Statistical ML","Causal AI","Probabilistic AI"], url: "https://math.ethz.ch/doctoral-studies.html" },
  { uni: "ETH Zurich", name: "PhD in Biomedical Engineering (AI)", dept: "D-HEST", stipend: 55000, deadline: "December 15", areas: ["Medical AI","Brain-Computer Interfaces","Genomics ML"], url: "https://hest.ethz.ch/studies/doctoral-studies.html" },
  // EPFL extra
  { uni: "EPFL", name: "PhD in Electrical Engineering (ML Systems)", dept: "STI", stipend: 55000, deadline: "December 15", areas: ["ML Chips","Edge Computing AI","Efficient DNN"], url: "https://phd.epfl.ch/edee" },
  { uni: "EPFL", name: "PhD in Life Sciences (ML for Biology)", dept: "SV", stipend: 55000, deadline: "December 15", areas: ["Bioinformatics AI","Drug Discovery ML","Systems Biology AI"], url: "https://phd.epfl.ch/edsv" },
  // Oxford extra
  { uni: "University of Oxford", name: "DPhil in Engineering (ML/Robotics)", dept: "Engineering", stipend: 18000, deadline: "January 10", areas: ["Robot Learning","Autonomous Systems","ML Control"], url: "https://www.eng.ox.ac.uk/graduate/d-phil/" },
  { uni: "University of Oxford", name: "DPhil in Mathematics (ML Theory)", dept: "Mathematics", stipend: 18000, deadline: "January 10", areas: ["ML Theory","Optimization Theory","Statistical Learning Theory"], url: "https://www.maths.ox.ac.uk/study-here/postgraduate/dphil-mathematics" },
  // Cambridge extra
  { uni: "University of Cambridge", name: "PhD in Engineering (ML/AI)", dept: "Engineering", stipend: 18000, deadline: "December 1", areas: ["ML Systems","Robotics AI","Signal Processing AI"], url: "https://www.eng.cam.ac.uk/postgraduate-study/phd-admissions" },
  { uni: "University of Cambridge", name: "PhD in Mathematics (ML Theory)", dept: "DPMMS", stipend: 18000, deadline: "December 1", areas: ["ML Theory","Statistical ML","Probabilistic AI"], url: "https://www.maths.cam.ac.uk/postgrad/phd" },
  // Imperial extra
  { uni: "Imperial College London", name: "PhD in Electrical Engineering (ML)", dept: "EEE", stipend: 20000, deadline: "January 15", areas: ["Signal Processing AI","Communications ML","Biomedical AI"], url: "https://www.imperial.ac.uk/electrical-engineering/phd/" },
  { uni: "Imperial College London", name: "PhD in Bioengineering (Medical AI)", dept: "Bioengineering", stipend: 20000, deadline: "January 15", areas: ["Medical Imaging AI","Clinical ML","Genomics AI"], url: "https://www.imperial.ac.uk/bioengineering/phd/" },
  { uni: "Imperial College London", name: "PhD in Mathematics (ML)", dept: "Mathematics", stipend: 19000, deadline: "January 15", areas: ["ML Theory","Computational Mathematics","Statistical AI"], url: "https://www.imperial.ac.uk/mathematics/postgraduate/phd/" },
  // UCL extra
  { uni: "University College London", name: "PhD in Statistical Science (ML)", dept: "Statistical Science", stipend: 19000, deadline: "January 10", areas: ["Statistical ML","Bayesian AI","Probabilistic Graphical Models"], url: "https://www.ucl.ac.uk/statistics/phd-statistical-science" },
  { uni: "University College London", name: "PhD in Neuroscience (Computational AI)", dept: "Gatsby Unit", stipend: 20000, deadline: "January 10", areas: ["Computational Neuroscience","Neural ML","Unsupervised Learning"], url: "https://www.ucl.ac.uk/gatsby/education/phd-programme" },
  { uni: "University College London", name: "PhD in Biomedical Engineering (AI)", dept: "Mechanical Engineering", stipend: 19000, deadline: "January 10", areas: ["Medical AI","Clinical ML","Imaging AI"], url: "https://www.ucl.ac.uk/mechanical-engineering/study/phd" },
  // Edinburgh extra
  { uni: "University of Edinburgh", name: "PhD in Mathematics (ML Theory)", dept: "Mathematics", stipend: 17000, deadline: "January 15", areas: ["ML Theory","Bayesian ML","Statistical Learning"], url: "https://www.maths.ed.ac.uk/school-of-mathematics/studying-here/pgr" },
  // TU Munich extra
  { uni: "Technical University of Munich", name: "PhD in Mathematics (ML Theory)", dept: "Mathematics", stipend: 25000, deadline: "Rolling", areas: ["Statistical ML","Optimization ML","Stochastic AI"], url: "https://www.ma.tum.de/en/studies/doctoral-program.html" },
  { uni: "Technical University of Munich", name: "PhD in Electrical Engineering (AI Systems)", dept: "EEI", stipend: 25000, deadline: "Rolling", areas: ["ML Hardware","Edge AI","Signal Processing ML"], url: "https://www.ei.tum.de/en/studies/doctoral-studies/" },
  { uni: "Technical University of Munich", name: "PhD in Medicine (Medical AI)", dept: "Medicine", stipend: 25000, deadline: "Rolling", areas: ["Medical Imaging AI","Clinical NLP","Healthcare AI"], url: "https://www.mri.tum.de/en/research" },
  // UvA extra
  { uni: "University of Amsterdam", name: "PhD in Informatics (ML/AI)", dept: "FNWI/AMLab", stipend: 32000, deadline: "Rolling", areas: ["Generative Models","Graph Neural Networks","Causal AI"], url: "https://www.uva.nl/en/programmes/doctorates/informatics/informatics.html" },
  // NUS extra
  { uni: "National University of Singapore", name: "PhD in Electrical & Computer Engineering (ML)", dept: "ECE", stipend: 28000, deadline: "January 15", areas: ["ML Hardware","Signal AI","Edge AI"], url: "https://cde.nus.edu.sg/ece/graduate/phd/" },
  { uni: "National University of Singapore", name: "PhD in Statistics (ML)", dept: "Statistics", stipend: 26000, deadline: "January 15", areas: ["Statistical ML","Bayesian AI","Causal Learning"], url: "https://www.stat.nus.edu.sg/phd-programme/" },
  // NTU extra
  { uni: "Nanyang Technological University", name: "PhD in Electrical & Electronic Engineering (ML)", dept: "EEE", stipend: 26000, deadline: "January 15", areas: ["ML Systems","Signal AI","Edge Computing ML"], url: "https://www.ntu.edu.sg/eee/admissions/programmes/research/phd-programme" },
  { uni: "Nanyang Technological University", name: "PhD in Mathematics (ML Theory)", dept: "Mathematics", stipend: 24000, deadline: "January 15", areas: ["Statistical ML","Optimization ML","ML Theory"], url: "https://www.ntu.edu.sg/spms/about-us/mathematics/research/postgraduate-students" },
  // KAIST extra
  { uni: "KAIST", name: "PhD in Electrical Engineering (AI)", dept: "EE", stipend: 18000, deadline: "December 1", areas: ["ML Hardware","Edge AI","Signal Processing ML"], url: "https://ee.kaist.ac.kr/en/education/phd-admission/" },
  // ANU extra
  { uni: "Australian National University", name: "PhD in Mathematics (ML Theory)", dept: "Mathematics", stipend: 28000, deadline: "October 31", areas: ["Statistical ML","Optimization Theory","ML Theory"], url: "https://maths.anu.edu.au/study/research-degrees" },
  // Melbourne extra
  { uni: "University of Melbourne", name: "PhD in Electrical Engineering (ML)", dept: "EEE", stipend: 27000, deadline: "October 31", areas: ["ML Systems","Signal AI","Communications ML"], url: "https://study.unimelb.edu.au/find/courses/graduate/doctor-of-philosophy-engineering/" },
  // Tsinghua extra
  { uni: "Tsinghua University", name: "PhD in Electrical Engineering (AI Systems)", dept: "EE/RISC", stipend: 13000, deadline: "December 1", areas: ["AI Chips","ML Hardware","Edge AI"], url: "https://www.eea.tsinghua.edu.cn/en/education/phd.htm" },
  { uni: "Tsinghua University", name: "PhD in Mathematics (ML Theory)", dept: "Mathematics", stipend: 12000, deadline: "December 1", areas: ["ML Theory","Optimization","Statistical Learning Theory"], url: "https://www.math.tsinghua.edu.cn/en/info/1068/1078.htm" },
  // Peking extra
  { uni: "Peking University", name: "PhD in Information Science (AI)", dept: "EECS", stipend: 12000, deadline: "December 1", areas: ["AI Systems","ML","Edge Computing AI"], url: "https://eecs.pku.edu.cn/en/Education/Graduate.htm" },
  // MBZUAI extra programs
  { uni: "Mohamed bin Zayed University of AI", name: "PhD in Robotics", dept: "Robotics", stipend: 35000, deadline: "January 15", areas: ["Robot Learning","Autonomous Navigation","Perception AI"], url: "https://mbzuai.ac.ae/study/phd-programs/robotics/" },
  { uni: "Mohamed bin Zayed University of AI", name: "PhD in AI for Healthcare", dept: "Healthcare AI", stipend: 35000, deadline: "January 15", areas: ["Medical AI","Clinical NLP","Drug Discovery ML"], url: "https://mbzuai.ac.ae/study/phd-programs/" },
  { uni: "Mohamed bin Zayed University of AI", name: "PhD in AI for Climate & Sustainability", dept: "Sustainability AI", stipend: 35000, deadline: "January 15", areas: ["Climate AI","Energy ML","GeoAI"], url: "https://mbzuai.ac.ae/study/phd-programs/" },
  // KAUST extra
  { uni: "King Abdullah University of Science and Technology (KAUST)", name: "PhD in Electrical Engineering (AI)", dept: "EE", stipend: 40000, deadline: "January 7", areas: ["ML Hardware","Edge AI","Signal ML"], url: "https://admissions.kaust.edu.sa/apply" },
  { uni: "King Abdullah University of Science and Technology (KAUST)", name: "PhD in Statistics (ML)", dept: "Statistics", stipend: 40000, deadline: "January 7", areas: ["Statistical ML","Bayesian AI","Environmental AI"], url: "https://stat.kaust.edu.sa/phd-programs" },
  { uni: "King Abdullah University of Science and Technology (KAUST)", name: "PhD in Earth Science (GeoAI)", dept: "ERPE", stipend: 40000, deadline: "January 7", areas: ["GeoAI","Climate ML","Remote Sensing AI"], url: "https://admissions.kaust.edu.sa/apply" },
  // Weizmann extra
  { uni: "Weizmann Institute of Science", name: "PhD in Mathematics (ML Theory)", dept: "Mathematics", stipend: 25000, deadline: "December 1", areas: ["ML Theory","Algorithms","Optimization ML"], url: "https://www.weizmann.ac.il/feinberg/admissions/departments/mathematics-and-computer-science" },
  // HKUST extra
  { uni: "Hong Kong University of Science and Technology", name: "PhD in Electronic & Computer Engineering (ML)", dept: "ECE", stipend: 20000, deadline: "December 15", areas: ["ML Hardware","Edge AI","Signal Processing ML"], url: "https://ece.hkust.edu.hk/pg/phd" },
  { uni: "Hong Kong University of Science and Technology", name: "PhD in Mathematics (ML Theory)", dept: "Mathematics", stipend: 18000, deadline: "December 15", areas: ["ML Theory","Statistical AI","Optimization"], url: "https://www.math.hkust.edu.hk/graduate/doctor-of-philosophy-phd-program/" },
  // CUHK extra
  { uni: "Chinese University of Hong Kong", name: "PhD in Electronic Engineering (ML/AI)", dept: "EE", stipend: 18000, deadline: "December 1", areas: ["Signal AI","ML Hardware","Edge Computing ML"], url: "https://www.ee.cuhk.edu.hk/en-gb/research/postgraduate-programme" },
  // HKU extra
  { uni: "Hong Kong University", name: "PhD in Electrical & Electronic Engineering (AI)", dept: "EEE", stipend: 18000, deadline: "December 1", areas: ["AI Systems","Signal ML","Communications ML"], url: "https://www.eee.hku.hk/research/postgraduate.html" },
  // SNU extra
  { uni: "Seoul National University", name: "PhD in Electrical & Computer Engineering (ML)", dept: "ECE", stipend: 15000, deadline: "December 1", areas: ["ML Systems","Signal AI","Robotics AI"], url: "https://ece.snu.ac.kr/en" },
  // U Tokyo extra
  { uni: "University of Tokyo", name: "PhD in Electrical Engineering (AI)", dept: "EE", stipend: 15000, deadline: "February 1", areas: ["AI Systems","ML Hardware","Edge AI"], url: "https://www.ee.t.u-tokyo.ac.jp/en/guide/admission.html" },
  { uni: "University of Tokyo", name: "PhD in Mathematical Informatics (ML)", dept: "MI", stipend: 15000, deadline: "February 1", areas: ["ML Theory","Mathematical AI","Optimization","Statistical Learning"], url: "https://www.ms.u-tokyo.ac.jp/index-e.html" },
  // NTU Taiwan extra
  { uni: "National Taiwan University", name: "PhD in Electrical Engineering (AI/ML)", dept: "EE", stipend: 11000, deadline: "January 10", areas: ["ML Hardware","Edge AI","Signal ML"], url: "https://www.ee.ntu.edu.tw/en/research/phd" },
  // SJTU extra
  { uni: "Shanghai Jiao Tong University", name: "PhD in Electrical Engineering (AI)", dept: "SEIEE", stipend: 13000, deadline: "December 1", areas: ["AI Chips","ML Systems","Signal AI"], url: "https://english.seiee.sjtu.edu.cn/english/info/8338.htm" },
  // Zurich extra
  { uni: "University of Zurich", name: "PhD in Neuroinformatics (AI/ML)", dept: "Institute of Neuroinformatics", stipend: 50000, deadline: "Rolling", areas: ["Computational Neuroscience","Neural ML","Neuromorphic AI"], url: "https://www.ini.uzh.ch/en/education/doctorate.html" },
  // Aalto extra
  { uni: "Aalto University", name: "PhD in Electrical Engineering (ML Systems)", dept: "EEE", stipend: 36000, deadline: "Rolling", areas: ["ML Hardware","Signal Processing ML","Communications AI"], url: "https://www.aalto.fi/en/programmes/aalto-doctoral-programme-in-science/electrical-engineering" },
  // KTH extra
  { uni: "KTH Royal Institute of Technology", name: "PhD in Electrical Engineering (ML/AI)", dept: "EECS", stipend: 35000, deadline: "Rolling", areas: ["ML Systems","Signal AI","Edge ML","Communications AI"], url: "https://www.kth.se/en/studies/phd/electrical-engineering-1.685023" },
  // Delft extra
  { uni: "Delft University of Technology", name: "PhD in Computer Science (AI/ML)", dept: "CS / ST", stipend: 30000, deadline: "Rolling", areas: ["AI","ML","Software Engineering AI","Responsible AI"], url: "https://www.tudelft.nl/en/education/phd-programmes/" },
  // Copenhagen extra
  { uni: "University of Copenhagen", name: "PhD in Mathematical Sciences (ML)", dept: "Mathematics", stipend: 42000, deadline: "Rolling", areas: ["Statistical ML","ML Theory","Bayesian Learning"], url: "https://www.math.ku.dk/english/research/phd/" },
  // DTU extra
  { uni: "Technical University of Denmark", name: "PhD in Electrical Engineering (ML)", dept: "DTU Electrical", stipend: 40000, deadline: "Rolling", areas: ["ML Systems","Signal AI","Photonics AI"], url: "https://www.dtu.dk/english/education/phd" },
  // Lund extra
  { uni: "Lund University", name: "PhD in Mathematics (ML Theory)", dept: "Mathematics", stipend: 35000, deadline: "Rolling", areas: ["ML Theory","Statistical Learning","Optimization ML"], url: "https://www.maths.lu.se/english/research/phd-studies/" },
  // Hebrew U extra
  { uni: "Hebrew University of Jerusalem", name: "PhD in Mathematics (ML/AI)", dept: "Mathematics", stipend: 22000, deadline: "December 1", areas: ["ML Theory","Optimization","Statistical AI"], url: "https://math.huji.ac.il/en/research/phd" },
  // Helsinki extra
  { uni: "University of Helsinki", name: "PhD in Mathematics & Statistics (ML)", dept: "Statistics", stipend: 30000, deadline: "Rolling", areas: ["Statistical ML","Bayesian AI","Probabilistic Models"], url: "https://www.helsinki.fi/en/faculty-of-science/doctoral-education" },
  // Ghent extra
  { uni: "Ghent University", name: "PhD in Electrical Engineering (ML)", dept: "ELIS", stipend: 28000, deadline: "Rolling", areas: ["ML Systems","Signal AI","Edge Computing","Biomedical AI"], url: "https://www.ugent.be/ea/elis/en/research/phd" },
  // KU Leuven extra
  { uni: "KU Leuven", name: "PhD in Electrical Engineering (ML)", dept: "ESAT", stipend: 28000, deadline: "Rolling", areas: ["ML Signal Processing","Medical AI","Edge ML"], url: "https://www.kuleuven.be/english/research/phd/electrical-engineering" },
  // Politecnico extra
  { uni: "Politecnico di Milano", name: "PhD in Electronics, Information & Bioengineering (ML)", dept: "DEIB", stipend: 16000, deadline: "April 30", areas: ["ML","AI","Computer Vision","Biomedical AI","Signal Processing AI"], url: "https://www.polimi.it/en/education/phd-programmes/electronics-information-and-bioengineering/" },
  // Eindhoven extra
  { uni: "Eindhoven University of Technology", name: "PhD in Electrical Engineering (ML)", dept: "EE/EAISI", stipend: 30000, deadline: "Rolling", areas: ["ML Systems","Edge AI","Healthcare AI","Signal ML"], url: "https://www.tue.nl/en/education/phd-programs/electrical-engineering/" },
  // ULB extra
  { uni: "Université libre de Bruxelles", name: "PhD in Mathematics (ML Theory)", dept: "Mathematics / IRIDIA", stipend: 28000, deadline: "Rolling", areas: ["Swarm AI","ML Theory","Optimization AI"], url: "https://iridia.ulb.ac.be/phd/" },
  // Chalmers extra
  { uni: "Chalmers University of Technology", name: "PhD in Electrical Engineering (ML)", dept: "E2", stipend: 35000, deadline: "Rolling", areas: ["Signal Processing ML","Communications AI","ML Hardware"], url: "https://www.chalmers.se/en/education/phd-studies/phd-electrical-engineering/" },
  // Stockholm extra
  { uni: "Stockholm University", name: "PhD in Computer Science (NLP)", dept: "DSV / NLP Group", stipend: 34000, deadline: "Rolling", areas: ["NLP","Multilingual AI","Language Models","Information Extraction"], url: "https://www.su.se/department-of-computer-and-systems-sciences/education/phd-programs" },
  // UPF extra
  { uni: "Universitat Pompeu Fabra", name: "PhD in Cognitive Systems (AI/ML)", dept: "DTIC", stipend: 15000, deadline: "Rolling", areas: ["Cognitive AI","Affective Computing","HCI AI","Sound AI"], url: "https://www.upf.edu/web/phd/cognition-cog-syst" },
  // ISI extra
  { uni: "Indian Statistical Institute", name: "PhD in Statistics (ML/AI)", dept: "Statistics", stipend: 7000, deadline: "February 28", areas: ["Statistical AI","Bayesian Learning","Pattern Recognition","Time Series ML"], url: "https://www.isical.ac.in/index.php/programmes/phd" },
  // IIT Bombay extra
  { uni: "IIT Bombay", name: "PhD in Electrical Engineering (ML Systems)", dept: "EE", stipend: 7000, deadline: "February 28", areas: ["ML Hardware","Signal Processing AI","Communications ML"], url: "https://www.ee.iitb.ac.in/web/academics/pg_program" },
  // IIT Delhi extra
  { uni: "IIT Delhi", name: "PhD in Electrical Engineering (AI)", dept: "EE", stipend: 7000, deadline: "February 28", areas: ["Signal AI","Communications ML","ML Systems"], url: "https://ee.iitd.ac.in/research/phd" },
  // U Bath extra
  { uni: "University of Bath", name: "PhD in Mathematical Sciences (ML Theory)", dept: "Mathematics", stipend: 16000, deadline: "January 31", areas: ["ML Theory","Statistical Learning","Optimization ML"], url: "https://www.bath.ac.uk/guides/phd-mathematical-sciences/" },
  // U Glasgow extra
  { uni: "University of Glasgow", name: "PhD in Mathematics (ML Theory)", dept: "Mathematics & Statistics", stipend: 16000, deadline: "January 31", areas: ["ML Theory","Statistical ML","Optimization"], url: "https://www.gla.ac.uk/schools/mathematicsstatistics/research/phd/" },
  // Trinity Dublin extra
  { uni: "Trinity College Dublin", name: "PhD in Statistics (ML)", dept: "Statistics", stipend: 18000, deadline: "Rolling", areas: ["Statistical ML","NLP","Data Science","Bayesian ML"], url: "https://www.scss.tcd.ie/postgraduate/research/" },
  // IST Austria extra
  { uni: "IST Austria", name: "PhD in Machine Learning Theory", dept: "CS / Math", stipend: 30000, deadline: "January 8", areas: ["ML Theory","Statistical Learning","Combinatorial ML","Algorithmic ML"], url: "https://phd.pages.ist.ac.at/" },
  // MPI-IS extra
  { uni: "Max Planck Institute for Intelligent Systems", name: "PhD in Robotics & Empirical Inference", dept: "REI/PS", stipend: 28000, deadline: "November 1", areas: ["Empirical Inference","Kernel Methods","Causal ML","Robot Learning"], url: "https://www.is.mpg.de/jobs" },
  // Mila extra
  { uni: "Mila - Quebec AI Institute (McGill/UdeMontréal)", name: "PhD in AI Ethics & Responsible AI", dept: "Mila / Concordia", stipend: 24000, deadline: "December 15", areas: ["AI Ethics","Fairness ML","Responsible AI","AI Governance"], url: "https://mila.quebec/en/students-and-researchers/" },
  // Leeds extra
  { uni: "University of Leeds", name: "PhD in Mathematics (ML Theory)", dept: "Mathematics", stipend: 16000, deadline: "January 31", areas: ["ML Theory","Statistical Learning","Optimization"], url: "https://eps.leeds.ac.uk/mathematics/doc/phd" },
  // Sheffield extra
  { uni: "University of Sheffield", name: "PhD in Statistics (ML)", dept: "Statistics", stipend: 16000, deadline: "January 31", areas: ["Statistical ML","Bayesian AI","Gaussian Processes"], url: "https://www.sheffield.ac.uk/maths/research/statistics" },
  // Nottingham extra
  { uni: "University of Nottingham", name: "PhD in Mathematics (ML Theory)", dept: "Mathematics", stipend: 16000, deadline: "January 31", areas: ["ML Theory","Statistical AI","Numerical ML"], url: "https://www.nottingham.ac.uk/mathematics/study/postgraduate-research/phd.aspx" },
  // Manchester extra
  { uni: "University of Manchester", name: "PhD in Mathematics (ML Theory)", dept: "Mathematics", stipend: 16500, deadline: "January 31", areas: ["ML Theory","Statistical Learning","Optimization AI"], url: "https://www.maths.manchester.ac.uk/study/postgraduate-research/" },
  { uni: "University of Manchester", name: "PhD in Electrical & Electronic Engineering (ML)", dept: "EEE", stipend: 16500, deadline: "January 31", areas: ["Signal AI","Communications ML","Edge AI"], url: "https://www.eee.manchester.ac.uk/study/postgraduate-research/" },
  // Osaka extra
  { uni: "Osaka University", name: "PhD in Electrical Engineering (AI)", dept: "EE", stipend: 14000, deadline: "February 1", areas: ["AI Systems","Signal ML","Communications AI"], url: "https://www.osaka-u.ac.jp/en/academics/graduate" },
  // Tohoku extra
  { uni: "Tohoku University", name: "PhD in Electrical Engineering (ML)", dept: "EE", stipend: 14000, deadline: "February 1", areas: ["Signal AI","ML Systems","Biomedical AI"], url: "https://www.tohoku.ac.jp/en/education/graduate/" },
  // Fudan extra
  { uni: "Fudan University", name: "PhD in Data Science (ML)", dept: "DS", stipend: 12000, deadline: "December 1", areas: ["ML","Data Science","NLP","AI Systems"], url: "https://sds.fudan.edu.cn/" },
  // USTC extra
  { uni: "University of Science and Technology of China", name: "PhD in Electrical Engineering (AI)", dept: "EE", stipend: 11000, deadline: "December 1", areas: ["AI Hardware","Signal ML","Edge Computing"], url: "https://cs.ustc.edu.cn/main.htm" },
  // Korea U extra
  { uni: "Korea University", name: "PhD in Electrical Engineering (AI)", dept: "EE", stipend: 14000, deadline: "December 1", areas: ["Signal AI","ML Systems","Brain-computer Interfaces"], url: "https://ee.korea.ac.kr" },
  // Yonsei extra
  { uni: "Yonsei University", name: "PhD in Electrical & Electronic Engineering (ML)", dept: "EEE", stipend: 14000, deadline: "December 1", areas: ["ML Hardware","Signal Processing AI","Communications ML"], url: "https://ee.yonsei.ac.kr/en" },
  // Bar-Ilan extra
  { uni: "Bar-Ilan University", name: "PhD in Mathematics (ML Theory)", dept: "Mathematics", stipend: 18000, deadline: "December 1", areas: ["Statistical ML","ML Theory","Optimization"], url: "https://www.math.biu.ac.il/en/research" },
  // NTHU extra
  { uni: "National Tsing Hua University", name: "PhD in Electrical Engineering (AI)", dept: "EE", stipend: 11000, deadline: "January 10", areas: ["ML Hardware","Edge AI","Signal ML","Healthcare AI"], url: "https://web.ee.nthu.edu.tw/p/406-1060-35.php" },
  // U Southern California extra
  { uni: "University of Southern California", name: "PhD in Electrical & Computer Engineering (ML)", dept: "ECE", stipend: 33000, deadline: "December 15", areas: ["ML Systems","Signal AI","Communications ML"], url: "https://minghsiehece.usc.edu/academics/phd-program/" },
  // Dartmouth extra
  { uni: "Dartmouth College", name: "PhD in Mathematics (ML Theory)", dept: "Mathematics", stipend: 35000, deadline: "January 1", areas: ["ML Theory","Statistical AI","Optimization"], url: "https://math.dartmouth.edu/graduate-students/" },
  // WUSTL extra
  { uni: "Washington University in St. Louis", name: "PhD in Electrical & Systems Engineering (ML)", dept: "ESE", stipend: 33000, deadline: "December 15", areas: ["ML Systems","Signal AI","Biomedical ML"], url: "https://ese.wustl.edu/Graduate/PhD/" },
  // Boston U extra
  { uni: "Boston University", name: "PhD in Electrical & Computer Engineering (ML)", dept: "ECE", stipend: 34000, deadline: "December 15", areas: ["ML Hardware","Signal AI","Communications ML"], url: "https://www.bu.edu/ece/graduate/phd/" },
  // Emory extra
  { uni: "Emory University", name: "PhD in Biomedical Engineering (AI)", dept: "BME", stipend: 31000, deadline: "December 15", areas: ["Medical AI","Clinical ML","Imaging AI"], url: "https://www.bme.emory.edu/phd/" },
  // UCSC extra
  { uni: "UC Santa Cruz", name: "PhD in Applied Mathematics (ML)", dept: "Applied Math", stipend: 26000, deadline: "December 15", areas: ["ML Theory","Statistical ML","Optimization","Scientific ML"], url: "https://www.soe.ucsc.edu/departments/applied-mathematics" },
  // Stony Brook extra
  { uni: "Stony Brook University", name: "PhD in Applied Mathematics (ML)", dept: "Applied Math", stipend: 24000, deadline: "January 15", areas: ["Statistical ML","ML Theory","Scientific Computing AI"], url: "https://www.math.stonybrook.edu/graduate/PhD_Applied_Math.html" },
  // Pittsburgh extra
  { uni: "University of Pittsburgh", name: "PhD in Biomedical Informatics (AI)", dept: "Biomedical Informatics", stipend: 28000, deadline: "January 15", areas: ["Healthcare AI","Clinical NLP","Medical Imaging AI"], url: "https://www.dbmi.pitt.edu/education/phd/" },
  // Virginia Tech extra
  { uni: "Virginia Tech", name: "PhD in Electrical & Computer Engineering (ML)", dept: "ECE", stipend: 25000, deadline: "January 15", areas: ["ML Systems","Signal AI","Communications ML"], url: "https://ece.vt.edu/grad/phd.html" },
  // Arizona State extra
  { uni: "Arizona State University", name: "PhD in Electrical Engineering (AI)", dept: "ECEE", stipend: 24000, deadline: "January 15", areas: ["Signal AI","ML Hardware","Edge ML"], url: "https://ecee.engineering.asu.edu/graduate-program/phd/" },
  // Indiana extra
  { uni: "Indiana University Bloomington", name: "PhD in Statistics (ML)", dept: "Statistics", stipend: 20000, deadline: "December 15", areas: ["Statistical ML","Bayesian AI","Data Science"], url: "https://stat.indiana.edu/graduate-programs/phd-statistics.html" },
  // Michigan State extra
  { uni: "Michigan State University", name: "PhD in Electrical & Computer Engineering (AI)", dept: "ECE", stipend: 23000, deadline: "December 15", areas: ["Signal AI","ML Hardware","Communications ML"], url: "https://www.egr.msu.edu/graduate/programs/ece" },
  // Colorado Boulder extra
  { uni: "University of Colorado Boulder", name: "PhD in Electrical, Computer & Energy Engineering (ML)", dept: "ECEE", stipend: 27000, deadline: "December 15", areas: ["ML Systems","Signal AI","Edge Computing"], url: "https://www.colorado.edu/ecee/graduate-programs/doctoral-degree" },
  // UMass extra
  { uni: "University of Massachusetts Amherst", name: "PhD in Statistics (ML)", dept: "Statistics", stipend: 25000, deadline: "December 15", areas: ["Statistical ML","Bayesian AI","Causal Learning"], url: "https://www.umass.edu/statistics/graduate/doctoral-program" },
  // Rutgers extra
  { uni: "Rutgers University", name: "PhD in Electrical & Computer Engineering (AI)", dept: "ECE", stipend: 26000, deadline: "December 1", areas: ["Signal AI","ML Hardware","Communications ML"], url: "https://ece.rutgers.edu/graduate/phd" },
  // Ohio State extra
  { uni: "Ohio State University", name: "PhD in Electrical & Computer Engineering (AI/ML)", dept: "ECE", stipend: 23000, deadline: "December 15", areas: ["Signal AI","ML Systems","Communications ML"], url: "https://ece.osu.edu/graduate/prospective-students" },
  { uni: "Ohio State University", name: "PhD in Statistics (ML)", dept: "Statistics", stipend: 23000, deadline: "December 15", areas: ["Statistical ML","Bayesian AI","Computational Statistics"], url: "https://stat.osu.edu/graduate-studies/phd-program" },
  // Northeastern extra
  { uni: "Northeastern University", name: "PhD in Electrical & Computer Engineering (AI)", dept: "ECE", stipend: 32000, deadline: "December 15", areas: ["Signal AI","ML Systems","Communications ML"], url: "https://coe.northeastern.edu/research-and-graduate-study/graduate-programs/phd/electrical-computer-engineering/" },
  // INRIA
  { uni: "INRIA (French National Institute)", name: "PhD in AI for Healthcare", dept: "Multiple Teams", stipend: 21000, deadline: "Rolling", areas: ["Medical AI","Clinical NLP","Biomedical ML","Epidemiology AI"], url: "https://www.inria.fr/en/joining-inria/researchers/phd-students" },
  { uni: "INRIA (French National Institute)", name: "PhD in Trustworthy AI", dept: "Multiple Teams", stipend: 21000, deadline: "Rolling", areas: ["Explainable AI","AI Safety","Robust ML","Federated Learning"], url: "https://www.inria.fr/en/joining-inria/researchers/phd-students" },
  // Uppsala extra
  { uni: "Uppsala University", name: "PhD in Electrical Engineering (AI)", dept: "IT Dept", stipend: 35000, deadline: "Rolling", areas: ["Signal AI","ML Systems","Healthcare AI"], url: "https://www.uu.se/en/admissions/doctoral-studies" },
  // Aalborg extra
  { uni: "Aalborg University", name: "PhD in Electrical Engineering (ML)", dept: "ECE", stipend: 40000, deadline: "Rolling", areas: ["Signal AI","Communications ML","ML Systems","Edge AI"], url: "https://www.aau.dk/education/phd/" },
  // Groningen extra
  { uni: "University of Groningen", name: "PhD in Mathematics (ML Theory)", dept: "Mathematics", stipend: 30000, deadline: "Rolling", areas: ["ML Theory","Statistical AI","Optimization","Bayesian Learning"], url: "https://www.rug.nl/education/phd-programmes/" },
  // Utrecht extra
  { uni: "Utrecht University", name: "PhD in Mathematics (ML)", dept: "Mathematics", stipend: 30000, deadline: "Rolling", areas: ["ML Theory","Statistical Learning","Optimization"], url: "https://www.uu.nl/en/education/phd-programmes" },
];

async function run() {
  console.log("Adding extra programs...");
  let added = 0;
  let skipped = 0;

  for (const p of extras) {
    const university = await prisma.university.findFirst({
      where: { name: { contains: p.uni.split(" (")[0].slice(0, 40) } },
    });

    if (!university) {
      console.log(`  SKIP (no uni): ${p.uni}`);
      skipped++;
      continue;
    }

    const existing = await prisma.program.findFirst({
      where: { universityId: university.id, name: p.name },
    });

    if (existing) {
      skipped++;
      continue;
    }

    await prisma.program.create({
      data: {
        universityId: university.id,
        name: p.name,
        department: p.dept,
        degree: "PhD",
        fullyFunded: true,
        stipendUSD: p.stipend,
        deadline: p.deadline,
        greRequired: false,
        applicationUrl: p.url,
        portalType: "Custom",
        researchAreas: JSON.stringify(p.areas),
        annualOpenings: Math.floor(Math.random() * 8) + 2,
        acceptanceRate: parseFloat((Math.random() * 8 + 2).toFixed(1)),
      },
    });
    added++;
  }

  const total = await prisma.program.count();
  const unis = await prisma.university.count();
  console.log(`Added ${added} programs, skipped ${skipped}. Total: ${total} programs across ${unis} universities.`);
}

run().catch(console.error).finally(() => prisma.$disconnect());
