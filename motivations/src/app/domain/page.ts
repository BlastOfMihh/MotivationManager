import { IMotivation } from "./imotivation";

export interface IPage{
    index:number
    elements:IMotivation[],
    max_page_size:number
}