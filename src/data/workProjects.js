export const workProjects = [
  {
    id: 'visual-inspection',
    accent: '#4fc3f7',
    label: 'Quality Control',
    title: 'Visual Inspection System',
    desc: 'Computer vision system for automated defect detection on manufacturing lines.',
    tags: ['Python', 'OpenCV', 'Machine Learning'],
    image: '/VisualInspectionsystem.jpg',
    fullDesc:
      'A real-time visual inspection system developed to automate quality control on Bosch Portugal manufacturing lines. The system processes camera feeds and flags defective components before they proceed further in the production chain, significantly reducing manual inspection time and improving detection accuracy.',
    contribution:
      'I designed and implemented the full pipeline — from camera integration and image preprocessing to model training and deployment. Led the validation phase with the quality team, iterating on detection thresholds to minimise both false positives and false negatives.',
    technical:
      'Built with Python and OpenCV for image processing. Used a fine-tuned EfficientNet model trained on annotated manufacturing images. Deployed as a FastAPI service integrated with the production line PLC via MQTT. The system runs inference at 30 FPS on a dedicated GPU workstation.',
  },
  {
    id: 'chatbot',
    accent: '#81c784',
    label: 'AI & Automation',
    title: 'Manufacturing Chatbot',
    desc: 'Conversational assistant for querying production data and operational procedures.',
    tags: ['Python', 'NLP', 'LLM'],
    image: '/chatbot.jpg',
    fullDesc:
      'An internal chatbot developed to give engineers and operators instant access to production data, machine status, and standard operating procedures. Replaced time-consuming manual lookups with a conversational interface that understands natural language queries about the factory floor.',
    contribution:
      'Defined the use cases with operations and quality teams, built the intent recognition pipeline, and integrated the chatbot with the existing data infrastructure. Conducted user testing sessions and refined responses based on real operator feedback.',
    technical:
      'Built on a RAG (Retrieval-Augmented Generation) architecture using a local LLM for data privacy compliance. Documents and KPI data are embedded into a vector store queried at runtime. The interface was deployed as a web app accessible from factory terminals.',
  },
  {
    id: 'machine-learning',
    accent: '#ce93d8',
    label: 'Machine Learning',
    title: 'Machine Learning Pipeline',
    desc: 'End-to-end ML pipeline for predictive modelling in manufacturing processes.',
    tags: ['Python', 'Scikit-learn', 'MLflow'],
    image: '/Machine Learning.jpg',
    fullDesc:
      'A reusable machine learning pipeline designed to accelerate the development and deployment of predictive models across different production lines. Standardised data ingestion, feature engineering, model training, and evaluation into a single framework used by the data science team.',
    contribution:
      'Architected and built the pipeline from scratch, defining the interfaces for each stage. Onboarded two other engineers to the framework and documented best practices for adding new models and data sources.',
    technical:
      'Built with Python, Scikit-learn, and MLflow for experiment tracking. The pipeline supports multiple model types and includes automated hyperparameter tuning with Optuna. Model artifacts are versioned and stored centrally, with a CI step that validates performance before promotion to production.',
  },
  {
    id: 'multimetric-evaluation',
    accent: '#ffb74d',
    label: 'Data Analysis',
    title: 'Multimetric Evaluation',
    desc: 'Multi-dimensional evaluation framework for assessing production process quality.',
    tags: ['Python', 'Statistics', 'PowerBI'],
    image: '/Multimetric evaluation.jpg',
    fullDesc:
      'A framework for evaluating manufacturing processes across multiple quality dimensions simultaneously. Instead of relying on a single metric, the system aggregates process capability indices, defect rates, and cycle times into a composite score that gives a holistic view of line health.',
    contribution:
      'Designed the scoring methodology in collaboration with process engineers and quality managers. Built the data pipeline that feeds the evaluation dashboard and presented the framework to plant leadership for adoption across all production lines.',
    technical:
      'Metrics computed in Python using scipy and pandas. Composite scores are weighted and normalised per process type. Results visualised in PowerBI with drill-through to individual metric breakdowns. Automated weekly reports distributed to line managers via email.',
  },
  {
    id: 'studio-hub',
    accent: '#4dd0e1',
    label: 'Internal Tools',
    title: 'Studio HUB',
    desc: 'Centralised internal platform connecting data, tools, and dashboards for engineering teams.',
    tags: ['Python', 'React', 'SQL'],
    image: '/studio HUB.jpg',
    fullDesc:
      'A unified internal hub that consolidates data tools, dashboards, and process documentation into a single platform for engineering and operations teams. Eliminated the fragmentation of tools spread across multiple systems and gave teams a single entry point for their daily workflows.',
    contribution:
      'Led the product definition and development, gathering requirements from engineering leads and iterating on the interface through regular feedback sessions. Responsible for both backend integrations and the front-end interface.',
    technical:
      'Backend built with Python and FastAPI, connecting to SQL Server, SharePoint, and internal REST APIs. Frontend built with React. Authentication handled via Active Directory integration. Deployed on an internal server with role-based access control per team.',
  },
  {
    id: 'statistical-analysis',
    accent: '#ef9a9a',
    label: 'Process Engineering',
    title: 'Statistical Analysis',
    desc: 'Advanced statistical analysis tooling for process capability and variation control.',
    tags: ['Python', 'Statistics', 'SPC'],
    image: '/statistical analysis.jpg',
    fullDesc:
      'A suite of statistical analysis tools developed to support process engineers in understanding variation, identifying root causes of defects, and validating process changes. Covers capability analysis, hypothesis testing, regression, and control chart generation in a unified environment.',
    contribution:
      'Implemented the statistical methods, validated outputs against reference values from quality standards, and trained the engineering team on how to interpret results. The tools are now part of the standard workflow for process validation studies.',
    technical:
      'Built in Python using scipy, statsmodels, and pingouin. Outputs include PDF reports with annotated charts and structured data exports for regulatory documentation. Integrated with the manufacturing data pipeline so engineers can run analyses directly on live process data.',
  },
]
