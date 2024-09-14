import { Project } from "./project.model";
import { Service } from "./services.model";

export interface Container<Children>{
    title: string,
    subtitle: string,
    collums?: number,
    children?: Children[],
}