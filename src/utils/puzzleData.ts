
export interface Puzzle {
  id: number;
  title: string;
  description: string;
  question: string;
  answer: string | string[];
  hint?: string;
  type: 'single' | 'multiple';
  fields?: string[];
}

export const puzzleData: Puzzle[] = [
  {
    id: 1,
    title: "Kode Biloks",
    description: "Tentukan bilangan oksidasi unsur yang diberi tanda berikut, lalu susun jawabannya sebagai kode (contoh format: 746).",
    question: "Mn dalam KMnO₄\nCr dalam K₂Cr₂O₇\nS dalam H₂SO₄",
    answer: "766",
    hint: "Ingat: Bilangan oksidasi O = -2, K = +1, H = +1. Gunakan aturan bahwa jumlah biloks dalam senyawa netral = 0.",
    type: "single"
  },
  {
    id: 2,
    title: "Siapa yang Teroksidasi?",
    description: "Diberikan reaksi berikut:\nFe + Cu²⁺ → Fe²⁺ + Cu",
    question: "Jawablah pertanyaan berikut:",
    answer: ["Fe", "Cu²⁺", "Cu²⁺", "Fe"],
    type: "multiple",
    fields: [
      "Zat yang mengalami oksidasi",
      "Zat yang mengalami reduksi", 
      "Agen oksidasi",
      "Agen reduksi"
    ],
    hint: "Oksidasi = kehilangan elektron (biloks naik), Reduksi = gain elektron (biloks turun). Agen oksidasi = yang menyebabkan oksidasi (dirinya tereduksi)."
  },
  {
    id: 3,
    title: "Reaksi Separuh Sel",
    description: "Diberikan data:\nZn → Zn²⁺ + 2e⁻\nCu²⁺ + 2e⁻ → Cu",
    question: "Gabungkan kedua reaksi menjadi reaksi redoks lengkap. Tuliskan dengan setara dan jelas.",
    answer: "Zn + Cu²⁺ → Zn²⁺ + Cu",
    hint: "Pastikan jumlah elektron yang dilepas sama dengan yang diterima. Eliminasi elektron dari persamaan akhir.",
    type: "single"
  },
  {
    id: 4,
    title: "Diagram Sel Volta",
    description: "Susun diagram sel dari reaksi redoks berikut:\nMg + Ag⁺ → Mg²⁺ + Ag",
    question: "Format penulisan:\nAnoda | Ion Anoda || Ion Katoda | Katoda",
    answer: "Mg | Mg²⁺ || Ag⁺ | Ag",
    hint: "Anoda = tempat oksidasi (Mg kehilangan elektron), Katoda = tempat reduksi (Ag⁺ menerima elektron).",
    type: "single"
  },
  {
    id: 5,
    title: "Penerapan Redoks",
    description: "Bacalah skenario berikut:\n\"Besi yang dibiarkan terbuka di udara dan terkena air perlahan-lahan membentuk zat berwarna cokelat kemerahan yang disebut karat.\"",
    question: "Jawablah pertanyaan berikut:",
    answer: ["korosi", "Fe", "4Fe + 3O₂ → 2Fe₂O₃"],
    type: "multiple",
    fields: [
      "Apa nama proses ini?",
      "Unsur apa yang mengalami oksidasi?",
      "Tuliskan reaksi redoks sederhana yang terjadi"
    ],
    hint: "Proses ini terjadi karena besi bereaksi dengan oksigen. Besi kehilangan elektron (teroksidasi) membentuk ion besi."
  }
];
