import { eq } from "drizzle-orm"
import { db } from "../db"
import { projectsSubmission } from "../db/schema"
import { unstable_cache } from "next/cache"

export const getProjectById = async (id: number) => {
    return (await db.select().from(projectsSubmission).where(eq(projectsSubmission.id, id))).at(0)
}


export const getProjects = unstable_cache( async()=> {
    const projects =  await db.select().from(projectsSubmission)
    return projects.map(project => ({
      ...project,
      videoDurationSec: project.videoDurationSec?.toString(),
  })); 
},
["all-projects"],
{
  revalidate: 20 * 60 * 1000,
})


export const getEmbeddedProjects = unstable_cache( async()=> {
  const projects =  await db.select().from(projectsSubmission).where(eq( projectsSubmission.type, "Хардуер"))
    return projects.map(project => ({
      ...project,
      videoDurationSec: project.videoDurationSec?.toString(),
  })); 
},
["embedded-projects"],
{
  revalidate: 20 * 60 * 1000,
})

export const getSoftwareProjects = unstable_cache( async()=> {
  const projects =  await db.select().from(projectsSubmission).where(eq( projectsSubmission.type, "Софтуер"))
    return projects.map(project => ({
      ...project,
      videoDurationSec: project.videoDurationSec?.toString(),
  })); 
},
["software-projects"],
{
  revalidate: 20 * 60 * 1000,
})

export const getNetworkinProjects = unstable_cache( async()=> {
  const projects =  await db.select().from(projectsSubmission).where(eq( projectsSubmission.type, "Компютърни мрежи"))
    return projects.map(project => ({
      ...project,
      videoDurationSec: project.videoDurationSec?.toString(),
  })); 
},
["networking-projects"],
{
  revalidate: 20 * 60 * 1000,
})

export const getBotsProjects = unstable_cache( async()=> {
  const projects =   await db.select().from(projectsSubmission).where(eq( projectsSubmission.type, "Battle Bots"))
    return projects.map(project => ({
      ...project,
      videoDurationSec: project.videoDurationSec?.toString(),
  })); 
},
["bots-projects"],
{
  revalidate: 20 * 60 * 1000,
})
