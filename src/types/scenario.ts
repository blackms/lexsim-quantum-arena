export type ScenarioCountry = "US" | "IT";

export interface ScenarioConfig {
  country: ScenarioCountry;
  caseType: string;
  jurisdiction: string;
  caseValue: number;
  evidenceStrength: number;
  witnessCount: number;
  intensity: number;
}

export const countryLabels = {
  US: "United States",
  IT: "Italia",
};

export const getCaseTypes = (country: ScenarioCountry) => {
  if (country === "IT") {
    return [
      { value: "penale", label: "Processo Penale" },
      { value: "civile", label: "Causa Civile" },
      { value: "amministrativo", label: "Contenzioso Amministrativo" },
      { value: "lavoro", label: "Causa di Lavoro" },
    ];
  }
  return [
    { value: "criminal", label: "Criminal Case" },
    { value: "civil", label: "Civil Litigation" },
    { value: "corporate", label: "Corporate Dispute" },
    { value: "ip", label: "Intellectual Property" },
  ];
};

export const getJurisdictions = (country: ScenarioCountry) => {
  if (country === "IT") {
    return [
      { value: "tribunale", label: "Tribunale" },
      { value: "corte-appello", label: "Corte d'Appello" },
      { value: "cassazione", label: "Corte di Cassazione" },
      { value: "tar", label: "TAR" },
    ];
  }
  return [
    { value: "federal", label: "Federal Court" },
    { value: "state", label: "State Court" },
    { value: "appellate", label: "Appellate Court" },
    { value: "supreme", label: "Supreme Court" },
  ];
};

export const getCurrency = (country: ScenarioCountry) => {
  return country === "IT" ? "€" : "$";
};

export const formatCurrency = (amount: number, country: ScenarioCountry) => {
  const currency = getCurrency(country);
  const formatted = amount.toLocaleString(country === "IT" ? "it-IT" : "en-US");
  return country === "IT" ? `${currency} ${formatted}` : `${currency}${formatted}`;
};

export const getAgentLabels = (country: ScenarioCountry) => {
  if (country === "IT") {
    return {
      prosecutor: "Pubblico Ministero",
      defense: "Difesa",
      judge: "Giudice",
      witness: "Testimone",
      expert: "Perito",
      analyst: "Analista",
    };
  }
  return {
    prosecutor: "Prosecution",
    defense: "Defense",
    judge: "Judge",
    witness: "Witness",
    expert: "Expert Witness",
    analyst: "Analyst",
  };
};
