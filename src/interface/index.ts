export interface film {
  areas: string;
  description: string;
  domainType: number;
  drameType: string;
  episodes: string;
  filmId: number;
  horizontalPoster: string;
  id: number;
  likeList: string;
  mainBanner: boolean;
  name: string;
  score: number;
  updatedAt: string;
  verticalPoster: string;
  year: number;
}

export interface replies {
  id: number;
  content: string;
  parent_comment_id: number | null;
  parent_reply_id: number | null;
  userId: number;
  updatedAt: string;
  likes: like[];
  comment?: any | null;
}

export interface users {
  id: number;
  name: string;
  emai: string;
  avatar: string;
  updateAt: string;
}

export interface commentProp {
  key?: number;
  content: string;
  filmId?: number;
  id: number;
  film?: film;
  likes: like[];
  replies?: replies[];
  updatedAt?: string;
  user?: users;
  parent_comment_id?: number | null;
  parent_reply_id?: number | null;
  userId?: number;
  comment?: any | null;
}

export interface like {
  id: number;
  updatedAt: string;
  filmId: number;
  userId: number;
  commentId?: number;
  replyId?: number;
  user: users;
}
