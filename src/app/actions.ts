'use server'
import { redirect } from "next/navigation"

export default async function navigate(payload: any){
    redirect(`/dashboard/?payload=${payload}` )
}