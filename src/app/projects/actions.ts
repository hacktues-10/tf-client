import { eq } from "drizzle-orm"
import { db } from "../db"
import { projectsSubmission } from "../db/schema"
import { unstable_cache } from "next/cache"

export const getProjects = unstable_cache( async()=> {
    return await db.select().from(projectsSubmission)
},
["all-projects"],
{
  revalidate: 20 * 60 * 1000,
})


export const getEmbeddedProjects = unstable_cache( async()=> {
    return await db.select().from(projectsSubmission).where(eq( projectsSubmission.type, "Хардуер"))
},
["embedded-projects"],
{
  revalidate: 20 * 60 * 1000,
})

export const getSoftwareProjects = unstable_cache( async()=> {
    return await db.select().from(projectsSubmission).where(eq( projectsSubmission.type, "Софтуер"))
},
["software-projects"],
{
  revalidate: 20 * 60 * 1000,
})

export const getNetworkinProjects = unstable_cache( async()=> {
    return await db.select().from(projectsSubmission).where(eq( projectsSubmission.type, "Компютърни мрежи"))
},
["networking-projects"],
{
  revalidate: 20 * 60 * 1000,
})

export const getBotsProjects = unstable_cache( async()=> {
    return await db.select().from(projectsSubmission).where(eq( projectsSubmission.type, "Battle Bots"))
},
["networking-projects"],
{
  revalidate: 20 * 60 * 1000,
})
