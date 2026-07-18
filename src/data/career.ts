export interface CareerMilestone {
  year: string;
  title: string;
  subtitle: string;
  note: string;
}

export interface CareerData {
  video: {
    pt: string | null;
    en: string | null;
  };
  focus: string;
  seeking: string;
  languages: string;
  bio: string;
  milestones: CareerMilestone[];
}

export const careerData: CareerData = {
  video: {
    pt: null,
    en: null,
  },
  focus: "Desenvolvimento fullstack",
  seeking: "Estágio ou júnior — remoto ou presencial",
  languages: "Go · TypeScript · React · Node · SQL · Docker · Astro",
  bio: "Movido por curiosidade técnica e pelo impulso de entender sistemas por completo. Fora do código, perco-me em esportes de combate e em livros que expandem minha visão de mundo. Mantenho um registro diário do que estudo: aprender é um projeto para a vida inteira.",
  milestones: [
    {
      year: "2026",
      title: "Estágio em Suporte de TI",
      subtitle: "Rede Sarah",
      note: "Diagnóstico e resolução de incidentes em sistemas de uso final, operação de infraestrutura em ambiente hospitalar",
    },
    {
      year: "2024",
      title: "Início da Graduação",
      subtitle: "Engenharia de Software",
      note: "6° período — estruturas de dados, compiladores, arquitetura de software",
    },
  ],
};
