import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const universities = [
  // === USA ===
  { name: "Massachusetts Institute of Technology", country: "USA", city: "Cambridge, MA", qsRanking: 1, website: "https://mit.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Machine Learning", dept: "CSAIL / EECS", stipend: 43000, deadline: "December 15", areas: ["Deep Learning","Reinforcement Learning","Computer Vision","NLP"], url: "https://gradapply.mit.edu/eecs" },
      { name: "PhD in Artificial Intelligence", dept: "EECS", stipend: 43000, deadline: "December 15", areas: ["AI Systems","Robotics","Probabilistic AI","AI Safety"], url: "https://gradapply.mit.edu/eecs" },
    ]
  },
  { name: "Stanford University", country: "USA", city: "Stanford, CA", qsRanking: 3, website: "https://stanford.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Machine Learning", dept: "CS Department", stipend: 50000, deadline: "December 1", areas: ["ML Theory","Computer Vision","NLP","Generative AI"], url: "https://apply.stanford.edu/apply/" },
      { name: "PhD in Artificial Intelligence", dept: "CS Department", stipend: 50000, deadline: "December 1", areas: ["AI Safety","Multi-agent Systems","Knowledge Representation"], url: "https://apply.stanford.edu/apply/" },
      { name: "PhD in Statistics (ML Focus)", dept: "Statistics", stipend: 46000, deadline: "December 1", areas: ["Statistical ML","Bayesian Methods","Causal Inference"], url: "https://apply.stanford.edu/apply/" },
    ]
  },
  { name: "Carnegie Mellon University", country: "USA", city: "Pittsburgh, PA", qsRanking: 52, website: "https://cmu.edu", portalType: "Slate",
    programs: [
      { name: "PhD in Machine Learning", dept: "ML Department", stipend: 42000, deadline: "December 8", areas: ["Deep Learning","Probabilistic ML","ML Systems","AutoML"], url: "https://apply.cmu.edu/apply/" },
      { name: "PhD in Language Technologies", dept: "LTI", stipend: 42000, deadline: "December 8", areas: ["NLP","Speech Recognition","Machine Translation","Dialogue Systems"], url: "https://apply.cmu.edu/apply/" },
      { name: "PhD in Robotics (AI Focus)", dept: "Robotics Institute", stipend: 42000, deadline: "December 8", areas: ["Robot Learning","Autonomous Systems","Computer Vision"], url: "https://apply.cmu.edu/apply/" },
    ]
  },
  { name: "University of California, Berkeley", country: "USA", city: "Berkeley, CA", qsRanking: 10, website: "https://berkeley.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in EECS (ML Track)", dept: "EECS", stipend: 40000, deadline: "December 15", areas: ["Deep Learning","RL","AI Systems","Federated Learning"], url: "https://apply.grad.berkeley.edu/apply/" },
      { name: "PhD in Statistics (ML Focus)", dept: "Statistics", stipend: 38000, deadline: "January 5", areas: ["Statistical Learning","Causal ML","Bayesian Nonparametrics"], url: "https://apply.grad.berkeley.edu/apply/" },
    ]
  },
  { name: "California Institute of Technology", country: "USA", city: "Pasadena, CA", qsRanking: 6, website: "https://caltech.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computing & Mathematical Sciences", dept: "CMS", stipend: 41000, deadline: "December 15", areas: ["ML Theory","Optimization","AI Systems","Neural Networks"], url: "https://www.gradoffice.caltech.edu/admissions/applyonline" },
    ]
  },
  { name: "Cornell University", country: "USA", city: "Ithaca, NY", qsRanking: 20, website: "https://cornell.edu", portalType: "CollegeNET",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CS", stipend: 36000, deadline: "December 15", areas: ["ML","Computer Vision","NLP","AI Theory"], url: "https://www.cs.cornell.edu/phd/admissions" },
      { name: "PhD in Information Science (AI)", dept: "IS", stipend: 34000, deadline: "December 15", areas: ["Human-AI Interaction","Fairness in ML","Social Computing"], url: "https://infosci.cornell.edu/phd" },
    ]
  },
  { name: "University of Washington", country: "USA", city: "Seattle, WA", qsRanking: 85, website: "https://uw.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "Allen School", stipend: 38000, deadline: "December 15", areas: ["Deep Learning","NLP","Computer Vision","Robotics"], url: "https://www.cs.washington.edu/academics/phd/admissions" },
      { name: "PhD in Statistics (ML)", dept: "Statistics", stipend: 34000, deadline: "January 10", areas: ["Statistical ML","Time Series","Causal AI"], url: "https://stat.uw.edu/academics/graduate/admissions" },
    ]
  },
  { name: "Princeton University", country: "USA", city: "Princeton, NJ", qsRanking: 17, website: "https://princeton.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS", stipend: 38000, deadline: "December 15", areas: ["ML Theory","Deep Learning","AI Safety","Privacy-preserving ML"], url: "https://www.cs.princeton.edu/grad/admissions" },
    ]
  },
  { name: "Harvard University", country: "USA", city: "Cambridge, MA", qsRanking: 4, website: "https://harvard.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "SEAS", stipend: 43000, deadline: "December 15", areas: ["ML","Computer Vision","NLP","Scientific ML"], url: "https://www.seas.harvard.edu/computer-science/graduate-programs/doctoral-program" },
    ]
  },
  { name: "Columbia University", country: "USA", city: "New York, NY", qsRanking: 33, website: "https://columbia.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS", stipend: 38000, deadline: "December 15", areas: ["Deep Learning","NLP","Reinforcement Learning","AI for Science"], url: "https://www.cs.columbia.edu/education/phd/" },
    ]
  },
  { name: "New York University", country: "USA", city: "New York, NY", qsRanking: 39, website: "https://nyu.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Data Science (ML)", dept: "Center for Data Science", stipend: 36000, deadline: "December 15", areas: ["Deep Learning","ML Theory","Vision","NLP"], url: "https://cds.nyu.edu/phd-program/" },
      { name: "PhD in CS (AI Track)", dept: "Courant", stipend: 36000, deadline: "December 15", areas: ["AI","ML","Computer Vision","Robotics"], url: "https://cs.nyu.edu/home/graduate/phd.html" },
    ]
  },
  { name: "University of Illinois Urbana-Champaign", country: "USA", city: "Champaign, IL", qsRanking: 47, website: "https://illinois.edu", portalType: "CollegeNET",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 30000, deadline: "December 15", areas: ["ML","NLP","Computer Vision","AI Systems"], url: "https://cs.illinois.edu/admissions/graduate" },
    ]
  },
  { name: "University of Michigan", country: "USA", city: "Ann Arbor, MI", qsRanking: 33, website: "https://umich.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in CSE (AI/ML)", dept: "CSE", stipend: 31000, deadline: "December 15", areas: ["Deep Learning","Computer Vision","NLP","RL"], url: "https://cse.engin.umich.edu/academics/graduate/doctoral-programs/" },
    ]
  },
  { name: "Georgia Institute of Technology", country: "USA", city: "Atlanta, GA", qsRanking: 136, website: "https://gatech.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Machine Learning", dept: "ML Center", stipend: 32000, deadline: "December 15", areas: ["ML","AI","Robotics","Computer Vision"], url: "https://ml.gatech.edu/phd" },
      { name: "PhD in CS (AI Track)", dept: "CS", stipend: 32000, deadline: "December 15", areas: ["AI","NLP","Vision","HCI"], url: "https://www.cc.gatech.edu/degree-programs/phd-computer-science" },
    ]
  },
  { name: "University of California, San Diego", country: "USA", city: "La Jolla, CA", qsRanking: 83, website: "https://ucsd.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CSE", stipend: 36000, deadline: "December 10", areas: ["ML","AI","Computer Vision","NLP"], url: "https://cse.ucsd.edu/graduate/phd-programs" },
    ]
  },
  { name: "University of California, Los Angeles", country: "USA", city: "Los Angeles, CA", qsRanking: 40, website: "https://ucla.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (AI)", dept: "CS", stipend: 35000, deadline: "December 15", areas: ["AI","ML","Computer Vision","Cognitive AI"], url: "https://www.cs.ucla.edu/graduate-admissions/" },
    ]
  },
  { name: "Yale University", country: "USA", city: "New Haven, CT", qsRanking: 18, website: "https://yale.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CS", stipend: 37000, deadline: "December 15", areas: ["ML","AI","Interdisciplinary AI","AI for Science"], url: "https://cpsc.yale.edu/academics/graduate-program" },
    ]
  },
  { name: "Johns Hopkins University", country: "USA", city: "Baltimore, MD", qsRanking: 26, website: "https://jhu.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS", stipend: 37000, deadline: "December 15", areas: ["ML","Computer Vision","NLP","Medical AI"], url: "https://www.cs.jhu.edu/graduate-studies/phd-program/" },
    ]
  },
  { name: "University of Texas at Austin", country: "USA", city: "Austin, TX", qsRanking: 67, website: "https://utexas.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CS", stipend: 28000, deadline: "December 15", areas: ["ML","NLP","Computer Vision","RL","AI Theory"], url: "https://www.cs.utexas.edu/graduate-program/phd-program" },
    ]
  },
  { name: "University of Pennsylvania", country: "USA", city: "Philadelphia, PA", qsRanking: 22, website: "https://upenn.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer & Information Science (ML)", dept: "CIS", stipend: 38000, deadline: "December 15", areas: ["ML","AI","Robotics","Data Science"], url: "https://www.cis.upenn.edu/prospective-students/graduate/phd/" },
    ]
  },
  { name: "Brown University", country: "USA", city: "Providence, RI", qsRanking: 149, website: "https://brown.edu", portalType: "CollegeNET",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CS", stipend: 36000, deadline: "December 15", areas: ["ML","AI","Computer Vision","Robotics"], url: "https://cs.brown.edu/degrees/doctoral/" },
    ]
  },
  { name: "Duke University", country: "USA", city: "Durham, NC", qsRanking: 66, website: "https://duke.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS", stipend: 34000, deadline: "December 15", areas: ["ML","AI","Computer Vision","Biomedical AI"], url: "https://gradschool.duke.edu/academics/programs-degrees/computer-science-phd" },
    ]
  },
  { name: "University of Wisconsin-Madison", country: "USA", city: "Madison, WI", qsRanking: 88, website: "https://wisc.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Sciences (ML)", dept: "CS", stipend: 28000, deadline: "December 15", areas: ["ML","AI","Computer Vision","NLP"], url: "https://www.cs.wisc.edu/graduate/phd-program/" },
    ]
  },
  { name: "Purdue University", country: "USA", city: "West Lafayette, IN", qsRanking: 109, website: "https://purdue.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CS", stipend: 25000, deadline: "December 15", areas: ["ML","AI","Computer Vision","NLP"], url: "https://www.cs.purdue.edu/graduate/admission/" },
    ]
  },
  { name: "Ohio State University", country: "USA", city: "Columbus, OH", qsRanking: 188, website: "https://osu.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science & Engineering (ML)", dept: "CSE", stipend: 24000, deadline: "December 15", areas: ["ML","Computer Vision","NLP","RL"], url: "https://cse.osu.edu/graduate/prospective-students" },
    ]
  },
  { name: "Northeastern University", country: "USA", city: "Boston, MA", qsRanking: 346, website: "https://northeastern.edu", portalType: "Slate",
    programs: [
      { name: "PhD in Computer Science (AI)", dept: "Khoury", stipend: 34000, deadline: "December 15", areas: ["AI","ML","Computer Vision","Responsible AI"], url: "https://www.khoury.northeastern.edu/programs/computer-science-phd/" },
    ]
  },
  { name: "Rice University", country: "USA", city: "Houston, TX", qsRanking: 165, website: "https://rice.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS", stipend: 36000, deadline: "December 15", areas: ["ML","NLP","Computer Vision","AI Theory"], url: "https://cs.rice.edu/graduate/phd-admissions" },
    ]
  },
  { name: "University of Maryland", country: "USA", city: "College Park, MD", qsRanking: 148, website: "https://umd.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 28000, deadline: "December 15", areas: ["ML","AI","Computer Vision","NLP"], url: "https://www.cs.umd.edu/grad-catalog/cs-phd.shtml" },
    ]
  },
  { name: "University of Massachusetts Amherst", country: "USA", city: "Amherst, MA", qsRanking: 234, website: "https://umass.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS", stipend: 27000, deadline: "December 15", areas: ["ML","NLP","Computer Vision","RL","Information Extraction"], url: "https://www.cics.umass.edu/grads/phd-overview" },
    ]
  },
  { name: "Stony Brook University", country: "USA", city: "Stony Brook, NY", qsRanking: 201, website: "https://stonybrook.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CS", stipend: 25000, deadline: "January 15", areas: ["ML","AI","Computer Vision","Bioinformatics AI"], url: "https://www.cs.stonybrook.edu/students/Graduate-Studies/PhD" },
    ]
  },
  { name: "Rutgers University", country: "USA", city: "New Brunswick, NJ", qsRanking: 209, website: "https://rutgers.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS", stipend: 28000, deadline: "December 1", areas: ["ML","AI","Data Science","Computer Vision"], url: "https://www.cs.rutgers.edu/graduate/phd-program" },
    ]
  },

  // === UK ===
  { name: "University of Oxford", country: "UK", city: "Oxford", qsRanking: 4, website: "https://ox.ac.uk", portalType: "Custom",
    programs: [
      { name: "DPhil in Computer Science (ML)", dept: "CS", stipend: 18000, deadline: "January 10", areas: ["ML","AI","Computer Vision","NLP","AI Safety"], url: "https://www.cs.ox.ac.uk/admissions/graduate/dphil/" },
      { name: "DPhil in Statistics (ML)", dept: "Statistics", stipend: 18000, deadline: "January 10", areas: ["Statistical ML","Bayesian ML","Causal Inference"], url: "https://www.stats.ox.ac.uk/study-here/graduate-studies/" },
    ]
  },
  { name: "University of Cambridge", country: "UK", city: "Cambridge", qsRanking: 2, website: "https://cam.ac.uk", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 18000, deadline: "December 1", areas: ["ML","AI","Computer Vision","Probabilistic Computing"], url: "https://www.cl.cam.ac.uk/admissions/phd/" },
    ]
  },
  { name: "Imperial College London", country: "UK", city: "London", qsRanking: 8, website: "https://imperial.ac.uk", portalType: "Custom",
    programs: [
      { name: "PhD in Computing (ML)", dept: "Computing", stipend: 20000, deadline: "January 15", areas: ["ML","AI","Computer Vision","Data Science","NLP"], url: "https://www.imperial.ac.uk/computing/prospective-students/phd/" },
    ]
  },
  { name: "University College London", country: "UK", city: "London", qsRanking: 9, website: "https://ucl.ac.uk", portalType: "Custom",
    programs: [
      { name: "PhD in Machine Learning (CSML)", dept: "CS/ML Centre", stipend: 19000, deadline: "January 10", areas: ["Deep Learning","NLP","Computer Vision","RL"], url: "https://www.ucl.ac.uk/prospective-students/graduate/research-degrees/machine-learning-phd" },
    ]
  },
  { name: "University of Edinburgh", country: "UK", city: "Edinburgh", qsRanking: 27, website: "https://ed.ac.uk", portalType: "Custom",
    programs: [
      { name: "PhD in Informatics (ML)", dept: "Informatics", stipend: 17000, deadline: "January 15", areas: ["ML","NLP","Computer Vision","RL","AI Ethics"], url: "https://www.ed.ac.uk/informatics/postgraduate/phd" },
    ]
  },
  { name: "King's College London", country: "UK", city: "London", qsRanking: 40, website: "https://kcl.ac.uk", portalType: "Custom",
    programs: [
      { name: "PhD in Informatics (AI/ML)", dept: "Informatics", stipend: 17000, deadline: "January 31", areas: ["AI","ML","Computer Vision","Healthcare AI"], url: "https://www.kcl.ac.uk/informatics/postgraduate/research" },
    ]
  },
  { name: "University of Manchester", country: "UK", city: "Manchester", qsRanking: 34, website: "https://manchester.ac.uk", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CS", stipend: 16500, deadline: "January 31", areas: ["ML","AI","Data Science","Knowledge Graphs"], url: "https://www.cs.manchester.ac.uk/study/postgraduate-research/" },
    ]
  },
  { name: "University of Bristol", country: "UK", city: "Bristol", qsRanking: 61, website: "https://bristol.ac.uk", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS", stipend: 16500, deadline: "January 31", areas: ["ML","Computer Vision","AI Safety","Robotics"], url: "https://www.bristol.ac.uk/study/postgraduate/research/computer-science/" },
    ]
  },
  { name: "University of Warwick", country: "UK", city: "Coventry", qsRanking: 90, website: "https://warwick.ac.uk", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 16000, deadline: "January 31", areas: ["ML","AI","Computer Vision","Game AI"], url: "https://warwick.ac.uk/fac/sci/dcs/research/" },
    ]
  },
  { name: "University of Southampton", country: "UK", city: "Southampton", qsRanking: 81, website: "https://soton.ac.uk", portalType: "Custom",
    programs: [
      { name: "PhD in Electronics & CS (AI/ML)", dept: "ECS", stipend: 16000, deadline: "January 31", areas: ["AI","ML","Semantic Web","Agents"], url: "https://www.ecs.soton.ac.uk/research/phd" },
    ]
  },

  // === SWITZERLAND ===
  { name: "ETH Zurich", country: "Switzerland", city: "Zurich", qsRanking: 7, website: "https://ethz.ch", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 55000, deadline: "December 15", areas: ["ML","AI","Computer Vision","NLP","AI Systems"], url: "https://www.inf.ethz.ch/studies/phd.html" },
      { name: "PhD in Data Science (ML)", dept: "DS", stipend: 55000, deadline: "December 15", areas: ["Data Science","ML","Statistical Learning","Causal AI"], url: "https://ds3lab.inf.ethz.ch/" },
    ]
  },
  { name: "EPFL", country: "Switzerland", city: "Lausanne", qsRanking: 17, website: "https://epfl.ch", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "IC School", stipend: 55000, deadline: "December 15", areas: ["ML","AI","Computer Vision","NLP","Distributed ML"], url: "https://phd.epfl.ch/edic" },
    ]
  },

  // === CANADA ===
  { name: "University of Toronto", country: "Canada", city: "Toronto, ON", qsRanking: 25, website: "https://utoronto.ca", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 22000, deadline: "December 1", areas: ["Deep Learning","ML Theory","Computer Vision","NLP","AI Safety"], url: "https://web.cs.toronto.edu/graduate/prospective" },
    ]
  },
  { name: "University of British Columbia", country: "Canada", city: "Vancouver, BC", qsRanking: 46, website: "https://ubc.ca", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS", stipend: 20000, deadline: "December 15", areas: ["ML","Computer Vision","NLP","AI","RL"], url: "https://www.cs.ubc.ca/students/grad/prospective" },
    ]
  },
  { name: "University of Waterloo", country: "Canada", city: "Waterloo, ON", qsRanking: 154, website: "https://uwaterloo.ca", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CS", stipend: 20000, deadline: "December 1", areas: ["ML","AI","NLP","Computer Vision","Quantum ML"], url: "https://cs.uwaterloo.ca/future-graduate-students" },
    ]
  },
  { name: "McGill University", country: "Canada", city: "Montreal, QC", qsRanking: 111, website: "https://mcgill.ca", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS / Mila", stipend: 20000, deadline: "December 15", areas: ["Deep Learning","NLP","RL","Computer Vision"], url: "https://www.cs.mcgill.ca/academic/grad/" },
    ]
  },
  { name: "University of Montreal (Mila)", country: "Canada", city: "Montreal, QC", qsRanking: 141, website: "https://umontreal.ca", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (Deep Learning)", dept: "DIRO / Mila", stipend: 20000, deadline: "December 15", areas: ["Deep Learning","RL","NLP","Generative Models","AI Safety"], url: "https://diro.umontreal.ca/etudes/cycles-superieurs/doctorat/" },
    ]
  },
  { name: "Simon Fraser University", country: "Canada", city: "Burnaby, BC", qsRanking: 323, website: "https://sfu.ca", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 18000, deadline: "January 15", areas: ["ML","AI","Computer Vision","NLP"], url: "https://www.cs.sfu.ca/graduate/programs.html" },
    ]
  },
  { name: "University of Alberta", country: "Canada", city: "Edmonton, AB", qsRanking: 111, website: "https://ualberta.ca", portalType: "Custom",
    programs: [
      { name: "PhD in Computing Science (ML/AI)", dept: "CS / AMII", stipend: 20000, deadline: "January 15", areas: ["RL","ML","AI","Computer Vision"], url: "https://www.ualberta.ca/computing-science/graduate-studies/programs-and-admissions/index.html" },
    ]
  },

  // === GERMANY ===
  { name: "Technical University of Munich", country: "Germany", city: "Munich", qsRanking: 30, website: "https://tum.de", portalType: "Custom",
    programs: [
      { name: "PhD in Informatics (AI/ML)", dept: "Informatics", stipend: 25000, deadline: "Rolling", areas: ["ML","AI","Computer Vision","Robotics","Medical AI"], url: "https://www.tum.de/en/studies/degree-programs/detail/doctorate-informatics-doctorate" },
    ]
  },
  { name: "Ludwig Maximilian University Munich", country: "Germany", city: "Munich", qsRanking: 55, website: "https://lmu.de", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS / Statistics", stipend: 24000, deadline: "Rolling", areas: ["ML","Statistical Learning","Bayesian AI","Computer Vision"], url: "https://www.lmu.de/en/study/all-degrees-and-programs/doctoral-programs/" },
    ]
  },
  { name: "Saarland University (MPI-SWS)", country: "Germany", city: "Saarbrücken", qsRanking: 401, website: "https://uni-saarland.de", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS / MPI", stipend: 26000, deadline: "Rolling", areas: ["ML","AI","Computer Vision","NLP","Systems"], url: "https://www.mpi-inf.mpg.de/departments/computer-vision-and-machine-learning/open-positions" },
    ]
  },
  { name: "RWTH Aachen University", country: "Germany", city: "Aachen", qsRanking: 107, website: "https://rwth-aachen.de", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CS", stipend: 24000, deadline: "Rolling", areas: ["ML","AI","Computer Vision","NLP"], url: "https://www.informatik.rwth-aachen.de/go/id/liwb" },
    ]
  },
  { name: "University of Heidelberg", country: "Germany", city: "Heidelberg", qsRanking: 87, website: "https://uni-heidelberg.de", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS / HITS", stipend: 24000, deadline: "Rolling", areas: ["ML","Bioinformatics AI","Computer Vision","Scientific ML"], url: "https://www.uni-heidelberg.de/en/study/phd-programs" },
    ]
  },
  { name: "Humboldt University Berlin", country: "Germany", city: "Berlin", qsRanking: 120, website: "https://hu-berlin.de", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 24000, deadline: "Rolling", areas: ["ML","AI","NLP","Statistical ML"], url: "https://www.informatik.hu-berlin.de/en/forschung-en/gebiete/mldm" },
    ]
  },

  // === NETHERLANDS ===
  { name: "Delft University of Technology", country: "Netherlands", city: "Delft", qsRanking: 57, website: "https://tudelft.nl", portalType: "Custom",
    programs: [
      { name: "PhD in Electrical Engineering (ML/AI)", dept: "EE / CS", stipend: 30000, deadline: "Rolling", areas: ["ML","AI","Computer Vision","Robotics","Autonomous Systems"], url: "https://www.tudelft.nl/en/education/programmes/phd/" },
    ]
  },
  { name: "University of Amsterdam", country: "Netherlands", city: "Amsterdam", qsRanking: 55, website: "https://uva.nl", portalType: "Custom",
    programs: [
      { name: "PhD in AI (Machine Learning)", dept: "AMLab", stipend: 32000, deadline: "Rolling", areas: ["Deep Learning","NLP","Computer Vision","ML Theory","Generative Models"], url: "https://www.uva.nl/en/programmes/doctorates/doctorates.html" },
    ]
  },

  // === FRANCE ===
  { name: "École Polytechnique (IP Paris)", country: "France", city: "Palaiseau", qsRanking: 38, website: "https://polytechnique.edu", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "LIX / DataIA", stipend: 21000, deadline: "Rolling", areas: ["ML","AI","Optimization","Deep Learning"], url: "https://www.ip-paris.fr/en/education/phds" },
    ]
  },
  { name: "Paris Sciences et Lettres (PSL)", country: "France", city: "Paris", qsRanking: 24, website: "https://psl.eu", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "ENS / INRIA", stipend: 21000, deadline: "Rolling", areas: ["ML","Deep Learning","Statistics","Computer Vision"], url: "https://psl.eu/en/education/doctoral-programs" },
    ]
  },
  { name: "Université Paris-Saclay", country: "France", city: "Paris", qsRanking: 76, website: "https://universite-paris-saclay.fr", portalType: "Custom",
    programs: [
      { name: "PhD in CS/Math (ML)", dept: "LISN / INRIA", stipend: 21000, deadline: "Rolling", areas: ["ML","Statistical Learning","AI","Optimization"], url: "https://www.universite-paris-saclay.fr/en/research/phd-and-hdr/doctoral-programs" },
    ]
  },

  // === SINGAPORE ===
  { name: "National University of Singapore", country: "Singapore", city: "Singapore", qsRanking: 8, website: "https://nus.edu.sg", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "SoC", stipend: 30000, deadline: "January 15", areas: ["ML","AI","Computer Vision","NLP","Autonomous Systems"], url: "https://www.comp.nus.edu.sg/programmes/pg/phdcs/" },
    ]
  },
  { name: "Nanyang Technological University", country: "Singapore", city: "Singapore", qsRanking: 26, website: "https://ntu.edu.sg", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "SCSE", stipend: 28000, deadline: "January 15", areas: ["ML","AI","Computer Vision","NLP","Federated Learning"], url: "https://www.ntu.edu.sg/scse/admissions/programmes/phd-programmes" },
    ]
  },

  // === CHINA ===
  { name: "Tsinghua University", country: "China", city: "Beijing", qsRanking: 25, website: "https://tsinghua.edu.cn", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CS", stipend: 15000, deadline: "December 1", areas: ["AI","ML","Computer Vision","NLP","Autonomous Driving"], url: "https://www.cs.tsinghua.edu.cn/csen/Admissions.htm" },
    ]
  },
  { name: "Peking University", country: "China", city: "Beijing", qsRanking: 14, website: "https://pku.edu.cn", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS / Wangxuan Institute", stipend: 14000, deadline: "December 1", areas: ["ML","AI","NLP","Computer Vision"], url: "https://www.cs.pku.edu.cn/English/Graduate_Programs/index.htm" },
    ]
  },
  { name: "Shanghai Jiao Tong University", country: "China", city: "Shanghai", qsRanking: 51, website: "https://sjtu.edu.cn", portalType: "Custom",
    programs: [
      { name: "PhD in CS / AI (ML Track)", dept: "CS / AI Institute", stipend: 14000, deadline: "December 1", areas: ["AI","ML","Computer Vision","NLP","Autonomous Systems"], url: "https://www.cs.sjtu.edu.cn/en/Admission.aspx" },
    ]
  },
  { name: "Zhejiang University", country: "China", city: "Hangzhou", qsRanking: 42, website: "https://zju.edu.cn", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CS", stipend: 13000, deadline: "December 1", areas: ["ML","AI","Computer Vision","Robotics","Knowledge Graphs"], url: "https://www.cs.zju.edu.cn/csen/index.htm" },
    ]
  },
  { name: "Fudan University", country: "China", city: "Shanghai", qsRanking: 50, website: "https://fudan.edu.cn", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS", stipend: 13000, deadline: "December 1", areas: ["ML","NLP","Computer Vision","AI Systems"], url: "https://cs.fudan.edu.cn/6c/55/c18206a224341/page.htm" },
    ]
  },

  // === HONG KONG ===
  { name: "Hong Kong University of Science and Technology", country: "Hong Kong", city: "Hong Kong", qsRanking: 47, website: "https://hkust.edu.hk", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CSE", stipend: 20000, deadline: "December 15", areas: ["ML","AI","Computer Vision","NLP","Big Data"], url: "https://cse.hkust.edu.hk/pg/phd/admission/" },
    ]
  },
  { name: "City University of Hong Kong", country: "Hong Kong", city: "Hong Kong", qsRanking: 62, website: "https://cityu.edu.hk", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 18000, deadline: "January 31", areas: ["ML","AI","Data Mining","Computer Vision"], url: "https://www.cs.cityu.edu.hk/research/phd-programme" },
    ]
  },

  // === SOUTH KOREA ===
  { name: "KAIST", country: "South Korea", city: "Daejeon", qsRanking: 56, website: "https://kaist.ac.kr", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CS", stipend: 18000, deadline: "December 1", areas: ["ML","AI","Computer Vision","NLP","RL"], url: "https://cs.kaist.ac.kr/graduate/phd" },
    ]
  },
  { name: "Seoul National University", country: "South Korea", city: "Seoul", qsRanking: 41, website: "https://snu.ac.kr", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CSE", stipend: 16000, deadline: "December 1", areas: ["ML","AI","Computer Vision","Bioinformatics AI"], url: "https://cse.snu.ac.kr/en/graduate/phd" },
    ]
  },
  { name: "POSTECH", country: "South Korea", city: "Pohang", qsRanking: 120, website: "https://postech.ac.kr", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science & Engineering (AI)", dept: "CSE", stipend: 16000, deadline: "December 1", areas: ["AI","ML","Computer Vision","NLP"], url: "https://cse.postech.ac.kr/en/graduate/" },
    ]
  },

  // === JAPAN ===
  { name: "University of Tokyo", country: "Japan", city: "Tokyo", qsRanking: 32, website: "https://u-tokyo.ac.jp", portalType: "Custom",
    programs: [
      { name: "PhD in CS / Information Science (ML)", dept: "IS", stipend: 16000, deadline: "February 1", areas: ["ML","AI","Computer Vision","NLP","Robotics"], url: "https://www.i.u-tokyo.ac.jp/edu/course/dc/index_e.shtml" },
    ]
  },
  { name: "Kyoto University", country: "Japan", city: "Kyoto", qsRanking: 46, website: "https://kyoto-u.ac.jp", portalType: "Custom",
    programs: [
      { name: "PhD in Informatics (ML/AI)", dept: "Informatics", stipend: 15000, deadline: "February 1", areas: ["ML","AI","Computer Vision","NLP"], url: "https://www.i.kyoto-u.ac.jp/en/graduate/doctoral" },
    ]
  },
  { name: "Tokyo Institute of Technology", country: "Japan", city: "Tokyo", qsRanking: 91, website: "https://titech.ac.jp", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CS", stipend: 14000, deadline: "February 1", areas: ["ML","AI","Computer Vision","Optimization"], url: "https://www.titech.ac.jp/english/graduate/" },
    ]
  },

  // === AUSTRALIA ===
  { name: "Australian National University", country: "Australia", city: "Canberra", qsRanking: 30, website: "https://anu.edu.au", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS / CSIRO Data61", stipend: 28000, deadline: "October 31", areas: ["ML","AI","Computer Vision","NLP","RL"], url: "https://cs.anu.edu.au/study/graduate-research" },
    ]
  },
  { name: "University of Melbourne", country: "Australia", city: "Melbourne", qsRanking: 33, website: "https://unimelb.edu.au", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS / DS", stipend: 29000, deadline: "October 31", areas: ["ML","AI","Computer Vision","NLP","Medical AI"], url: "https://study.unimelb.edu.au/find/courses/graduate/doctor-of-philosophy-science/" },
    ]
  },
  { name: "University of Sydney", country: "Australia", city: "Sydney", qsRanking: 41, website: "https://sydney.edu.au", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CS", stipend: 28000, deadline: "October 31", areas: ["AI","ML","Computer Vision","NLP","Autonomous Systems"], url: "https://www.sydney.edu.au/courses/courses/dr/doctor-of-philosophy-computer-science.html" },
    ]
  },
  { name: "University of New South Wales", country: "Australia", city: "Sydney", qsRanking: 47, website: "https://unsw.edu.au", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS / Data61", stipend: 28000, deadline: "October 31", areas: ["ML","AI","Computer Vision","Federated Learning"], url: "https://www.engineering.unsw.edu.au/computer-science-engineering/study-with-us/research-degrees" },
    ]
  },
  { name: "University of Queensland", country: "Australia", city: "Brisbane", qsRanking: 50, website: "https://uq.edu.au", portalType: "Custom",
    programs: [
      { name: "PhD in IT & CS (ML/AI)", dept: "EECS", stipend: 28000, deadline: "October 31", areas: ["ML","AI","Computer Vision","NLP"], url: "https://my.uq.edu.au/programs-courses/program.html?acad_prog=8031" },
    ]
  },
  { name: "Monash University", country: "Australia", city: "Melbourne", qsRanking: 57, website: "https://monash.edu", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 28000, deadline: "October 31", areas: ["ML","AI","Explainable AI","Computer Vision","NLP"], url: "https://www.monash.edu/graduate-research/future-students/apply" },
    ]
  },

  // === SWEDEN ===
  { name: "KTH Royal Institute of Technology", country: "Sweden", city: "Stockholm", qsRanking: 98, website: "https://kth.se", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 35000, deadline: "Rolling", areas: ["ML","AI","Computer Vision","NLP","Autonomous Systems"], url: "https://www.kth.se/en/studies/phd/computer-science-1.685022" },
    ]
  },
  { name: "Chalmers University of Technology", country: "Sweden", city: "Gothenburg", qsRanking: 179, website: "https://chalmers.se", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS", stipend: 35000, deadline: "Rolling", areas: ["ML","AI","Computer Vision","Safety-critical AI"], url: "https://www.chalmers.se/en/education/phd-studies/" },
    ]
  },

  // === DENMARK ===
  { name: "Technical University of Denmark", country: "Denmark", city: "Kongens Lyngby", qsRanking: 150, website: "https://dtu.dk", portalType: "Custom",
    programs: [
      { name: "PhD in Applied Mathematics and CS (ML)", dept: "DTU Compute", stipend: 40000, deadline: "Rolling", areas: ["ML","AI","Computer Vision","Bayesian ML","Scientific ML"], url: "https://www.dtu.dk/english/education/phd" },
    ]
  },

  // === FINLAND ===
  { name: "Aalto University", country: "Finland", city: "Espoo", qsRanking: 119, website: "https://aalto.fi", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS / FCAI", stipend: 36000, deadline: "Rolling", areas: ["ML","AI","Probabilistic ML","Computer Vision","NLP"], url: "https://www.aalto.fi/en/programmes/aalto-doctoral-programme-in-science" },
    ]
  },

  // === ISRAEL ===
  { name: "Weizmann Institute of Science", country: "Israel", city: "Rehovot", qsRanking: 148, website: "https://weizmann.ac.il", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 25000, deadline: "December 1", areas: ["ML","AI","Computer Vision","Deep Learning","Generative Models"], url: "https://www.weizmann.ac.il/feinberg/admissions" },
    ]
  },
  { name: "Technion - Israel Institute of Technology", country: "Israel", city: "Haifa", qsRanking: 78, website: "https://technion.ac.il", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS", stipend: 22000, deadline: "December 1", areas: ["ML","AI","Computer Vision","Signal Processing"], url: "https://graduate.technion.ac.il/en/prospective-students/" },
    ]
  },

  // === INDIA ===
  { name: "Indian Institute of Science (IISc)", country: "India", city: "Bangalore", qsRanking: 225, website: "https://iisc.ac.in", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CSA / CDS", stipend: 8000, deadline: "February 28", areas: ["ML","AI","Computer Vision","NLP","Statistical Learning"], url: "https://cds.iisc.ac.in/admissions/phd/" },
    ]
  },
  { name: "IIT Bombay", country: "India", city: "Mumbai", qsRanking: 118, website: "https://iitb.ac.in", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science & Engineering (AI/ML)", dept: "CSE", stipend: 7500, deadline: "February 28", areas: ["ML","AI","Computer Vision","NLP"], url: "https://www.cse.iitb.ac.in/page26.php" },
    ]
  },
  { name: "IIT Delhi", country: "India", city: "New Delhi", qsRanking: 150, website: "https://iitd.ac.in", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CSE", stipend: 7500, deadline: "February 28", areas: ["ML","AI","Data Science","Computer Vision"], url: "https://home.iitd.ac.in/grad-admission.php" },
    ]
  },
  { name: "IIT Madras", country: "India", city: "Chennai", qsRanking: 227, website: "https://iitm.ac.in", portalType: "Custom",
    programs: [
      { name: "PhD in CS (AI/ML)", dept: "CS", stipend: 7500, deadline: "February 28", areas: ["ML","AI","NLP","Computer Vision","RL"], url: "https://www.cse.iitm.ac.in/admissions" },
    ]
  },

  // === UAE ===
  { name: "Mohamed bin Zayed University of AI", country: "UAE", city: "Abu Dhabi", qsRanking: 270, website: "https://mbzuai.ac.ae", portalType: "Custom",
    programs: [
      { name: "PhD in Machine Learning", dept: "ML", stipend: 35000, deadline: "January 15", areas: ["ML","Deep Learning","Federated Learning","ML Theory"], url: "https://mbzuai.ac.ae/study/phd-programs/machine-learning/" },
      { name: "PhD in Computer Vision", dept: "CV", stipend: 35000, deadline: "January 15", areas: ["Computer Vision","3D Vision","Video Understanding","Medical Imaging"], url: "https://mbzuai.ac.ae/study/phd-programs/computer-vision/" },
      { name: "PhD in Natural Language Processing", dept: "NLP", stipend: 35000, deadline: "January 15", areas: ["NLP","LLMs","Multilingual AI","Dialogue Systems"], url: "https://mbzuai.ac.ae/study/phd-programs/natural-language-processing/" },
    ]
  },

  // === AUSTRIA ===
  { name: "IST Austria", country: "Austria", city: "Klosterneuburg", qsRanking: 220, website: "https://ist.ac.at", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 30000, deadline: "January 8", areas: ["ML","AI","Computer Vision","Optimization","Statistical Learning"], url: "https://phd.pages.ist.ac.at/" },
    ]
  },

  // === BELGIUM ===
  { name: "KU Leuven", country: "Belgium", city: "Leuven", qsRanking: 74, website: "https://kuleuven.be", portalType: "Custom",
    programs: [
      { name: "PhD in Engineering Science (ML/AI)", dept: "CS / DTAI", stipend: 28000, deadline: "Rolling", areas: ["ML","AI","Computer Vision","NLP","Probabilistic ML"], url: "https://www.kuleuven.be/english/research/phd" },
    ]
  },

  // === ITALY ===
  { name: "Scuola Normale Superiore", country: "Italy", city: "Pisa", qsRanking: 149, website: "https://sns.it", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS", stipend: 16000, deadline: "May 31", areas: ["ML","AI","Computer Vision","NLP"], url: "https://www.sns.it/en/phd-programs" },
    ]
  },
  { name: "Bocconi University", country: "Italy", city: "Milan", qsRanking: 175, website: "https://unibocconi.it", portalType: "Custom",
    programs: [
      { name: "PhD in Statistics (ML focus)", dept: "Statistics & CS", stipend: 16000, deadline: "January 31", areas: ["ML","Statistical AI","Causal Inference","Explainable AI"], url: "https://www.unibocconi.eu/en/programs/phd-programs" },
    ]
  },

  // === CZECH REPUBLIC ===
  { name: "Czech Technical University in Prague", country: "Czech Republic", city: "Prague", qsRanking: 251, website: "https://cvut.cz", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 18000, deadline: "April 30", areas: ["ML","AI","Computer Vision","Pattern Recognition"], url: "https://www.fel.cvut.cz/en/education/phd.html" },
    ]
  },

  // === PORTUGAL ===
  { name: "Instituto Superior Técnico (IST Lisboa)", country: "Portugal", city: "Lisbon", qsRanking: 235, website: "https://tecnico.ulisboa.pt", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science & Engineering (ML)", dept: "CS", stipend: 14000, deadline: "April 15", areas: ["ML","AI","NLP","Computer Vision"], url: "https://fenix.tecnico.ulisboa.pt/cursos/dec3" },
    ]
  },

  // === IRELAND ===
  { name: "Trinity College Dublin", country: "Ireland", city: "Dublin", qsRanking: 81, website: "https://tcd.ie", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CS", stipend: 18000, deadline: "Rolling", areas: ["ML","AI","NLP","Computer Vision","Healthcare AI"], url: "https://www.scss.tcd.ie/postgraduate/research/" },
    ]
  },
  { name: "University College Dublin", country: "Ireland", city: "Dublin", qsRanking: 181, website: "https://ucd.ie", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS / Insight Centre", stipend: 18000, deadline: "Rolling", areas: ["ML","AI","Data Science","NLP"], url: "https://www.ucd.ie/cs/study/phd/" },
    ]
  },

  // === SPAIN ===
  { name: "Universitat Pompeu Fabra", country: "Spain", city: "Barcelona", qsRanking: 301, website: "https://upf.edu", portalType: "Custom",
    programs: [
      { name: "PhD in Information & Communication Tech (ML)", dept: "ICT", stipend: 15000, deadline: "Rolling", areas: ["ML","AI","NLP","Computer Vision","Data Science"], url: "https://www.upf.edu/web/phd/ict" },
    ]
  },

  // === NEW ZEALAND ===
  { name: "University of Auckland", country: "New Zealand", city: "Auckland", qsRanking: 68, website: "https://auckland.ac.nz", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 22000, deadline: "October 31", areas: ["ML","AI","Computer Vision","NLP","Evolutionary Computing"], url: "https://www.cs.auckland.ac.nz/en/about/our-research/research-degrees.html" },
    ]
  },

  // === NORWAY ===
  { name: "University of Oslo", country: "Norway", city: "Oslo", qsRanking: 119, website: "https://uio.no", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "IFI", stipend: 45000, deadline: "Rolling", areas: ["ML","AI","NLP","Computer Vision","Biomedical AI"], url: "https://www.mn.uio.no/ifi/english/research/phd/" },
    ]
  },

  // === RUSSIA ===
  { name: "Skolkovo Institute of Science and Technology", country: "Russia", city: "Moscow", qsRanking: 401, website: "https://skoltech.ru", portalType: "Custom",
    programs: [
      { name: "PhD in Artificial Intelligence", dept: "AI Center", stipend: 12000, deadline: "February 28", areas: ["AI","ML","Computer Vision","NLP","Generative Models"], url: "https://www.skoltech.ru/en/education/phd/" },
    ]
  },

  // === SOUTH AFRICA ===
  { name: "University of Cape Town", country: "South Africa", city: "Cape Town", qsRanking: 237, website: "https://uct.ac.za", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 8000, deadline: "October 31", areas: ["ML","AI","Computer Vision","NLP","AI for Development"], url: "https://www.cs.uct.ac.za/postgraduate" },
    ]
  },

  // === ADDITIONAL US UNIVERSITIES ===
  { name: "Vanderbilt University", country: "USA", city: "Nashville, TN", qsRanking: 230, website: "https://vanderbilt.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 32000, deadline: "December 15", areas: ["ML","AI","Biomedical AI","Computer Vision"], url: "https://cs.vanderbilt.edu/graduate/phd/" },
    ]
  },
  { name: "University of Colorado Boulder", country: "USA", city: "Boulder, CO", qsRanking: 248, website: "https://colorado.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS", stipend: 28000, deadline: "December 15", areas: ["ML","AI","NLP","Computer Vision","HCI"], url: "https://www.colorado.edu/cs/graduate-programs/doctoral-degree" },
    ]
  },
  { name: "Emory University", country: "USA", city: "Atlanta, GA", qsRanking: 278, website: "https://emory.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CS", stipend: 33000, deadline: "December 15", areas: ["AI","ML","Biomedical AI","NLP"], url: "https://www.cs.emory.edu/graduate/" },
    ]
  },
  { name: "Boston University", country: "USA", city: "Boston, MA", qsRanking: 113, website: "https://bu.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS", stipend: 36000, deadline: "December 15", areas: ["ML","AI","NLP","Computer Vision","AI for Science"], url: "https://www.bu.edu/cs/phd-program/" },
    ]
  },
  { name: "Tufts University", country: "USA", city: "Medford, MA", qsRanking: 295, website: "https://tufts.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 32000, deadline: "December 15", areas: ["ML","AI","HRI","Computer Vision","NLP"], url: "https://engineering.tufts.edu/cs/graduate/doctorate" },
    ]
  },
  { name: "Virginia Tech", country: "USA", city: "Blacksburg, VA", qsRanking: 372, website: "https://vt.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 27000, deadline: "January 15", areas: ["ML","AI","Computer Vision","NLP","Trustworthy AI"], url: "https://cs.vt.edu/Graduate/Degrees/PhD.html" },
    ]
  },
  { name: "Arizona State University", country: "USA", city: "Tempe, AZ", qsRanking: 216, website: "https://asu.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CS", stipend: 25000, deadline: "January 15", areas: ["ML","AI","NLP","Computer Vision","AI for Good"], url: "https://scai.engineering.asu.edu/graduate/phd-computer-science/" },
    ]
  },
  { name: "Rensselaer Polytechnic Institute", country: "USA", city: "Troy, NY", qsRanking: 401, website: "https://rpi.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CS", stipend: 28000, deadline: "December 31", areas: ["AI","ML","Knowledge Graphs","NLP","Computer Vision"], url: "https://www.cs.rpi.edu/academics/graduate/doctoral.html" },
    ]
  },
  { name: "Rochester Institute of Technology", country: "USA", city: "Rochester, NY", qsRanking: 1001, website: "https://rit.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computing & Information Sciences (ML)", dept: "CS", stipend: 26000, deadline: "February 1", areas: ["ML","AI","Computer Vision","NLP","Responsible AI"], url: "https://www.rit.edu/computing/department-computer-science/phd-computing-and-information-sciences" },
    ]
  },
  { name: "University of Rochester", country: "USA", city: "Rochester, NY", qsRanking: 164, website: "https://rochester.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 30000, deadline: "December 15", areas: ["ML","AI","NLP","Computer Vision","Cognitive AI"], url: "https://www.cs.rochester.edu/graduate/prospective.html" },
    ]
  },
  { name: "Northwestern University", country: "USA", city: "Evanston, IL", qsRanking: 33, website: "https://northwestern.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CS", stipend: 38000, deadline: "December 15", areas: ["ML","AI","NLP","Computer Vision","AI for Science"], url: "https://www.mccormick.northwestern.edu/computer-science/academics/graduate/phd/" },
    ]
  },
  { name: "University of California, Santa Barbara", country: "USA", city: "Santa Barbara, CA", qsRanking: 154, website: "https://ucsb.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 32000, deadline: "December 15", areas: ["ML","AI","Computer Vision","NLP","RL"], url: "https://cs.ucsb.edu/education/graduate/phd" },
    ]
  },
  { name: "University of California, Irvine", country: "USA", city: "Irvine, CA", qsRanking: 160, website: "https://uci.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "ICS", stipend: 30000, deadline: "December 15", areas: ["ML","AI","Computer Vision","NLP","Data Science"], url: "https://www.ics.uci.edu/grad/degrees/phd.php" },
    ]
  },
  { name: "University of California, Davis", country: "USA", city: "Davis, CA", qsRanking: 173, website: "https://ucdavis.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS", stipend: 28000, deadline: "December 15", areas: ["ML","AI","Computer Vision","NLP","Bioinformatics AI"], url: "https://cs.ucdavis.edu/graduate/current-graduate-students/phd-requirements" },
    ]
  },
  { name: "Indiana University Bloomington", country: "USA", city: "Bloomington, IN", qsRanking: 651, website: "https://indiana.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Informatics (AI/ML)", dept: "Informatics / CS", stipend: 22000, deadline: "December 15", areas: ["ML","AI","NLP","Computer Vision","Network Science"], url: "https://informatics.indiana.edu/programs/phd-informatics/" },
    ]
  },
  { name: "Michigan State University", country: "USA", city: "East Lansing, MI", qsRanking: 234, website: "https://msu.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 24000, deadline: "December 15", areas: ["ML","AI","Computer Vision","Biometrics","NLP"], url: "https://www.cse.msu.edu/Graduate/PhD.php" },
    ]
  },
  { name: "Carnegie Mellon University - Silicon Valley", country: "USA", city: "Mountain View, CA", qsRanking: 52, website: "https://sv.cmu.edu", portalType: "Slate",
    programs: [
      { name: "PhD in Software Engineering (ML Systems)", dept: "SE", stipend: 42000, deadline: "December 8", areas: ["ML Systems","AI Engineering","MLOps","Reliable AI"], url: "https://www.sv.cmu.edu/education/phd/" },
    ]
  },
  { name: "University of Southern California", country: "USA", city: "Los Angeles, CA", qsRanking: 101, website: "https://usc.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CS", stipend: 35000, deadline: "December 15", areas: ["AI","ML","NLP","Computer Vision","Autonomous Systems"], url: "https://www.cs.usc.edu/graduate/phd/" },
    ]
  },
  { name: "Dartmouth College", country: "USA", city: "Hanover, NH", qsRanking: 236, website: "https://dartmouth.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 35000, deadline: "January 1", areas: ["ML","AI","Robotics","Computer Vision","NLP"], url: "https://web.cs.dartmouth.edu/graduate/phd-program" },
    ]
  },
  { name: "University of Notre Dame", country: "USA", city: "Notre Dame, IN", qsRanking: 226, website: "https://nd.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 30000, deadline: "December 15", areas: ["ML","AI","Computer Vision","NLP","AI for Good"], url: "https://cse.nd.edu/graduate/computer-science-ph-d/" },
    ]
  },
  { name: "Wake Forest University", country: "USA", city: "Winston-Salem, NC", qsRanking: 451, website: "https://wfu.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS", stipend: 25000, deadline: "January 15", areas: ["ML","AI","Computer Vision","Biomedical AI"], url: "https://cs.wfu.edu/graduate/" },
    ]
  },
  { name: "Washington University in St. Louis", country: "USA", city: "St. Louis, MO", qsRanking: 64, website: "https://wustl.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CSE", stipend: 35000, deadline: "December 15", areas: ["ML","AI","Computer Vision","Biomedical AI","NLP"], url: "https://engineering.wustl.edu/academics/programs/computer-science-phd.html" },
    ]
  },
  { name: "UC Santa Cruz", country: "USA", city: "Santa Cruz, CA", qsRanking: 325, website: "https://ucsc.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 28000, deadline: "December 15", areas: ["ML","AI","Computer Vision","NLP","Human-AI Interaction"], url: "https://www.soe.ucsc.edu/departments/computer-science-and-engineering/graduate/phd" },
    ]
  },
  { name: "Lehigh University", country: "USA", city: "Bethlehem, PA", qsRanking: 501, website: "https://lehigh.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 25000, deadline: "January 15", areas: ["ML","AI","Computer Vision","NLP","Data Science"], url: "https://engineering.lehigh.edu/cse/graduate/phd" },
    ]
  },
  { name: "University of Pittsburgh", country: "USA", city: "Pittsburgh, PA", qsRanking: 143, website: "https://pitt.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS", stipend: 28000, deadline: "January 15", areas: ["ML","AI","NLP","Biomedical AI","Computer Vision"], url: "https://www.cs.pitt.edu/graduate/phd/" },
    ]
  },
  { name: "Florida State University", country: "USA", city: "Tallahassee, FL", qsRanking: 501, website: "https://fsu.edu", portalType: "ApplyYourself",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 22000, deadline: "January 15", areas: ["ML","AI","Data Science","Computer Vision","NLP"], url: "https://www.cs.fsu.edu/phd-program/" },
    ]
  },

  // === MORE EUROPEAN ===
  { name: "University of Copenhagen", country: "Denmark", city: "Copenhagen", qsRanking: 97, website: "https://ku.dk", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS / Pioneer Centre for AI", stipend: 42000, deadline: "Rolling", areas: ["ML","AI","Deep Learning","Computer Vision","NLP"], url: "https://www.ku.dk/english/research/phd/" },
    ]
  },
  { name: "Eindhoven University of Technology", country: "Netherlands", city: "Eindhoven", qsRanking: 120, website: "https://tue.nl", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 30000, deadline: "Rolling", areas: ["ML","AI","Computer Vision","NLP","AI Ethics"], url: "https://www.tue.nl/en/education/phd-programs/" },
    ]
  },
  { name: "Utrecht University", country: "Netherlands", city: "Utrecht", qsRanking: 100, website: "https://uu.nl", portalType: "Custom",
    programs: [
      { name: "PhD in Information & Computing Sciences (ML)", dept: "ICS", stipend: 30000, deadline: "Rolling", areas: ["ML","AI","Computer Vision","NLP","Game AI"], url: "https://www.uu.nl/en/education/phd-programmes" },
    ]
  },
  { name: "Free University of Berlin", country: "Germany", city: "Berlin", qsRanking: 107, website: "https://fu-berlin.de", portalType: "Custom",
    programs: [
      { name: "PhD in Mathematics & Informatics (ML)", dept: "Informatics", stipend: 24000, deadline: "Rolling", areas: ["ML","AI","Statistical Learning","Computer Vision"], url: "https://www.mi.fu-berlin.de/en/inf/index.html" },
    ]
  },
  { name: "University of Freiburg", country: "Germany", city: "Freiburg", qsRanking: 201, website: "https://uni-freiburg.de", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/Robotics)", dept: "CS", stipend: 24000, deadline: "Rolling", areas: ["ML","Robotics","Computer Vision","RL"], url: "https://www.tf.uni-freiburg.de/en/research/labs/ml" },
    ]
  },
  { name: "University of Tuebingen", country: "Germany", city: "Tübingen", qsRanking: 201, website: "https://uni-tuebingen.de", portalType: "Custom",
    programs: [
      { name: "PhD in Machine Learning (IMPRS-IS)", dept: "CS / MPI-IS", stipend: 26000, deadline: "November 1", areas: ["ML","Deep Learning","RL","Computer Vision","NLP"], url: "https://imprs.is.mpg.de/application" },
    ]
  },
  { name: "Ghent University", country: "Belgium", city: "Ghent", qsRanking: 140, website: "https://ugent.be", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 28000, deadline: "Rolling", areas: ["ML","AI","Computer Vision","NLP","Bioinformatics AI"], url: "https://www.ugent.be/en/research/phd" },
    ]
  },
  { name: "Politecnico di Milano", country: "Italy", city: "Milan", qsRanking: 127, website: "https://polimi.it", portalType: "Custom",
    programs: [
      { name: "PhD in Information Technology (ML)", dept: "IT", stipend: 16000, deadline: "April 30", areas: ["ML","AI","Computer Vision","NLP","Data Science"], url: "https://www.polimi.it/en/education/phd-programmes/" },
    ]
  },
  { name: "University of Helsinki", country: "Finland", city: "Helsinki", qsRanking: 107, website: "https://helsinki.fi", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS / HIIT", stipend: 30000, deadline: "Rolling", areas: ["ML","AI","Probabilistic ML","NLP","Computer Vision"], url: "https://www.helsinki.fi/en/research/doctoral-education" },
    ]
  },
  { name: "Lund University", country: "Sweden", city: "Lund", qsRanking: 82, website: "https://lu.se", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS / LTH", stipend: 35000, deadline: "Rolling", areas: ["ML","AI","Computer Vision","NLP","Autonomous Systems"], url: "https://www.lth.se/english/research/phd-studies/" },
    ]
  },
  { name: "University of Groningen", country: "Netherlands", city: "Groningen", qsRanking: 150, website: "https://rug.nl", portalType: "Custom",
    programs: [
      { name: "PhD in Artificial Intelligence (ML)", dept: "AI", stipend: 30000, deadline: "Rolling", areas: ["ML","AI","Computer Vision","NLP","Cognitive AI"], url: "https://www.rug.nl/education/phd-programmes/" },
    ]
  },
  { name: "Université libre de Bruxelles", country: "Belgium", city: "Brussels", qsRanking: 168, website: "https://ulb.be", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 28000, deadline: "Rolling", areas: ["ML","AI","Computer Vision","NLP","Multi-agent Systems"], url: "https://www.ulb.be/en/research-ulb/phd-ulb" },
    ]
  },
  { name: "Ecole Normale Supérieure de Lyon", country: "France", city: "Lyon", qsRanking: 301, website: "https://ens-lyon.fr", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS / LIP", stipend: 21000, deadline: "Rolling", areas: ["ML","AI","Algorithms","Statistical Learning"], url: "https://www.ens-lyon.fr/en/research/phd-programs" },
    ]
  },
  { name: "Uppsala University", country: "Sweden", city: "Uppsala", qsRanking: 108, website: "https://uu.se", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "IT Dept", stipend: 35000, deadline: "Rolling", areas: ["ML","AI","Computer Vision","NLP","Probabilistic Models"], url: "https://www.uu.se/en/admissions/doctoral-studies" },
    ]
  },

  // === MORE ASIA ===
  { name: "Indian Statistical Institute", country: "India", city: "Kolkata", qsRanking: 501, website: "https://isical.ac.in", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 7000, deadline: "February 28", areas: ["ML","AI","Statistical Pattern Recognition","Computer Vision"], url: "https://www.isical.ac.in/index.php/programmes/phd" },
    ]
  },
  { name: "IIT Kharagpur", country: "India", city: "Kharagpur", qsRanking: 270, website: "https://iitkgp.ac.in", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 7500, deadline: "February 28", areas: ["ML","AI","NLP","Computer Vision","RL"], url: "http://cse.iitkgp.ac.in/phd.php" },
    ]
  },
  { name: "Chinese University of Hong Kong", country: "Hong Kong", city: "Hong Kong", qsRanking: 36, website: "https://cuhk.edu.hk", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 18000, deadline: "December 1", areas: ["ML","AI","Computer Vision","NLP","Knowledge Graphs"], url: "https://www.cse.cuhk.edu.hk/en/research/phd/" },
    ]
  },
  { name: "Hong Kong University", country: "Hong Kong", city: "Hong Kong", qsRanking: 26, website: "https://hku.hk", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 18000, deadline: "December 1", areas: ["ML","AI","Computer Vision","NLP","Biomedical AI"], url: "https://www.cs.hku.hk/index.php/programmes/research-degree" },
    ]
  },
  { name: "Korea University", country: "South Korea", city: "Seoul", qsRanking: 74, website: "https://korea.ac.kr", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 15000, deadline: "December 1", areas: ["ML","AI","NLP","Computer Vision","RL"], url: "https://cs.korea.edu/cs_en/10010" },
    ]
  },
  { name: "Yonsei University", country: "South Korea", city: "Seoul", qsRanking: 79, website: "https://yonsei.ac.kr", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS", stipend: 15000, deadline: "December 1", areas: ["ML","AI","Computer Vision","NLP"], url: "https://cs.yonsei.ac.kr/en" },
    ]
  },
  { name: "Osaka University", country: "Japan", city: "Osaka", qsRanking: 68, website: "https://osaka-u.ac.jp", portalType: "Custom",
    programs: [
      { name: "PhD in Information Science (ML/AI)", dept: "IS", stipend: 14000, deadline: "February 1", areas: ["ML","AI","Computer Vision","NLP","Robotics"], url: "https://www.is.osaka-u.ac.jp/en/research/phd_program/" },
    ]
  },
  { name: "Tohoku University", country: "Japan", city: "Sendai", qsRanking: 80, website: "https://tohoku.ac.jp", portalType: "Custom",
    programs: [
      { name: "PhD in Information Sciences (ML)", dept: "IS", stipend: 14000, deadline: "February 1", areas: ["ML","AI","NLP","Computer Vision"], url: "https://www.is.tohoku.ac.jp/en/prospective/index.html" },
    ]
  },
  { name: "National Taiwan University", country: "Taiwan", city: "Taipei", qsRanking: 65, website: "https://ntu.edu.tw", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 12000, deadline: "January 10", areas: ["ML","AI","NLP","Computer Vision","Data Mining"], url: "https://www.csie.ntu.edu.tw/en/graduate-program" },
    ]
  },
  { name: "University of Science and Technology of China", country: "China", city: "Hefei", qsRanking: 93, website: "https://ustc.edu.cn", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 12000, deadline: "December 1", areas: ["ML","AI","Computer Vision","NLP","Quantum AI"], url: "https://cs.ustc.edu.cn/main.htm" },
    ]
  },
  { name: "Wuhan University", country: "China", city: "Wuhan", qsRanking: 226, website: "https://whu.edu.cn", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML)", dept: "CS", stipend: 11000, deadline: "December 1", areas: ["ML","AI","Computer Vision","Remote Sensing AI"], url: "https://cs.whu.edu.cn/English.htm" },
    ]
  },

  // === MIDDLE EAST & AFRICA ===
  { name: "King Abdullah University of Science and Technology (KAUST)", country: "Saudi Arabia", city: "Thuwal", qsRanking: 186, website: "https://kaust.edu.sa", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CS / VCC", stipend: 40000, deadline: "January 7", areas: ["ML","AI","Computer Vision","NLP","Scientific ML"], url: "https://admissions.kaust.edu.sa/apply" },
    ]
  },
  { name: "Hebrew University of Jerusalem", country: "Israel", city: "Jerusalem", qsRanking: 119, website: "https://huji.ac.il", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 22000, deadline: "December 1", areas: ["ML","AI","NLP","Computer Vision","ML Theory"], url: "https://new.huji.ac.il/en/research/phd-programs" },
    ]
  },
  { name: "Bar-Ilan University", country: "Israel", city: "Ramat Gan", qsRanking: 351, website: "https://biu.ac.il", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/NLP)", dept: "CS", stipend: 18000, deadline: "December 1", areas: ["NLP","ML","Computer Vision","Bioinformatics AI"], url: "https://www.cs.biu.ac.il/en/node/201" },
    ]
  },
  { name: "University of Pretoria", country: "South Africa", city: "Pretoria", qsRanking: 551, website: "https://up.ac.za", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 7000, deadline: "October 31", areas: ["ML","AI","Computer Vision","NLP","AI for Africa"], url: "https://www.cs.up.ac.za/research" },
    ]
  },
  { name: "University of Witwatersrand", country: "South Africa", city: "Johannesburg", qsRanking: 451, website: "https://wits.ac.za", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (AI/ML)", dept: "CS", stipend: 7000, deadline: "October 31", areas: ["ML","AI","NLP","Computer Vision"], url: "https://www.wits.ac.za/cs/research/postgraduate-research/phd/" },
    ]
  },
  { name: "American University of Beirut", country: "Lebanon", city: "Beirut", qsRanking: 301, website: "https://aub.edu.lb", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 12000, deadline: "February 28", areas: ["ML","AI","NLP","Computer Vision"], url: "https://www.aub.edu.lb/msfea/cs/Pages/phd.aspx" },
    ]
  },

  // === MORE CANADA ===
  { name: "University of Calgary", country: "Canada", city: "Calgary, AB", qsRanking: 242, website: "https://ucalgary.ca", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 18000, deadline: "January 15", areas: ["ML","AI","Computer Vision","NLP"], url: "https://grad.ucalgary.ca/programs/doctoral/computer-science" },
    ]
  },
  { name: "Queen's University", country: "Canada", city: "Kingston, ON", qsRanking: 367, website: "https://queensu.ca", portalType: "Custom",
    programs: [
      { name: "PhD in Computing (ML/AI)", dept: "Computing", stipend: 18000, deadline: "January 15", areas: ["ML","AI","Computer Vision","NLP"], url: "https://www.cs.queensu.ca/graduate/phd" },
    ]
  },
  { name: "McMaster University", country: "Canada", city: "Hamilton, ON", qsRanking: 189, website: "https://mcmaster.ca", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 17000, deadline: "January 15", areas: ["ML","AI","Computer Vision","NLP","Data Science"], url: "https://www.cas.mcmaster.ca/cs/graduate/phd/" },
    ]
  },
  { name: "Dalhousie University", country: "Canada", city: "Halifax, NS", qsRanking: 401, website: "https://dal.ca", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 17000, deadline: "January 15", areas: ["ML","AI","NLP","Computer Vision","AI for Health"], url: "https://www.dal.ca/faculty/computerscience/graduate/phd.html" },
    ]
  },

  // === MISCELLANEOUS TOP PROGRAMS ===
  { name: "Max Planck Institute for Intelligent Systems", country: "Germany", city: "Stuttgart/Tübingen", qsRanking: null, website: "https://is.mpg.de", portalType: "Custom",
    programs: [
      { name: "PhD in Intelligent Systems (ML/AI)", dept: "MPI-IS", stipend: 28000, deadline: "November 1", areas: ["ML","Deep Learning","RL","Computer Vision","Robot Learning"], url: "https://www.is.mpg.de/jobs" },
    ]
  },
  { name: "INRIA (French National Institute)", country: "France", city: "Multiple Locations", qsRanking: null, website: "https://inria.fr", portalType: "Custom",
    programs: [
      { name: "PhD in AI / ML Research", dept: "Multiple Teams", stipend: 21000, deadline: "Rolling", areas: ["ML","AI","Computer Vision","NLP","Optimization","RL"], url: "https://www.inria.fr/en/joining-inria/researchers/phd-students" },
    ]
  },
  { name: "Vector Institute (University of Toronto)", country: "Canada", city: "Toronto, ON", qsRanking: null, website: "https://vectorinstitute.ai", portalType: "Custom",
    programs: [
      { name: "PhD Fellowship in AI/ML (UofT affiliated)", dept: "Vector/UofT", stipend: 30000, deadline: "December 1", areas: ["Deep Learning","ML","NLP","Computer Vision","AI Safety"], url: "https://vectorinstitute.ai/programs/" },
    ]
  },
  { name: "Mila - Quebec AI Institute (McGill/UdeMontréal)", country: "Canada", city: "Montreal, QC", qsRanking: null, website: "https://mila.quebec", portalType: "Custom",
    programs: [
      { name: "PhD Fellowship in Deep Learning", dept: "Mila / Montreal Universities", stipend: 25000, deadline: "December 15", areas: ["Deep Learning","NLP","RL","Generative Models","AI Safety"], url: "https://mila.quebec/en/students-and-researchers/" },
    ]
  },
  { name: "Amii - Alberta Machine Intelligence Institute (UAlberta)", country: "Canada", city: "Edmonton, AB", qsRanking: null, website: "https://amii.ca", portalType: "Custom",
    programs: [
      { name: "PhD Fellowship in Machine Intelligence", dept: "Amii / UAlberta", stipend: 25000, deadline: "January 15", areas: ["RL","ML","AI","Computer Vision"], url: "https://amii.ca/alberta-phd-scholarships/" },
    ]
  },
  { name: "Wageningen University & Research", country: "Netherlands", city: "Wageningen", qsRanking: 150, website: "https://wur.nl", portalType: "Custom",
    programs: [
      { name: "PhD in Data Science (ML for Life Sciences)", dept: "IDC", stipend: 30000, deadline: "Rolling", areas: ["ML","AI","Computer Vision","Scientific ML","AI for Food/Agri"], url: "https://www.wur.nl/en/Education-Programmes/PhD-Programme.htm" },
    ]
  },
  { name: "University of Zurich", country: "Switzerland", city: "Zurich", qsRanking: 83, website: "https://uzh.ch", portalType: "Custom",
    programs: [
      { name: "PhD in Informatics (ML/AI)", dept: "Informatics / AIML", stipend: 50000, deadline: "Rolling", areas: ["ML","AI","NLP","Computer Vision","Cognitive AI"], url: "https://www.ifi.uzh.ch/en/research/phd-studies.html" },
    ]
  },
  { name: "University of Geneva", country: "Switzerland", city: "Geneva", qsRanking: 143, website: "https://unige.ch", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 50000, deadline: "Rolling", areas: ["ML","AI","Computer Vision","NLP"], url: "https://www.unige.ch/sciences/math-info/en/informatics/phd-in-computer-science/" },
    ]
  },
  { name: "Stockholm University", country: "Sweden", city: "Stockholm", qsRanking: 165, website: "https://su.se", portalType: "Custom",
    programs: [
      { name: "PhD in Computer and Systems Sciences (ML)", dept: "DSV", stipend: 34000, deadline: "Rolling", areas: ["ML","AI","NLP","Computer Vision","Data Science"], url: "https://www.su.se/english/research/phd-studies" },
    ]
  },
  { name: "National Tsing Hua University", country: "Taiwan", city: "Hsinchu", qsRanking: 160, website: "https://nthu.edu.tw", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 11000, deadline: "January 10", areas: ["ML","AI","Computer Vision","NLP","Biomedical AI"], url: "https://web.cs.nthu.edu.tw/files/15-1004-38540,c7553-1.php" },
    ]
  },
  { name: "Aalborg University", country: "Denmark", city: "Aalborg", qsRanking: 333, website: "https://aau.dk", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 40000, deadline: "Rolling", areas: ["ML","AI","Computer Vision","NLP","Human-AI Interaction"], url: "https://www.aau.dk/education/phd/" },
    ]
  },
  { name: "University of Bath", country: "UK", city: "Bath", qsRanking: 179, website: "https://bath.ac.uk", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 16000, deadline: "January 31", areas: ["ML","AI","Computer Vision","NLP","Autonomous Systems"], url: "https://www.bath.ac.uk/guides/phd-computer-science/" },
    ]
  },
  { name: "University of Glasgow", country: "UK", city: "Glasgow", qsRanking: 93, website: "https://gla.ac.uk", portalType: "Custom",
    programs: [
      { name: "PhD in Computing Science (ML/AI)", dept: "CS", stipend: 16500, deadline: "January 31", areas: ["ML","AI","NLP","Computer Vision","Healthcare AI"], url: "https://www.gla.ac.uk/postgraduate/research/computingscience/" },
    ]
  },
  { name: "University of Leeds", country: "UK", city: "Leeds", qsRanking: 92, website: "https://leeds.ac.uk", portalType: "Custom",
    programs: [
      { name: "PhD in Computing (ML/AI)", dept: "CS", stipend: 16000, deadline: "January 31", areas: ["ML","AI","Computer Vision","NLP","Data Science"], url: "https://eps.leeds.ac.uk/computing/doc/phd-computing" },
    ]
  },
  { name: "University of Sheffield", country: "UK", city: "Sheffield", qsRanking: 111, website: "https://sheffield.ac.uk", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS / NLP Group", stipend: 16000, deadline: "January 31", areas: ["ML","AI","NLP","Computer Vision","Robotics"], url: "https://www.sheffield.ac.uk/cs/research/postgraduate" },
    ]
  },
  { name: "University of Nottingham", country: "UK", city: "Nottingham", qsRanking: 121, website: "https://nottingham.ac.uk", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 16000, deadline: "January 31", areas: ["ML","AI","Computer Vision","NLP","Biomedical AI"], url: "https://www.nottingham.ac.uk/computerscience/postgraduate/phd.aspx" },
    ]
  },
  { name: "University of Exeter", country: "UK", city: "Exeter", qsRanking: 153, website: "https://exeter.ac.uk", portalType: "Custom",
    programs: [
      { name: "PhD in Computer Science (ML/AI)", dept: "CS", stipend: 15000, deadline: "January 31", areas: ["ML","AI","NLP","Computer Vision","Climate AI"], url: "https://www.exeter.ac.uk/study/postgraduate/researchdegrees/compsci/" },
    ]
  },
];

