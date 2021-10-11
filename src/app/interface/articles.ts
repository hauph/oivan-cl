export interface SingleArticle {
  content: string;
  coverImageUrl: string;
  description: string;
  subtitle: string;
  title: string;
  url: string;
}

export type Articles = SingleArticle[];
