'use client'

import CreateThreadPageComponent from '../../components/CreateThreadPageComponent'
import { Suspense } from "react";

export default function Dashboard() {

    return (
        <Suspense>
            <CreateThreadPageComponent />
        </Suspense>
    )
}