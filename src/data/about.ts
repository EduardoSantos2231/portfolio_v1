export interface AboutData {
  fields: { label: string; value: string }[];
}

export const aboutData: AboutData = {
  fields: [
    { label: 'NOME', value: 'Eduardo Nascimento' },
    { label: 'FORMACAO', value: 'Graduando em Engenharia de Software' },
    { label: 'AREA', value: 'Fullstack' },
    { label: 'LOCALIZACAO', value: 'Salvador, BA' },
    { label: 'LINGUAGENS', value: 'typescript · go' },
  ],
};
