# 📜 Manuscript Exploration: Trends, Materials, and Geography

Welcome to the Manuscript Exploration project! This repository delves into the fascinating world of historical manuscripts, uncovering trends in production, material usage, and geographic distribution. With powerful visualizations and interactive tools, this project brings manuscript history to life.

---

## 📑 Table of Contents
1. Overview
2. Features]
3. Technologies Used[
4. Insights]
5. Challenges and Limitations
6. Future Directions
---

## 📖 Overview

This project analyzes a dataset of historical manuscripts, enriched with geospatial data, material details, collection sources, and timelines. Using a combination of R and D3.js, the project offers comprehensive insights into manuscript preservation and historical trends.

### Objectives:
- Explore trends in manuscript production and preservation.
- Analyze material transitions (e.g., parchment to paper).
- Visualize geographic distribution and collection patterns.

---

## ✨ Features

### 🧹 Data Cleaning
- Identification and removal of duplicate rows.
- Analysis of missing data patterns.

### 📊 Data Exploration
- Geographic heatmaps to visualize manuscript hubs.
- Temporal trends in manuscript production and preservation.
- Material usage analysis across centuries.

### 🌍 Interactive Visualizations
- D3.js-based interactive geographic heatmap for manuscript locations.
- Responsive, zoomable world map with tooltips.

### 📚 Collection Analysis
- Insights into top manuscript collectors and geographic hubs.

---

## 🛠️ Technologies Used

### Languages:
- **R**: Data processing, analysis, and static visualizations.
- **JavaScript**: Interactive visualizations (D3.js).

### Libraries:
- **R**: `ggplot2`, `dplyr`, `tidyr`, `janitor`, `lubridate`, `tidygeocoder`.
- **JavaScript**: `D3.js`, `TopoJSON`.

---
## 📌 Insights
1. Manuscript Production:
	•	Significant peaks during the medieval period (9th–15th centuries).
	•	Decline in production after the 15th century due to the printing press.
2. Geographic Trends:
	•	Europe, especially London, Paris, and Leyden, dominates manuscript holdings.
	•	Emerging hubs in North America reflect modern cataloging efforts.
3. Material Evolution:
	•	Transition from parchment to paper starting in the 13th century.
4. Collection Patterns:
	•	The “Phillipps Manuscripts” collection is notably prominent, along with other institutional collections.

## ⚠️ Challenges and Limitations
•	Data Gaps: High missing rates in certain columns like material type and dimensions.
•	Geographic Bias: Overrepresentation of Western manuscripts.
•	Geocoding Limitations: Challenges in resolving ambiguous or historical place names.

 ## 🔮 Future Directions
1. Dataset Expansion: Include non-Western manuscripts for global representation.
2. Data Enrichment: Address missing data through curation or imputation.
3. Advanced Visualizations: Add filters and layers for deeper exploration.
4. Historical Context: Integrate external datasets (e.g., historical events) for richer analysis.
