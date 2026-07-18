export interface AboutData {
  fields: { label: string; value: string }[];
}

export const aboutData: AboutData = {
  fields: [
    { label: 'NOME', value: 'Eduardo Nascimento' },
    { label: 'FORMACAO', value: 'Graduando em Engenharia de Software' },
    { label: 'LOCALIZACAO', value: 'Salvador, BA' },
  ],
};
