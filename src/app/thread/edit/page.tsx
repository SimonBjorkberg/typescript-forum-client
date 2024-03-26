'use client'

import { Suspense } from "react"
import EditThreadPageComponent from '../../components/EditThreadPageComponent'



export default function EditThreadPage() {


    return (
        <Suspense>
            <EditThreadPageComponent />
        </Suspense>
    )
}