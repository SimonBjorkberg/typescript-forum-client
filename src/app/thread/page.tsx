'use client'

import { Suspense } from 'react'
import ThreadPageComponent from '../components/ThreadPageComponent'


export default function Thread() {

    return (
        <Suspense>
            <ThreadPageComponent />
        </Suspense>
    );
}