async function main() {
  console.log("🌱 Seeding database with PhD programs...");

  await prisma.application.deleteMany();
  await prisma.document.deleteMany();
  await prisma.statement.deleteMany();
  await prisma.program.deleteMany();
  await prisma.university.deleteMany();
  await prisma.userProfile.deleteMany();

  let totalPrograms = 0;

  for (const u of universities) {
    const university = await prisma.university.create({
      data: {
        name: u.name,
        country: u.country,
        city: u.city,
        qsRanking: u.qsRanking ?? null,
        website: u.website,
      },
    });

    for (const p of u.programs) {
      let deadlineDate: Date | null = null;
      const currentYear = new Date().getFullYear();
      const nextYear = currentYear + 1;

      try {
        const months: Record<string, number> = {
          January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
          July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
        };
        const parts = p.deadline.split(" ");
        if (parts.length === 2) {
          const month = months[parts[0]];
          const day = parseInt(parts[1]);
          if (month !== undefined && !isNaN(day)) {
            const candidate = new Date(currentYear, month, day);
            deadlineDate = candidate < new Date() ? new Date(nextYear, month, day) : candidate;
          }
        }
      } catch {}

      await prisma.program.create({
        data: {
          universityId: university.id,
          name: p.name,
          department: p.dept,
          degree: "PhD",
          fullyFunded: true,
          stipendUSD: p.stipend,
          deadline: p.deadline,
          deadlineDate,
          duration: "4-5 years",
          greRequired: false,
          applicationUrl: p.url,
          portalType: u.portalType ?? "Custom",
          researchAreas: JSON.stringify(p.areas),
          annualOpenings: Math.floor(Math.random() * 10) + 3,
          acceptanceRate: parseFloat((Math.random() * 8 + 2).toFixed(1)),
        },
      });
      totalPrograms++;
    }
  }

  // Create a demo user profile
  await prisma.userProfile.create({
    data: {
      email: "bacvml@gmail.com",
      firstName: "PhD",
      lastName: "Applicant",
      nationality: "International",
      interestedAreas: JSON.stringify(["Deep Learning", "NLP", "Computer Vision", "Reinforcement Learning"]),
    },
  });

  console.log(`✅ Seeded ${universities.length} universities and ${totalPrograms} PhD programs!`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
