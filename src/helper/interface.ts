export interface Film {

   data: {
    id: number,
    updatedAt: string,
    name: string,
    filmId: number,
    domainType: number,
    description: string,
    year: number,
    votes: number,
    score: number,
    episodes: string,
    drameType: string,
    areas: string,
    likeList: string,
    verticalPoster: string,
    horizontalPoster: string,
    views: number,
    actors: {
        id: number,
        updateAt: string,
        name:string,
        bod:string,
        descriptions:string
    }[],
    categories:  {
        id: number,
        updateAt: string,
        name:string,
    }[],
    bannerType: {
        id: number,
        updateAt: string,
        name:string,
    }[]
   },
   dataUrl: {
    businessType: number,
    currentDefinition:string,
    episodeId:string,

    mediaUrl:string,
    totalDuration:number
   },
 

}