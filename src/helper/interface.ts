export interface Film {

   data: {
    id: number,
    updatedAt: string,
    name: string,
    description: string,
    year: number,
    score: number,
    areas: string,
    likeList: [],
    verticalPoster: string,
    horizontalPoster: string,
    viewDayly: number,
    viewWeekly: number,
    url:string,
    viewMonthly: number,
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
   }

}