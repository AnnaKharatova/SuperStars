export interface ISkills {
  soft_skills: {
    accordance: boolean;
    grows: boolean;
    id: number;
    name: string;
    penultimate_score: number;
    score: number;
  }[];
  hard_skills: {
    accordance: boolean;
    grows: boolean;
    id: number;
    name: string;
    penultimate_score: number;
    score: number;
  }[];
}

export interface IEmployer {
  bus_factor: boolean;
  created: number;
  grade: string;
  name: string;
  position: string;
  team: {
    name: string;
    id: number;
  }[];
  skills: ISkills;
};

export interface IEmployees {
  id: number;
  image: string;
  name: string;
  position: string;
  bus_factor: false;
  grade: string;
  team: {
    id: number;
    name: string;
  }[];
  created: string;
  requests_by_employee: number;
  development_plan: boolean;
  skills: ISkills;
};

export interface ITeam {
  id: number;
  name: string;
}
